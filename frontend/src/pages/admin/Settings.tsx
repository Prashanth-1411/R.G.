import React, { useState, useEffect, useRef } from 'react';
import { getSettings, updateSettings, getMediaUrl } from '../../api/admin';
import { Save } from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const [form, setForm] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getSettings().then(s => {
      setForm(s);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSettings(form);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch {}
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        body: formData,
      });
      const media = await res.json();
      return media.fileUrl;
    } catch { return null; }
  };

  const pickImage = async (field: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/media/upload', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        body: formData,
      });
      const media = await res.json();
      setForm((prev: any) => ({ ...prev, [field]: media.fileUrl }));
    };
    input.click();
  };

  if (loading) return <div className="text-center py-12 text-navy-400">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 font-display mb-6">Site Settings</h1>

      {success && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm">
          Settings saved successfully!
        </div>
      )}

      <div className="bg-white rounded-2xl border border-navy-100 shadow-soft p-6 space-y-6">
        {/* Logo */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Logo</label>
          <div className="flex items-center gap-4">
            {form.logo && (
              <img src={getMediaUrl(form.logo)} alt="Logo" className="h-12 object-contain" />
            )}
            <button onClick={() => pickImage('logo')} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600 transition-colors">
              Choose Image
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Logo Width (px)</label>
          <input type="number" value={form.logoWidth || 140} onChange={e => setForm({...form, logoWidth: parseInt(e.target.value)})}
            className="w-full max-w-xs px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Site Name</label>
            <input type="text" value={form.siteName || ''} onChange={e => setForm({...form, siteName: e.target.value})}
              className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Favicon</label>
            <div className="flex items-center gap-3">
              {form.favicon && <img src={getMediaUrl(form.favicon)} alt="" className="w-8 h-8 rounded" />}
              <button onClick={() => pickImage('favicon')} className="px-4 py-2 bg-navy-50 hover:bg-navy-100 rounded-xl text-sm text-navy-600 transition-colors">
                Choose
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Phone</label>
            <input type="text" value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Phone 2</label>
            <input type="text" value={form.phone2 || ''} onChange={e => setForm({...form, phone2: e.target.value})}
              className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Email</label>
            <input type="email" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})}
              className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Footer Text</label>
            <input type="text" value={form.footerText || ''} onChange={e => setForm({...form, footerText: e.target.value})}
              className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-navy-400">Address</label>
          <textarea value={form.address || ''} onChange={e => setForm({...form, address: e.target.value})} rows={3}
            className="w-full px-4 py-2.5 bg-navy-50 border border-navy-200 rounded-xl text-sm focus:outline-none focus:border-brand-500 resize-none" />
        </div>

        <div className="pt-4 border-t border-navy-100">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-xl transition-colors disabled:opacity-50">
            {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
};
