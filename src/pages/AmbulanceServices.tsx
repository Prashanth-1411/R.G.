import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, Ambulance, Heart, X } from 'lucide-react';
import { ambulanceServices } from '../data/ambulance-services';

export const AmbulanceServices: React.FC = () => {
  const [services] = useState(ambulanceServices);
  const [selectedService, setSelectedService] = useState<typeof ambulanceServices[number] | null>(null);
  
  // Booking Trigger Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    serviceName: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [pageContent] = useState<Record<string, string>>({
    title: "Ambulance Fleet",
    description: "Our comprehensive medical fleet is ready 24/7, providing certified Basic Life Support, neonatal incubators, high-flow ventilators, and interstate transits."
  });

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
      setBookingForm({
        name: '',
        phone: '',
        pickup: '',
        destination: '',
        serviceName: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }, 3000);
  };

  // Maps local images correctly
  const getImage = (path: string) => {
    if (path.startsWith('AS') || path.startsWith('FC')) {
      if (path.startsWith('FC')) {
        return `/images/Funeral Care/${path}`;
      }
      return `/images/Ambulance Services/${path}`;
    }
    return path || 'https://images.unsplash.com/photo-1587745416684-47953f16fdd1?w=600';
  };

  return (
    <div className="pt-24 pb-20">
      {/* Banner */}
      <div className="bg-brandNavy text-white py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brandNavy to-brandBlue/35 opacity-90 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black font-raleway tracking-tight">{pageContent.title || "Ambulance Fleet"}</h1>
          <p className="mt-4 text-slate-300 font-poppins text-sm max-w-xl">
            {pageContent.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white rounded-3xl overflow-hidden shadow-premium border border-slate-100 flex flex-col justify-between hover-lift group"
            >
              <div>
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={getImage(s.image_path)}
                    alt={s.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-premium duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brandBlue text-white p-2 rounded-xl shadow-lg">
                    <Ambulance className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-brandNavy font-raleway group-hover:text-brandBlue transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-500 font-poppins text-xs font-semibold uppercase tracking-wider">
                    {s.short_description}
                  </p>
                  <p className="text-slate-600 text-sm font-poppins line-clamp-3 text-justify">
                    {s.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {s.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-brandBlue/5 text-brandBlue text-[10px] font-bold rounded-lg font-poppins">
                      <ShieldCheck className="w-3 h-3 text-brandBlue" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setSelectedService(s)}
                    className="py-2.5 text-center text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl font-poppins transition-premium"
                  >
                    Learn Details
                  </button>
                  <button
                    onClick={() => openBookingModal(s.title)}
                    className="py-2.5 text-center text-white bg-brandBlue hover:bg-brandNavy text-xs font-bold rounded-xl font-poppins transition-premium shadow-sm flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Overlay Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="absolute inset-0 bg-brandNavy/65 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-6 sm:p-8 pt-20 space-y-6">
                <h2 className="text-2xl sm:text-3xl font-black text-brandNavy font-raleway">
                  {selectedService.title}
                </h2>
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brandBlue font-poppins">
                    Diagnosis & Scope
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">
                    {selectedService.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brandBlue font-poppins">
                    Fitted Equipment & Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedService.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 text-sm font-semibold font-poppins">
                        <Heart className="w-4 h-4 text-red-500 fill-red-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => {
                      const svc = selectedService.title;
                      setSelectedService(null);
                      openBookingModal(svc);
                    }}
                    className="flex-1 py-3.5 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-xl text-sm transition-premium text-center shadow-md shadow-brandBlue/15"
                  >
                    Request Booking
                  </button>
                  <a
                    href="tel:+917449177777"
                    className="px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl text-sm transition-premium text-center shadow-md shadow-red-500/15"
                  >
                    Call Standby Hot
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Booking Form Dialog Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="absolute inset-0 bg-brandNavy/65 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-md w-full relative z-10"
            >
              <button
                onClick={() => setBookingModalOpen(false)}
                className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-2xl font-extrabold text-brandNavy font-raleway mb-1">
                Book: {bookingForm.serviceName}
              </h2>
              <p className="text-xs text-slate-400 font-poppins mb-6">
                Fill the patient coordinates below.
              </p>

              {bookingSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <span className="text-4xl">✅</span>
                  <h3 className="text-xl font-bold text-slate-800 font-raleway">Booking Registered</h3>
                  <p className="text-xs text-slate-500 font-poppins">
                    Dispatch desk will telephone you shortly to verify location and confirm standby availability.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Contact Name"
                    value={bookingForm.name}
                    onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Contact Phone No"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Pickup Location (in Chennai)"
                    value={bookingForm.pickup}
                    onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Destination Hospital"
                    value={bookingForm.destination}
                    onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={bookingForm.date}
                      onChange={e => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Diagnose (Optional)"
                      value={bookingForm.notes}
                      onChange={e => setBookingForm({...bookingForm, notes: e.target.value})}
                      className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-xl text-sm transition-premium shadow-md mt-2"
                  >
                    Submit Booking Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
