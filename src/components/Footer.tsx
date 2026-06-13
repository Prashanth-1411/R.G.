import React from 'react';
import { Phone, Mail, MapPin, Ambulance } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#0F4CFF] rounded-lg flex items-center justify-center">
                <Ambulance className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">
                R.G. <span className="text-[#0F4CFF]">AMBULANCE</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Advanced ICU ambulances, trained medical staff, and rapid emergency response across India. Trusted by thousands for emergency medical transport and dignified funeral services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><AnimatedLink to="/" className="hover:text-white transition-colors">Home</AnimatedLink></li>
              <li><AnimatedLink to="/ambulance-services" className="hover:text-white transition-colors">Ambulance Services</AnimatedLink></li>
              <li><AnimatedLink to="/funeral-services" className="hover:text-white transition-colors">Funeral Care</AnimatedLink></li>
              <li><AnimatedLink to="/testimonials" className="hover:text-white transition-colors">Testimonials</AnimatedLink></li>
              <li><AnimatedLink to="/blog" className="hover:text-white transition-colors">Blog</AnimatedLink></li>
              <li><AnimatedLink to="/contact" className="hover:text-white transition-colors">Contact</AnimatedLink></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Our Services</h4>
            <ul className="space-y-3 text-sm text-slate-500">
              <li>ICU Ventilator Ambulance</li>
              <li>Basic Life Support</li>
              <li>Advanced Life Support</li>
              <li>Neonatal Transport</li>
              <li>Patient Transport Vehicle</li>
              <li>Funeral & Homage Services</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-5">Contact 24/7</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#0F4CFF] shrink-0 mt-0.5" />
                <span className="text-slate-500">Surapet, Chennai, Tamil Nadu 600066</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0F4CFF] shrink-0 mt-0.5" />
                <a href="mailto:ebenezer.r@rgambulanceservice.com" className="text-slate-500 hover:text-white transition-colors">
                  ebenezer.r@rgambulanceservice.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0F4CFF] shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+919551663530" className="block text-white font-bold hover:text-[#0F4CFF] transition-colors">+91 95516 63530</a>
                  <a href="tel:+918778481556" className="block text-slate-500 hover:text-white transition-colors mt-1">+91 87784 81556</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>&copy; {currentYear} R.G. Ambulance Service. All rights reserved.</p>
          <p>Professional Emergency Medical Services</p>
        </div>
      </div>
    </footer>
  );
};
