import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService, getMediaUrl } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminServices: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', image: '', serviceType: 'ambulance', features: '', status: 'active', order: 0 });

  const load = () => { setLoading(true); getServices().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const pickImage = async () => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0]; if (!file) return;
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }, body: fd });
      const media = await res.json();
      setForm((prev: any) => ({ ...prev, image: media.fileUrl }));
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, features: form.features ? JSON.parse(form.features) : undefined, serviceType: form.serviceType };
      if (editing) await updateService(editing.id, data);
      else await createService(data);
      setShowForm(false); setEditing(null); setForm({ title: '', description: '', image: '', serviceType: 'ambulance', features: '', status: 'active', order: 0 });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setForm({ title: row.title || '', description: row.description || '', image: row.image || '', serviceType: row.serviceType || 'ambulance', features: row.features ? JSON.stringify(row.features) : '', status: row.status || 'active', order: row.order || 0 });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete this service?')) return; try { await deleteService(row.id); load(); } catch {} };

  const columns = [
    { key: 'image', label: 'Image', render: (v: string) => v ? <img src={getMediaUrl(v)} className="w-12 h-8 rounded object-cover" /> : '-' },
    { key: 'title', label: 'Title' },
    { key: 'serviceType', label: 'Type', render: (v: string) => <span className="capitalize">{v || 'ambulance'}</span> },
    { key: 'status', label: 'Status', render: (v: string) => <span className={`text-xs font-bold uppercase px-2 py-1 rounded-lg ${v === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-500'}`}>{v}</span> },
    { key: 'order', label: 'Order' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Services</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors"><Plus className="w-4 h-4" /> Add Service</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Title</label>
                <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Image</label>
                <div className="flex items-center gap-3">
                  {form.image && <img src={getMediaUrl(form.image)} className="h-14 rounded-lg object-cover" />}
                  <button type="button" onClick={pickImage} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600">Choose</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Service Type</label>
                  <select value={form.serviceType} onChange={e => setForm({...form, serviceType: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm">
                    <option value="ambulance">Ambulance</option>
                    <option value="funeral">Funeral</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Status</label>
                  <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Features (JSON array)</label>
                <textarea value={form.features} onChange={e => setForm({...form, features: e.target.value})} rows={3} placeholder='["Feature 1", "Feature 2"]' className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none font-mono text-xs" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Order</label>
                <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
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
