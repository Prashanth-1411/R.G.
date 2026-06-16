import React, { useState, useEffect } from 'react';
import { getNavbarItems, createNavbarItem, updateNavbarItem, deleteNavbarItem, reorderNavbar } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminNavbar: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ menuName: '', menuLink: '', parentId: 0, order: 0, isActive: true });

  const load = () => {
    setLoading(true);
    getNavbarItems().then(d => setItems(d)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateNavbarItem(editing.id, form);
      } else {
        await createNavbarItem(form);
      }
      setShowForm(false);
      setEditing(null);
      setForm({ menuName: '', menuLink: '', parentId: 0, order: 0, isActive: true });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setForm({ menuName: row.menuName || '', menuLink: row.menuLink || '', parentId: row.parentId || 0, order: row.order || 0, isActive: row.isActive ?? true });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => {
    if (!confirm('Delete this menu item?')) return;
    try {
      await deleteNavbarItem(row.id);
      load();
    } catch {}
  };

  const columns = [
    { key: 'menuName', label: 'Name' },
    { key: 'menuLink', label: 'Link', render: (v: string) => <span className="text-brand-600 text-xs">{v}</span> },
    { key: 'parentId', label: 'Parent ID', render: (v: number) => v || '-' },
    { key: 'order', label: 'Order' },
    { key: 'isActive', label: 'Active', render: (v: boolean) => v ? <span className="text-emerald-600 font-bold">Yes</span> : <span className="text-navy-300">No</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Menu Manager</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm({ menuName: '', menuLink: '', parentId: 0, order: 0, isActive: true }); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors">
          <Plus className="w-4 h-4" /> Add Item
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Menu Item' : 'Add Menu Item'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Menu Name</label>
                <input type="text" required value={form.menuName} onChange={e => setForm({...form, menuName: e.target.value})}
                  className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Link URL</label>
                <input type="text" required value={form.menuLink} onChange={e => setForm({...form, menuLink: e.target.value})}
                  className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Parent ID</label>
                  <input type="number" value={form.parentId} onChange={e => setForm({...form, parentId: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})}
                    className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                </div>
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})}
                  className="rounded text-brand-500 focus:ring-brand-500" />
                <span className="text-sm text-navy-600">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" /> {editing ? 'Update' : 'Create'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-navy-50 hover:bg-navy-100 text-navy-600 font-bold rounded-xl transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={items} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
