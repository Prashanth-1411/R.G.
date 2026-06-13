import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, MapPin, Send, Plus, ChevronDown, Ambulance, Calendar, 
  Clock, ShieldCheck, Award, CheckCircle2, Users, Heart, Shield 
} from 'lucide-react';
import { ImageHover } from '../components/ImageHover';
import { HeartbeatBackground } from '../components/HeartbeatBackground';
import { ambulanceServices } from '../data/ambulance-services';
import { funeralServices } from '../data/funeral-services';
import { serviceAreas } from '../data/service-areas';
import heroImg from '../assets/2.jpeg';
import fleet1 from '../assets/1.jpg';
import fleet2 from '../assets/2.jpeg';
import fleet4 from '../assets/4.jpeg';
import fleet8a from '../assets/8a.jpg';

const AnimatedCounter: React.FC<{ end: number; duration?: number; label: string; suffix?: string }> = ({
  end, duration = 1500, label, suffix = ""
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      },
      { rootMargin: '-100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200">
      <span className="text-4xl md:text-5xl font-extrabold text-[#0F4CFF] font-inter block mb-2">
        {count}{suffix}
      </span>
      <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed font-poppins">{label}</p>
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

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
  const homeAmbulanceServices = ambulanceServices.slice(0, 3);
  const homeFuneralServices = funeralServices.slice(0, 3);

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
      const body = `Name: ${contactForm.name}%0AEmail: ${contactForm.email}%0APhone: ${contactForm.phone}%0AAddress: ${contactForm.address || 'N/A'}%0AService Required: ${contactForm.requirements}%0AMessage: ${contactForm.message}`;
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
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-50 overflow-hidden py-16 sm:py-24 border-b border-slate-100">
        <HeartbeatBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F4CFF]/10 text-[#0F4CFF] rounded-full text-xs font-bold uppercase tracking-wider font-poppins">
                  <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full"></span>
                  24/7 Dispatch Desk Active
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 font-poppins">
                  Pan India Service
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] font-inter leading-tight tracking-tight">
                24/7 Emergency Ambulance & Funeral Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-poppins max-w-2xl text-justify">
                Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India. Trust R.G. Ambulance Service for immediate clinical transfers and dignified funeral arrangements.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 font-poppins">
                <a href="tel:+919551663530" className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all duration-200 text-sm sm:text-base">
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call Now: +91 95516 63530</span>
                </a>
                <a href="#booking-sec" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-sm sm:text-base">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <span>Book Ambulance</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-200/60 font-poppins">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Govt. Approved</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden md:block">
              <ImageHover src={heroImg} alt="Modern ICU Ambulance with emergency response team">
                <img src={heroImg} alt="Modern ICU Ambulance with emergency response team" className="w-full h-[450px] object-cover" />
              </ImageHover>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges */}
      <section className="bg-white py-6 border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Clock className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">12-Min Quick Dispatch</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Shield className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Sterilized ICU Fleet</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Users className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Certified Paramedics</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Award className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Govt. Registered</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="bg-slate-50 py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={12} label="Years of Experience" suffix="+" />
            <AnimatedCounter end={34} label="Active Medical Vehicles" suffix="+" />
            <AnimatedCounter end={8200} label="Patients Safely Transferred" suffix="+" />
            <AnimatedCounter end={100} label="Service Locations" suffix="%" />
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Why Healthcare Providers & Families Trust Us
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              In medical emergencies, every second counts. We maintain the highest standards of safety, clinical expertise, and response velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Rapid Dispatch Stations</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Ambulances positioned at strategic hubs across the city to drastically reduce arrival times. Dispatch begins within 2 minutes of call confirmation.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Full ICU Capabilities</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Equipped with mechanical ventilators, defibrillators, oxygen supply, cardiac monitors, and infusion pumps. A mobile ICU ready for critical care transfers.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Certified Medical Staff</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Our team consists of certified critical care paramedics, emergency nurses, and experienced drivers who undergo regular clinical skill assessments.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Dignified Funeral Care</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Compassionate handling of final journeys with temperature-controlled AC hearse vans, deceased preservation boxes, and full ritual support coordinates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Professional Emergency Services
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed">
              Equipped with certified medical gear and designed for safety, comfort, and absolute compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                  <Ambulance className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] font-inter">Emergency Ambulance Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">
                  From emergency ICU patient transfers to basic life support transports. Our advanced ambulance fleet is fully equipped with portable ventilators, cardiac setups, pediatric support, and long-range transport tracking tools.
                </p>
                <ul className="space-y-3 font-poppins">
                  {homeAmbulanceServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-3.5 text-slate-700 text-sm font-semibold">
                      <Plus className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-slate-100">
                <button onClick={() => navigate('/ambulance-services')} className="inline-flex items-center justify-center w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">
                  View All Ambulance Models →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] font-inter">Dignified Funeral Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">
                  Arranging respectful final homages and processions. We provide hi-tech air-conditioned funeral vehicles, deceased freezer boxes, custom casket arrangements, and complete ceremonial documentation management.
                </p>
                <ul className="space-y-3 font-poppins">
                  {homeFuneralServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-3.5 text-slate-700 text-sm font-semibold">
                      <Plus className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-slate-100">
                <button onClick={() => navigate('/funeral-services')} className="inline-flex items-center justify-center w-full py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl text-sm transition-all duration-200">
                  View Homage Services →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fleet Gallery */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Our Active Fleet Gallery
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed">
              Clean, fully customized emergency response and funeral transport vehicles ready for immediate deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet1} alt="ICU Ventilator Ambulance">
                  <img src={fleet1} alt="ICU Ventilator Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">ICU Ventilator Ambulance</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Full intensive care support with advanced monitoring rigs.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet2} alt="Basic Life Support Ambulance">
                  <img src={fleet2} alt="Basic Life Support Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">Basic Life Support Rig</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Oxygen-equipped transport fleet for stable patient transfers.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet4} alt="NICU Pediatric Ambulance">
                  <img src={fleet4} alt="NICU Pediatric Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">Neonatal NICU Ambulance</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Temperature-controlled portable incubator setups for newborns.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet8a} alt="AC Funeral Hearse Van">
                  <img src={fleet8a} alt="AC Funeral Hearse Van" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">AC Funeral Hearse Van</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Dignified, air-conditioned vehicle for funeral processions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Emergency Contact Banner */}
      <section className="bg-[#DC2626] text-white py-12 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="bg-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                24/7 Rapid Emergency Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-inter">
                Need Immediate Emergency Dispatch?
              </h3>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl">
                Our medical coordinators are online 24/7. Call our dedicated lines to dispatch a fully equipped ICU ambulance to your location immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-poppins text-sm">
              <a href="tel:+919551663530" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#DC2626] font-black rounded-xl shadow-md w-full sm:w-auto hover:bg-slate-50 transition-all duration-200">
                <Phone className="w-5 h-5 fill-[#DC2626]" />
                <span>Call Hotline: +91 95516 63530</span>
              </a>
              <a href="https://wa.me/918778481556?text=Emergency+Ambulance+Required" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-extrabold rounded-xl shadow-md w-full sm:w-auto hover:bg-[#1ebd59] transition-all duration-200">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Booking Form */}
      <section id="booking-sec" className="py-16 sm:py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight font-inter sm:text-4xl">
              24/7 Digital Dispatch Reservation
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-400 font-poppins text-xs sm:text-sm leading-relaxed">
              Submit patient and route coordinates below. Our dispatch coordinator will telephone you within 3 minutes to verify standby availability.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 text-center space-y-4">
              <span className="text-5xl">✅</span>
              <h3 className="text-2xl font-bold font-inter">Booking Registration Complete</h3>
              <p className="text-slate-300 font-poppins text-sm">
                Our emergency response desk is reviewing your request. We will contact you at your phone number shortly to verify.
              </p>
              <button onClick={() => setBookingSuccess(false)} className="px-6 py-2.5 bg-[#0F4CFF] text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">
                Book Another Trip
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 sm:p-10 rounded-2xl border border-slate-700/50">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Patient / Contact Name</label>
                <input type="text" required placeholder="Enter contact name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Mobile Phone Number</label>
                <input type="tel" required placeholder="Enter active phone number" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Pickup Location</label>
                <input type="text" required placeholder="e.g. Anna Nagar Central" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Destination Clinic/Hospital</label>
                <input type="text" required placeholder="e.g. Apollo Hospital Greams Road" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Service Category</label>
                <select value={bookingForm.serviceType} onChange={e => setBookingForm({...bookingForm, serviceType: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm">
                  <option value="Ambulance">Ambulance</option>
                  <option value="Funeral">Funeral Homage</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Target Vehicle</label>
                <input type="text" placeholder="e.g. ICU Plus Ambulance" value={bookingForm.serviceName} onChange={e => setBookingForm({...bookingForm, serviceName: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Transit Date</label>
                <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Special Diagnosis / Requests</label>
                <input type="text" placeholder="Ventilator, oxygen supply rates, etc." value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-black rounded-xl text-sm transition-all duration-200">
                  Submit Booking Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 9. Service Coverage */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Our Service Coverage Area
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed px-2">
              We provide active ambulance dispatch and funeral care solutions across India. Select your Chennai locality for nearby response times.
            </p>
            <div className="mt-6 max-w-md mx-auto px-4 sm:px-0 font-poppins">
              <input type="text" placeholder="Search your location..." value={searchLocation} onChange={e => { setSearchLocation(e.target.value); setShowAllLocations(true); }} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none bg-white text-sm shadow-sm text-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 font-poppins">
            {displayedLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/ambulance-service-in-${loc.slug}`)}
                className="flex items-center gap-2 p-3.5 bg-white hover:bg-[#0F4CFF] hover:text-white rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 font-semibold text-slate-700 text-xs sm:text-sm text-left"
              >
                <MapPin className="w-4 h-4 shrink-0 text-[#0F4CFF]" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => setShowAllLocations(!showAllLocations)} className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm text-sm hover:bg-slate-50 transition-all font-poppins">
              <span>{showAllLocations ? "Show Fewer Localities" : "Show All 100+ Chennai Locations"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAllLocations ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Verified Family Testimonials
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed">
              Read stories of our clinical care support and prompt response from families who have trusted us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "I cannot thank R.G. Ambulance enough for their swift response when my father had a medical emergency. The ICU ambulance arrived within 12 minutes, and the paramedics stabilized him on the way to Apollo Hospital. Truly life-saving service."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">RK</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Rajesh Kumar</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Family Member, Chennai</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "Used their funeral services for my grandmother's last rites. The AC hearse van was well-maintained. The attendants handled everything with utmost respect and sensitivity, helping us through all the documentation."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">PS</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Priya Sharma</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Patient, Anna Nagar</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "We have collaborated with R.G. Ambulance for patient transfers from our facility. Their ICU ambulances are extremely well-equipped and their paramedics are highly trained. Punctual and clinical."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">DN</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Dr. Senthil Nathan</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Medical Director, KMC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Get in Touch */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Get in Touch
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed">
              Questions, comments or special requests? We are here to help. Reach out to us at <a href="mailto:ebenezer.r@rgambulanceservice.com" className="text-[#0F4CFF] font-semibold hover:underline">ebenezer.r@rgambulanceservice.com</a>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
            <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              {contactSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-auto font-poppins">
                  <span className="text-4xl block mb-2">📩</span>
                  <h4 className="text-xl font-bold text-slate-800 font-inter">Inquiry Received</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2">
                    Thank you. We have saved your requirements and will reach out to you within the business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 font-poppins">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                    <input type="email" required placeholder="Your Mail" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" required placeholder="Mobile Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                    <input type="text" placeholder="Address" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                  </div>
                  <select value={contactForm.requirements} onChange={e => setContactForm({...contactForm, requirements: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800">
                    <option value="Ambulance">Ambulance Service</option>
                    <option value="Funeral">Funeral Care</option>
                  </select>
                  <textarea required rows={4} placeholder="Description of Requirement" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm resize-none text-slate-800"></textarea>
                  <button type="submit" disabled={contactSending} className="flex items-center justify-center gap-2 w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">
                    {contactSending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.123456789!2d80.1607!3d13.0812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f5b4b4b4b4b%3A0x123456789!2sSurapet%2C%20Chennai%2C%20Tamil%20Nadu%20600066!5e1!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                title="R.G. Ambulance Service Location in Surapet Chennai"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
