import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageSquare, ChevronDown, Calendar, AlertCircle } from 'lucide-react';
import { serviceAreas } from '../data/service-areas';

export const LocationPage: React.FC = () => {
  const { locationSlug } = useParams<{ locationSlug: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    pickup: '',
    destination: '',
    serviceName: 'ICU Plus Ambulance',
    date: new Date().toISOString().split('T')[0],
    notes: ''
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
      document.title = locationData.meta_title || `Ambulance Service in ${locationData.name} | Flying Squad`;
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
      name: '',
      phone: '',
      pickup: '',
      destination: '',
      serviceName: 'ICU Plus Ambulance',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handleWhatsAppClick = () => {
    if (!locationData) return;
    const phone = '917449177777';
    const text = `Hi Flying Squad, I need to book an ambulance in ${locationData.name}. Please connect me with the dispatch desk immediately.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  if (!locationData) {
    return (
      <div className="max-w-md mx-auto py-32 px-4 text-center space-y-4">
        <AlertCircle className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 font-raleway">Location Not Serviced</h2>
        <p className="text-slate-400 font-poppins text-sm">
          We couldn't locate specific configurations for this locality. However, we service all of Chennai and surrounding Tamil Nadu districts.
        </p>
        <Link to="/" className="inline-flex py-2 px-6 bg-brandBlue text-white rounded-xl font-bold text-xs">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Location Banner */}
      <div className="bg-[#0A1F44] text-white py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brandNavy to-brandBlue/30 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-brandBlue text-xs uppercase font-extrabold tracking-widest mb-3">
            <MapPin className="w-4 h-4 fill-brandBlue/20 text-brandBlue" />
            <span>Chennai Standby Station</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-raleway leading-tight">
            Ambulance Service in <span className="text-brandBlue">{locationData.name}</span>
          </h1>
          <p className="mt-4 text-slate-300 font-poppins text-xs sm:text-sm max-w-2xl text-justify">
            {locationData.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Block: Dynamic Content & FAQs */}
          <div className="lg:col-span-8 space-y-12">
            {/* Rich HTML SEO Content */}
            <div className="bg-white p-8 rounded-3xl shadow-premium border border-slate-100 prose max-w-none prose-slate">
              <div 
                className="font-poppins text-slate-600 text-sm sm:text-base leading-relaxed space-y-4 text-justify"
                dangerouslySetInnerHTML={{ __html: locationData.content_html }} 
              />
            </div>

            {/* Local FAQs Section */}
            {locationData.faqs && locationData.faqs.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-brandNavy font-raleway border-l-4 border-brandBlue pl-3">
                  Frequently Asked Questions (FAQ)
                </h3>
                <div className="space-y-3">
                  {locationData.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl border border-slate-150 overflow-hidden shadow-sm"
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                        className="w-full px-6 py-4 text-left font-bold text-brandNavy text-sm sm:text-base flex items-center justify-between font-raleway hover:bg-slate-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {activeFaq === idx && (
                        <div className="px-6 pb-5 pt-1 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed border-t border-slate-100 text-justify">
                          {faq.answer}
                        </div>
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
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-premium">
              <h4 className="font-extrabold text-brandNavy text-base uppercase tracking-wider mb-2 font-raleway">
                Quick Standby Dispatch
              </h4>
              <p className="text-[11px] text-slate-400 font-poppins mb-6">
                Request a dedicated ambulance near {locationData.name}.
              </p>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 text-center space-y-2">
                  <span className="text-3xl block">✅</span>
                  <h5 className="font-bold text-slate-800 text-sm font-raleway">Inquiry Saved</h5>
                  <p className="text-[11px] text-slate-500 font-poppins leading-relaxed">
                    Our dispatcher at {locationData.name} bay will telephone you instantly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4 font-poppins">
                  <input
                    type="text"
                    required
                    placeholder="Contact Name"
                    value={bookingForm.name}
                    onChange={e => setBookingForm({...bookingForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-xs bg-slate-50"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={bookingForm.phone}
                    onChange={e => setBookingForm({...bookingForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-xs bg-slate-50"
                  />
                  <input
                    type="text"
                    required
                    placeholder={`Pickup Address in ${locationData.name}`}
                    value={bookingForm.pickup}
                    onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-xs bg-slate-50"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Destination Hospital"
                    value={bookingForm.destination}
                    onChange={e => setBookingForm({...bookingForm, destination: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-xs bg-slate-50"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-xl text-xs transition-premium shadow-md shadow-brandBlue/15 flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Submit Request</span>
                  </button>
                </form>
              )}
            </div>

            {/* Instant Actions */}
            <div className="bg-[#0A1F44] text-white p-6 rounded-3xl border border-slate-800 shadow-premium space-y-4">
              <h5 className="font-extrabold text-sm uppercase tracking-wider text-brandBlue font-raleway">
                {locationData.name} Standby Hotlines
              </h5>
              
              <div className="space-y-3 font-poppins">
                <a
                  href="tel:+917449177777"
                  className="flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-md shadow-red-500/20"
                >
                  <Phone className="w-4 h-4 fill-white animate-pulse" />
                  <span>Call Standby Bay (24/7)</span>
                </a>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs w-full shadow-md shadow-emerald-500/20"
                >
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
