import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: ''
  });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

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

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">Contact Us 24/7</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            Have any queries or need a specific quote? Our dispatch coordinator desk is active 24/7. Call or write us today.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#0F172A] font-inter mb-1">Send an Inquiry</h2>
              <p className="text-sm text-slate-400 font-poppins">Fill the contact form below and we will get back to you shortly.</p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-auto space-y-3">
                <span className="text-4xl">📩</span>
                <h4 className="text-xl font-bold text-slate-800 font-inter">Message Submitted</h4>
                <p className="text-sm text-slate-500 font-poppins">Thank you. Our representatives will call you shortly.</p>
                <button onClick={() => setSuccess(false)} className="px-6 py-2 bg-[#0F4CFF] text-white text-sm font-bold rounded-lg transition-all duration-200 hover:bg-blue-700">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5 font-poppins">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" required placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                  <input type="email" required placeholder="Your Email" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="tel" required placeholder="Mobile Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                  <input type="text" placeholder="Address" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                </div>
                <select value={contactForm.requirements} onChange={e => setContactForm({...contactForm, requirements: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm">
                  <option value="Ambulance">Ambulance Service</option>
                  <option value="Funeral">Funeral Care</option>
                </select>
                <textarea required rows={4} placeholder="Description of Requirement" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm resize-none"></textarea>
                <button type="submit" disabled={sending} className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">
                  {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-8 sm:p-10 rounded-2xl border border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-inter">Emergency Standby Desk</h3>
              <p className="text-slate-400 text-sm font-poppins leading-relaxed">
                Contact our hotlines immediately for cardiac arrests, trauma, neonatal emergencies, or funeral service arrangements.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-[#0F4CFF] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase text-[#0F4CFF]">HQ Address</h5>
                    <p className="text-slate-400 text-sm font-poppins mt-1">Surapet, Chennai, Tamil Nadu 600066</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-[#0F4CFF] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase text-[#0F4CFF]">Email Desk</h5>
                    <p className="text-slate-400 text-sm font-poppins mt-1 break-all">ebenezer.r@rgambulanceservice.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-[#0F4CFF] shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs uppercase text-[#0F4CFF]">Emergency Hotlines</h5>
                    <div className="space-y-1.5 mt-1">
                      <a href="tel:+919551663530" className="block text-white text-base font-bold hover:text-[#0F4CFF] transition-colors">+91 95516 63530</a>
                      <a href="tel:+918778481556" className="block text-slate-400 text-sm font-semibold hover:text-white transition-colors">+91 87784 81556</a>
                      <a href="tel:+919361169801" className="block text-slate-400 text-sm font-semibold hover:text-white transition-colors">+91 93611 69801</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 h-[350px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.123456789!2d80.1607!3d13.0812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f5b4b4b4b4b%3A0x123456789!2sSurapet%2C%20Chennai%2C%20Tamil%20Nadu%20600066!5e1!3m2!1sen!2sin!4v1"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
            title="R.G. Ambulance Service Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
