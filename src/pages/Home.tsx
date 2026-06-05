import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Phone, Star, MapPin, Send, Plus, ChevronDown, Ambulance, Calendar } from 'lucide-react';
import { ambulanceServices } from '../data/ambulance-services';
import { funeralServices } from '../data/funeral-services';
import { serviceAreas } from '../data/service-areas';

// Scroll Triggered Animated Counter
const AnimatedCounter: React.FC<{ end: number; duration?: number; label: string; suffix?: string }> = ({
  end,
  duration = 2000,
  label,
  suffix = ""
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl shadow-premium border border-slate-100 hover:scale-105 transition-all duration-300">
      <span className="text-4xl md:text-5xl font-extrabold text-brandBlue font-raleway block mb-2">
        {count}{suffix}
      </span>
      <p className="text-slate-600 font-semibold text-sm leading-relaxed font-poppins">{label}</p>
    </div>
  );
};

export const Home: React.FC = () => {
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    serviceType: 'Ambulance',
    serviceName: 'Basic Life Support Ambulance',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // General Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    requirements: 'Ambulance',
    message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [pageContent, setPageContent] = useState<Record<string, string>>({
    hero_title: "Flyinng Squad Ambulance Service",
    hero_subtitle: "Emergency Medical Services Chennai",
    hero_description: "Providing prompt, ISO-certified emergency care transfers and funeral services across Chennai since 1981.",
    experience_years: "48",
    vehicles_count: "34",
    happy_clients: "8000"
  });

  const locations = serviceAreas.map(s => ({ name: s.name, slug: s.slug }));
  const homeAmbulanceServices = ambulanceServices.slice(0, 3);
  const homeFuneralServices = funeralServices.slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBookingForm({
      name: '',
      phone: '',
      pickup: '',
      destination: '',
      serviceType: 'Ambulance',
      serviceName: 'Basic Life Support Ambulance',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      requirements: 'Ambulance',
      message: ''
    });
  };

  // Filter locations based on search
  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const displayedLocations = showAllLocations ? filteredLocations : filteredLocations.slice(0, 16);

  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-brandIce via-[#EDF3FC] to-white overflow-hidden py-16">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] rounded-full bg-brandBlue/5 filter blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[50%] rounded-full bg-brandGold/5 filter blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-brandBlue/10 text-brandBlue rounded-full text-xs font-bold uppercase tracking-wider"
              >
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
                {pageContent.hero_subtitle}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-brandNavy font-raleway leading-tight"
              >
                {pageContent.hero_title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base text-slate-600 leading-relaxed font-poppins text-justify max-w-xl"
              >
                {pageContent.hero_description}
              </motion.p>

              {/* Verified Google Reviews Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-6 bg-white p-5 rounded-2xl shadow-premium border border-slate-100 max-w-md"
              >
                <div className="text-center sm:text-left shrink-0">
                  <span className="text-4xl font-extrabold text-[#34A853] block">8222+</span>
                  <span className="text-xs text-slate-500 font-semibold font-poppins">Verified Google Reviews</span>
                </div>
                <div className="h-px sm:h-12 w-full sm:w-px bg-slate-200"></div>
                <div className="text-center sm:text-left">
                  <span className="text-blue-600 font-extrabold text-lg block font-raleway">4.9 out of 5 Ratings</span>
                  <div className="flex justify-center sm:justify-start gap-1 mt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-5 h-5 fill-brandGold text-brandGold" />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Call & Booking Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2"
              >
                <a
                  href="tel:+917449177777"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-full shadow-lg shadow-brandBlue/20 hover:scale-105 transition-premium duration-300 text-sm sm:text-base"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call: +91 74491 77777</span>
                </a>
                <a
                  href="#booking-sec"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white hover:bg-slate-50 text-brandNavy font-extrabold rounded-full border-2 border-slate-200 shadow-sm hover:scale-105 transition-premium duration-300 text-sm sm:text-base"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Ambulance</span>
                </a>
              </motion.div>
            </div>

            {/* Hero Right Image (Vite public image mock) */}
            <div className="lg:col-span-5 relative hidden md:block">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="relative z-10 w-full overflow-hidden rounded-3xl shadow-premium-hover border-4 border-white"
              >
                <img
                  src="/images/Main Home/Main Home 1.jpg"
                  alt="Flying Squad Ambulance Service"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-premium duration-500"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statistics Counter Section */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={parseInt(pageContent.experience_years) || 48} label="Years of Experience" suffix="+" />
            <AnimatedCounter end={parseInt(pageContent.vehicles_count) || 34} label="Active Medical Vehicles" suffix="+" />
            <AnimatedCounter end={parseInt(pageContent.happy_clients) || 8000} label="Happy Patients Transferred" suffix="+" />
            <AnimatedCounter end={35} label="National Integration Awards" suffix="+" />
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandNavy tracking-tight font-raleway sm:text-4xl">
              Our Medical & Funeral Services
            </h2>
            <p className="mt-4 text-slate-500 font-poppins text-sm leading-relaxed">
              Equipped with cutting-edge emergency technology and designed with utmost patient comfort and respect.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ambulance Showcase */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-brandBlue/10 text-brandBlue flex items-center justify-center rounded-2xl mb-6">
                  <Ambulance className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brandNavy font-raleway mb-4">Ambulance Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins mb-6 text-justify">
                  From critical patient transfers to basic transport. Our fleet is equipped with mobile ventilator ICU rigs, pediatric support setups, and long-range transport tools.
                </p>
                <ul className="space-y-3 mb-8">
                  {homeAmbulanceServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 text-slate-600 text-sm font-semibold font-poppins">
                      <Plus className="w-4 h-4 text-brandBlue" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/ambulance-services"
                className="inline-flex items-center justify-center py-3.5 bg-brandBlue text-white font-bold rounded-xl text-sm hover:bg-brandNavy transition-all duration-300 shadow-md"
              >
                View All Ambulance Models →
              </Link>
            </div>

            {/* Funeral Care Showcase */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center rounded-2xl mb-6">
                  <Plus className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-brandNavy font-raleway mb-4">Funeral Care Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins mb-6 text-justify">
                  Arranging dignified homages and processions. We provide hi-tech air-conditioned funeral vans, deceased freezer boxes, and motorized coffin lowering equipment.
                </p>
                <ul className="space-y-3 mb-8">
                  {homeFuneralServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-2 text-slate-600 text-sm font-semibold font-poppins">
                      <Plus className="w-4 h-4 text-emerald-600" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                to="/funeral-services"
                className="inline-flex items-center justify-center py-3.5 bg-emerald-600 text-white font-bold rounded-xl text-sm hover:bg-emerald-700 transition-all duration-300 shadow-md"
              >
                View Homage Care Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Booking Form Section */}
      <section id="booking-sec" className="py-12 sm:py-20 bg-[#0A1F44] text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-raleway sm:text-4xl">
              24/7 Digital Booking System
            </h2>
            <p className="mt-4 text-slate-400 font-poppins text-sm leading-relaxed">
              Fill out the details below. Our dispatcher will contact you immediately via telephone to confirm vehicle availability.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-emerald-600/20 border border-emerald-500 rounded-3xl p-8 text-center space-y-4">
              <span className="text-5xl">✅</span>
              <h3 className="text-2xl font-bold font-raleway">Booking Submitted Successfully</h3>
              <p className="text-slate-300 font-poppins text-sm">
                Our emergency response desk is reviewing your request. We will contact you at your phone number shortly to verify.
              </p>
              <button
                onClick={() => setBookingSuccess(false)}
                className="px-6 py-2.5 bg-brandBlue text-white rounded-xl font-bold hover:bg-brandBlue/80"
              >
                Book Another Trip
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-8 sm:p-10 rounded-3xl border border-slate-800 backdrop-blur-md">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Patient / Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter contact name"
                  value={bookingForm.name}
                  onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter active phone number"
                  value={bookingForm.phone}
                  onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Pickup Location (Chennai)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anna Nagar Central"
                  value={bookingForm.pickup}
                  onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Destination Clinic/Hospital</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apollo Hospital Greams Road"
                  value={bookingForm.destination}
                  onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Service Category</label>
                <select
                  value={bookingForm.serviceType}
                  onChange={e => setBookingForm({...bookingForm, serviceType: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                >
                  <option value="Ambulance">Ambulance</option>
                  <option value="Funeral">Funeral Homage</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Target Vehicle</label>
                <input
                  type="text"
                  placeholder="e.g. ICU Plus Ambulance"
                  value={bookingForm.serviceName}
                  onChange={e => setBookingForm({...bookingForm, serviceName: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Transit Date</label>
                <input
                  type="date"
                  value={bookingForm.date}
                  onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Special Instructions / Brief Diagnosis</label>
                <input
                  type="text"
                  placeholder="Oxygen flows, ventilator requirement, etc."
                  value={bookingForm.notes}
                  onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:border-brandBlue focus:outline-none text-slate-100"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-brandBlue hover:bg-brandBlue/90 text-white font-extrabold rounded-xl text-sm transition-premium shadow-lg shadow-brandBlue/20"
                >
                  Submit Emergency Booking
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 5. Chennai Service Area local links */}
      <section className="py-12 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandNavy font-raleway sm:text-4xl">
              Our Chennai Coverage Areas
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed px-2">
              We operate emergency ambulance standby bays across 100+ Chennai locations to reduce dispatch delays.
            </p>
            <div className="mt-4 sm:mt-6 max-w-md mx-auto px-4 sm:px-0">
              <input
                type="text"
                placeholder="Search your location..."
                value={searchLocation}
                onChange={e => { setSearchLocation(e.target.value); setShowAllLocations(true); }}
                className="w-full px-4 py-2.5 sm:py-2 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none bg-white text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {displayedLocations.map((loc, idx) => (
              <Link
                key={idx}
                to={`/ambulance-service-in-${loc.slug.split('ambulance-service-in-')[1] || loc.slug}`}
                className="flex items-center gap-2 p-3 bg-white hover:bg-brandBlue hover:text-white rounded-xl shadow-premium border border-slate-100 transition-premium duration-300 font-semibold text-slate-700 text-xs sm:text-sm font-poppins"
              >
                <MapPin className="w-4 h-4 shrink-0 text-brandBlue group-hover:text-white" />
                <span className="truncate">{loc.name}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => setShowAllLocations(!showAllLocations)}
              className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-brandNavy font-extrabold rounded-full border border-slate-200 shadow-sm text-sm hover:bg-slate-50 transition-premium"
            >
              <span>{showAllLocations ? "Show Fewer Localities" : "Show All 100+ Chennai Locations"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${showAllLocations ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 6. General Get in Touch Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-brandNavy font-raleway sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-3 sm:mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed">
              Questions, comments or special requests? We are here to help. Reach out to us.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
            {/* Contact Form */}
            <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-100 flex flex-col justify-between">
              {contactSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-auto">
                  <span className="text-4xl block mb-2">📩</span>
                  <h4 className="text-xl font-bold text-slate-800 font-raleway">Inquiry Received</h4>
                  <p className="text-slate-500 text-sm font-poppins mt-2">
                    Thank you. We have saved your requirements and will reach out to you within the business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={e => setContactForm({...contactForm, name: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Your Mail"
                      value={contactForm.email}
                      onChange={e => setContactForm({...contactForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number"
                      value={contactForm.phone}
                      onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={contactForm.address}
                      onChange={e => setContactForm({...contactForm, address: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                  </div>

                  <div>
                    <select
                      value={contactForm.requirements}
                      onChange={e => setContactForm({...contactForm, requirements: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    >
                      <option value="Ambulance">Ambulance Service</option>
                      <option value="Funeral">Funeral Care</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="Description of Requirement"
                      value={contactForm.message}
                      onChange={e => setContactForm({...contactForm, message: e.target.value})}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-xl text-sm transition-premium shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>

            {/* Map Frame */}
            <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-premium border border-slate-100 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4149.3339431733475!2d80.229432!3d13.086162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642b6355d069%3A0xe71be692f25c9107!2sFlyinng%20Squad%20Ambulance%20Service!5e1!3m2!1sen!2sin!4v1778574925802!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Flying Squad Location in Kilpauk Chennai"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
