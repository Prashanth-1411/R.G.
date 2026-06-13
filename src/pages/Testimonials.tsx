import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const [testimonialsList] = useState(testimonials);

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">What Families Say</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            Read stories of prompt deliveries, life-saving transfers, and compassionate family support from those who have trusted us.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {testimonialsList.map((t) => (
            <div key={t.id} className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 font-poppins text-sm leading-relaxed italic text-justify">"{t.content}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0F172A] text-sm font-inter">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-poppins">{t.position}</span>
                </div>
                {t.verification_url && (
                  <a href={t.verification_url} target="_blank" rel="noopener noreferrer" className="text-[#0F4CFF] hover:text-blue-700 flex items-center gap-1 text-[11px] font-bold font-poppins">
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
