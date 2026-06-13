import React, { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ChevronDown, Calendar, AlertCircle } from 'lucide-react';
import { serviceAreas } from '../data/service-areas';

export const LocationPage: React.FC = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
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
      <div className="max-w-md mx-auto py-32 px-4 text-center space-y-4 font-poppins">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 font-inter">Location Not Serviced</h2>
        <p className="text-slate-400 text-sm">We couldn't locate specific configurations for this locality. However, we service all of Chennai and surrounding Tamil Nadu districts.</p>
        <a href="/" className="inline-flex py-2.5 px-6 bg-[#0F4CFF] text-white rounded-xl font-bold text-xs">Return to Home</a>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Location Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[#0F4CFF] text-[10px] sm:text-xs uppercase font-extrabold tracking-widest mb-2 sm:mb-3">
            <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 fill-[#0F4CFF]/20 text-[#0F4CFF]" />
            <span>Chennai Standby Station</span>
          </div>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black font-inter leading-tight">
            Ambulance Service in <span className="text-[#0F4CFF]">{locationData.name}</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-slate-400 font-poppins text-xs sm:text-sm max-w-2xl text-justify">{locationData.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
          {/* Left Block: Dynamic Content & FAQs */}
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            {/* Rich HTML SEO Content */}
            <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm prose max-w-none prose-slate">
              <div className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 text-justify" dangerouslySetInnerHTML={{ __html: locationData.content_html }} />
            </div>

            {/* Local FAQs Section */}
            {locationData.faqs && locationData.faqs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[#0F172A] font-inter border-l-4 border-[#0F4CFF] pl-3">Frequently Asked Questions (FAQ)</h3>
                <div className="space-y-3 font-poppins">
                  {locationData.faqs.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200/60 overflow-hidden shadow-sm">
                      <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left font-bold text-[#0F172A] text-xs sm:text-base flex items-center justify-between font-inter hover:bg-slate-50 transition-colors">
                        <span className="pr-2">{faq.question}</span>
                        <ChevronDown className={`w-4 sm:w-5 h-4 sm:h-5 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {activeFaq === idx && (
                        <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed border-t border-slate-100 text-justify">{faq.answer}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Block: Booking Form & Contact Actions */}
          <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Local Sidebar Booking Form */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <h4 className="font-extrabold text-[#0F172A] text-base uppercase tracking-wider mb-2 font-inter">Quick Standby Dispatch</h4>
              <p className="text-[11px] text-slate-400 font-poppins mb-6">Request a dedicated ambulance near {locationData.name}.</p>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 text-center space-y-2">
                  <span className="text-3xl block">✅</span>
                  <h5 className="font-bold text-slate-800 text-sm font-inter">Inquiry Saved</h5>
                  <p className="text-[11px] text-slate-500 font-poppins leading-relaxed">Our dispatcher at {locationData.name} bay will telephone you instantly.</p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 font-poppins">
                  <input type="text" required placeholder="Contact Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-xs bg-slate-50 text-slate-800" />
                  <input type="tel" required placeholder="Mobile Number" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-xs bg-slate-50 text-slate-800" />
                  <input type="text" required placeholder={`Pickup Address in ${locationData.name}`} value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-xs bg-slate-50 text-slate-800" />
                  <input type="text" required placeholder="Destination Hospital" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-xs bg-slate-50 text-slate-800" />
                  <button type="submit" className="w-full py-3 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all duration-200 shadow-sm flex items-center justify-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Submit Request</span>
                  </button>
                </form>
              )}
            </div>

            {/* Instant Actions */}
            <div className="bg-[#0F172A] text-white p-6 rounded-2xl border border-slate-800 shadow-sm space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-[#0F4CFF] font-inter">{locationData.name} Standby Hotlines</h5>
              <div className="space-y-3 font-poppins">
                <a href="tel:+919551663530" className="flex items-center justify-center gap-2 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-xl text-xs shadow-sm">
                  <Phone className="w-4 h-4 fill-white" />
                  <span>Call Standby Bay (24/7)</span>
                </a>
                <button onClick={handleWhatsAppClick} className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs w-full shadow-sm">
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Standby Bay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
