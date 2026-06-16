import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { AnimatedLink } from './AnimatedLink';
import { Magnetic } from './Magnetic';
import { getNavbarItems, getSiteSettings, getMediaUrl, type NavbarItem } from '../api';
import logoImg from '../assets/Logo.png';

const DEFAULT_MENU = [
  { name: 'Home', path: '/' },
  { name: 'Ambulance Services', path: '/ambulance-services' },
  { name: 'Funeral Care', path: '/funeral-services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuItems, setMenuItems] = useState(DEFAULT_MENU);
  const [logo, setLogo] = useState<string>(logoImg);
  const [logoWidth, setLogoWidth] = useState(140);
  const location = useLocation();

  useEffect(() => {
    getNavbarItems().then((items: NavbarItem[]) => {
      if (items.length > 0) {
        setMenuItems(items.map((item) => ({
          name: item.menu_name || item.label,
          path: item.menu_link || item.link,
        })));
      }
    });
    getSiteSettings().then((settings) => {
      if (settings.logo) {
        setLogo(getMediaUrl(settings.logo));
      }
      if (settings.logo_width) {
        setLogoWidth(settings.logo_width);
      }
    });
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <AnimatedLink to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="R.G. Ambulance Service"
              style={{ height: logoWidth, width: 'auto' }}
              className="object-contain transition-all duration-300 group-hover:scale-105"
            />
          </AnimatedLink>

          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => (
              <AnimatedLink
                key={item.name}
                to={item.path}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 relative ${
                  isActive(item.path)
                    ? 'text-brand-600'
                    : 'text-navy-600 hover:text-brand-600 hover:bg-brand-50'
                }`}
              >
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-brand-50 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </AnimatedLink>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Magnetic strength={0.2}>
              <a href="tel:+919551663530" className="btn-emergency !py-2.5 !px-5 text-xs">
                <Phone className="w-4 h-4" />
                <span>24/7 Emergency: 95516 63530</span>
              </a>
            </Magnetic>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <a
              href="tel:+919551663530"
              className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
              aria-label="Call 24/7"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-navy-600 hover:text-brand-600 rounded-xl hover:bg-brand-50 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="md:hidden glass border-t border-navy-100/50 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {menuItems.map((item) => (
                <AnimatedLink
                  key={item.name}
                  to={item.path}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive(item.path)
                      ? 'bg-brand-50 text-brand-600'
                      : 'text-navy-700 hover:bg-navy-50 hover:text-brand-600'
                  }`}
                >
                  {item.name}
                </AnimatedLink>
              ))}
              <div className="pt-3 border-t border-navy-100/50 space-y-2">
                <a
                  href="tel:+919551663530"
                  className="flex items-center justify-center gap-2 w-full py-3.5 premium-gradient text-white rounded-xl font-bold text-sm shadow-glow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 24/7 Emergency: 95516 63530</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
