import React, { useState, useEffect } from 'react';
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Plus, Save, X, Star } from 'lucide-react';

export const AdminTestimonials: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', position: '', content: '', rating: 5, verificationUrl: '', isApproved: true, order: 0 });

  const load = () => { setLoading(true); getTestimonials().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) await updateTestimonial(editing.id, form);
      else await createTestimonial(form);
      setShowForm(false); setEditing(null); setForm({ name: '', position: '', content: '', rating: 5, verificationUrl: '', isApproved: true, order: 0 });
      load();
    } catch {}
  };

  const handleEdit = (row: any) => {
    setEditing(row); setForm({ name: row.name || '', position: row.position || '', content: row.content || '', rating: row.rating || 5, verificationUrl: row.verificationUrl || '', isApproved: row.isApproved ?? true, order: row.order || 0 });
    setShowForm(true);
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete?')) return; try { await deleteTestimonial(row.id); load(); } catch {} };

  const columns = [
    { key: 'name', label: 'Name', render: (v: string) => <span className="font-semibold">{v}</span> },
    { key: 'position', label: 'Position' },
    { key: 'rating', label: 'Rating', render: (v: number) => <span className="text-gold-500 font-bold">{'★'.repeat(v)}{'☆'.repeat(5 - v)}</span> },
    { key: 'content', label: 'Content', render: (v: string) => <span className="text-xs text-navy-500 line-clamp-2">{v?.slice(0, 60)}...</span> },
    { key: 'isApproved', label: 'Approved', render: (v: boolean) => v ? <span className="text-emerald-600 font-bold">Yes</span> : <span className="text-navy-300">No</span> },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Testimonials</h1>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl"><Plus className="w-4 h-4" /> Add Testimonial</button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Name</label>
                  <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Position</label>
                  <input type="text" value={form.position} onChange={e => setForm({...form, position: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Content</label>
                <textarea required value={form.content} onChange={e => setForm({...form, content: e.target.value})} rows={4} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Rating (1-5)</label>
                  <input type="number" min={1} max={5} value={form.rating} onChange={e => setForm({...form, rating: parseInt(e.target.value) || 5})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Order</label>
                  <input type="number" value={form.order} onChange={e => setForm({...form, order: parseInt(e.target.value) || 0})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Verification URL</label>
                <input type="url" value={form.verificationUrl} onChange={e => setForm({...form, verificationUrl: e.target.value})} className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm" />
              </div>
              <label className="flex items-center gap-2">
                <input type="checkbox" checked={form.isApproved} onChange={e => setForm({...form, isApproved: e.target.checked})} className="rounded text-brand-500" />
                <span className="text-sm text-navy-600">Approved</span>
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
