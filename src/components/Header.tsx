import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, ShieldAlert } from 'lucide-react';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Ambulance Services', path: '/ambulance-services' },
    { name: 'Funeral Care', path: '/funeral-services' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-premium duration-300 ${
        isScrolled
          ? 'glass-nav py-3 shadow-premium border-b border-white/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-brandBlue rounded-xl text-white shadow-glow-blue group-hover:scale-105 transition-premium duration-300">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight block text-brandNavy font-raleway">
                FLYINNG <span className="text-brandBlue">SQUAD</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 block">
                Ambulance & Funeral Care
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-4 py-2 text-[14px] font-semibold tracking-wide transition-premium duration-200 rounded-full font-poppins ${
                  isActive(item.path)
                    ? 'text-brandBlue bg-brandBlue/5'
                    : 'text-slate-700 hover:text-brandBlue hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Emergency CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+917449177777"
              className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold text-sm shadow-lg shadow-red-500/20 hover:scale-105 transition-premium duration-300 animate-pulse-slow font-poppins"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>24/7 Hotline: 74491 77777</span>
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-brandNavy rounded-lg hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 border-b border-slate-100 shadow-xl overflow-hidden glass-nav"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-bold tracking-wide transition-all ${
                    isActive(item.path)
                      ? 'bg-brandBlue/10 text-brandBlue'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-brandBlue'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-100 flex flex-col space-y-3 px-4">
                <a
                  href="tel:+917449177777"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-bold shadow-lg shadow-red-500/20"
                >
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call Emergency (24/7)</span>
                </a>
                <a
                  href="https://wa.me/917449177777?text=Emergency+Ambulance+Required"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-emerald-600 text-white rounded-xl font-bold"
                >
                  {/* Whatsapp custom SVG icon */}
                  <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146zm11.225-7.22c-.104-.176-.388-.282-.813-.495-.426-.213-2.52-1.24-2.91-1.382-.39-.142-.673-.213-.956.213-.283.425-1.098 1.382-1.347 1.666-.25.282-.497.319-.923.106-.426-.213-1.8-.663-3.43-2.113-1.27-1.13-2.128-2.527-2.378-2.952-.25-.425-.027-.655.186-.867.191-.191.425-.496.638-.744.213-.248.283-.425.426-.709.141-.283.07-.531-.035-.744-.106-.213-.956-2.302-1.31-3.153-.346-.832-.7-.72-1.028-.737-.266-.013-.57-.015-.875-.015-.304 0-.8.114-1.22.567-.419.453-1.6 1.56-1.6 3.805 0 2.246 1.637 4.417 1.862 4.721.225.304 3.224 4.922 7.81 6.904 1.09.471 1.943.753 2.61.964 1.096.347 2.095.298 2.88.18.877-.13 2.52-.103 2.878-.971.359-.868.359-1.614.25-1.767z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
