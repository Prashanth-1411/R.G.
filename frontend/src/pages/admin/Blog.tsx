import React, { useState, useEffect } from 'react';
import { getBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost, getMediaUrl } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X } from 'lucide-react';

export const AdminBlog: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', slug: '', content: '', featuredImage: '', category: '', tags: '', metaTitle: '', metaDescription: '', status: 'draft' });

  const load = () => { setLoading(true); getBlogPosts().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const pickImage = async () => {
    const input = document.createElement('input'); input.type = 'file'; input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0]; if (!file) return;
      const fd = new FormData(); fd.append('file', file);
      const res = await fetch('/api/media/upload', { method: 'POST', headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }, body: fd });
      const media = await res.json();
      setForm((prev: any) => ({ ...prev, featuredImage: media.fileUrl }));
    };
    input.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await updateBlogPost(editing.id, form);
      else await createBlogPost(form);
      setShowForm(false); setEditing(null); setForm({ title: '', slug: '', content: '', featuredImage: '', category: '', tags: '', metaTitle: '', metaDescription: '', status: 'draft' });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row); setForm({ title: row.title || '', slug: row.slug || '', content: row.content || '', featuredImage: row.featuredImage || '', category: row.category || '', tags: row.tags || '', metaTitle: row.metaTitle || '', metaDescription: row.metaDescription || '', status: row.status || 'draft' });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete post?')) return; try { await deleteBlogPost(row.id); load(); } catch {} };

  const columns = [
    { key: 'featuredImage', label: 'Image', render: (v: string) => v ? <img src={getMediaUrl(v)} className="w-12 h-8 rounded object-cover" /> : '-' },
    { key: 'title', label: 'Title', render: (v: string) => <span className="font-semibold">{v}</span> },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (v: string) => <span className={`text-xs font-bold uppercase px-2 py-1 rounded-lg ${v === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-navy-100 text-navy-500'}`}>{v}</span> },
    { key: 'createdAt', label: 'Date', render: (v: string) => v ? new Date(v).toLocaleDateString() : '-' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Blog Posts</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl"><Plus className="w-4 h-4" /> New Post</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Post' : 'New Post'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Title</label>
                  <input type="text" required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Slug</label>
                  <input type="text" required value={form.slug} onChange={e => setForm({...form, slug: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Content</label>
                <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={10} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none font-mono text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Category</label>
                  <input type="text" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Tags</label>
                  <input type="text" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" placeholder="comma, separated" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Featured Image</label>
                <div className="flex items-center gap-3">
                  {form.featuredImage && <img src={getMediaUrl(form.featuredImage)} className="h-14 rounded-lg object-cover" />}
                  <button type="button" onClick={pickImage} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600">Choose</button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Status</label>
                <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
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
