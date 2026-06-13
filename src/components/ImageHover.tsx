import React from 'react';

export const ImageHover: React.FC<{
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}> = ({ src, alt, children, className }) => {
  return (
    <div className={`group relative overflow-hidden rounded-3xl shadow-md border border-slate-200/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#0F4CFF]/10 hover:scale-[1.02] active:scale-[0.98] ${className || ''}`}>
      {children}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F4CFF]/0 via-transparent to-[#0F4CFF]/0 group-hover:from-[#0F4CFF]/10 group-hover:to-[#0F4CFF]/5 transition-all duration-300 rounded-3xl" />
    </div>
  );
};
