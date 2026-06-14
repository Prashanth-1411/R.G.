import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Star, Quote, ShieldCheck, CheckCircle2, ExternalLink,
  Award, Users, MessageSquare, Heart, MapPin, ChevronRight,
  Sparkles, ThumbsUp, Phone
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { SectionHeader } from '../components/SectionHeader';
import { testimonials } from '../data/testimonials';

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

const AnimatedCounter: React.FC<{ end: number; duration?: number; label: string; suffix?: string; icon?: React.ReactNode }> = ({
  end, duration = 2000, label, suffix = '', icon
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, end, {
        duration: duration / 1000,
        ease: [0.25, 0.1, 0.25, 1],
      });
      const unsubscribe = rounded.on('change', (v) => setDisplayValue(v));
      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView]);

  return (
    <div ref={ref} className="text-center p-6">
      {icon && <div className="mb-3 flex justify-center">{icon}</div>}
      <span className="text-4xl md:text-5xl font-black text-brand-500 font-display block mb-1 tabular-nums">
        {displayValue}{suffix}
      </span>
      <p className="text-navy-500 font-semibold text-xs md:text-sm leading-relaxed font-body">{label}</p>
    </div>
  );
};

const TestimonialCard: React.FC<{
  t: typeof testimonials[number];
  index: number;
}> = ({ t, index }) => {
  const initials = t.name.split(' ').map(n => n[0]).join('').slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -6 }}
      className="premium-card p-8 h-full flex flex-col relative overflow-hidden group"
    >
      {/* Background shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/0 via-brand-50/0 to-brand-50/0 group-hover:from-brand-50/30 group-hover:via-brand-50/10 group-hover:to-transparent transition-all duration-500" />

      <div className="relative z-10 flex flex-col flex-grow">
        {/* Stars */}
        <div className="flex items-center gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < t.rating
                  ? 'text-gold-400 fill-gold-400'
                  : 'text-navy-200'
              }`}
            />
          ))}
          <span className="ml-2 text-[10px] font-bold text-navy-400 uppercase tracking-wider">
            {t.rating}/5
          </span>
        </div>

        {/* Quote Icon */}
        <Quote className="w-8 h-8 text-brand-200 mb-4" />

        {/* Content */}
        <p className="text-navy-600 text-sm leading-relaxed flex-grow font-body">
          "{t.content}"
        </p>

        {/* Author */}
        <div className="pt-6 mt-6 border-t border-navy-100 flex items-center gap-3">
          {/* Avatar with initials */}
          <div className="w-12 h-12 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
            {initials}
          </div>
          <div className="flex-grow">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-navy-800 text-sm font-display">{t.name}</h4>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider">Verified</span>
            </div>
            <span className="text-[11px] text-navy-400 font-semibold uppercase tracking-wider">{t.position}</span>
          </div>

          {/* Verification URL */}
          {t.verification_url && (
            <a
              href={t.verification_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-navy-50 hover:bg-brand-50 text-navy-400 hover:text-brand-600 transition-all shrink-0"
              title="View verification"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Testimonials: React.FC = () => {
  const [testimonialsList] = useState(testimonials);

  const averageRating = testimonialsList.reduce((sum, t) => sum + t.rating, 0) / testimonialsList.length;
  const fiveStarCount = testimonialsList.filter(t => t.rating === 5).length;
  const verifiedCount = testimonialsList.filter(t => t.verification_url).length;

  return (
    <div className="pt-20">
      {/* ========== CINEMATIC HERO ========== */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy-900">
        <FloatingShape className="w-72 h-72 bg-brand-500 top-10 -left-20" delay={0} />
        <FloatingShape className="w-96 h-96 bg-gold-500 bottom-20 -right-20" delay={2} />
        <FloatingShape className="w-64 h-64 bg-purple-400 top-1/3 right-1/4" delay={4} />

        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 split-pattern opacity-20" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
        </div>

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
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-400 text-xs font-bold uppercase tracking-wider"
                >
                  <Sparkles className="w-3 h-3" />
                  Verified Patient Reviews
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                >
                  <ThumbsUp className="w-3 h-3" />
                  Real Families, Real Stories
                </motion.span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-display leading-[1.05] tracking-tight">
                What Families
                <span className="block text-gradient"> Say About Us</span>
              </h1>

              <p className="text-lg text-navy-300 leading-relaxed max-w-xl font-body">
                Read authentic stories from families we have served — prompt emergency response, 
                compassionate funeral care, and life-saving medical transfers across India.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-gold-400 fill-gold-400' : 'text-navy-600'}`} />
                  ))}
                </div>
                <span className="text-lg font-black text-gold-400 font-display">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-navy-400 font-body">Average Rating</span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10"
              >
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{verifiedCount} Verified Reviews</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span>{fiveStarCount} Five-Star Ratings</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>{testimonialsList.length} Total Testimonials</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <motion.div className="w-1.5 h-3 rounded-full bg-brand-400" />
          </div>
        </motion.div>
      </section>

      {/* ========== STATISTICS BANNER ========== */}
      <section className="relative py-12 bg-white border-b border-navy-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={testimonialsList.length} label="Total Reviews" suffix="+" icon={<MessageSquare className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={Math.round(averageRating * 10)} label="Average Rating out of 10" suffix="" icon={<Star className="w-6 h-6 text-gold-500" />} />
            <AnimatedCounter end={fiveStarCount} label="Five-Star Reviews" suffix="" icon={<Award className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={8200} label="Patients Transported" suffix="+" icon={<Heart className="w-6 h-6 text-brand-500" />} />
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS GRID ========== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title="Real Stories from Families We Have Served"
              subtitle="Every review is from a verified patient or family member who experienced our emergency response, medical transport, or funeral care services."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-16">
            {testimonialsList.map((t, i) => (
              <TestimonialCard key={t.id} t={t} index={i} />
            ))}
          </div>

          {testimonialsList.length === 0 && (
            <AnimatedSection className="text-center py-16">
              <div className="max-w-md mx-auto space-y-4">
                <MessageSquare className="w-16 h-16 text-navy-300 mx-auto" />
                <h3 className="text-2xl font-bold text-navy-800 font-display">No Testimonials Yet</h3>
                <p className="text-sm text-navy-400 font-body">Reviews will be displayed here once available.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* ========== CTA BANNER ========== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <AnimatedSection direction="left">
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Experience Our Service Yourself
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Join thousands of families who trust R.G. Ambulance Service for emergency medical transport and dignified funeral care.
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
                <Phone className="w-5 h-5" />
                <span>Call 24/7: +91 95516 63530</span>
              </motion.a>
              <motion.a
                href="/ambulance-services"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-extrabold rounded-xl border border-white/20 text-sm hover:bg-white/20 transition-all"
              >
                <span>View Our Fleet</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};
