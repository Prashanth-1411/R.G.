import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    requirements: 'Ambulance',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [pageContent, setPageContent] = useState<Record<string, string>>({
    title: "Contact Us 24/7",
    subtitle: "Always Ready to Assist",
    description: "Have any queries or need a specific quote? Our dispatch coordinator desk is active 24/7. Call or write us today.",
    address: "No. 69/48, Outer Circular Road, Kilpauk Garden Colony, Kilpauk, Chennai, TN 600010",
    email: "info@flyingsquadambulance.com",
    phone_1: "+91 74491 77777",
    phone_2: "+91 84280 77777",
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/public/seo-pages/contact/')
      .then(res => {
        if (res.data && res.data.page_content) {
          setPageContent(prev => ({ ...prev, ...res.data.page_content }));
        }
      })
      .catch(err => console.error("Failed to load contact page content", err));
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/public/contact-leads/create/', contactForm);
      setSuccess(true);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        requirements: 'Ambulance',
        message: ''
      });
    } catch (e) {
      console.error(e);
      alert("Inquiry submission failed. Please try again.");
    }
  };

  return (
    <div className="pt-24 pb-20 bg-slate-50">
      {/* Banner */}
      <div className="bg-brandNavy text-white py-16 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brandNavy to-brandBlue/35 opacity-90 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black font-raleway tracking-tight">{pageContent.title || "Contact Us"}</h1>
          <p className="mt-4 text-slate-300 font-poppins text-sm max-w-xl">
            {pageContent.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-premium flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brandNavy font-raleway mb-2">Send an Inquiry</h2>
              <p className="text-xs text-slate-400 font-poppins mb-6">
                Fill the contact form below and we will get back to you shortly.
              </p>
            </div>

            {success ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-auto space-y-3">
                <span className="text-4xl">📩</span>
                <h4 className="text-xl font-bold text-slate-800 font-raleway">Message Submitted</h4>
                <p className="text-xs text-slate-500 font-poppins">
                  Thank you. We have saved your request and our representatives will call you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2 bg-brandBlue text-white text-xs font-bold rounded-xl"
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={e => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Your Mail"
                    value={contactForm.email}
                    onChange={e => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={contactForm.phone}
                    onChange={e => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={contactForm.address}
                    onChange={e => setContactForm({...contactForm, address: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm"
                  />
                </div>

                <div>
                  <select
                    value={contactForm.requirements}
                    onChange={e => setContactForm({...contactForm, requirements: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm bg-white"
                  >
                    <option value="Ambulance">Ambulance Service</option>
                    <option value="Funeral">Funeral Care</option>
                  </select>
                </div>

                <div>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your requirement or questions here..."
                    value={contactForm.message}
                    onChange={e => setContactForm({...contactForm, message: e.target.value})}
                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-brandBlue focus:outline-none text-sm resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-brandBlue hover:bg-brandNavy text-white font-extrabold rounded-xl text-sm transition-premium shadow-md shadow-brandBlue/15"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Info Card */}
          <div className="lg:col-span-5 bg-[#0A1F44] text-white p-8 sm:p-10 rounded-3xl border border-slate-800 shadow-premium flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-raleway">Emergency Standby Desk</h3>
              <p className="text-slate-400 text-sm font-poppins leading-relaxed">
                Contact our hotlines immediately in case of cardiac arrests, trauma, neonatal emergencies, or deceased homenage services.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-brandBlue shrink-0 mt-1" />
                  <div>
                    <h5 className="font-bold text-sm uppercase text-brandBlue">HQ Address</h5>
                    <p className="text-slate-300 text-sm font-poppins leading-normal mt-1">
                      {pageContent.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-brandBlue shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm uppercase text-brandBlue">Email Desk</h5>
                    <p className="text-slate-300 text-sm font-poppins mt-1">
                      {pageContent.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-brandBlue shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-sm uppercase text-brandBlue">Emergency Hotlines</h5>
                    <div className="space-y-1.5 mt-1">
                      <a href={`tel:${pageContent.phone_1?.replace(/\s/g, '')}`} className="block text-white text-base font-extrabold hover:text-brandBlue transition-colors">
                        {pageContent.phone_1}
                      </a>
                      <a href={`tel:${pageContent.phone_2?.replace(/\s/g, '')}`} className="block text-slate-300 text-sm font-semibold hover:text-brandBlue">
                        {pageContent.phone_2}
                      </a>
                      <a href="tel:+918124677777" className="block text-slate-300 text-sm font-semibold hover:text-brandBlue">
                        +91 81246 77777
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Frame */}
        <div className="rounded-3xl overflow-hidden shadow-premium border border-slate-200 h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4149.3339431733475!2d80.229432!3d13.086162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52642b6355d069%3A0xe71be692f25c9107!2sFlyinng%20Squad%20Ambulance%20Service!5e1!3m2!1sen!2sin!4v1778574925802!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            title="Flying Squad Ambulance Service Map location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
