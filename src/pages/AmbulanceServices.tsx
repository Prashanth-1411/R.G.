import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Ambulance, X, Phone, Calendar } from 'lucide-react';
import { ambulanceServices } from '../data/ambulance-services';
import fallbackImg from '../assets/1.jpg';
import { ImageHover } from '../components/ImageHover';

export const AmbulanceServices: React.FC = () => {
  const [services] = useState(ambulanceServices);
  const [selectedService, setSelectedService] = useState<typeof ambulanceServices[number] | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '', serviceName: '',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

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
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">Ambulance Fleet</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            Our comprehensive medical fleet is ready 24/7, providing certified Basic Life Support, neonatal incubators, high-flow ventilators, and interstate transits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col justify-between hover-lift"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <ImageHover src={getImage(s.image_path)} alt={s.title}>
                    <img src={getImage(s.image_path)} alt={s.title} className="w-full h-full object-cover" />
                  </ImageHover>
                  <div className="absolute top-4 left-4 bg-[#0F4CFF] text-white p-2 rounded-lg shadow-sm">
                    <Ambulance className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-inter">{s.title}</h3>
                  <p className="text-slate-500 font-poppins text-xs font-semibold uppercase tracking-wider">{s.short_description}</p>
                  <p className="text-slate-600 text-sm font-poppins line-clamp-3 text-justify">{s.description}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {s.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0F4CFF]/5 text-[#0F4CFF] text-[10px] font-bold rounded-lg font-poppins">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedService(s)}
                    className="py-2.5 text-center text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl font-poppins transition-all duration-200"
                  >
                    Learn Details
                  </button>
                  <button
                    onClick={() => openBookingModal(s.title)}
                    className="py-2.5 text-center text-white bg-[#0F4CFF] hover:bg-blue-700 text-xs font-bold rounded-xl font-poppins transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 pt-16 sm:pt-20 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-inter">{selectedService.title}</h2>
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#0F4CFF] font-poppins">Diagnosis & Scope</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">{selectedService.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#0F4CFF] font-poppins">Features & Equipment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 text-sm font-semibold font-poppins">
                      <ShieldCheck className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => { const t = selectedService.title; setSelectedService(null); openBookingModal(t); }}
                  className="flex-1 py-3.5 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm"
                >
                  Request Booking
                </button>
                <a href="tel:+919551663530" className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setBookingModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full relative z-10">
            <button onClick={() => setBookingModalOpen(false)} className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-inter mb-1">Book: {bookingForm.serviceName}</h2>
            <p className="text-xs text-slate-400 font-poppins mb-6">Fill the patient coordinates below.</p>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-4xl">✅</span>
                <h3 className="text-lg font-bold text-slate-800 font-inter">Booking Registered</h3>
                <p className="text-xs text-slate-500 font-poppins">Dispatch desk will telephone you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-poppins">
                <input type="text" required placeholder="Contact Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="tel" required placeholder="Contact Phone" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Pickup Location" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Destination Hospital" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                  <input type="text" placeholder="Notes (Optional)" value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">Submit Booking Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
