import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Sparkles, Clock } from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';

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

export const Blog: React.FC = () => {
  return (
    <div className="pt-20">
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy-900">
        <FloatingShape className="w-72 h-72 bg-brand-500 top-10 -left-20" delay={0} />
        <FloatingShape className="w-96 h-96 bg-gold-500 bottom-20 -right-20" delay={2} />
        <FloatingShape className="w-64 h-64 bg-purple-400 top-1/3 right-1/4" delay={4} />

        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 split-pattern opacity-20" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="max-w-3xl py-20">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-8"
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider"
                >
                  <Sparkles className="w-3 h-3" />
                  Coming Soon
                </motion.span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-display leading-[1.05] tracking-tight">
                Health & Homage
                <span className="block text-gradient"> Blog</span>
              </h1>

              <p className="text-lg text-navy-300 leading-relaxed max-w-xl font-body">
                Educational guides, diagnostic tips, emergency standards, and compassionate homage advice — coming soon.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
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
                  We are working on new articles and guides for you. Check back later for updates on health tips, emergency preparedness, and funeral care guidance.
                </p>

                <div className="mt-8 flex items-center justify-center gap-2 text-xs text-navy-400 font-body">
                  <Clock className="w-4 h-4" />
                  <span>Estimated launch: Coming weeks</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <AnimatedSection direction="left">
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Need Emergency Help Now?
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Our medical coordinators are available 24/7 — no waiting, no forms, just immediate assistance.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <motion.a
                href="tel:+919551663530"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-brand-600 font-black rounded-xl shadow-xl text-sm hover:bg-navy-50 transition-all"
              >
                <span>Call 24/7: +91 95516 63530</span>
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};
