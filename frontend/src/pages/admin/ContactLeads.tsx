import React, { useState, useEffect } from 'react';
import { getContactLeads, updateContactLead, deleteContactLead } from '../../api/admin';
import { DataTable } from '../../components/admin/DataTable';
import { Save, X } from 'lucide-react';

export const AdminContactLeads: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<any | null>(null);

  const load = () => { setLoading(true); getContactLeads().then(setItems).catch(() => {}).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const handleStatus = async (id: number, status: string) => {
    try { await updateContactLead(id, { status }); load(); } catch {}
  };

  const handleDelete = async (row: any) => { if (!confirm('Delete this lead?')) return; try { await deleteContactLead(row.id); load(); } catch {} };

  const columns = [
    { key: 'name', label: 'Name', render: (v: string, row: any) => <button onClick={() => setViewing(row)} className="font-semibold text-brand-600 hover:underline text-left">{v}</button> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'requirements', label: 'Service', render: (v: string) => v || 'Ambulance' },
    { key: 'status', label: 'Status', render: (v: string, row: any) => (
      <select value={v} onChange={e => handleStatus(row.id, e.target.value)}
        className={`text-xs font-bold px-2 py-1 rounded-lg border-0 ${v === 'new' ? 'bg-brand-100 text-brand-700' : v === 'contacted' ? 'bg-gold-100 text-gold-700' : 'bg-emerald-100 text-emerald-700'}`}>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="resolved">Resolved</option>
      </select>
    )},
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 font-display mb-6">Contact Leads</h1>
      <DataTable columns={columns} data={items} onDelete={handleDelete} loading={loading} />

      {viewing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={() => setViewing(null)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-premium-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-navy-800 font-display">Lead Details</h2>
              <button onClick={() => setViewing(null)} className="p-1.5 rounded-lg hover:bg-navy-50"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="font-bold text-navy-500">Name:</span> <span className="text-navy-700">{viewing.name}</span></div>
              <div><span className="font-bold text-navy-500">Email:</span> <span className="text-navy-700">{viewing.email}</span></div>
              <div><span className="font-bold text-navy-500">Phone:</span> <span className="text-navy-700">{viewing.phone}</span></div>
              <div><span className="font-bold text-navy-500">Address:</span> <span className="text-navy-700">{viewing.address || '-'}</span></div>
              <div><span className="font-bold text-navy-500">Service:</span> <span className="text-navy-700">{viewing.requirements || 'Ambulance'}</span></div>
              <div><span className="font-bold text-navy-500">Status:</span> <span className={`text-xs font-bold px-2 py-1 rounded-lg ml-1 ${viewing.status === 'new' ? 'bg-brand-100 text-brand-700' : viewing.status === 'contacted' ? 'bg-gold-100 text-gold-700' : 'bg-emerald-100 text-emerald-700'}`}>{viewing.status}</span></div>
              <div className="pt-3 border-t border-navy-100">
                <span className="font-bold text-navy-500 block mb-1">Message:</span>
                <p className="text-navy-600 bg-navy-50 p-3 rounded-xl">{viewing.message || 'No message'}</p>
              </div>
              <div className="flex gap-2 pt-3">
                {viewing.status !== 'contacted' && <button onClick={() => { handleStatus(viewing.id, 'contacted'); setViewing(null); }} className="flex-1 py-2 bg-gold-500 hover:bg-gold-600 text-white font-bold rounded-xl text-xs">Mark Contacted</button>}
                {viewing.status !== 'resolved' && <button onClick={() => { handleStatus(viewing.id, 'resolved'); setViewing(null); }} className="flex-1 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs">Mark Resolved</button>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
