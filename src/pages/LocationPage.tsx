import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Phone, MessageSquare, ChevronDown, Calendar, AlertCircle,
  ShieldCheck, Clock, Star, CheckCircle2, ArrowLeft, Send,
  Building2, Ambulance
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { SectionHeader } from '../components/SectionHeader';
import { serviceAreas } from '../data/service-areas';

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

export const LocationPage: React.FC = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '',
    serviceName: 'ICU Plus Ambulance',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fullSlug = locationSlug?.startsWith('ambulance-service-in-')
    ? locationSlug
    : `ambulance-service-in-${locationSlug}`;

  const locationData = useMemo(
    () => serviceAreas.find(s => s.slug === fullSlug) ?? null,
    [fullSlug]
  );

  useEffect(() => {
    if (locationData) {
      document.title = locationData.meta_title || `Ambulance Service in ${locationData.name} | R.G. Ambulance Service`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', locationData.meta_description || `Emergency ICU and Ventilator ambulance services in ${locationData.name}.`);
    }
  }, [locationData]);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBookingForm({
      name: '', phone: '', pickup: '', destination: '',
      serviceName: 'ICU Plus Ambulance',
      date: new Date().toISOString().split('T')[0], notes: ''
    });
  };

  const handleWhatsAppClick = () => {
    if (!locationData) return;
    const phone = '918778481556';
    const text = `Hi R.G. Ambulance Service, I need to book an ambulance in ${locationData.name}. Please connect me with the dispatch desk immediately.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!locationData) {
    return (
      <div className="pt-20">
        <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy-900">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-xl mx-auto text-center space-y-6"
            >
              <AlertCircle className="w-20 h-20 text-navy-500 mx-auto" />
              <h1 className="text-3xl sm:text-4xl font-black text-white font-display">Location Not Found</h1>
              <p className="text-navy-400 font-body text-sm">
                We couldn't find specific service details for this locality. However, we provide ambulance coverage across all of Chennai and surrounding Tamil Nadu districts.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/')}
                className="btn-premium"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Homepage</span>
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* ========== CINEMATIC HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-navy-900">
        <FloatingShape className="w-72 h-72 bg-brand-500 top-10 -left-20" delay={0} />
        <FloatingShape className="w-96 h-96 bg-gold-500 bottom-20 -right-20" delay={2} />

        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900" />
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="absolute inset-0 split-pattern opacity-20" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
          <div className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
          <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-brand-500/10 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="py-16">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider"
                >
                  <MapPin className="w-3 h-3 fill-brand-500/20" />
                  Chennai Standby Station
                </motion.span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-display leading-[1.05] tracking-tight">
                Ambulance Service in{' '}
                <span className="text-gradient">{locationData.name}</span>
              </h1>

              <p className="text-lg text-navy-300 leading-relaxed max-w-2xl font-body">
                {locationData.description}
              </p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10"
              >
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Ambulance className="w-4 h-4 text-emerald-400" />
                  <span>Emergency Dispatch Ready</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>&lt;15 min Response</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span>4.9/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-10">
              {/* Rich Content */}
              <AnimatedSection direction="up">
                <div className="premium-card p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-navy-800 font-display">
                        Emergency Services in {locationData.name}
                      </h2>
                      <p className="text-xs text-navy-400 font-body">Comprehensive medical transport coverage</p>
                    </div>
                  </div>
                  <div
                    className="prose prose-sm max-w-none text-navy-600 font-body leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: locationData.content_html }}
                  />
                </div>
              </AnimatedSection>

              {/* FAQs */}
              {locationData.faqs && locationData.faqs.length > 0 && (
                <AnimatedSection direction="up" delay={0.1}>
                  <div className="space-y-6">
                    <SectionHeader
                      title={`FAQs About ${locationData.name} Services`}
                      subtitle="Common questions about ambulance availability, response times, and coverage in this area."
                      align="left"
                    />
                    <div className="space-y-3">
                      {locationData.faqs.map((faq, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          viewport={{ once: true }}
                          className="premium-card overflow-hidden"
                        >
                          <button
                            onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                            className="w-full px-6 py-4 text-left font-bold text-navy-800 text-sm flex items-center justify-between font-display hover:bg-navy-50 transition-colors"
                          >
                            <span className="pr-4">{faq.question}</span>
                            <motion.div
                              animate={{ rotate: activeFaq === idx ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <ChevronDown className="w-4 h-4 text-navy-400 shrink-0" />
                            </motion.div>
                          </button>
                          <AnimatePresence>
                            {activeFaq === idx && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeInOut' }}
                                className="overflow-hidden"
                              >
                                <div className="px-6 pb-5 pt-1 text-navy-500 font-body text-sm leading-relaxed border-t border-navy-100">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </AnimatedSection>
              )}

              {/* Trust indicators */}
              <AnimatedSection>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: <Ambulance className="w-5 h-5" />, label: '34+ Fleet Vehicles', desc: 'Ready for dispatch' },
                    { icon: <Clock className="w-5 h-5" />, label: '<15 min Response', desc: 'Average arrival time' },
                    { icon: <ShieldCheck className="w-5 h-5" />, label: 'ISO Certified', desc: 'Quality assured' },
                    { icon: <Star className="w-5 h-5" />, label: '4.9/5 Rating', desc: 'Patient verified' },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="text-center p-4 rounded-xl bg-navy-50 border border-navy-100"
                    >
                      <div className="w-10 h-10 rounded-lg premium-gradient flex items-center justify-center mx-auto mb-3">
                        {item.icon}
                      </div>
                      <p className="text-xs font-bold text-navy-800 font-display">{item.label}</p>
                      <p className="text-[10px] text-navy-400 mt-0.5">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* Quick Booking Form */}
              <AnimatedSection direction="right">
                <div className="premium-gradient rounded-3xl p-[1px] shadow-glow">
                  <div className="bg-white rounded-3xl p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-navy-800 text-sm font-display">Quick Dispatch</h4>
                        <p className="text-[10px] text-navy-400 font-body">Book ambulance in {locationData.name}</p>
                      </div>
                    </div>

                    {bookingSuccess ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6 space-y-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto"
                        >
                          <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                        </motion.div>
                        <h5 className="font-bold text-navy-800 text-sm font-display">Request Sent</h5>
                        <p className="text-[11px] text-navy-400 font-body leading-relaxed">
                          Our {locationData.name} dispatch team will contact you shortly.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-3 font-body">
                        <input type="text" required placeholder="Contact Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full px-4 py-2.5 bg-navy-50 border border-navy-100 rounded-xl focus:border-brand-500 focus:outline-none text-xs text-navy-800 placeholder:text-navy-400 transition-colors" />
                        <input type="tel" required placeholder="Mobile Number" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full px-4 py-2.5 bg-navy-50 border border-navy-100 rounded-xl focus:border-brand-500 focus:outline-none text-xs text-navy-800 placeholder:text-navy-400 transition-colors" />
                        <input type="text" required placeholder={`Pickup in ${locationData.name}`} value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                          className="w-full px-4 py-2.5 bg-navy-50 border border-navy-100 rounded-xl focus:border-brand-500 focus:outline-none text-xs text-navy-800 placeholder:text-navy-400 transition-colors" />
                        <input type="text" required placeholder="Destination Hospital" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                          className="w-full px-4 py-2.5 bg-navy-50 border border-navy-100 rounded-xl focus:border-brand-500 focus:outline-none text-xs text-navy-800 placeholder:text-navy-400 transition-colors" />
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          type="submit"
                          className="w-full py-3 premium-gradient text-white font-bold rounded-xl text-xs shadow-glow flex items-center justify-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Request</span>
                        </motion.button>
                      </form>
                    )}
                  </div>
                </div>
              </AnimatedSection>

              {/* Instant Actions */}
              <AnimatedSection direction="right" delay={0.1}>
                <div className="glass-dark rounded-3xl p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xs text-navy-400 uppercase font-bold tracking-wider">{locationData.name} Standby</p>
                      <h5 className="text-sm font-bold text-white font-display">Immediate Hotlines</h5>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      href="tel:+919551663530"
                      className="flex items-center justify-center gap-2 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl text-xs shadow-lg transition-all w-full"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Standby Bay (24/7)</span>
                    </motion.a>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleWhatsAppClick}
                      className="flex items-center justify-center gap-2 py-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-bold rounded-xl text-xs shadow-lg transition-all w-full"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp Dispatch</span>
                    </motion.button>
                  </div>

                  <div className="pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-navy-400 font-body">Response Time</span>
                      <span className="text-emerald-400 font-bold">&lt; 15 minutes</span>
                    </div>
                    <div className="flex items-center justify-between text-xs mt-2">
                      <span className="text-navy-400 font-body">Available</span>
                      <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        24/7 Active
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Trust Badge */}
              <AnimatedSection direction="right" delay={0.2}>
                <div className="glass rounded-2xl p-5 text-center space-y-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mx-auto" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-navy-500">Verified Service Provider</p>
                  <p className="text-[10px] text-navy-400 font-body">ISO 9001:2015 · Govt. Approved · 12+ Years</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
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
                  Need an Ambulance in {locationData.name}?
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Our dispatch team is ready. Call our hotline for immediate deployment of a fully equipped ICU ambulance to your location.
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
                <span>Call Now: +91 95516 63530</span>
              </motion.a>
              <motion.a
                href="https://wa.me/918778481556"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold rounded-xl shadow-xl text-sm transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Dispatch</span>
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};
