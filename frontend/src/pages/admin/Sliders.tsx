import React, { useState, useEffect } from 'react';
import { getSliders, createSlider, updateSlider, deleteSlider, getMediaUrl } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminSliders: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ image: '', title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true });

  const load = () => { setLoading(true); getSliders().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const pickImage = async () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
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
      if (editing) await updateSlider(editing.id, form);
      else await createSlider(form);
      setShowForm(false); setEditing(null); setForm({ image: '', title: '', subtitle: '', description: '', buttonText: '', buttonLink: '', order: 0, isActive: true });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setForm({ image: row.image || '', title: row.title || '', subtitle: row.subtitle || '', description: row.description || '', buttonText: row.buttonText || '', buttonLink: row.buttonLink || '', order: row.order || 0, isActive: row.isActive ?? true });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete this slider?')) return; try { await deleteSlider(row.id); load(); } catch {} };

  const columns = [
    { key: 'image', label: 'Image', render: (v: string) => v ? <img src={getMediaUrl(v)} className="w-16 h-10 rounded-lg object-cover" /> : '-' },
    { key: 'title', label: 'Title' },
    { key: 'subtitle', label: 'Subtitle' },
    { key: 'order', label: 'Order' },
    { key: 'isActive', label: 'Active', render: (v: boolean) => v ? <span className="text-emerald-600 font-bold">Yes</span> : <span className="text-navy-300">No</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Hero Sliders</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors"><Plus className="w-4 h-4" /> Add Slide</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Slide' : 'Add Slide'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Image</label>
                <div className="flex items-center gap-3">
                  {form.image && <img src={getMediaUrl(form.image)} className="h-16 rounded-lg object-cover" />}
                  <button type="button" onClick={pickImage} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600">Choose</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Subtitle</label>
                <input type="text" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Description</label>
                <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={3} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Button Text</label>
                  <input type="text" value={form.buttonText} onChange={e => setForm({...form, buttonText: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Button Link</label>
                  <input type="text" value={form.buttonLink} onChange={e => setForm({...form, buttonLink: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.isActive} onChange={e => setForm({...form, isActive: e.target.checked})} className="rounded text-brand-500 focus:ring-brand-500" />
                    <span className="text-sm text-navy-600">Active</span>
                  </label>
                </div>
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
