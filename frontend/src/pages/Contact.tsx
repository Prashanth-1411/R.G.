import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Phone, Mail, MapPin, Send, Clock, ShieldCheck, CheckCircle2,
  Star, Award, Users, Heart, MessageSquare, Building2, ChevronRight
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { ParallaxSection } from '../components/ParallaxSection';
import { Magnetic } from '../components/Magnetic';
import { SectionHeader } from '../components/SectionHeader';
import { getPageByName } from '../api';

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

export const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: ''
  });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);
  const [pageHeading, setPageHeading] = useState('Contact Our Emergency Desk');
  const [pageContent, setPageContent] = useState('Our medical coordinators are standing by 24/7. Call, WhatsApp, or send us an inquiry.');

  useEffect(() => {
    getPageByName('contact').then((page) => {
      if (page?.heading) setPageHeading(page.heading);
      if (page?.content) setPageContent(page.content);
    });
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!response.ok) throw new Error('Failed to send');
      setSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } catch {
      const subject = `Inquiry from ${contactForm.name} - ${contactForm.requirements} Service`;
      const body = `Name: ${contactForm.name}%0AEmail: ${contactForm.email}%0APhone: ${contactForm.phone}%0AAddress: ${contactForm.address || 'N/A'}%0AService: ${contactForm.requirements}%0AMessage: ${contactForm.message}`;
      window.open(`mailto:ebenezer.r@rgambulanceservice.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
      setSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } finally {
      setSending(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Headquarters',
      value: '115/2a, Ambattur Road, Surapet, Soorapattu, Ambattur Taluka, Chennai - 600066',
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email Desk',
      value: 'ebenezer.r@rgambulanceservice.com',
      href: 'mailto:ebenezer.r@rgambulanceservice.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Emergency Hotline (24/7)',
      value: '+91 95516 63530',
      href: 'tel:+919551663530',
      urgent: true,
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Alternate Contact',
      value: '+91 87784 81556',
      href: 'tel:+918778481556',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Office Line',
      value: '+91 93611 69801',
      href: 'tel:+919361169801',
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'WhatsApp',
      value: '+91 87784 81556',
      href: 'https://wa.me/918778481556',
    },
  ];

  return (
    <div className="pt-20">
      {/* ========== CINEMATIC HERO ========== */}
      <ParallaxSection>
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
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider"
                >
                  <Building2 className="w-3 h-3" />
                  Get in Touch
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  24/7 Dispatch Desk Active
                </motion.span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-display leading-[1.05] tracking-tight">
                {pageHeading}
              </h1>

              <p className="text-lg text-navy-300 leading-relaxed max-w-xl font-body">
                {pageContent}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.a
                  href="tel:+919551663530"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-premium !py-4 !px-8 text-base"
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
                  className="btn-outline !py-4 !px-8 text-base !text-white !border-white/20 hover:!border-white/40 hover:!bg-white/5"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>WhatsApp Us</span>
                </motion.a>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10"
              >
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  <span>Avg Response: &lt;3 min</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span>4.9/5 Patient Rating</span>
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
      </ParallaxSection>

      {/* ========== STATISTICS BANNER ========== */}
      <section className="relative py-12 bg-white border-b border-navy-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={12} label="Years of Experience" suffix="+" icon={<Award className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={8200} label="Patients Served" suffix="+" icon={<Users className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={34} label="Fleet Vehicles" suffix="+" icon={<Building2 className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={100} label="Response Time (min)" suffix="%" icon={<Clock className="w-6 h-6 text-brand-500" />} />
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <SectionHeader
              title="Ready to Help, 24/7"
              subtitle="Whether it is a medical emergency, funeral arrangement, or general inquiry — our team responds immediately."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 mt-16 items-start">
            {/* Contact Form */}
            <AnimatedSection direction="left" className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-navy-100/60 shadow-premium-xl p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center shadow-glow">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-navy-800 font-display">Send an Inquiry</h3>
                    <p className="text-sm text-navy-400 font-body">Fill the form and we will get back to you shortly.</p>
                  </div>
                </div>

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-navy-800 font-display">Inquiry Received</h4>
                    <p className="text-navy-500 font-body text-sm max-w-sm mx-auto">
                      Thank you for reaching out. Our team will contact you within the next business hour. For emergencies, please call our hotline directly.
                    </p>
                    <Magnetic>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSuccess(false)}
                      className="btn-premium mt-4 group"
                    >
                      Send Another Message
                    </motion.button>
                    </Magnetic>
                  </motion.div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5 font-body">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 field-focus">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Your Name</label>
                        <input type="text" required placeholder="Enter full name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 placeholder:text-navy-400 transition-colors shadow-soft" />
                      </div>
                      <div className="space-y-1.5 field-focus">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Email Address</label>
                        <input type="email" required placeholder="Enter email address" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 placeholder:text-navy-400 transition-colors shadow-soft" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5 field-focus">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Mobile Number</label>
                        <input type="tel" required placeholder="Enter active phone number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 placeholder:text-navy-400 transition-colors shadow-soft" />
                      </div>
                      <div className="space-y-1.5 field-focus">
                        <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Address</label>
                        <input type="text" placeholder="Your address (optional)" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})}
                          className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 placeholder:text-navy-400 transition-colors shadow-soft" />
                      </div>
                    </div>
                    <div className="space-y-1.5 field-focus">
                      <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Service Required</label>
                      <select value={contactForm.requirements} onChange={e => setContactForm({...contactForm, requirements: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 transition-colors shadow-soft">
                        <option value="Ambulance" className="text-navy-800">Ambulance Service</option>
                        <option value="Funeral" className="text-navy-800">Funeral Care</option>
                        <option value="Other" className="text-navy-800">General Inquiry</option>
                      </select>
                    </div>
                    <div className="space-y-1.5 field-focus">
                      <label className="text-xs font-bold uppercase tracking-wider text-navy-500">Your Message</label>
                      <textarea required rows={4} placeholder="Describe your requirement in detail..." value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}
                        className="w-full px-4 py-3 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm resize-none text-navy-800 placeholder:text-navy-400 transition-colors shadow-soft" />
                    </div>
                    <Magnetic strength={0.15}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      disabled={sending}
                      className="w-full py-4 premium-gradient text-white font-black rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 disabled:opacity-60 group"
                    >
                      {sending ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 btn-icon-shift-right" />
                          <span>Send Message</span>
                        </>
                      )}
                    </motion.button>
                    </Magnetic>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Contact Info Sidebar */}
            <AnimatedSection direction="right" className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              {/* Contact Details */}
              <div className="premium-gradient rounded-3xl p-8 space-y-6 shadow-glow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-display">Emergency Contact</h3>
                </div>
                <p className="text-navy-300 text-sm font-body leading-relaxed">
                  Our dispatch desk operates 24/7. All emergency calls are prioritized and connected to the nearest standby bay.
                </p>
                <div className="space-y-4">
                  {contactInfo.map((info, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 hover-depth"
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        info.urgent ? 'bg-red-500/20' : 'bg-white/10'
                      }`}>
                        <span className={info.urgent ? 'text-red-400' : 'text-brand-300/70'}>
                          {info.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-brand-400/50 font-body">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith('http') ? '_blank' : undefined}
                            rel={info.href.startsWith('http') ? 'noreferrer' : undefined}
                            className={`text-sm font-semibold hover:underline transition-all ${
                              info.urgent ? 'text-white text-base' : 'text-brand-300'
                            }`}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-sm text-brand-300 font-semibold">{info.value}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="glass rounded-2xl p-6 text-center space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-navy-500">Verified & Certified</span>
                </div>
                <p className="text-xs text-navy-400 font-body">
                  ISO 9001:2015 Certified · Govt. Approved Medical Transport Provider · Licensed Mortuary Services
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== MAP SECTION ========== */}
      <section className="relative py-24 bg-navy-50 overflow-hidden">
        <div className="absolute inset-0 split-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <SectionHeader
              title="Our Headquarters"
              subtitle="Visit our main dispatch center in Chennai for in-person consultations and fleet inspection."
            />
          </AnimatedSection>

          <AnimatedSection className="mt-12" direction="up">
            <div className="relative rounded-3xl overflow-hidden shadow-premium-xl border border-navy-100/60 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3885.242822026052!2d80.18646617507947!3d13.14707758718463!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTPCsDA4JzQ5LjUiTiA4MMKwMTEnMjAuNiJF!5e0!3m2!1sen!2sin!4v1781442425659!5m2!1sen!2sin"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                title="R.G. Ambulance Service - Chennai Headquarters"
                className="grayscale-[0.3]"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-navy-900/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-dark rounded-2xl p-4 inline-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm font-display">R.G. Ambulance Service</p>
                    <p className="text-navy-400 text-xs">115/2a, Ambattur Road, Surapet · Chennai - 600066</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <AnimatedSection direction="left">
              <div className="space-y-4 text-center lg:text-left">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Need Immediate Assistance?
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Our emergency coordinators are available 24/7. Call our hotline for instant dispatch or WhatsApp us your location.
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
                <span>Call Hotline: +91 95516 63530</span>
              </motion.a>
              <motion.a
                href="https://wa.me/918778481556"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] hover:bg-[#1ebd59] text-white font-extrabold rounded-xl shadow-xl text-sm transition-all"
              >
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146z" />
                </svg>
                <span>WhatsApp Us</span>
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};
