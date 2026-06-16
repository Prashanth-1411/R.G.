import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import {
  Phone, MapPin, Send, ChevronDown, Ambulance, Calendar,
  Clock, ShieldCheck, Award, CheckCircle2, Users, Heart, Shield,
  Star, ChevronRight, ArrowRight, Quote,
  Building2, Truck, Stethoscope, HeartPulse, Sparkles
} from 'lucide-react';
import { AnimatedSection } from '../components/AnimatedSection';
import { Magnetic } from '../components/Magnetic';
import { ParallaxSection } from '../components/ParallaxSection';
import { SectionHeader } from '../components/SectionHeader';
import { HeroSlider } from '../components/HeroSlider';
import { BackgroundImage, BackgroundCard } from '../components/BackgroundImage';
import { getPageByName, getServices, getMediaUrl, type ServiceItem } from '../api';
import { ambulanceServices } from '../data/ambulance-services';
import { funeralServices } from '../data/funeral-services';
import { serviceAreas } from '../data/service-areas';
import { testimonials } from '../data/testimonials';
import fleet2 from '../assets/2.jpeg';

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

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');
  const [aboutHeading, setAboutHeading] = useState('Why Healthcare Providers & Families Trust Us');
  const [aboutContent, setAboutContent] = useState('In medical emergencies, every second counts. We maintain the highest standards of safety, clinical expertise, and response velocity.');
  const [servicesHeading, setServicesHeading] = useState('Professional Emergency Services');
  const [servicesContent, setServicesContent] = useState('Equipped with certified medical gear and designed for safety, comfort, and absolute compliance.');
  const [fleetItems, setFleetItems] = useState<Array<{ title: string; desc: string; img: string }>>([]);
  const [apiAmbulanceTitles, setApiAmbulanceTitles] = useState<string[]>([]);
  const [apiFuneralTitles, setApiFuneralTitles] = useState<string[]>([]);

  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '',
    serviceType: 'Ambulance', serviceName: 'Basic Life Support Ambulance',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);

  const locations = serviceAreas.map(s => ({ name: s.name, slug: s.slug }));
  const homeAmbulanceServices = ambulanceServices.slice(0, 4);
  const homeFuneralServices = funeralServices.slice(0, 3);
  const featuredTestimonials = testimonials.filter(t => t.rating === 5).slice(0, 3);

  useEffect(() => {
    getPageByName('about').then((page) => {
      if (page?.heading) setAboutHeading(page.heading);
      if (page?.content) setAboutContent(page.content);
    });
    getPageByName('services').then((page) => {
      if (page?.heading) setServicesHeading(page.heading);
      if (page?.content) setServicesContent(page.content);
    });
    getServices().then((items: ServiceItem[]) => {
      const active = items.filter((s) => s.status === 'active' || s.is_active);
      const fleet = active.slice(0, 4).map((s) => ({
        title: s.title,
        desc: s.description || '',
        img: getMediaUrl(s.image || s.image_url) || fleet2,
      }));
      if (fleet.length) setFleetItems(fleet);
      const ambulance = active.filter((s) => s.service_type === 'ambulance').slice(0, 4).map((s) => s.title);
      const funeral = active.filter((s) => s.service_type === 'funeral').slice(0, 3).map((s) => s.title);
      if (ambulance.length) setApiAmbulanceTitles(ambulance);
      if (funeral.length) setApiFuneralTitles(funeral);
    });
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBookingForm({
      name: '', phone: '', pickup: '', destination: '',
      serviceType: 'Ambulance', serviceName: 'Basic Life Support Ambulance',
      date: new Date().toISOString().split('T')[0], notes: ''
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!response.ok) throw new Error('Failed to send');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } catch {
      const subject = `Inquiry from ${contactForm.name} - ${contactForm.requirements} Service`;
      const body = `Name: ${contactForm.name}%0APhone: ${contactForm.phone}%0AAddress: ${contactForm.address || 'N/A'}%0AService: ${contactForm.requirements}%0AMessage: ${contactForm.message}`;
      window.open(`mailto:ebenezer.r@rgambulanceservice.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } finally {
      setContactSending(false);
    }
  };

  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(searchLocation.toLowerCase())
  );
  const displayedLocations = showAllLocations ? filteredLocations : filteredLocations.slice(0, 16);

  return (
    <div className="pt-20">
      <HeroSlider />

      {/* ========== 2. STATISTICS BANNER ========== */}
      <section className="relative py-12 bg-white border-b border-navy-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={12} label="Years of Experience" suffix="+" icon={<Award className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={34} label="Active Medical Vehicles" suffix="+" icon={<Truck className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={8200} label="Patients Safely Transferred" suffix="+" icon={<HeartPulse className="w-6 h-6 text-brand-500" />} />
            <AnimatedCounter end={100} label="Service Locations" suffix="%" icon={<MapPin className="w-6 h-6 text-brand-500" />} />
          </div>
        </div>
      </section>

      {/* ========== 3. ABOUT / WHY CHOOSE US ========== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="space-y-6">
                <SectionHeader
                  title={aboutHeading}
                  subtitle={aboutContent}
                  align="left"
                />
                <div className="space-y-4">
                  {[
                    {
                      icon: <Clock className="w-5 h-5" />,
                      title: 'Rapid Dispatch Stations',
                      desc: 'Ambulances positioned at strategic hubs across the city. Dispatch begins within 2 minutes of call confirmation.',
                    },
                    {
                      icon: <Stethoscope className="w-5 h-5" />,
                      title: 'Full ICU Capabilities',
                      desc: 'Equipped with mechanical ventilators, defibrillators, cardiac monitors, and infusion pumps — a mobile ICU on wheels.',
                    },
                    {
                      icon: <Users className="w-5 h-5" />,
                      title: 'Certified Medical Staff',
                      desc: 'Critical care paramedics, emergency nurses, and experienced drivers who undergo regular clinical skill assessments.',
                    },
                    {
                      icon: <Heart className="w-5 h-5" />,
                      title: 'Dignified Funeral Care',
                      desc: 'Compassionate handling of final journeys with AC hearse vans, deceased preservation, and full ritual support.',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                      viewport={{ once: true }}
                      className="flex gap-4 p-4 rounded-xl hover:bg-navy-50 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 font-display mb-1">{item.title}</h3>
                        <p className="text-sm text-navy-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="relative">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-brand-500/10 rounded-3xl" />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gold-500/10 rounded-3xl" />
                <div className="relative rounded-3xl overflow-hidden shadow-premium-xl">
                  <BackgroundImage
                    src={fleet2}
                    alt="ICU Ambulance Fleet"
                    className="h-[500px]"
                    overlayClassName="bg-gradient-to-t from-navy-900/60 to-transparent"
                  >
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <div className="glass-dark rounded-2xl p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-xl premium-gradient flex items-center justify-center shadow-glow">
                            <Building2 className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-bold font-display">R.G. Ambulance Service</p>
                            <p className="text-navy-300 text-sm">Est. 2014 • ISO Certified</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </BackgroundImage>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== 4. SERVICES OVERVIEW ========== */}
      <section className="py-24 bg-navy-50 relative overflow-hidden">
        <div className="absolute inset-0 split-pattern opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <SectionHeader
              title={servicesHeading}
              subtitle={servicesContent}
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-16">
            {/* Ambulance Services */}
            <AnimatedSection direction="left">
              <div className="premium-card p-8 lg:p-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl premium-gradient flex items-center justify-center shadow-glow">
                    <Ambulance className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-800 font-display">Emergency Ambulance</h3>
                    <p className="text-sm text-navy-400">ICU-equipped fleet • 24/7 response</p>
                  </div>
                </div>

                <div className="space-y-4 flex-grow">
                  {(apiAmbulanceTitles.length ? apiAmbulanceTitles.map((title, i) => ({ id: i, title })) : homeAmbulanceServices).map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-navy-700">{s.title}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/ambulance-services')}
                  className="mt-8 w-full py-4 premium-gradient text-white font-bold rounded-xl shadow-glow flex items-center justify-center gap-2 text-sm"
                >
                  <span>View All Ambulance Models</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </AnimatedSection>

            {/* Funeral Services */}
            <AnimatedSection direction="right">
              <div className="premium-card p-8 lg:p-10 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-navy-800 flex items-center justify-center shadow-lg">
                    <Heart className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-navy-800 font-display">Dignified Funeral Care</h3>
                    <p className="text-sm text-navy-400">Compassionate homage services</p>
                  </div>
                </div>

                <div className="space-y-4 flex-grow">
                  {(apiFuneralTitles.length ? apiFuneralTitles.map((title, i) => ({ id: i, title })) : homeFuneralServices).map((s, i) => (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-navy-100 text-navy-700 flex items-center justify-center shrink-0">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-semibold text-navy-700">{s.title}</span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/funeral-services')}
                  className="mt-8 w-full py-4 bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 text-sm transition-all"
                >
                  <span>View Homage Services</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ========== 5. FLEET SHOWCASE ========== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <SectionHeader
              title="Our Active Fleet Gallery"
              subtitle="Clean, fully customized emergency response and funeral transport vehicles ready for immediate deployment."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {(fleetItems.length ? fleetItems : [
              { img: getMediaUrl('uploads/1.jpg'), title: 'ICU Ventilator Ambulance', desc: 'Full intensive care support with advanced monitoring rigs.' },
              { img: getMediaUrl('uploads/2.jpeg'), title: 'Basic Life Support Rig', desc: 'Oxygen-equipped transport fleet for stable patient transfers.' },
              { img: getMediaUrl('uploads/4.jpeg'), title: 'Neonatal NICU Ambulance', desc: 'Temperature-controlled portable incubator setups for newborns.' },
              { img: getMediaUrl('uploads/funeral-1.jpg'), title: 'AC Funeral Hearse Van', desc: 'Dignified, air-conditioned vehicle for funeral processions.' },
            ]).map((item, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                <BackgroundCard
                  imageSrc={item.img}
                  title={item.title}
                  description={item.desc}
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. TESTIMONIALS ========== */}
      <section className="py-24 bg-navy-50 relative overflow-hidden">
        <div className="absolute inset-0 split-pattern opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <AnimatedSection>
            <SectionHeader
              title="Verified Family Testimonials"
              subtitle="Read stories of our clinical care support and prompt response from families who have trusted us."
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {featuredTestimonials.map((t, i) => (
              <AnimatedSection key={t.id} direction="up" delay={i * 0.15}>
                <motion.div
                  className="premium-card p-8 h-full flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-brand-200 mb-3" />
                  <p className="text-sm text-navy-600 leading-relaxed flex-grow font-body">
                    "{t.content}"
                  </p>
                  <div className="pt-5 mt-5 border-t border-navy-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-sm">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-800 text-sm font-display">{t.name}</h4>
                      <span className="text-[10px] text-navy-400 font-bold uppercase tracking-wider">{t.position}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/testimonials')}
              className="btn-outline"
            >
              <span>Read All Testimonials</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== 7. EMERGENCY CTA BANNER ========== */}
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
                  24/7 Rapid Emergency Support
                </span>
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight leading-tight">
                  Need Immediate Emergency Dispatch?
                </h3>
                <p className="text-base text-navy-300 max-w-xl font-body">
                  Our medical coordinators are online 24/7. Call our dedicated lines to dispatch a fully equipped ICU ambulance to your location immediately.
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

      {/* ========== 8. BOOKING FORM ========== */}
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
                Submit patient and route coordinates below. Our dispatch coordinator will telephone you within 3 minutes to verify standby availability.
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
              <h3 className="text-2xl font-bold text-white font-display">Booking Registration Complete</h3>
              <p className="text-navy-400 font-body text-sm">
                Our emergency response desk is reviewing your request. We will contact you at your phone number shortly to verify.
              </p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setBookingSuccess(false)}
                className="btn-premium mt-4 inline-flex"
              >
                Book Another Trip
              </motion.button>
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
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Destination Clinic/Hospital</label>
                <input type="text" required placeholder="e.g. Apollo Hospital Greams Road" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Service Category</label>
                <select value={bookingForm.serviceType} onChange={e => setBookingForm({...bookingForm, serviceType: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm transition-colors">
                  <option value="Ambulance" className="bg-navy-800">Ambulance</option>
                  <option value="Funeral" className="bg-navy-800">Funeral Homage</option>
                </select>
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Target Vehicle</label>
                <input type="text" placeholder="e.g. ICU Plus Ambulance" value={bookingForm.serviceName} onChange={e => setBookingForm({...bookingForm, serviceName: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm placeholder:text-navy-500 transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Transit Date</label>
                <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-white text-sm transition-colors" />
              </div>
              <div className="space-y-2 field-focus">
                <label className="text-xs font-bold uppercase tracking-wider text-navy-400 font-body">Special Diagnosis / Requests</label>
                <input type="text" placeholder="Ventilator, oxygen supply rates, etc." value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
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

      {/* ========== 9. SERVICE COVERAGE ========== */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <SectionHeader
              title="Our Service Coverage Area"
              subtitle="We provide active ambulance dispatch and funeral care solutions across India. Select your Chennai locality for nearby response times."
            />
          </AnimatedSection>

          <div className="mt-10 max-w-md mx-auto">
            <div className="relative">
              <MapPin className="w-5 h-5 text-navy-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search your location..."
                value={searchLocation}
                onChange={e => { setSearchLocation(e.target.value); setShowAllLocations(true); }}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-navy-200 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-navy-800 shadow-soft transition-colors"
              />
            </div>
          </div>

          <AnimatedSection className="mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {displayedLocations.map((loc, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: (idx % 16) * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  onClick={() => navigate(`/ambulance-service-in-${loc.slug}`)}
                  className="flex items-center gap-2.5 p-3.5 bg-navy-50 hover:premium-gradient hover:text-white rounded-xl border border-navy-100 transition-all duration-300 font-semibold text-navy-700 text-xs sm:text-sm text-left group"
                >
                  <MapPin className="w-4 h-4 shrink-0 text-brand-500 group-hover:text-white transition-colors" />
                  <span className="truncate">{loc.name}</span>
                </motion.button>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-10">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="btn-outline"
            >
              <span>{showAllLocations ? "Show Fewer Localities" : "Show All 100+ Chennai Locations"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllLocations ? 'rotate-180' : ''}`} />
            </motion.button>
          </AnimatedSection>
        </div>
      </section>

      {/* ========== 10. FINAL CTA ========== */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient" />
        <div className="absolute inset-0 split-pattern opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <AnimatedSection direction="left" className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-500/20">
                <span className="w-1.5 h-1.5 bg-white rounded-full" />
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white font-display tracking-tight">
                Questions or Special Requests?
              </h2>
              <p className="text-lg text-navy-300 font-body max-w-xl">
                We are here to help. Reach out to us at{' '}
                <a href="mailto:ebenezer.r@rgambulanceservice.com" className="text-white font-semibold hover:underline">
                  ebenezer.r@rgambulanceservice.com
                </a>
              </p>
            </AnimatedSection>

            <AnimatedSection direction="right" className="lg:col-span-5">
              <div className="glass-dark rounded-3xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wider font-bold">Emergency Hotline</p>
                    <a href="tel:+919551663530" className="text-lg text-white font-bold font-display hover:text-brand-400 transition-colors">
                      +91 95516 63530
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <svg className="w-5 h-5 fill-emerald-400" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-navy-400 uppercase tracking-wider font-bold">WhatsApp</p>
                    <a href="https://wa.me/918778481556" target="_blank" rel="noreferrer" className="text-lg text-white font-bold font-display hover:text-emerald-400 transition-colors">
                      +91 87784 81556
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Contact Form */}
          <AnimatedSection className="mt-16">
            {contactSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 rounded-3xl p-12 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-brand-500/20 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-10 h-10 text-brand-400" />
                </div>
                <h4 className="text-xl font-bold text-white font-display">Inquiry Received</h4>
                <p className="text-navy-400 font-body text-sm mt-2">
                  Thank you. We have saved your requirements and will reach out to you within the business hour.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-3xl border border-white/10">
                <input type="text" required placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-white placeholder:text-navy-500 transition-colors" />
                <input type="email" required placeholder="Your Mail" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-white placeholder:text-navy-500 transition-colors" />
                <input type="tel" required placeholder="Mobile Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-white placeholder:text-navy-500 transition-colors" />
                <input type="text" placeholder="Address" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-white placeholder:text-navy-500 transition-colors" />
                <select value={contactForm.requirements} onChange={e => setContactForm({...contactForm, requirements: e.target.value})}
                  className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm text-white transition-colors">
                  <option value="Ambulance" className="bg-navy-800">Ambulance Service</option>
                  <option value="Funeral" className="bg-navy-800">Funeral Care</option>
                </select>
                <div />
                <div className="md:col-span-2">
                  <textarea required rows={4} placeholder="Description of Requirement" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:border-brand-500 focus:outline-none text-sm resize-none text-white placeholder:text-navy-500 transition-colors" />
                </div>
                <div className="md:col-span-2">
                  <Magnetic strength={0.15}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={contactSending}
                      className="w-full py-4 premium-gradient text-white font-black rounded-xl text-sm shadow-glow flex items-center justify-center gap-2 group"
                    >
                      {contactSending ? 'Sending...' : <><Send className="w-4 h-4 btn-icon-shift-right" /> Send Inquiry</>}
                    </motion.button>
                  </Magnetic>
                </div>
              </form>
            )}
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};
