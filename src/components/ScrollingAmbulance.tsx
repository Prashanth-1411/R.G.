import React, { useEffect, useState } from 'react';

export const ScrollingAmbulance: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftPos = 2 + progress * 76;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none h-1">
      <div className="relative max-w-7xl mx-auto h-full px-4">
        <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F4CFF] rounded-full transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-none"
          style={{ left: `${leftPos}%` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F4CFF" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="18" height="10" rx="2" fill="#0F4CFF" />
            <rect x="2" y="6" width="18" height="10" rx="2" stroke="white" strokeWidth="0.5" />
            <rect x="2" y="12" width="18" height="4" fill="#DC2626" />
            <path d="M16 6 L19 6 L21 3 L21 2 L17 2 L16 4 Z" fill="#E8EDF2" />
            <rect x="5" y="8" width="4" height="3" rx="0.5" fill="#1E3A5F" opacity="0.5" />
            <rect x="11" y="8" width="4" height="3" rx="0.5" fill="#1E3A5F" opacity="0.5" />
            <circle cx="7" cy="17" r="2.5" fill="#1E293B" />
            <circle cx="7" cy="17" r="2" fill="#2D3748" />
            <circle cx="7" cy="17" r="1" fill="#94A3B8" />
            <circle cx="15" cy="17" r="2.5" fill="#1E293B" />
            <circle cx="15" cy="17" r="2" fill="#2D3748" />
            <circle cx="15" cy="17" r="1" fill="#94A3B8" />
            <rect x="19" y="10" width="2" height="6" rx="0.5" fill="#EF4444" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
};
