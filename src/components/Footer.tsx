import React from 'react';
import { Phone, Mail, MapPin, Ambulance, Heart, ChevronRight } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'Ambulance Services', path: '/ambulance-services' },
        { name: 'Funeral Care', path: '/funeral-services' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Ambulance Fleet',
      links: [
        { name: 'Basic Life Support', path: '/ambulance-services' },
        { name: 'Advanced Life Support', path: '/ambulance-services' },
        { name: 'Neonatal Transport', path: '/ambulance-services' },
        { name: 'ICU Ventilator', path: '/ambulance-services' },
        { name: 'Patient Transport', path: '/ambulance-services' },
        { name: 'Cardiac Care', path: '/ambulance-services' },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden bg-navy-900 text-navy-300">
      {/* Background Pattern */}
      <div className="absolute inset-0 split-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl premium-gradient flex items-center justify-center shadow-glow">
                <Ambulance className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-xl text-white font-display">
                  R.G. <span className="text-brand-400">AMBULANCE</span>
                </span>
                <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-navy-400">
                  Emergency Medical Services
                </p>
              </div>
            </div>
            <p className="text-sm text-navy-400 leading-relaxed">
              Advanced ICU ambulances, trained medical staff, and rapid emergency response across India. 
              Trusted by thousands for emergency medical transport and dignified funeral services since 2014.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-brand-500/20 border-2 border-navy-900 flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-brand-400">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-xs text-navy-400">
                <span className="text-brand-400 font-bold">2k+</span> Happy Patients
              </span>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="lg:col-span-2">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
                {column.title}
              </h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <AnimatedLink
                      to={link.path}
                      className="group flex items-center gap-2 text-sm text-navy-400 hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-3 h-3 text-brand-500 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      <span>{link.name}</span>
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Contact 24/7
            </h4>
            <div className="space-y-5">
              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
                  <MapPin className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-navy-500 font-medium uppercase tracking-wider">Address</p>
                  <p className="text-sm text-navy-300 group-hover:text-white transition-colors">
                    Surapet, Chennai, Tamil Nadu 600066
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
                  <Mail className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-navy-500 font-medium uppercase tracking-wider">Email</p>
                  <a
                    href="mailto:ebenezer.r@rgambulanceservice.com"
                    className="text-sm text-navy-300 hover:text-white transition-colors break-all"
                  >
                    ebenezer.r@rgambulanceservice.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 group">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center shrink-0 group-hover:bg-brand-500/20 transition-colors">
                  <Phone className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <p className="text-xs text-navy-500 font-medium uppercase tracking-wider">Emergency Hotline</p>
                  <a
                    href="tel:+919551663530"
                    className="block text-base text-white font-bold hover:text-brand-400 transition-colors"
                  >
                    +91 95516 63530
                  </a>
                  <a
                    href="tel:+918778481556"
                    className="block text-sm text-navy-400 hover:text-white transition-colors"
                  >
                    +91 87784 81556
                  </a>
                </div>
              </div>
            </div>

            {/* Trust Badge */}
            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 inline-flex items-center gap-3">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-xs text-navy-300">
                <span className="text-white font-semibold">ISO 9001:2015 Certified</span>
                <br />Govt. Approved Emergency Services
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-navy-500">
          <p>
            &copy; {currentYear} R.G. Ambulance Service. All rights reserved.
          </p>
          <p className="text-center">
            Built with care for emergency medical services across India.
            <span className="inline-block ml-2 text-red-400 animate-pulse-soft">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
