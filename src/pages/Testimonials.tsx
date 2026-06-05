import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, ExternalLink } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const [testimonialsList] = useState(testimonials);
  const [pageContent] = useState<Record<string, string>>({
    title: "Google Reviews & Feedback",
    description: "Read stories of prompt deliveries, life-saving transfers, and compassionate family support from those who have trusted us."
  });

  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <div className="bg-brandNavy text-white py-12 sm:py-16 mb-10 sm:mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brandNavy to-brandBlue/35 opacity-90 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-3xl sm:text-5xl font-black font-raleway tracking-tight">{pageContent.title || "Google Reviews & Feedback"}</h1>
          <p className="mt-3 sm:mt-4 text-slate-300 font-poppins text-xs sm:text-sm max-w-xl">
            {pageContent.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16">
        {/* Google Analytics Review Badge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 bg-white p-5 sm:p-8 rounded-3xl shadow-premium border border-slate-100 items-center">
          <div className="text-center md:border-r border-slate-100 py-4">
            <span className="text-5xl font-black text-slate-800 font-raleway block">4.9</span>
            <div className="flex justify-center gap-1 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-brandGold text-brandGold" />
              ))}
            </div>
            <span className="text-xs text-slate-400 font-semibold font-poppins block">Based on 8,222+ ratings</span>
          </div>

          <div className="md:col-span-2 text-center md:text-left px-0 md:px-8 space-y-4">
            <h3 className="text-2xl font-bold text-brandNavy font-raleway">
              100% Genuine, Verified Feedback
            </h3>
            <p className="text-slate-600 text-sm font-poppins leading-relaxed text-justify">
              Emergency patient transfer is a huge responsibility. Our medical dispatch crew is honored to have sustained a 4.9 average score over several decades. Feel free to verify our history or write your review directly.
            </p>
            <div className="pt-2">
              <a
                href="https://search.google.com/local/writereview?placeid=ChIJadBVYytkUjoRB5Fc8pLmG-c"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-full text-xs transition-premium shadow-md shadow-brandBlue/15"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Write a Google Review</span>
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {testimonialsList.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="bg-white p-5 sm:p-8 rounded-3xl shadow-premium border border-slate-100 hover-lift flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-brandGold text-brandGold" />
                  ))}
                </div>
                <p className="text-slate-600 font-poppins text-sm leading-relaxed italic text-justify">
                  "{t.content}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-brandNavy text-sm font-raleway">
                    {t.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-poppins">
                    {t.position}
                  </span>
                </div>
                {t.verification_url && (
                  <a
                    href={t.verification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brandBlue hover:text-brandNavy flex items-center gap-1 text-[11px] font-bold font-poppins"
                  >
                    <span>Verify Review</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
