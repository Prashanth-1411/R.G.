import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  align = 'center',
  light = false,
}) => {
  return (
    <div className={`space-y-4 ${align === 'center' ? 'text-center' : 'text-left'} max-w-3xl ${align === 'center' ? 'mx-auto' : ''}`}>
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-100 text-brand-600 text-xs font-semibold uppercase tracking-wider">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-soft" />
        R.G. Ambulance Service
      </div>
      <h2 className={`section-heading ${light ? 'text-white' : 'text-navy-800'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${light ? 'text-white/70' : ''} ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
