import React, { useState, useEffect } from 'react';
import { getPages, createPage, updatePage, deletePage, getMediaUrl } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminPages: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ pageName: '', heading: '', content: '', image: '', metaTitle: '', metaDescription: '', metaKeywords: '' });

  const load = () => { setLoading(true); getPages().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const pickImage = async (field: string) => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0]; if (!file) return;
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }, body: fd });
      const media = await res.json();
      setForm((prev: any) => ({ ...prev, [field]: media.fileUrl }));
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await updatePage(editing.id, form);
      else await createPage(form);
      setShowForm(false); setEditing(null); setForm({ pageName: '', heading: '', content: '', image: '', metaTitle: '', metaDescription: '', metaKeywords: '' });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setForm({ pageName: row.pageName || '', heading: row.heading || '', content: row.content || '', image: row.image || '', metaTitle: row.metaTitle || '', metaDescription: row.metaDescription || '', metaKeywords: row.metaKeywords || '' });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete this page?')) return; try { await deletePage(row.id); load(); } catch {} };

  const columns = [
    { key: 'pageName', label: 'Page Name', render: (v: string) => <span className="font-semibold">{v}</span> },
    { key: 'heading', label: 'Heading' },
    { key: 'image', label: 'Image', render: (v: string) => v ? <img src={getMediaUrl(v)} className="w-12 h-8 rounded object-cover" /> : '-' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Pages</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl"><Plus className="w-4 h-4" /> Add Page</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Page' : 'Add Page'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Page Name</label>
                <input type="text" required value={form.pageName} onChange={e => setForm({...form, pageName: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Heading</label>
                <input type="text" value={form.heading} onChange={e => setForm({...form, heading: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Content</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={5} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Image</label>
                <div className="flex items-center gap-3">
                  {form.image && <img src={getMediaUrl(form.image)} className="h-14 rounded-lg object-cover" />}
                  <button type="button" onClick={() => pickImage('image')} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600">Choose</button>
                </div>
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
