import React from 'react';
import { Edit3, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onCreate?: () => void;
  createLabel?: string;
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns, data, onEdit, onDelete, onCreate, createLabel = 'Create',
  loading, page, totalPages, onPageChange,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-navy-100 shadow-soft">
      {onCreate && (
        <div className="flex items-center justify-between p-4 border-b border-navy-100">
          <div />
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            {createLabel}
          </button>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-navy-100">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-navy-400">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-12 text-sm text-navy-400">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="text-center py-12 text-sm text-navy-400">
                  No data found
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                  <tr key={row.id || i} className="border-b border-navy-50 hover:bg-navy-50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-sm text-navy-700">
                      {col.render ? col.render(row[col.key], row) : row[col.key] ?? '-'}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-2 rounded-lg hover:bg-brand-50 text-navy-400 hover:text-brand-600 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-2 rounded-lg hover:bg-red-50 text-navy-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {page !== undefined && totalPages !== undefined && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-navy-100">
          <span className="text-xs text-navy-400">Page {page + 1} of {totalPages}</span>
          <div className="flex gap-1">
            <button
              onClick={() => onPageChange?.(page - 1)}
              disabled={page === 0}
              className="p-1.5 rounded-lg hover:bg-navy-50 disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-navy-500" />
            </button>
            <button
              onClick={() => onPageChange?.(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-1.5 rounded-lg hover:bg-navy-50 disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-navy-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
