import React, { useState, useEffect } from 'react';
import { getMedia, uploadMedia, deleteMedia, getMediaUrl } from '../../api/admin';
import { Image, Upload, Trash2, Link, Copy, Check } from 'lucide-react';

export const AdminMedia: React.FC = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const load = () => {
    setLoading(true);
    getMedia().then(setMedia).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await uploadMedia(file);
      load();
    } catch {}
    setUploading(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this file?')) return;
    try {
      await deleteMedia(id);
      setMedia(prev => prev.filter(m => m.id !== id));
    } catch {}
  };

  const copyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(getMediaUrl(url));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-navy-800 font-display">Media Library</h1>
        <label className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          {uploading ? 'Uploading...' : 'Upload'}
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*,video/*,.pdf" disabled={uploading} />
        </label>
      </div>

      {loading ? (
        <div className="text-center py-12 text-navy-400">Loading...</div>
      ) : media.length === 0 ? (
        <div className="text-center py-12">
          <Image className="w-12 h-12 text-navy-300 mx-auto mb-3" />
          <p className="text-navy-400 text-sm">No media files yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {media.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-xl border border-navy-100 overflow-hidden shadow-soft">
              <div className="aspect-square bg-navy-50 relative">
                {item.fileType?.startsWith('image/') ? (
                  <img src={getMediaUrl(item.fileUrl)} alt={item.fileName} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="w-8 h-8 text-navy-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button onClick={() => copyUrl(item.fileUrl, item.id)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-navy-700 transition-colors">
                    {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button onClick={() => handleDelete(item.id)}
                    className="p-2 rounded-lg bg-white/90 hover:bg-white text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-2">
                <p className="text-[11px] text-navy-500 truncate">{item.fileName}</p>
                <p className="text-[10px] text-navy-300">{item.fileSize ? Math.round(item.fileSize / 1024) + ' KB' : ''}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
