import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldAlert } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brandNavy text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-brandBlue rounded-xl text-white">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-lg tracking-wider text-white font-raleway">
                FLYINNG <span className="text-brandBlue">SQUAD</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed font-poppins text-justify">
              Chennai's most trusted emergency care & ambulance provider since 1981. Over four decades of prompt dispatch, custom ICU designs, and compassionate funeral services.
            </p>
            <div className="flex space-x-3 pt-2">
              <a
                href="https://www.facebook.com/chennaiambulanceservices"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-brandBlue text-white transition-colors duration-300"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a
                href="https://twitter.com/FlyinngSquad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-brandBlue text-white transition-colors duration-300"
              >
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a
                href="https://www.youtube.com/channel/UC_3UfSfmRQa3d9_mlIWSJ4g"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 hover:bg-brandBlue text-white transition-colors duration-300"
              >
                <i className="fab fa-youtube text-sm"></i>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-6 font-raleway border-b border-slate-800 pb-2">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm font-poppins">
              <li>
                <Link to="/" className="hover:text-white hover:underline transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/ambulance-services" className="hover:text-white hover:underline transition-colors">Ambulance Services</Link>
              </li>
              <li>
                <Link to="/funeral-services" className="hover:text-white hover:underline transition-colors">Funeral Care</Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-white hover:underline transition-colors">Google Reviews</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white hover:underline transition-colors">Health & Homage Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-6 font-raleway border-b border-slate-800 pb-2">
              Our Services
            </h4>
            <ul className="space-y-3 text-sm font-poppins text-slate-400">
              <li>ICU Plus Ambulance</li>
              <li>Ventilator Support</li>
              <li>Pediatric Transport</li>
              <li>Interstate Transfer</li>
              <li>Basic Life Support (EECO)</li>
              <li>Hi-Tech Funeral Vans</li>
              <li>Deceased Freezer Box</li>
            </ul>
          </div>

          {/* Column 4: Emergency Contacts */}
          <div>
            <h4 className="text-white font-bold text-base uppercase tracking-wider mb-6 font-raleway border-b border-slate-800 pb-2">
              Contact 24/7
            </h4>
            <ul className="space-y-4 text-sm font-poppins">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <span className="text-slate-400 text-xs">
                  No. 69/48, Outer Circular Road, Kilpauk Garden Colony, Kilpauk, Chennai, TN 600010
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brandBlue shrink-0" />
                <a href="mailto:info@flyingsquadambulance.com" className="text-slate-400 hover:text-white transition-colors text-xs">
                  info@flyingsquadambulance.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brandBlue shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+917449177777" className="block text-white font-bold hover:text-brandBlue transition-colors text-sm">
                    +91 74491 77777
                  </a>
                  <a href="tel:+918428077777" className="block text-slate-400 hover:text-white transition-colors text-xs mt-1">
                    +91 84280 77777
                  </a>
                  <a href="tel:+918124677777" className="block text-slate-400 hover:text-white transition-colors text-xs mt-0.5">
                    +91 81246 77777
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-poppins text-slate-500">
          <p>&copy; {currentYear} Flyinng SquaD Ambulance & Homage Services. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" onClick={handleBackToTop} className="hover:text-brandBlue transition-colors">
              Back to Top ↑
            </a>
          </div>
          <p>
            Designed with Premium Excellence
          </p>
        </div>
      </div>
    </footer>
  );
};
