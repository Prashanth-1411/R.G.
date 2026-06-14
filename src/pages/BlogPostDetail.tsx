import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowLeft, Clock } from 'lucide-react';

const FloatingShape: React.FC<{ className?: string; delay?: number }> = ({ className = '', delay = 0 }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-multiply filter blur-xl opacity-20 ${className}`}
    animate={{
      y: [0, -30, 0],
      x: [0, 15, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: 'easeInOut',
    }}
  />
);

export const BlogPostDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20">
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-navy-900">
        <FloatingShape className="w-72 h-72 bg-brand-500 top-10 -left-20" delay={0} />
        <FloatingShape className="w-96 h-96 bg-gold-500 bottom-20 -right-20" delay={2} />

        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 split-pattern opacity-20" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 mb-8 text-navy-400 hover:text-white font-bold text-sm tracking-wide transition-colors font-body"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Blog</span>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6">
                Coming Soon
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display leading-[1.05] tracking-tight">
                Article Not Available Yet
              </h1>
              <p className="mt-4 text-lg text-navy-300 leading-relaxed max-w-xl font-body">
                This article is being prepared. Check back soon for valuable content on emergency preparedness, health tips, and funeral care guidance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto text-center">
            <div className="premium-card p-12 sm:p-16">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full premium-gradient flex items-center justify-center mx-auto mb-6 shadow-glow"
              >
                <BookOpen className="w-10 h-10 text-white" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-black text-navy-800 font-display mb-3">
                Blog Will Update Soon
              </h2>

              <div className="w-16 h-1 premium-gradient mx-auto mb-6 rounded-full" />

              <p className="text-navy-500 text-sm sm:text-base font-body leading-relaxed">
                This article is not available yet. We are working on new content and it will be published soon. Please check back later.
              </p>

              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-navy-400 font-body">
                <Clock className="w-4 h-4" />
                <span>Estimated launch: Coming weeks</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
