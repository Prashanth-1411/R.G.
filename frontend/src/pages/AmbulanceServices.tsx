import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  ShieldCheck, ArrowRight, Ambulance, X, Phone, Calendar, Clock,
  MapPin, Stethoscope, Users, Heart, Star, ChevronRight, CheckCircle2,
  Award, Truck, HeartPulse, Sparkles, Search, Filter, Send
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnetic } from '../components/Magnetic';
import { ParallaxSection } from '../components/ParallaxSection';
import { SectionHeader } from '../components/SectionHeader';
import { BackgroundImage } from '../components/BackgroundImage';
import { getServices, getPageByName, getMediaUrl, type ServiceItem } from '../api';
import { ambulanceServices as staticAmbulanceServices } from '../data/ambulance-services';
import fallbackImg from '../assets/1.jpg';

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

export const AmbulanceServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<typeof staticAmbulanceServices[number] | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [ambulanceServices, setAmbulanceServices] = useState(staticAmbulanceServices);
  const [pageHeading, setPageHeading] = useState('Emergency Ambulance Fleet');
  const [pageContent, setPageContent] = useState('Seven specialized ambulance categories — each equipped and crewed for specific medical transport needs.');

  useEffect(() => {
    getPageByName('services').then((page) => {
      if (page?.heading) setPageHeading(page.heading);
      if (page?.content) setPageContent(page.content);
    });
    getServices().then((items: ServiceItem[]) => {
      const active = items.filter((s) => (s.status === 'active' || s.is_active) && s.service_type === 'ambulance');
      if (active.length) {
        setAmbulanceServices(active.map((s) => ({
          id: String(s.id),
          title: s.title,
          short_description: s.description?.slice(0, 60) || '',
          description: s.description || '',
          image_path: getMediaUrl(s.image || s.image_url) || fallbackImg,
          features: [],
          price: '',
        })) as unknown as typeof staticAmbulanceServices);
      }
    });
  }, []);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '', serviceName: '',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const categories = [
    { id: 'all', label: 'All Vehicles', icon: <Filter className="w-3.5 h-3.5" /> },
    { id: 'emergency', label: 'Emergency', icon: <Ambulance className="w-3.5 h-3.5" /> },
    { id: 'critical', label: 'Critical Care', icon: <HeartPulse className="w-3.5 h-3.5" /> },
    { id: 'transport', label: 'Transport', icon: <Truck className="w-3.5 h-3.5" /> },
  ];

  const getServiceCategory = (s: typeof ambulanceServices[number]) => {
    const emergency = ['Basic Life Support', 'Advanced Life Support', 'Cardiac Care'];
    const critical = ['Neonatal', 'ICU Ventilator', 'Long Distance'];
    if (emergency.some(e => s.title.includes(e))) return 'emergency';
    if (critical.some(c => s.title.includes(c))) return 'critical';
    return 'transport';
  };

  const filteredServices = activeFilter === 'all'
    ? ambulanceServices
    : ambulanceServices.filter(s => getServiceCategory(s) === activeFilter);

  const openBookingModal = (serviceTitle: string) => {
    setBookingForm(prev => ({ ...prev, serviceName: serviceTitle }));
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingForm({ name: '', phone: '', pickup: '', destination: '', serviceName: '', date: new Date().toISOString().split('T')[0], notes: '' });
    }, 3000);
  };

  const getImage = (path: string) => path || fallbackImg;

  return (
    <div className="pt-20">
      {/* ========== CINEMATIC HERO ========== */}
      <ParallaxSection className="relative min-h-[70vh] flex items-center overflow-hidden bg-navy-900">
        <FloatingShape className="w-72 h-72 bg-brand-500 top-10 -left-20" delay={0} />
        <FloatingShape className="w-96 h-96 bg-blue-400 bottom-20 -right-20" delay={2} />
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
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
                  Premium Medical Fleet
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider"
                >
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                  24/7 Active Dispatch
                </motion.span>
              </div>

              <AnimatedSection spring>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-display leading-[1.05] tracking-tight">
                  Premium ICU
                  <span className="block text-gradient">Ambulance Fleet</span>
                </h1>
              </AnimatedSection>

              <p className="text-lg text-navy-300 leading-relaxed max-w-xl font-body">
                ISO-certified emergency vehicles equipped with advanced life-support systems, 
                staffed by critical care paramedics. Ready for immediate dispatch across all major routes.
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
                  href="#booking-sec"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-outline !py-4 !px-8 text-base !text-white !border-white/20 hover:!border-white/40 hover:!bg-white/5"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book a Vehicle</span>
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
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Govt. Approved</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-navy-400">
                  <Star className="w-4 h-4 text-gold-400 fill-gold-400" />
                  <span>4.9/5 Patient Rating</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="absolute inset-0 premium-gradient rounded-3xl blur-3xl opacity-20" />
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <BackgroundImage
                    src={getImage(ambulanceServices[0]?.image_path)}
                    alt="ICU Ambulance Fleet"
                    className="h-[500px]"
                    overlayClassName="bg-gradient-to-t from-navy-900/80 via-transparent to-transparent"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -bottom-4 -left-4 glass rounded-2xl p-5 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <Truck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white font-display">34+</p>
                      <p className="text-xs text-navy-400">Active Fleet Vehicles</p>
                    </div>
                  </div>
                </motion.div>
              </div>
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
      </ParallaxSection>

      {/* ========== STATISTICS BANNER ========== */}
      <section className="relative py-12 bg-white border-b border-navy-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={12} label="Years of Experience" suffix="+" icon={<Award className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={34} label="Active Medical Vehicles" suffix="+" icon={<Truck className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={8200} label="Patients Safely Transferred" suffix="+" icon={<HeartPulse className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={100} label="Service Coverage" suffix="%" icon={<MapPin className="w-6 h-6 text-brand-500" />} />
          </div>
        </div>
      </section>

      {/* ========== SERVICE CATEGORY FILTERS ========== */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title={pageHeading}
              subtitle={pageContent}
            />
          </AnimatedSection>

          <AnimatedSection className="mt-10" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeFilter === cat.id
                      ? 'premium-gradient text-white shadow-glow'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100 border border-navy-100'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== SERVICE CARDS ========== */}
      <section className="py-8 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {filteredServices.map((s, idx) => (
              <motion.div
                key={s.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: '-30px' }}
                className="group premium-card overflow-hidden flex flex-col"
              >
                <div className="relative h-56 overflow-hidden bg-navy-100">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110 premium-card-image"
                    style={{ backgroundImage: `url(${getImage(s.image_path)})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/20 to-transparent transition-opacity duration-500" />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-xl premium-gradient flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Ambulance className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-brand-300 text-[10px] font-bold uppercase tracking-wider border border-brand-500/20">
                      <Clock className="w-3 h-3" />
                      24/7 Available
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-xl sm:text-2xl font-bold text-navy-800 font-display group-hover:text-brand-600 transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-navy-400 font-body text-xs font-semibold uppercase tracking-wider mt-1">
                    {s.short_description}
                  </p>
                  <p className="text-navy-500 font-body text-sm leading-relaxed mt-4 line-clamp-3">
                    {s.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-5">
                    {s.features.slice(0, 3).map((f, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-brand-50 text-brand-700 text-[10px] font-bold rounded-lg">
                        <ShieldCheck className="w-3 h-3" />
                        <span>{f}</span>
                      </span>
                    ))}
                    {s.features.length > 3 && (
                      <span className="inline-flex items-center px-3 py-1.5 bg-navy-50 text-navy-500 text-[10px] font-bold rounded-lg">
                        +{s.features.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedService(s)}
                      className="py-3 text-center text-navy-700 bg-navy-50 hover:bg-navy-100 text-xs font-bold rounded-xl transition-all duration-200 border border-navy-100"
                    >
                      View Full Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => openBookingModal(s.title)}
                      className="py-3 text-center text-white premium-gradient text-xs font-bold rounded-xl shadow-glow flex items-center justify-center gap-1.5 group"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3 h-3 btn-icon-shift-right" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== EMERGENCY CTA BANNER ========== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <AnimatedSection direction="left">
              <div className="space-y-4 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-300 text-[10px] uppercase font-bold tracking-widest border border-brand-500/20">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                  24/7 Rapid Emergency Response
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Immediate ICU Dispatch?
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Our medical coordinators are standing by. Call our hotline for instant deployment of a fully equipped ICU ambulance to your location.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Magnetic>
                <motion.a
                  href="tel:+919551663530"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2.5 px-8 py-4 bg-white text-brand-600 font-black rounded-xl shadow-xl text-sm hover:bg-navy-50 transition-all"
                >
                  <Phone className="w-5 h-5 fill-brand-600" />
                  <span>Call Hotline: +91 95516 63530</span>
                </motion.a>
              </Magnetic>
              <Magnetic>
                <motion.a
                  href="https://wa.me/918778481556?text=Emergency+Ambulance+Required"
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
              </Magnetic>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== BOOKING FORM ========== */}
      <section id="booking-sec" className="py-24 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-semibold uppercase tracking-wider mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse-soft" />
                24/7 Digital Dispatch
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                Book Your Ambulance Now
              </h2>
              <p className="mt-4 text-navy-400 font-body text-sm leading-relaxed max-w-lg mx-auto">
                Submit patient and route coordinates below. Our dispatch coordinator will telephone you within 3 minutes to verify availability.
              </p>
            </div>
          </AnimatedSection>

          {bookingSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white font-display">Booking Request Received</h3>
              <p className="text-navy-400 font-body text-sm">
                Our dispatch team is reviewing your request. We will contact you at your phone number shortly to confirm.
              </p>
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setBookingSuccess(false); setBookingModalOpen(false); }}
                  className="btn-premium mt-4 inline-flex group"
                >
                  Book Another Trip
                </motion.button>
              </Magnetic>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleBookingSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-3xl border border-white/10"
            >
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Patient / Contact Name</label>
                <input type="text" required placeholder="Enter contact name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Mobile Phone Number</label>
                <input type="tel" required placeholder="Enter active phone number" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Pickup Location</label>
                <input type="text" required placeholder="e.g. Anna Nagar Central" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Destination Hospital</label>
                <input type="text" required placeholder="e.g. Apollo Hospital Greams Road" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Select Vehicle</label>
                <select required value={bookingForm.serviceName} onChange={e => setBookingForm({...bookingForm, serviceName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm transition-colors">
                  {ambulanceServices.map(s => (
                    <option key={s.id} value={s.title} className="bg-navy-800">{s.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Transit Date</label>
                <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Special Requirements</label>
                <input type="text" placeholder="Ventilator, oxygen supply, cardiac monitoring, etc." value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="md:col-span-2 pt-4">
                <Magnetic strength={0.15}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 premium-gradient text-white font-black rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 group"
                  >
                    <Send className="w-4 h-4 btn-icon-shift-right" />
                    <span>Submit Booking Request</span>
                  </motion.button>
                </Magnetic>
              </div>
            </motion.form>
          )}
        </div>
      </section>

      {/* ========== FOOTER SPACER ========== */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* ========== DETAIL MODAL ========== */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedService(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto"
          >
            <div className="relative h-52 sm:h-64 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${getImage(selectedService.image_path)})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/30 to-transparent" />
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-xl transition-colors z-20 border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center shadow-glow">
                    <Ambulance className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <span className="text-xs text-brand-300 uppercase tracking-wider font-bold">Vehicle Details</span>
                    <h2 className="text-xl sm:text-2xl font-black text-white font-display">{selectedService.title}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-600 font-body">Service Overview</h4>
                <p className="text-navy-600 text-sm leading-relaxed font-body">{selectedService.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-600 font-body">Equipment & Features</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((f, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-navy-50 text-navy-700 text-sm font-semibold font-body"
                    >
                      <ShieldCheck className="w-4 h-4 text-brand-500 shrink-0" />
                      <span>{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { const t = selectedService.title; setSelectedService(null); openBookingModal(t); }}
                  className="flex-1 py-3.5 premium-gradient text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-glow"
                >
                  Request Booking
                </motion.button>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href="tel:+919551663530"
                  className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-lg flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ========== BOOKING MODAL ========== */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setBookingModalOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative z-10"
          >
            <button onClick={() => setBookingModalOpen(false)} className="absolute top-4 right-4 p-2 bg-navy-50 hover:bg-navy-100 text-navy-700 rounded-xl transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-navy-800 font-display">Book: {bookingForm.serviceName}</h2>
                <p className="text-xs text-navy-400 font-body">Fill the patient coordinates below</p>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto"
                >
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </motion.div>
                <h3 className="text-lg font-bold text-navy-800 font-display">Booking Confirmed</h3>
                <p className="text-xs text-navy-400 font-body">Dispatch desk will telephone you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-body">
                <input type="text" required placeholder="Contact Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                <input type="tel" required placeholder="Contact Phone" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                  className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                <input type="text" required placeholder="Pickup Location" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                  className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                <input type="text" required placeholder="Destination Hospital" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                  className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                  <input type="text" placeholder="Notes (Optional)" value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
                    className="w-full px-4 py-2.5 border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm" />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-3 premium-gradient text-white font-bold rounded-xl text-sm shadow-glow"
                >
                  Submit Booking Request
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
