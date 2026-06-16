import React, { useState, useEffect } from 'react';
import { getSections, createSection, updateSection, deleteSection, reorderSections, getPages, getMediaUrl } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminSections: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterPage, setFilterPage] = useState<number | ''>('');
  const [form, setForm] = useState({ pageId: 1, type: 'content', title: '', subtitle: '', content: '', image: '', position: 0, isVisible: true });

  const load = () => {
    setLoading(true);
    Promise.all([getSections(filterPage || undefined), getPages()]).then(([sections, p]) => {
      setItems(sections);
      setPages(p);
    }).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, [filterPage]);

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
      const data = { ...form, content: form.content ? JSON.parse(form.content) : undefined, pageId: parseInt(form.pageId as any) };
      if (editing) await updateSection(editing.id, data);
      else await createSection(data);
      setShowForm(false); setEditing(null); setForm({ pageId: 1, type: 'content', title: '', subtitle: '', content: '', image: '', position: 0, isVisible: true });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row);
    setForm({ pageId: row.pageId || 1, type: row.type || 'content', title: row.title || '', subtitle: row.subtitle || '', content: row.content ? JSON.stringify(row.content) : '', image: row.image || '', position: row.position || 0, isVisible: row.isVisible ?? true });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete this section?')) return; try { await deleteSection(row.id); load(); } catch {} };

  const columns = [
    { key: 'type', label: 'Type', render: (v: string) => <span className="capitalize">{v}</span> },
    { key: 'title', label: 'Title' },
    { key: 'pageId', label: 'Page ID' },
    { key: 'position', label: 'Position' },
    { key: 'isVisible', label: 'Visible', render: (v: boolean) => v ? <span className="text-emerald-600 font-bold">Yes</span> : <span className="text-navy-300">No</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Sections</h1>
        <div className="flex items-center gap-3">
          <select value={filterPage} onChange={e => setFilterPage(e.target.value ? parseInt(e.target.value) : '')} className="px-4 py-2 bg-navy-50 border border-navy-200 rounded-xl text-sm">
            <option value="">All Pages</option>
            {pages.map(p => <option key={p.id} value={p.id}>{p.pageName}</option>)}
          </select>
          <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl"><Plus className="w-4 h-4" /> Add Section</button>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Section' : 'Add Section'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Page</label>
                <select value={form.pageId} onChange={e => setForm({...form, pageId: parseInt(e.target.value)})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm">
                  {pages.map(p => <option key={p.id} value={p.id}>{p.pageName}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Type</label>
                <select value={form.type} onChange={e => setForm({...form, type: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm">
                  <option value="content">Content</option>
                  <option value="hero">Hero</option>
                  <option value="cards">Cards</option>
                  <option value="gallery">Gallery</option>
                  <option value="cta">CTA</option>
                  <option value="features">Features</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Title</label>
                <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Subtitle</label>
                <input type="text" value={form.subtitle} onChange={e => setForm({...form, subtitle: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Content (JSON)</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={4} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm font-mono text-xs" placeholder='{"key": "value"}' />
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
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Position</label>
                  <input type="number" value={form.position} onChange={e => setForm({...form, position: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="flex items-end pb-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={form.isVisible} onChange={e => setForm({...form, isVisible: e.target.checked})} className="rounded text-brand-500" />
                    <span className="text-sm text-navy-600">Visible</span>
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
