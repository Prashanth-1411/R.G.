import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Shortcut {
  keys: string;
  description: string;
  category: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  shortcuts: Shortcut[];
}

const categoryOrder = [
  'Help', 'Navigation', 'Quick Actions', 'Scrolling',
  'Home Page', 'Ambulance Services', 'Funeral Services',
  'Blog', 'Blog Detail', 'Contact', 'Testimonials',
  'Location Page', 'Footer'
];

export const KeyboardShortcutsHelp: React.FC<Props> = ({ open, onClose, shortcuts }) => {
  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: shortcuts.filter(s => s.category === cat)
    }))
    .filter(g => g.items.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto mx-2"
          >
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 rounded-t-3xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] font-raleway">Keyboard Shortcuts</h2>
                <p className="text-xs text-slate-400 font-poppins mt-0.5">Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold">?</kbd> to toggle this panel</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {grouped.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0F4CFF] mb-3 font-poppins">
                    {group.category}
                  </h3>
                  <div className="space-y-1.5">
                    {group.items.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-50">
                        <span className="text-xs text-slate-600 font-poppins">{s.description}</span>
                        <kbd className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-mono font-bold border border-slate-200 shrink-0">
                          {formatKeys(s.keys)}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-3 text-center">
                <p className="text-[10px] text-slate-400 font-poppins">
                  Two-key sequences: press keys one after the other within 1 second
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function formatKeys(keys: string): string {
  return keys
    .replace(/Shift\+/g, '⇧+')
    .replace(/Backspace/g, '⌫')
    .replace(/Escape/g, 'Esc')
    .replace(/Space/g, '␣')
    .replace(/ArrowUp/g, '↑')
    .replace(/ArrowDown/g, '↓')
    .replace(/ArrowLeft/g, '←')
    .replace(/ArrowRight/g, '→');
}
