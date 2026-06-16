import React, { useState, useEffect } from 'react';
import { getActivityLogs } from '../../api/admin';
import { Activity } from 'lucide-react';

export const AdminActivityLogs: React.FC = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const perPage = 30;

  useEffect(() => {
    setLoading(true);
    getActivityLogs(perPage, page * perPage).then((res: any) => {
      setLogs(res.logs || []);
      setTotal(res.total || 0);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy-800 font-display mb-6">Activity Logs</h1>

      <div className="bg-white rounded-2xl border border-navy-100 shadow-soft">
        <div className="divide-y divide-navy-50">
          {loading ? (
            <div className="text-center py-12 text-sm text-navy-400">Loading...</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <Activity className="w-8 h-8 text-navy-300 mx-auto mb-2" />
              <p className="text-sm text-navy-400">No activity logs yet</p>
            </div>
          ) : (
            logs.map((log: any) => (
              <div key={log.id} className="p-4 hover:bg-navy-50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-semibold text-navy-700">{log.userName || 'System'}</span>
                      <span className="text-navy-400 mx-1.5">•</span>
                      <span className="font-medium text-navy-600 capitalize">{log.action}</span>
                      {log.entity && (
                        <span className="text-navy-400">
                          {' '}on <span className="text-brand-600">{log.entity}</span>
                          {log.entityId && <span className="text-navy-400"> #{log.entityId}</span>}
                        </span>
                      )}
                    </p>
                    {log.details && Object.keys(log.details).length > 0 && (
                      <p className="text-xs text-navy-400 font-mono">{JSON.stringify(log.details).slice(0, 100)}</p>
                    )}
                  </div>
                  <span className="text-[10px] text-navy-400 shrink-0">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-navy-100">
            <span className="text-xs text-navy-400">Page {page + 1} of {totalPages}</span>
            <div className="flex gap-1">
              <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-navy-50 hover:bg-navy-100 disabled:opacity-30 transition-colors">Previous</button>
              <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-navy-50 hover:bg-navy-100 disabled:opacity-30 transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
