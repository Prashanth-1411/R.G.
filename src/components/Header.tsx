import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Ambulance } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        isScrolled
          ? 'glass-nav shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <AnimatedLink to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-[#0F4CFF] rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <Ambulance className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#0F172A]">
                R.G. <span className="text-[#0F4CFF]">AMBULANCE</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase font-bold tracking-[0.15em] text-slate-400 -mt-0.5">
                ICU on Wheels
              </span>
            </div>
          </AnimatedLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <AnimatedLink
                key={item.name}
                to={item.path}
                className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-[#0F4CFF] bg-[#0F4CFF]/5'
                    : 'text-slate-600 hover:text-[#0F4CFF] hover:bg-slate-50'
                }`}
              >
                {item.name}
              </AnimatedLink>
            ))}
          </nav>

          {/* Emergency CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="tel:+919551663530"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg font-bold text-sm transition-all duration-200 shadow-sm"
            >
              <Phone className="w-4 h-4" />
              <span>24/7: 95516 63530</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 hover:text-[#0F4CFF] rounded-lg hover:bg-slate-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <AnimatedLink
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    isActive(item.path)
                      ? 'bg-[#0F4CFF]/5 text-[#0F4CFF]'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-[#0F4CFF]'
                  }`}
                >
                  {item.name}
                </AnimatedLink>
              ))}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <a
                  href="tel:+919551663530"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#DC2626] text-white rounded-lg font-bold text-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 24/7 Emergency</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
