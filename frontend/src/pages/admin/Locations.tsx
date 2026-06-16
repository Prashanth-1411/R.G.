import React, { useState, useEffect } from 'react';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminLocations: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', slug: '', description: '', contentHtml: '', faqs: '', metaTitle: '', metaDescription: '', metaKeywords: '', isActive: true });

  const load = () => { setLoading(true); getLocations().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, faqs: form.faqs ? JSON.parse(form.faqs) : undefined };
      if (editing) await updateLocation(editing.id, data);
      else await createLocation(data);
      setShowForm(false); setEditing(null); setForm({ name: '', slug: '', description: '', contentHtml: '', faqs: '', metaTitle: '', metaDescription: '', metaKeywords: '', isActive: true });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row); setForm({ name: row.name || '', slug: row.slug || '', description: row.description || '', contentHtml: row.contentHtml || '', faqs: row.faqs ? JSON.stringify(row.faqs) : '', metaTitle: row.metaTitle || '', metaDescription: row.metaDescription || '', metaKeywords: row.metaKeywords || '', isActive: row.isActive ?? true });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; try { await deleteLocation(row.id); load(); } catch {} };

  const columns = [
    { key: 'name', label: 'Name', render: (v: string) => <span className="font-semibold">{v}</span> },
    { key: 'slug', label: 'Slug', render: (v: string) => <span className="text-brand-600 text-xs">{v}</span> },
    { key: 'isActive', label: 'Active', render: (v: boolean) => v ? <span className="text-emerald-600 font-bold">Yes</span> : <span className="text-navy-300">No</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Service Areas</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl"><Plus className="w-4 h-4" /> Add Location</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Location' : 'Add Location'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Slug</label>
                  <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Content HTML</label>
                <textarea value={form.contentHtml} onChange={e => setForm({...form, contentHtml: e.target.value})} rows={5} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">FAQs (JSON)</label>
                <textarea value={form.faqs} onChange={e => setForm({...form, faqs: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none font-mono text-xs" placeholder='[{"question":"","answer":""}]' />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Meta Title</label>
                <input type="text" value={form.metaTitle} onChange={e => setForm({...form, metaTitle: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Meta Description</label>
                <textarea value={form.metaDescription} onChange={e => setForm({...form, metaDescription: e.target.value})} rows={2} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Meta Keywords</label>
                <input type="text" value={form.metaKeywords} onChange={e => setForm({...form, metaKeywords: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="rounded text-brand-500" />
                <span className="text-sm text-navy-600">Active</span>
              </label>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Save className="w-4 h-4" /> {editing ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-navy-50 hover:bg-navy-100 text-navy-600 font-bold rounded-xl">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <DataTable columns={columns} data={items} onEdit={handleEdit} onDelete={handleDelete} loading={loading} />
    </div>
  );
};
