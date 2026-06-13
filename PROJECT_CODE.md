# Project Code Overview

## package.json

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@types/react": "^19.2.16",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.2",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.15",
    "tailwindcss": "^3.4.17",
    "typescript": "~6.0.2",
    "vite": "^8.0.12"
  },
  "dependencies": {
    "framer-motion": "^12.40.0",
    "lucide-react": "^1.17.0",
    "nodemailer": "^8.0.10",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-router-dom": "^7.16.0"
  }
}
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "module": "ESNext",
    "skipLibCheck": true,
    "types": ["vite/client"],

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": []
}
```

## vite.config.ts

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});
```

## postcss.config.js

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: '#0F4CFF',      // Royal Blue
        brandNavy: '#0F172A',      // Corporate Navy / Dark Slate Background
        brandRed: '#DC2626',       // Medical Red
        textSlate: '#1E293B',      // Dark Slate Text
        brandGold: '#F59E0B',      // Warm Gold for stars/reviews
        brandIce: '#F8FAFC',       // Clean, professional background
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 4px 20px rgba(15, 23, 42, 0.05)',
        'premium-hover': '0 12px 30px rgba(15, 23, 42, 0.1)',
      }
    },
  },
  plugins: [],
}
```

## vercel.json

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>R.G. Ambulance Service | ICU on Wheels – Ambulance & Funeral Services Pan India</title>
    
    <!-- FontAwesome CDN for custom icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    
    <!-- Preconnect for premium typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  </head>
  <body class="bg-slate-50 text-slate-800 antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## src\main.tsx

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## src\App.tsx

```typescript
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingCTA } from './components/FloatingCTA';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { NavigationProvider, useAnimatedNavigation } from './components/NavigationContext';
import { PageTransitionLoader } from './components/PageTransitionLoader';
import { Home } from './pages/Home';
import { AmbulanceServices } from './pages/AmbulanceServices';
import { FuneralServices } from './pages/FuneralServices';
import { Testimonials } from './pages/Testimonials';
import { Blog } from './pages/Blog';
import { BlogPostDetail } from './pages/BlogPostDetail';
import { Contact } from './pages/Contact';
import { LocationPage } from './pages/LocationPage';


const MainLayout: React.FC = () => {
  const location = useLocation();
  const { showHelp, setShowHelp, shortcuts } = useKeyboardShortcuts();
  const { isNavigating } = useAnimatedNavigation();

  useEffect(() => {
    if (!isNavigating) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, isNavigating]);

  return (
    <div className="flex flex-col min-h-screen">
      <PageTransitionLoader isVisible={isNavigating} />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ambulance-services" element={<AmbulanceServices />} />
          <Route path="/funeral-services" element={<FuneralServices />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPostDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ambulance-service-in-:locationSlug" element={<LocationPage />} />
        </Routes>
      </main>
      <Footer />
      <FloatingCTA />
      <KeyboardShortcutsHelp open={showHelp} onClose={() => setShowHelp(false)} shortcuts={shortcuts} />
    </div>
  );
};

const AppWithNavigation: React.FC = () => {
  return (
    <NavigationProvider>
      <MainLayout />
    </NavigationProvider>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
};
```

## src\App.css

```css
/* App specific styles reset - all design patterns are managed via Tailwind and index.css */
```

## src\index.css

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800&family=Nunito+Sans:wght@300;400;600;700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

html, body {
  font-family: 'Inter', sans-serif;
  scroll-behavior: smooth;
  background-color: #FFFFFF;
  color: #1E293B;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
}

.glass-nav {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(15, 76, 255, 0.08);
}

.glass-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(226, 232, 240, 0.6);
}

.transition-premium {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift {
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(15, 76, 255, 0.08);
}

.section-padding {
  padding: 5rem 0;
}
@media (max-width: 640px) {
  .section-padding {
    padding: 3rem 0;
  }
}

.container-premium {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
@media (max-width: 640px) {
  .container-premium {
    padding: 0 1rem;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #0F4CFF;
  color: white;
  font-weight: 700;
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-primary:hover {
  background: #0A3DCC;
  box-shadow: 0 4px 15px rgba(15, 76, 255, 0.25);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: white;
  color: #0F4CFF;
  font-weight: 700;
  border-radius: 0.5rem;
  border: 2px solid #E2E8F0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-secondary:hover {
  border-color: #0F4CFF;
  background: #F8FAFC;
}

.btn-emergency {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  background: #DC2626;
  color: white;
  font-weight: 700;
  border-radius: 0.5rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.btn-emergency:hover {
  background: #B91C1C;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1.2;
  margin-bottom: 0.75rem;
}
@media (max-width: 640px) {
  .section-title {
    font-size: 1.5rem;
  }
}

.section-subtitle {
  font-size: 1rem;
  color: #64748B;
  line-height: 1.6;
  max-width: 600px;
}
@media (max-width: 640px) {
  .section-subtitle {
    font-size: 0.875rem;
  }
}
```

## src\types.ts

```typescript
export interface AmbulanceService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image_path: string;
  features: string[];
  order: number;
}

export interface FuneralService {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  icon: string;
  image_path: string;
  features: string[];
  order: number;
}

export interface ServiceArea {
  id: number;
  name: string;
  slug: string;
  description: string;
  content_html: string;
  faqs: { question: string; answer: string }[];
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  is_active: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  featured_image: string;
  category: string;
  tags: string;
  meta_title: string;
  meta_description: string;
  status: 'draft' | 'published';
  created_at: string;
}

export interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  rating: number;
  verification_url: string;
  is_approved: boolean;
  order: number;
  created_at: string;
}

export interface Booking {
  id: number;
  name: string;
  phone: string;
  pickup_location: string;
  destination: string;
  service_type: 'Ambulance' | 'Funeral';
  service_name: string;
  booking_date: string;
  notes: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ContactLead {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  requirements: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  created_at: string;
}

export interface WhatsAppLead {
  id: number;
  phone: string;
  source_page: string;
  prefilled_message: string;
  created_at: string;
}

export interface SEOPage {
  id: number;
  page_name: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  og_title: string;
  og_description: string;
  og_image: string;
  schema_markup: any;
  faq_schema: any;
  page_content?: Record<string, string>;
}
```

## src\vite-env.d.ts

```typescript
/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}
```

## src\components\AnimatedLink.tsx

```typescript
import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { useAnimatedNavigation } from './NavigationContext';

interface AnimatedLinkProps extends LinkProps {
  children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, onClick, children, ...props }) => {
  const { navigateWithAnimation } = useAnimatedNavigation();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    e.preventDefault();
    navigateWithAnimation(to as string);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
```

## src\components\FloatingCTA.tsx

```typescript
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const location = useLocation();

  const handleWhatsAppClick = () => {
    const phoneNumber = '918778481556';
    const text = `Hi R.G. Ambulance Service, I am visiting the website page (${window.location.origin}${location.pathname}) and need emergency assistance. Please reply.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Desktop Floating Buttons */}
      <div className="fixed right-5 bottom-24 z-40 hidden sm:flex flex-col gap-3">
        <button
          onClick={handleWhatsAppClick}
          className="w-12 h-12 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          title="Chat on WhatsApp"
        >
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146z" />
          </svg>
        </button>

        <a
          href="tel:+919551663530"
          className="w-12 h-12 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-105"
          title="Call 24/7 Emergency"
        >
          <Phone className="w-5 h-5" />
        </a>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 py-3 px-4 z-40 sm:hidden grid grid-cols-2 gap-3 shadow-lg">
        <a
          href="tel:+919551663530"
          className="flex items-center justify-center gap-2 py-2.5 bg-[#DC2626] text-white rounded-lg font-bold text-sm shadow-sm"
        >
          <Phone className="w-4 h-4" />
          <span>Call 24/7</span>
        </a>
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-lg font-bold text-sm shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp</span>
        </button>
      </div>
    </>
  );
};
```

## src\components\Footer.tsx

```typescript
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
```

## src\components\Header.tsx

```typescript
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
```

## src\components\ImageHover.tsx

```typescript
import React from 'react';

export const ImageHover: React.FC<{
  src: string;
  alt: string;
  children: React.ReactNode;
  className?: string;
}> = ({ src, alt, children, className }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-[#0F4CFF]/10 hover:scale-[1.02] active:scale-[0.98] ${className || ''}`}>
      {children}
      <div className="absolute inset-0 bg-[#0F4CFF]/0 group-hover:bg-[#0F4CFF]/5 transition-all duration-300" />
    </div>
  );
};
```

## src\components\KeyboardShortcutsHelp.tsx

```typescript
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Shortcut {
  keys: string;
  description: string;
  category: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  shortcuts: Shortcut[];
}

const categoryOrder = [
  'Help', 'Navigation', 'Quick Actions', 'Scrolling',
  'Home Page', 'Ambulance Services', 'Funeral Services',
  'Blog', 'Blog Detail', 'Contact', 'Testimonials',
  'Location Page', 'Footer'
];

export const KeyboardShortcutsHelp: React.FC<Props> = ({ open, onClose, shortcuts }) => {
  const grouped = categoryOrder
    .map(cat => ({
      category: cat,
      items: shortcuts.filter(s => s.category === cat)
    }))
    .filter(g => g.items.length > 0);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/70 backdrop-blur-sm"
          ></motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto mx-2"
          >
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 rounded-t-3xl">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] font-raleway">Keyboard Shortcuts</h2>
                <p className="text-xs text-slate-400 font-poppins mt-0.5">Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px] font-bold">?</kbd> to toggle this panel</p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-600" />
              </button>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {grouped.map(group => (
                <div key={group.category}>
                  <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#0F4CFF] mb-3 font-poppins">
                    {group.category}
                  </h3>
                  <div className="space-y-1.5">
                    {group.items.map((s, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 px-2 -mx-2 rounded-lg hover:bg-slate-50">
                        <span className="text-xs text-slate-600 font-poppins">{s.description}</span>
                        <kbd className="ml-3 px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-mono font-bold border border-slate-200 shrink-0">
                          {formatKeys(s.keys)}
                        </kbd>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="pt-3 text-center">
                <p className="text-[10px] text-slate-400 font-poppins">
                  Two-key sequences: press keys one after the other within 1 second
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

function formatKeys(keys: string): string {
  return keys
    .replace(/Shift\+/g, '⇧+')
    .replace(/Backspace/g, '⌫')
    .replace(/Escape/g, 'Esc')
    .replace(/Space/g, '␣')
    .replace(/ArrowUp/g, '↑')
    .replace(/ArrowDown/g, '↓')
    .replace(/ArrowLeft/g, '←')
    .replace(/ArrowRight/g, '→');
}
```

## src\components\NavigationContext.tsx

```typescript
import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavigationContextType {
  isNavigating: boolean;
  navigateWithAnimation: (to: string) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export const useAnimatedNavigation = () => {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useAnimatedNavigation must be used within NavigationProvider');
  return ctx;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navigateWithAnimation = useCallback((to: string) => {
    if (isNavigating) return;
    setIsNavigating(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      navigate(to);
      setTimeout(() => {
        setIsNavigating(false);
      }, 300);
    }, 600);
  }, [navigate, isNavigating]);

  return (
    <NavigationContext.Provider value={{ isNavigating, navigateWithAnimation }}>
      {children}
    </NavigationContext.Provider>
  );
};
```

## src\components\PageTransitionLoader.tsx

```typescript
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransitionLoaderProps {
  isVisible: boolean;
}

export const PageTransitionLoader: React.FC<PageTransitionLoaderProps> = ({ isVisible }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
    } else {
      const t = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#0F4CFF] rounded-lg flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-bold text-[#0F172A]">R.G. <span className="text-[#0F4CFF]">AMBULANCE</span></div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">ICU on Wheels</div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="w-48"
            >
              <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#0F4CFF] rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
```

## src\components\ScrollingAmbulance.tsx

```typescript
import React, { useEffect, useState } from 'react';

export const ScrollingAmbulance: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftPos = 2 + progress * 76;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none h-1">
      <div className="relative max-w-7xl mx-auto h-full px-4">
        <div className="absolute inset-0 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0F4CFF] rounded-full transition-none"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 transition-none"
          style={{ left: `${leftPos}%` }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#0F4CFF" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="6" width="18" height="10" rx="2" fill="#0F4CFF" />
            <rect x="2" y="6" width="18" height="10" rx="2" stroke="white" strokeWidth="0.5" />
            <rect x="2" y="12" width="18" height="4" fill="#DC2626" />
            <path d="M16 6 L19 6 L21 3 L21 2 L17 2 L16 4 Z" fill="#E8EDF2" />
            <rect x="5" y="8" width="4" height="3" rx="0.5" fill="#1E3A5F" opacity="0.5" />
            <rect x="11" y="8" width="4" height="3" rx="0.5" fill="#1E3A5F" opacity="0.5" />
            <circle cx="7" cy="17" r="2.5" fill="#1E293B" />
            <circle cx="7" cy="17" r="2" fill="#2D3748" />
            <circle cx="7" cy="17" r="1" fill="#94A3B8" />
            <circle cx="15" cy="17" r="2.5" fill="#1E293B" />
            <circle cx="15" cy="17" r="2" fill="#2D3748" />
            <circle cx="15" cy="17" r="1" fill="#94A3B8" />
            <rect x="19" y="10" width="2" height="6" rx="0.5" fill="#EF4444" opacity="0.8" />
          </svg>
        </div>
      </div>
    </div>
  );
};
```

## src\pages\Home.tsx

```typescript
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Phone, MapPin, Send, Plus, ChevronDown, Ambulance, Calendar, 
  Clock, ShieldCheck, Award, CheckCircle2, Users, Heart, Shield 
} from 'lucide-react';
import { ImageHover } from '../components/ImageHover';
import { ambulanceServices } from '../data/ambulance-services';
import { funeralServices } from '../data/funeral-services';
import { serviceAreas } from '../data/service-areas';
import heroImg from '../assets/2.jpg';
import fleet1 from '../assets/1.jpg';
import fleet2 from '../assets/2.jpg';
import fleet4 from '../assets/4.jpg';
import fleet8a from '../assets/8a.jpg';

const AnimatedCounter: React.FC<{ end: number; duration?: number; label: string; suffix?: string }> = ({
  end, duration = 1500, label, suffix = ""
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let startTime: number | null = null;
          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) window.requestAnimationFrame(step);
          };
          window.requestAnimationFrame(step);
        }
      },
      { rootMargin: '-100px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm transition-all duration-200">
      <span className="text-4xl md:text-5xl font-extrabold text-[#0F4CFF] font-inter block mb-2">
        {count}{suffix}
      </span>
      <p className="text-slate-600 font-semibold text-xs md:text-sm leading-relaxed font-poppins">{label}</p>
    </div>
  );
};

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [searchLocation, setSearchLocation] = useState('');

  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '',
    serviceType: 'Ambulance', serviceName: 'Basic Life Support Ambulance',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: ''
  });
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSending, setContactSending] = useState(false);

  const locations = serviceAreas.map(s => ({ name: s.name, slug: s.slug }));
  const homeAmbulanceServices = ambulanceServices.slice(0, 3);
  const homeFuneralServices = funeralServices.slice(0, 3);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setBookingForm({
      name: '', phone: '', pickup: '', destination: '',
      serviceType: 'Ambulance', serviceName: 'Basic Life Support Ambulance',
      date: new Date().toISOString().split('T')[0], notes: ''
    });
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactSending(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      if (!response.ok) throw new Error('Failed to send');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } catch {
      const subject = `Inquiry from ${contactForm.name} - ${contactForm.requirements} Service`;
      const body = `Name: ${contactForm.name}%0AEmail: ${contactForm.email}%0APhone: ${contactForm.phone}%0AAddress: ${contactForm.address || 'N/A'}%0AService Required: ${contactForm.requirements}%0AMessage: ${contactForm.message}`;
      window.open(`mailto:ebenezer.r@rgambulanceservice.com?subject=${encodeURIComponent(subject)}&body=${body}`, '_blank');
      setContactSuccess(true);
      setContactForm({ name: '', email: '', phone: '', address: '', requirements: 'Ambulance', message: '' });
    } finally {
      setContactSending(false);
    }
  };

  const filteredLocations = locations.filter(l =>
    l.name.toLowerCase().includes(searchLocation.toLowerCase())
  );
  const displayedLocations = showAllLocations ? filteredLocations : filteredLocations.slice(0, 16);

  return (
    <div className="pt-20">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-slate-50 overflow-hidden py-16 sm:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#0F4CFF]/10 text-[#0F4CFF] rounded-full text-xs font-bold uppercase tracking-wider font-poppins">
                  <span className="w-1.5 h-1.5 bg-[#DC2626] rounded-full"></span>
                  24/7 Dispatch Desk Active
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold uppercase tracking-wider border border-slate-200 font-poppins">
                  Pan India Service
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] font-inter leading-tight tracking-tight">
                24/7 Emergency Ambulance & Funeral Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-poppins max-w-2xl text-justify">
                Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India. Trust R.G. Ambulance Service for immediate clinical transfers and dignified funeral arrangements.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 font-poppins">
                <a href="tel:+919551663530" className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-8 py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-all duration-200 text-sm sm:text-base">
                  <Phone className="w-5 h-5 fill-white" />
                  <span>Call Now: +91 95516 63530</span>
                </a>
                <a href="#booking-sec" className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm transition-all duration-200 text-sm sm:text-base">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  <span>Book Ambulance</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-5 pt-4 border-t border-slate-200/60 font-poppins">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Govt. Approved</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative hidden md:block">
              <ImageHover src={heroImg} alt="Modern ICU Ambulance with emergency response team">
                <img src={heroImg} alt="Modern ICU Ambulance with emergency response team" className="w-full h-[450px] object-cover" />
              </ImageHover>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Trust Badges */}
      <section className="bg-white py-6 border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Clock className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">12-Min Quick Dispatch</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Shield className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Sterilized ICU Fleet</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Users className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Certified Paramedics</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-slate-700">
              <Award className="w-5 h-5 text-[#0F4CFF] shrink-0" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider">Govt. Registered</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Statistics */}
      <section className="bg-slate-50 py-12 sm:py-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <AnimatedCounter end={12} label="Years of Experience" suffix="+" />
            <AnimatedCounter end={34} label="Active Medical Vehicles" suffix="+" />
            <AnimatedCounter end={8200} label="Patients Safely Transferred" suffix="+" />
            <AnimatedCounter end={100} label="Service Locations" suffix="%" />
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Why Healthcare Providers & Families Trust Us
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
              In medical emergencies, every second counts. We maintain the highest standards of safety, clinical expertise, and response velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Rapid Dispatch Stations</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Ambulances positioned at strategic hubs across the city to drastically reduce arrival times. Dispatch begins within 2 minutes of call confirmation.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Full ICU Capabilities</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Equipped with mechanical ventilators, defibrillators, oxygen supply, cardiac monitors, and infusion pumps. A mobile ICU ready for critical care transfers.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Certified Medical Staff</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Our team consists of certified critical care paramedics, emergency nurses, and experienced drivers who undergo regular clinical skill assessments.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#0F172A] font-inter">Dignified Funeral Care</h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed text-justify">
                Compassionate handling of final journeys with temperature-controlled AC hearse vans, deceased preservation boxes, and full ritual support coordinates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Services */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Professional Emergency Services
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed">
              Equipped with certified medical gear and designed for safety, comfort, and absolute compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                  <Ambulance className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] font-inter">Emergency Ambulance Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">
                  From emergency ICU patient transfers to basic life support transports. Our advanced ambulance fleet is fully equipped with portable ventilators, cardiac setups, pediatric support, and long-range transport tracking tools.
                </p>
                <ul className="space-y-3 font-poppins">
                  {homeAmbulanceServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-3.5 text-slate-700 text-sm font-semibold">
                      <Plus className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-slate-100">
                <button onClick={() => navigate('/ambulance-services')} className="inline-flex items-center justify-center w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">
                  View All Ambulance Models →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/60 flex flex-col justify-between shadow-sm">
              <div className="space-y-6">
                <div className="w-12 h-12 bg-[#0F4CFF]/10 text-[#0F4CFF] flex items-center justify-center rounded-xl">
                  <Heart className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F172A] font-inter">Dignified Funeral Services</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">
                  Arranging respectful final homages and processions. We provide hi-tech air-conditioned funeral vehicles, deceased freezer boxes, custom casket arrangements, and complete ceremonial documentation management.
                </p>
                <ul className="space-y-3 font-poppins">
                  {homeFuneralServices.map((s) => (
                    <li key={s.id} className="flex items-center gap-3.5 text-slate-700 text-sm font-semibold">
                      <Plus className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-8 mt-6 border-t border-slate-100">
                <button onClick={() => navigate('/funeral-services')} className="inline-flex items-center justify-center w-full py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold border border-slate-200 rounded-xl text-sm transition-all duration-200">
                  View Homage Services →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Fleet Gallery */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] tracking-tight font-inter sm:text-4xl">
              Our Active Fleet Gallery
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed">
              Clean, fully customized emergency response and funeral transport vehicles ready for immediate deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet1} alt="ICU Ventilator Ambulance">
                  <img src={fleet1} alt="ICU Ventilator Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">ICU Ventilator Ambulance</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Full intensive care support with advanced monitoring rigs.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet2} alt="Basic Life Support Ambulance">
                  <img src={fleet2} alt="Basic Life Support Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">Basic Life Support Rig</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Oxygen-equipped transport fleet for stable patient transfers.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet4} alt="NICU Pediatric Ambulance">
                  <img src={fleet4} alt="NICU Pediatric Ambulance" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">Neonatal NICU Ambulance</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Temperature-controlled portable incubator setups for newborns.</p>
              </div>
            </div>

            <div className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm font-poppins">
              <div className="h-48 overflow-hidden">
                <ImageHover src={fleet8a} alt="AC Funeral Hearse Van">
                  <img src={fleet8a} alt="AC Funeral Hearse Van" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </ImageHover>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-[#0F172A] text-base font-inter">AC Funeral Hearse Van</h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">Dignified, air-conditioned vehicle for funeral processions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Emergency Contact Banner */}
      <section className="bg-[#DC2626] text-white py-12 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center lg:text-left">
              <span className="bg-white/10 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">
                24/7 Rapid Emergency Support
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-inter">
                Need Immediate Emergency Dispatch?
              </h3>
              <p className="text-xs sm:text-sm text-red-100 max-w-xl">
                Our medical coordinators are online 24/7. Call our dedicated lines to dispatch a fully equipped ICU ambulance to your location immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto font-poppins text-sm">
              <a href="tel:+919551663530" className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#DC2626] font-black rounded-xl shadow-md w-full sm:w-auto hover:bg-slate-50 transition-all duration-200">
                <Phone className="w-5 h-5 fill-[#DC2626]" />
                <span>Call Hotline: +91 95516 63530</span>
              </a>
              <a href="https://wa.me/918778481556?text=Emergency+Ambulance+Required" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-extrabold rounded-xl shadow-md w-full sm:w-auto hover:bg-[#1ebd59] transition-all duration-200">
                <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Booking Form */}
      <section id="booking-sec" className="py-16 sm:py-24 bg-[#0F172A] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold tracking-tight font-inter sm:text-4xl">
              24/7 Digital Dispatch Reservation
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-400 font-poppins text-xs sm:text-sm leading-relaxed">
              Submit patient and route coordinates below. Our dispatch coordinator will telephone you within 3 minutes to verify standby availability.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 text-center space-y-4">
              <span className="text-5xl">✅</span>
              <h3 className="text-2xl font-bold font-inter">Booking Registration Complete</h3>
              <p className="text-slate-300 font-poppins text-sm">
                Our emergency response desk is reviewing your request. We will contact you at your phone number shortly to verify.
              </p>
              <button onClick={() => setBookingSuccess(false)} className="px-6 py-2.5 bg-[#0F4CFF] text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-200">
                Book Another Trip
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/50 p-6 sm:p-10 rounded-2xl border border-slate-700/50">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Patient / Contact Name</label>
                <input type="text" required placeholder="Enter contact name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Mobile Phone Number</label>
                <input type="tel" required placeholder="Enter active phone number" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Pickup Location</label>
                <input type="text" required placeholder="e.g. Anna Nagar Central" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Destination Clinic/Hospital</label>
                <input type="text" required placeholder="e.g. Apollo Hospital Greams Road" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Service Category</label>
                <select value={bookingForm.serviceType} onChange={e => setBookingForm({...bookingForm, serviceType: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm">
                  <option value="Ambulance">Ambulance</option>
                  <option value="Funeral">Funeral Homage</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Target Vehicle</label>
                <input type="text" placeholder="e.g. ICU Plus Ambulance" value={bookingForm.serviceName} onChange={e => setBookingForm({...bookingForm, serviceName: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Transit Date</label>
                <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-poppins">Special Diagnosis / Requests</label>
                <input type="text" placeholder="Ventilator, oxygen supply rates, etc." value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-white text-sm" />
              </div>

              <div className="md:col-span-2 pt-4">
                <button type="submit" className="w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-black rounded-xl text-sm transition-all duration-200">
                  Submit Booking Request
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 9. Service Coverage */}
      <section className="py-16 sm:py-24 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Our Service Coverage Area
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed px-2">
              We provide active ambulance dispatch and funeral care solutions across India. Select your Chennai locality for nearby response times.
            </p>
            <div className="mt-6 max-w-md mx-auto px-4 sm:px-0 font-poppins">
              <input type="text" placeholder="Search your location..." value={searchLocation} onChange={e => { setSearchLocation(e.target.value); setShowAllLocations(true); }} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none bg-white text-sm shadow-sm text-slate-800" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 font-poppins">
            {displayedLocations.map((loc, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/ambulance-service-in-${loc.slug}`)}
                className="flex items-center gap-2 p-3.5 bg-white hover:bg-[#0F4CFF] hover:text-white rounded-xl border border-slate-200/80 shadow-sm transition-all duration-200 font-semibold text-slate-700 text-xs sm:text-sm text-left"
              >
                <MapPin className="w-4 h-4 shrink-0 text-[#0F4CFF]" />
                <span className="truncate">{loc.name}</span>
              </button>
            ))}
          </div>

          <div className="text-center mt-10">
            <button onClick={() => setShowAllLocations(!showAllLocations)} className="inline-flex items-center gap-1.5 px-6 py-3 bg-white text-slate-800 font-bold rounded-xl border border-slate-200 shadow-sm text-sm hover:bg-slate-50 transition-all font-poppins">
              <span>{showAllLocations ? "Show Fewer Localities" : "Show All 100+ Chennai Locations"}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showAllLocations ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className="py-16 sm:py-24 bg-white border-b border-slate-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Verified Family Testimonials
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 text-xs sm:text-sm leading-relaxed">
              Read stories of our clinical care support and prompt response from families who have trusted us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "I cannot thank R.G. Ambulance enough for their swift response when my father had a medical emergency. The ICU ambulance arrived within 12 minutes, and the paramedics stabilized him on the way to Apollo Hospital. Truly life-saving service."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">RK</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Rajesh Kumar</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Family Member, Chennai</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "Used their funeral services for my grandmother's last rites. The AC hearse van was well-maintained. The attendants handled everything with utmost respect and sensitivity, helping us through all the documentation."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">PS</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Priya Sharma</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Patient, Anna Nagar</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic text-justify">
                  "We have collaborated with R.G. Ambulance for patient transfers from our facility. Their ICU ambulances are extremely well-equipped and their paramedics are highly trained. Punctual and clinical."
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0F4CFF]/15 rounded-full flex items-center justify-center font-extrabold text-[#0F4CFF] text-sm">DN</div>
                <div>
                  <h4 className="font-bold text-[#0F172A] text-xs sm:text-sm font-inter">Dr. Senthil Nathan</h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Medical Director, KMC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Get in Touch */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0F172A] font-inter sm:text-4xl">
              Get in Touch
            </h2>
            <div className="h-1 w-16 bg-[#0F4CFF] mx-auto mt-4 rounded-full"></div>
            <p className="mt-4 text-slate-500 font-poppins text-xs sm:text-sm leading-relaxed">
              Questions, comments or special requests? We are here to help. Reach out to us at <a href="mailto:ebenezer.r@rgambulanceservice.com" className="text-[#0F4CFF] font-semibold hover:underline">ebenezer.r@rgambulanceservice.com</a>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch">
            <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              {contactSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center my-auto font-poppins">
                  <span className="text-4xl block mb-2">📩</span>
                  <h4 className="text-xl font-bold text-slate-800 font-inter">Inquiry Received</h4>
                  <p className="text-slate-500 text-xs sm:text-sm mt-2">
                    Thank you. We have saved your requirements and will reach out to you within the business hour.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-5 font-poppins">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" required placeholder="Your Name" value={contactForm.name} onChange={e => setContactForm({...contactForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                    <input type="email" required placeholder="Your Mail" value={contactForm.email} onChange={e => setContactForm({...contactForm, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="tel" required placeholder="Mobile Number" value={contactForm.phone} onChange={e => setContactForm({...contactForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                    <input type="text" placeholder="Address" value={contactForm.address} onChange={e => setContactForm({...contactForm, address: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800" />
                  </div>
                  <select value={contactForm.requirements} onChange={e => setContactForm({...contactForm, requirements: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm text-slate-800">
                    <option value="Ambulance">Ambulance Service</option>
                    <option value="Funeral">Funeral Care</option>
                  </select>
                  <textarea required rows={4} placeholder="Description of Requirement" value={contactForm.message} onChange={e => setContactForm({...contactForm, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm resize-none text-slate-800"></textarea>
                  <button type="submit" disabled={contactSending} className="flex items-center justify-center gap-2 w-full py-4 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">
                    {contactSending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Inquiry</>}
                  </button>
                </form>
              )}
            </div>

            <div className="lg:col-span-6 rounded-2xl overflow-hidden shadow-sm border border-slate-200/60 min-h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.123456789!2d80.1607!3d13.0812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526f5b4b4b4b4b%3A0x123456789!2sSurapet%2C%20Chennai%2C%20Tamil%20Nadu%20600066!5e1!3m2!1sen!2sin!4v1"
                width="100%" height="100%" style={{ border: 0 }} allowFullScreen={true} loading="lazy"
                title="R.G. Ambulance Service Location in Surapet Chennai"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
```

## src\pages\AmbulanceServices.tsx

```typescript
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Ambulance, X, Phone, Calendar } from 'lucide-react';
import { ambulanceServices } from '../data/ambulance-services';
import fallbackImg from '../assets/1.jpg';
import { ImageHover } from '../components/ImageHover';

export const AmbulanceServices: React.FC = () => {
  const [services] = useState(ambulanceServices);
  const [selectedService, setSelectedService] = useState<typeof ambulanceServices[number] | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '', serviceName: '',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const openBookingModal = (serviceTitle: string) => {
    setBookingForm(prev => ({ ...prev, serviceName: serviceTitle }));
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingForm({ name: '', phone: '', pickup: '', destination: '', serviceName: '', date: new Date().toISOString().split('T')[0], notes: '' });
    }, 3000);
  };

  const getImage = (path: string) => path || fallbackImg;

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">Ambulance Fleet</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            Our comprehensive medical fleet is ready 24/7, providing certified Basic Life Support, neonatal incubators, high-flow ventilators, and interstate transits.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((s, idx) => (
            <div
              key={s.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col justify-between hover-lift"
            >
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <ImageHover src={getImage(s.image_path)} alt={s.title}>
                    <img src={getImage(s.image_path)} alt={s.title} className="w-full h-full object-cover" />
                  </ImageHover>
                  <div className="absolute top-4 left-4 bg-[#0F4CFF] text-white p-2 rounded-lg shadow-sm">
                    <Ambulance className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-inter">{s.title}</h3>
                  <p className="text-slate-500 font-poppins text-xs font-semibold uppercase tracking-wider">{s.short_description}</p>
                  <p className="text-slate-600 text-sm font-poppins line-clamp-3 text-justify">{s.description}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {s.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0F4CFF]/5 text-[#0F4CFF] text-[10px] font-bold rounded-lg font-poppins">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedService(s)}
                    className="py-2.5 text-center text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl font-poppins transition-all duration-200"
                  >
                    Learn Details
                  </button>
                  <button
                    onClick={() => openBookingModal(s.title)}
                    className="py-2.5 text-center text-white bg-[#0F4CFF] hover:bg-blue-700 text-xs font-bold rounded-xl font-poppins transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 pt-16 sm:pt-20 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-inter">{selectedService.title}</h2>
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#0F4CFF] font-poppins">Diagnosis & Scope</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">{selectedService.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-[#0F4CFF] font-poppins">Features & Equipment</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 text-sm font-semibold font-poppins">
                      <ShieldCheck className="w-4 h-4 text-[#0F4CFF] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  onClick={() => { const t = selectedService.title; setSelectedService(null); openBookingModal(t); }}
                  className="flex-1 py-3.5 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm"
                >
                  Request Booking
                </button>
                <a href="tel:+919551663530" className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setBookingModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full relative z-10">
            <button onClick={() => setBookingModalOpen(false)} className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-inter mb-1">Book: {bookingForm.serviceName}</h2>
            <p className="text-xs text-slate-400 font-poppins mb-6">Fill the patient coordinates below.</p>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-4xl">✅</span>
                <h3 className="text-lg font-bold text-slate-800 font-inter">Booking Registered</h3>
                <p className="text-xs text-slate-500 font-poppins">Dispatch desk will telephone you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-poppins">
                <input type="text" required placeholder="Contact Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="tel" required placeholder="Contact Phone" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Pickup Location" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Destination Hospital" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                  <input type="text" placeholder="Notes (Optional)" value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-[#0F4CFF] hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200">Submit Booking Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
```

## src\pages\FuneralServices.tsx

```typescript
import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Heart, X, Phone } from 'lucide-react';
import { funeralServices } from '../data/funeral-services';
import fallbackImg from '../assets/8a.jpg';
import { ImageHover } from '../components/ImageHover';

export const FuneralServices: React.FC = () => {
  const [services] = useState(funeralServices);
  const [selectedService, setSelectedService] = useState<typeof funeralServices[number] | null>(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '', phone: '', pickup: '', destination: '', serviceName: '',
    date: new Date().toISOString().split('T')[0], notes: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const openBookingModal = (serviceTitle: string) => {
    setBookingForm(prev => ({ ...prev, serviceName: serviceTitle }));
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingModalOpen(false);
      setBookingForm({ name: '', phone: '', pickup: '', destination: '', serviceName: '', date: new Date().toISOString().split('T')[0], notes: '' });
    }, 3000);
  };

  const getImage = (path: string) => path || fallbackImg;

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">Funeral & Homage Care</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            We handle final farewells with absolute respect, precision, and dignity. Serving with decorated hearse vans, freezer boxes, and VIP arrangements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {services.map((s, idx) => (
            <div key={s.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col justify-between hover-lift">
              <div>
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <ImageHover src={getImage(s.image_path)} alt={s.title}>
                    <img src={getImage(s.image_path)} alt={s.title} className="w-full h-full object-cover" />
                  </ImageHover>
                  <div className="absolute top-4 left-4 bg-slate-800 text-white p-2 rounded-lg shadow-sm">
                    <Heart className="w-5 h-5" />
                  </div>
                </div>

                <div className="p-5 sm:p-6 space-y-3 sm:space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-inter">{s.title}</h3>
                  <p className="text-slate-500 font-poppins text-xs font-semibold uppercase tracking-wider">{s.short_description}</p>
                  <p className="text-slate-600 text-sm font-poppins line-clamp-3 text-justify">{s.description}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0 space-y-3">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
                  {s.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg font-poppins">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{f}</span>
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => setSelectedService(s)} className="py-2.5 text-center text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl font-poppins transition-all duration-200">
                    Learn Details
                  </button>
                  <button onClick={() => openBookingModal(s.title)} className="py-2.5 text-center text-white bg-slate-800 hover:bg-slate-900 text-xs font-bold rounded-xl font-poppins transition-all duration-200 flex items-center justify-center gap-1">
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setSelectedService(null)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl max-w-2xl w-full relative z-10 max-h-[85vh] overflow-y-auto">
            <button onClick={() => setSelectedService(null)} className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors z-20">
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 pt-16 sm:pt-20 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-inter">{selectedService.title}</h2>
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-600 font-poppins">Homage Arrangements & Description</h4>
                <p className="text-slate-600 text-sm leading-relaxed font-poppins text-justify">{selectedService.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-600 font-poppins">Standard Inclusions</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-slate-700 text-sm font-semibold font-poppins">
                      <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <button onClick={() => { const t = selectedService.title; setSelectedService(null); openBookingModal(t); }} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm">
                  Arrange Service
                </button>
                <a href="tel:+919551663530" className="px-6 py-3.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold rounded-xl text-sm transition-all duration-200 text-center shadow-sm flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>Call 24/7</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div onClick={() => setBookingModalOpen(false)} className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-md w-full relative z-10">
            <button onClick={() => setBookingModalOpen(false)} className="absolute top-4 right-4 p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-inter mb-1">Book: {bookingForm.serviceName}</h2>
            <p className="text-xs text-slate-400 font-poppins mb-6">Fill the coordinates below for homage arrangements.</p>

            {bookingSuccess ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-4xl">✅</span>
                <h3 className="text-lg font-bold text-slate-800 font-inter">Inquiry Saved</h3>
                <p className="text-xs text-slate-500 font-poppins">A funeral coordinator will contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 font-poppins">
                <input type="text" required placeholder="Contact Person Name" value={bookingForm.name} onChange={e => setBookingForm({...bookingForm, name: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="tel" required placeholder="Contact Phone" value={bookingForm.phone} onChange={e => setBookingForm({...bookingForm, phone: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Pickup Address" value={bookingForm.pickup} onChange={e => setBookingForm({...bookingForm, pickup: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <input type="text" required placeholder="Destination Crematorium / Cemetery" value={bookingForm.destination} onChange={e => setBookingForm({...bookingForm, destination: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                  <input type="text" placeholder="Special Details" value={bookingForm.notes} onChange={e => setBookingForm({...bookingForm, notes: e.target.value})} className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none text-sm" />
                </div>
                <button type="submit" className="w-full py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-sm transition-all duration-200">Submit Arrangement Request</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
```

## src\pages\Contact.tsx

```typescript
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
```

## src\pages\Testimonials.tsx

```typescript
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  const [testimonialsList] = useState(testimonials);

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">What Families Say</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">
            Read stories of prompt deliveries, life-saving transfers, and compassionate family support from those who have trusted us.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
          {testimonialsList.map((t) => (
            <div key={t.id} className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <p className="text-slate-600 font-poppins text-sm leading-relaxed italic text-justify">"{t.content}"</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-[#0F172A] text-sm font-inter">{t.name}</h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold font-poppins">{t.position}</span>
                </div>
                {t.verification_url && (
                  <a href={t.verification_url} target="_blank" rel="noopener noreferrer" className="text-[#0F4CFF] hover:text-blue-700 flex items-center gap-1 text-[11px] font-bold font-poppins">
                    <span>Verify</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

## src\pages\Blog.tsx

```typescript
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Calendar, ChevronRight, BookOpen } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [pageContent] = useState<Record<string, string>>({
    title: "Health & Homage Blog",
    description: "Educational guides, diagnostic tips, emergency standards, and compassionate homage advice."
  });

  const categories = useMemo(() => {
    return ['All', ...new Set(blogPosts.map(b => b.category))];
  }, []);

  const filteredBlogs = blogPosts.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getBlogImage = (path: string) => {
    if (path.startsWith('B ')) {
      return `/images/Blog/${path}`;
    }
    return path || 'https://images.unsplash.com/photo-1587745416684-47953f16fdd1?w=500';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      {/* Banner */}
      <div className="bg-[#0F172A] text-white py-12 sm:py-16 mb-10 sm:mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-5xl font-black font-inter tracking-tight">{pageContent.title || "Health & Homage Blog"}</h1>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm max-w-xl font-poppins">{pageContent.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main List */}
          <div className="lg:col-span-8 space-y-8">
            {/* Search Box */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-slate-200 rounded-xl focus:border-[#0F4CFF] focus:outline-none bg-white text-sm text-slate-800"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {filteredBlogs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/60 p-8">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700 font-inter">No Articles Found</h3>
                <p className="text-slate-400 text-sm font-poppins mt-2">Try refining your search terms or selecting a different category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {filteredBlogs.map((b) => (
                  <div key={b.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm flex flex-col justify-between group">
                    <div>
                      <div className="relative h-48 overflow-hidden">
                        <img src={getBlogImage(b.featured_image)} alt={b.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                        <span className="absolute top-4 left-4 bg-[#0F4CFF] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm font-poppins">{b.category}</span>
                      </div>

                      <div className="p-6 space-y-3">
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold font-poppins">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatDate(b.created_at)}</span>
                        </div>
                        <h3 className="text-lg font-bold text-[#0F172A] font-inter group-hover:text-[#0F4CFF] transition-colors line-clamp-2">{b.title}</h3>
                        <p className="text-slate-500 text-sm font-poppins leading-relaxed line-clamp-3 text-justify">{b.content.replace(/<[^>]*>/g, '')}</p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <button onClick={() => navigate(`/blog/${b.slug}`)} className="inline-flex items-center gap-1 text-[#0F4CFF] font-bold text-xs tracking-wider uppercase group-hover:text-blue-700 transition-colors font-poppins">
                        <span>Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Filters */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/60 shadow-sm">
              <h4 className="font-extrabold text-[#0F172A] text-base uppercase tracking-wider mb-6 font-inter border-b border-slate-50 pb-2">Categories</h4>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 rounded-xl text-left font-bold text-sm tracking-wide transition-all duration-200 w-full flex items-center justify-between font-poppins ${
                      selectedCategory === cat
                        ? 'bg-[#0F4CFF] text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                    }`}
                  >
                    <span>{cat}</span>
                    <ChevronRight className={`w-4 h-4 opacity-50 ${selectedCategory === cat ? 'text-white' : 'text-slate-400'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

## src\pages\BlogPostDetail.tsx

```typescript
import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Tag, ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogs';

export const BlogPostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = useMemo(() => blogPosts.find(b => b.slug === slug) ?? null, [slug]);

  if (!post) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center space-y-4 font-poppins">
        <BookOpen className="w-16 h-16 text-slate-300 mx-auto" />
        <h2 className="text-2xl font-bold text-slate-700 font-inter">Article Not Found</h2>
        <p className="text-slate-400">The post you are searching for might have been archived or removed by the administrator.</p>
        <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-1 text-[#0F4CFF] font-bold hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Articles</span>
        </button>
      </div>
    );
  }

  const getBlogImage = (path: string) => {
    if (path.startsWith('B ')) {
      return `/images/Blog/${path}`;
    }
    return path || 'https://images.unsplash.com/photo-1587745416684-47953f16fdd1?w=800';
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <article className="pt-20 pb-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <button onClick={() => navigate('/blog')} className="inline-flex items-center gap-2 mb-6 text-slate-500 hover:text-[#0F4CFF] font-bold text-sm tracking-wide transition-colors font-poppins">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Blog List</span>
        </button>

        {/* Blog Container */}
        <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/60 shadow-sm">
          {/* Header Image */}
          <div className="relative h-64 sm:h-[450px]">
            <img src={getBlogImage(post.featured_image)} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-3">
              <span className="bg-[#0F4CFF] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full shadow-sm font-poppins inline-block">{post.category}</span>
              <h1 className="text-2xl sm:text-4xl font-black font-inter leading-snug">{post.title}</h1>
            </div>
          </div>

          {/* Metadata Bar */}
          <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap gap-4 text-xs font-semibold text-slate-400 font-poppins bg-slate-50">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>Published: {formatDate(post.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Read Time: 3 mins</span>
            </div>
          </div>

          {/* Main Body HTML / Content */}
          <div className="p-6 sm:p-10 font-poppins text-slate-700 leading-relaxed text-sm sm:text-base space-y-6 text-justify whitespace-pre-line">
            {post.content}
          </div>

          {/* Tags Footer */}
          {post.tags && (
            <div className="px-6 sm:px-10 pb-8 flex flex-wrap gap-2 items-center">
              <Tag className="w-4 h-4 text-slate-400 shrink-0" />
              {post.tags.split(',').map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-semibold">#{tag.trim()}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
```

## src\pages\LocationPage.tsx

```typescript
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
```

## src\data\ambulance-services.ts

```typescript
import { AmbulanceService } from '../types';
import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img4 from '../assets/4.jpg';
import img5 from '../assets/5.jpg';
import img6 from '../assets/6.jpg';
import img7 from '../assets/7.jpg';
import img8 from '../assets/8.jpg';

export const ambulanceServices: AmbulanceService[] = [
  {
    id: 1,
    title: 'Basic Life Support Ambulance',
    slug: 'basic-life-support',
    short_description: 'Emergency transport with basic medical support',
    description: 'Our BLS ambulances are equipped with essential life-saving equipment including oxygen cylinders, stretchers, and first-aid kits. Ideal for non-critical patient transport with trained EMTs onboard ensuring patient stability during transit.',
    icon: 'ambulance',
    image_path: img1,
    features: ['Oxygen Cylinder', 'Stretcher with Lock', 'First Aid Kit', 'Trained EMT', 'GPS Tracking', 'Mobile Ventilator Ready'],
    order: 1,
  },
  {
    id: 2,
    title: 'Advanced Life Support Ambulance',
    slug: 'advanced-life-support',
    short_description: 'ICU-on-wheels with ventilator support',
    description: 'Our ALS ambulances function as a mobile ICU, equipped with advanced cardiac monitors, defibrillators, infusion pumps, and mechanical ventilators. Staffed by critical care paramedics for high-acuity patients requiring intensive monitoring during inter-facility transfers.',
    icon: 'ambulance',
    image_path: img2,
    features: ['Cardiac Monitor', 'Defibrillator', 'Infusion Pump', 'Mechanical Ventilator', 'Multi-parameter Monitor', 'Suction Machine'],
    order: 2,
  },
  {
    id: 3,
    title: 'Neonatal & Pediatric Ambulance',
    slug: 'neonatal-pediatric',
    short_description: 'Specialized transport for newborns and children',
    description: 'Specially designed ambulances with portable incubators, pediatric ventilators, and temperature-controlled environments. Our NICU-trained staff ensure safe transport of premature babies and children requiring specialized medical attention during transit.',
    icon: 'ambulance',
    image_path: img4,
    features: ['Portable Incubator', 'Pediatric Ventilator', 'Temperature Control', 'Neonatal Monitor', 'Pediatric Drug Kit', 'Trained Neonatal Nurse'],
    order: 3,
  },
  {
    id: 4,
    title: 'ICU Ventilator Ambulance',
    slug: 'icu-ventilator',
    short_description: 'Full ICU setup for critical patient transfer',
    description: 'State-of-the-art ICU ambulances featuring advanced life support systems including multi-parameter monitors, ventilators, and critical care medications. Perfect for inter-city or interstate transfers of critically ill patients requiring continuous intensive care.',
    icon: 'ambulance',
    image_path: img5,
    features: ['ICU Ventilator', 'Multi-parameter Monitor', 'Defibrillator', 'Infusion Pumps', 'Central Oxygen Supply', 'Critical Care Paramedic'],
    order: 4,
  },
  {
    id: 5,
    title: 'Patient Transport Vehicle',
    slug: 'patient-transport',
    short_description: 'Comfortable non-emergency patient transport',
    description: 'Comfortable and accessible transport vehicles for non-emergency medical appointments, discharge transfers, and routine checkups. Our PTVs are equipped with wheelchair ramps, comfortable seating, and basic amenities for patient convenience.',
    icon: 'ambulance',
    image_path: img6,
    features: ['Wheelchair Ramp', 'Comfort Seating', 'AC Comfort', 'Trained Attendant', 'Stretcher', 'GPS Tracking'],
    order: 5,
  },
  {
    id: 6,
    title: 'Long Distance Interstate Ambulance',
    slug: 'long-distance-interstate',
    short_description: 'Cross-border patient transfer with full medical support',
    description: 'Purpose-built ambulances for long-distance interstate transfers featuring extended fuel range, backup oxygen systems, dual-crew rotation, and rest facilities. Fully equipped to handle medical emergencies during multi-state journeys with satellite tracking.',
    icon: 'ambulance',
    image_path: img7,
    features: ['Extended Fuel Range', 'Backup Oxygen', 'Dual Crew Rotation', 'Satellite Tracking', 'Long-range Comms', 'Emergency Medicines Kit'],
    order: 6,
  },
  {
    id: 7,
    title: 'Cardiac Care Ambulance',
    slug: 'cardiac-care',
    short_description: 'Heart attack and cardiac emergency response',
    description: 'Rapid response cardiac ambulances equipped with 12-lead ECG machines, cardiac monitors, defibrillators, and thrombolytic medications. Our cardiac-trained paramedics work closely with hospital cath labs to provide seamless STEMI care during transport.',
    icon: 'ambulance',
    image_path: img8,
    features: ['12-lead ECG', 'Cardiac Monitor', 'Defibrillator', 'Thrombolytic Drugs', 'Cardiac-trained Paramedic', 'Cath Lab Integration'],
    order: 7,
  },
];
```

## src\data\funeral-services.ts

```typescript
import { FuneralService } from '../types';
import img8a from '../assets/8a.jpg';
import img8b from '../assets/8b.jpg';
import img8c from '../assets/8c.jpg';

export const funeralServices: FuneralService[] = [
  {
    id: 1,
    title: 'Hi-Tech Air Conditioned Funeral Van',
    slug: 'ac-funeral-van',
    short_description: 'AC hearse van for dignified last journey',
    description: 'Our air-conditioned funeral vans provide a dignified and comfortable final journey for the departed. Featuring temperature-controlled interiors, elegant décor, and professional attendants who ensure the highest standards of respect and care throughout the procession.',
    icon: 'heart',
    image_path: img8a,
    features: ['AC Temperature Control', 'Elegant Interior Décor', 'Professional Attendants', 'GPS Tracked Procession', 'Spacious Compartment', 'Respectful Handling'],
    order: 1,
  },
  {
    id: 2,
    title: 'Deceased Freezer Box / ICE Box',
    slug: 'deceased-freezer-box',
    short_description: 'Cold storage preservation for extended periods',
    description: 'Industrial-grade deceased freezer boxes designed for temporary preservation and transportation of mortal remains. Ideal for long-distance transfers, legal formalities, or delays in funeral arrangements. Maintains optimal temperature with backup power support.',
    icon: 'heart',
    image_path: img8b,
    features: ['Temperature Controlled', 'Backup Power Support', 'Portable Design', 'Long Duration Storage', 'Hygienic Interior', 'Easy Loading System'],
    order: 2,
  },
  {
    id: 3,
    title: 'Motorized Coffin Lowering Equipment',
    slug: 'coffin-lowering',
    short_description: 'Mechanized lowering system for graveside services',
    description: 'Motorized coffin lowering equipment ensuring smooth and dignified lowering during burial ceremonies. Our battery-operated systems provide controlled descent with remote operation, eliminating manual handling and ensuring complete respect during the final rites.',
    icon: 'heart',
    image_path: img8c,
    features: ['Battery Operated', 'Remote Control', 'Smooth Descent', 'Load Capacity 300kg', 'Portable Setup', 'Silent Operation'],
    order: 3,
  },
  {
    id: 4,
    title: 'VIP Funeral Arrangements',
    slug: 'vip-funeral',
    short_description: 'Premium homage services with full ceremonial support',
    description: 'Comprehensive VIP funeral packages designed for dignitaries, public figures, and families seeking the highest level of ceremonial respect. Includes luxury hearse, floral arrangements, motorcade coordination, and dedicated funeral directors managing every aspect.',
    icon: 'heart',
    image_path: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=600&q=80',
    features: ['Luxury Hearse', 'Floral Arrangements', 'Motorcade Coordination', 'Dedicated Funeral Director', 'Ceremonial Support', 'Media Management'],
    order: 4,
  },
  {
    id: 5,
    title: 'Casket & Urn Selection',
    slug: 'casket-urn-selection',
    short_description: 'Wide range of coffins, caskets, and urns',
    description: 'Browse our carefully curated selection of coffins, caskets, and memorial urns. From traditional wooden coffins to eco-friendly options and premium metal caskets with custom engravings. Our counselors help families choose the appropriate memorial for their loved ones.',
    icon: 'heart',
    image_path: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&q=80',
    features: ['Wooden Coffins', 'Metal Caskets', 'Eco-friendly Options', 'Custom Engraving', 'Memorial Urns', 'Expert Counseling'],
    order: 5,
  },
  {
    id: 6,
    title: 'Death Certificate & Legal Assistance',
    slug: 'death-certificate-assistance',
    short_description: 'Help with documentation and legal formalities',
    description: 'Compassionate guidance through the complex legal processes following a demise. Our team assists with death certificate registration, police intimation, insurance claim documentation, and other statutory requirements, allowing families to focus on mourning and remembrance.',
    icon: 'heart',
    image_path: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&q=80',
    features: ['Death Certificate Support', 'Police Intimation', 'Insurance Documentation', 'Legal Guidance', 'Document Collection', 'Family Liaison'],
    order: 6,
  },
  {
    id: 7,
    title: 'Religious & Cultural Ceremony Support',
    slug: 'religious-cultural-support',
    short_description: 'Respecting diverse traditions and customs',
    description: 'Our team is experienced in conducting funerals according to various religious and cultural traditions including Hindu, Christian, Muslim, Sikh, and Jain customs. We coordinate with priests, church authorities, and community leaders to ensure all rituals are properly observed.',
    icon: 'heart',
    image_path: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&q=80',
    features: ['Multi-faith Support', 'Priest Coordination', 'Ritual Arrangements', 'Community Liaison', 'Tradition Guidance', 'Pandit/Pastor Booking'],
    order: 7,
  },
  {
    id: 8,
    title: 'Dead Body Transport Services',
    slug: 'dead-body-transport',
    short_description: 'Inter-city and interstate mortal remains transport',
    description: 'Specialized dead body transportation services for moving mortal remains between cities, states, or countries. Our fleet of freezer-equipped vehicles and professional handling staff ensure dignified transport with all necessary documentation and embalming support.',
    icon: 'heart',
    image_path: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80',
    features: ['Freezer Transport', 'Embalming Support', 'Documentation Help', 'Inter-state Service', 'Airport Transfer', '24/7 Coordination'],
    order: 8,
  },
];
```

## src\data\testimonials.ts

```typescript
import { Testimonial } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    position: 'Family Member, Chennai',
    content: 'I cannot thank Flying Squad enough for their swift response when my father had a heart attack. The ambulance arrived within 12 minutes, and the paramedics were incredibly professional. They stabilized him on the way to Apollo Hospital. Truly life-saving service.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example1',
    is_approved: true,
    order: 1,
    created_at: '2026-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    position: 'Patient, Anna Nagar',
    content: 'Used their funeral services for my grandmother\'s last rites. The AC funeral van was dignified and well-maintained. The staff handled everything with utmost respect and sensitivity. They even helped with the documentation. Thank you for making a difficult time easier.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example2',
    is_approved: true,
    order: 2,
    created_at: '2026-02-20T14:00:00Z',
  },
  {
    id: 3,
    name: 'Dr. Senthil Nathan',
    position: 'Medical Director, Kilpauk Medical College',
    content: 'We have collaborated with Flying Squad for several patient transfers from our hospital. Their ICU ambulances are well-equipped and their paramedics are highly trained. Highly recommend their services for critical care transfers.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example3',
    is_approved: true,
    order: 3,
    created_at: '2026-03-05T09:15:00Z',
  },
  {
    id: 4,
    name: 'Anitha Venkatesh',
    position: 'Resident, Tambaram',
    content: 'Booked an ambulance for my mother\'s discharge from hospital. The patient transport vehicle was clean, comfortable, and the attendant was very helpful. Punctual and reasonably priced. Will definitely use again if needed.',
    rating: 4,
    verification_url: '',
    is_approved: true,
    order: 4,
    created_at: '2026-03-12T16:45:00Z',
  },
  {
    id: 5,
    name: 'Mohammed Ismail',
    position: 'Community Leader, Triplicane',
    content: 'When our community needed to arrange funeral services for an unclaimed body, Flying Squad extended their support free of cost. Their compassion and humanity go beyond business. A truly noble organization serving Chennai.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example5',
    is_approved: true,
    order: 5,
    created_at: '2026-04-01T11:30:00Z',
  },
  {
    id: 6,
    name: 'Lakshmi Narayanan',
    position: 'Business Owner, T Nagar',
    content: 'The neonatal ambulance service was a blessing when my granddaughter needed emergency transport. The portable incubator and pediatric paramedic made all the difference. The baby arrived safely at the children\'s hospital. Forever grateful.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example6',
    is_approved: true,
    order: 6,
    created_at: '2026-04-18T08:00:00Z',
  },
  {
    id: 7,
    name: 'Karthik Raghavan',
    position: 'IT Professional, OMR',
    content: 'Used their long-distance interstate ambulance to transfer my uncle from Chennai to Bangalore. The crew rotated shifts and kept us updated throughout the 7-hour journey. The patient was comfortable and stable. Excellent coordination.',
    rating: 5,
    verification_url: '',
    is_approved: true,
    order: 7,
    created_at: '2026-05-02T13:20:00Z',
  },
  {
    id: 8,
    name: 'Rev. Joseph Fernandes',
    position: 'Parish Priest, Santhome',
    content: 'Flying Squad has been our trusted partner for funeral processions in our parish. Their motorized coffin lowering equipment has added dignity to our burial services. The team is always respectful and punctual. Highly recommended.',
    rating: 5,
    verification_url: 'https://g.co/kgs/example8',
    is_approved: true,
    order: 8,
    created_at: '2026-05-15T15:10:00Z',
  },
  {
    id: 9,
    name: 'Divya Bharathi',
    position: 'Teacher, Mylapore',
    content: 'Called them when my father needed urgent transport to a dialysis center. The service was prompt and the staff was very caring. They made sure my father was comfortable throughout the journey. Very reliable service.',
    rating: 4,
    verification_url: '',
    is_approved: true,
    order: 9,
    created_at: '2026-05-28T07:30:00Z',
  },
];
```

## src\data\blogs.ts

```typescript
import { BlogPost } from '../types';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'How to Recognize Early Signs of a Heart Attack',
    slug: 'recognize-early-heart-attack-signs',
    content: `Heart attacks are medical emergencies that require immediate attention. Recognizing the early warning signs can save precious minutes and potentially save a life.

## Common Warning Signs

1. **Chest Discomfort**: Most heart attacks involve discomfort in the center of the chest that lasts more than a few minutes or that goes away and comes back. It can feel like uncomfortable pressure, squeezing, fullness, or pain.

2. **Upper Body Pain**: Pain or discomfort may spread beyond your chest to your shoulders, arms, back, neck, teeth, or jaw. Many people describe the pain as radiating.

3. **Shortness of Breath**: This can occur with or without chest discomfort. You may feel like you can't catch your breath, even while resting.

4. **Cold Sweat**: Breaking out in a cold sweat for no apparent reason can be a warning sign. The skin may feel clammy.

5. **Nausea and Indigestion**: Some people, especially women, report feeling nauseous or having indigestion before a heart attack.

6. **Lightheadedness**: Feeling dizzy or lightheaded can indicate reduced blood flow to the brain.

## What to Do

If you or someone near you experiences these symptoms, call emergency services immediately. Do not drive yourself to the hospital. While waiting for the ambulance, try to stay calm and sit down. If prescribed, take aspirin or nitroglycerin as directed by your doctor.

## Prevention Tips

- Maintain a heart-healthy diet rich in fruits, vegetables, and whole grains
- Exercise regularly — at least 30 minutes of moderate activity daily
- Monitor blood pressure and cholesterol levels
- Avoid smoking and limit alcohol consumption
- Manage stress through meditation or yoga

Remember, every minute counts during a heart attack. Flying Squad Ambulance Service provides 24/7 cardiac emergency response across Chennai with an average response time of under 15 minutes.`,
    featured_image: 'B 1.jpg',
    category: 'Health Tips',
    tags: 'heart attack, cardiac emergency, heart health, emergency response',
    meta_title: 'Early Heart Attack Signs | Flying Squad Ambulance',
    meta_description: 'Learn to recognize the early warning signs of a heart attack. Know when to call an ambulance and how to respond in a cardiac emergency.',
    status: 'published',
    created_at: '2026-01-10T08:00:00Z',
  },
  {
    id: 2,
    title: 'Understanding Different Types of Ambulance Services',
    slug: 'types-of-ambulance-services',
    content: `Not all ambulances are the same. Depending on the medical condition of the patient, different types of ambulance services are required to ensure safe transport.

## Basic Life Support (BLS) Ambulance
BLS ambulances are equipped with basic medical equipment such as oxygen cylinders, stretchers, and first-aid kits. They are staffed by Emergency Medical Technicians (EMTs) trained to provide basic life support during transport. Ideal for non-critical patients who need medical monitoring during transit.

## Advanced Life Support (ALS) Ambulance
ALS ambulances function as mobile ICUs with advanced equipment including cardiac monitors, defibrillators, infusion pumps, and mechanical ventilators. Staffed by paramedics trained in advanced cardiac life support, these are essential for critically ill patients.

## Neonatal Ambulance
Specialized ambulances for transporting premature babies and newborns. Equipped with portable incubators, neonatal ventilators, and temperature-controlled environments. Staffed by neonatal nurses and pediatric specialists.

## Patient Transport Vehicle (PTV)
Non-emergency vehicles for transporting patients to doctor appointments, dialysis centers, or hospital discharges. Comfortable seating, wheelchair ramps, and basic amenities.

## Choosing the Right Service
When booking an ambulance, describe the patient's condition accurately to the dispatch team. This ensures the appropriate vehicle and medical staff are sent to your location. Flying Squad offers all types of ambulance services across Chennai with 24/7 availability.`,
    featured_image: 'B 2.jpg',
    category: 'Services Guide',
    tags: 'ambulance types, BLS, ALS, neonatal ambulance, patient transport',
    meta_title: 'Types of Ambulance Services | Flying Squad Chennai',
    meta_description: 'Understand the differences between BLS, ALS, neonatal, and patient transport ambulances. Choose the right service for your medical transport needs.',
    status: 'published',
    created_at: '2026-01-25T09:30:00Z',
  },
  {
    id: 3,
    title: 'What to Do When a Loved One Passes Away at Home',
    slug: 'when-loved-one-passes-at-home',
    content: `Losing a loved one is never easy. When death occurs at home, knowing the proper steps to take can help you navigate this difficult time with dignity and composure.

## Immediate Steps

1. **Stay Calm**: Take a deep breath. Panic will not help the situation. You need to be composed for the tasks ahead.

2. **Call a Doctor**: If the deceased was under a doctor's care, call their physician. A doctor needs to certify the death and issue a medical certificate stating the cause of death.

3. **Inform Family**: Notify close family members and, if applicable, the family priest or religious leader who can guide the next steps according to your faith.

## Legal Formalities

4. **Death Certificate Registration**: Visit the local municipal corporation or register online within 21 days of death. You will need the medical certificate of cause of death, proof of identity, and address proof of the deceased.

5. **Police Intimation**: In case of unnatural deaths or when no doctor is available to certify, inform the local police station. They will arrange for a government doctor to examine and issue the certificate.

## Funeral Arrangements

6. **Contact Funeral Services**: Reach out to a trusted funeral service provider. Flying Squad Funeral Care offers comprehensive support including hearse vans, freezer boxes, coffin selection, and ceremony coordination.

7. **Choose Burial or Cremation**: Based on the family's religious and personal preferences, decide on burial or cremation. Coordinate with the respective cemetery or crematorium for booking slots.

8. **Inform Relatives and Friends**: Once the date and time are fixed, inform extended family, friends, and colleagues about the funeral arrangements.

## Taking Care of Yourself

Grief is a personal journey. Allow yourself time to mourn and seek support from family, friends, or professional counselors. Remember that asking for help is a sign of strength, not weakness.

Flying Squad Funeral Care provides 24/7 compassionate assistance for families dealing with loss. Our team handles all arrangements with the utmost respect and dignity.`,
    featured_image: 'B 3.jpg',
    category: 'Grief Support',
    tags: 'death at home, funeral arrangements, legal formalities, grief support',
    meta_title: 'What to Do When a Loved One Passes Away | Flying Squad',
    meta_description: 'Step-by-step guide on what to do when a loved one passes away at home including legal formalities, death certificate, and funeral arrangements.',
    status: 'published',
    created_at: '2026-02-08T11:45:00Z',
  },
  {
    id: 4,
    title: 'Why Choose an Air Conditioned Funeral Van?',
    slug: 'ac-funeral-van-benefits',
    content: `In Chennai's tropical climate, an air-conditioned funeral van is not just a luxury — it is a practical necessity for preserving the dignity of the departed and providing comfort to mourning families.

## Temperature Control in Chennai's Heat
Chennai experiences temperatures exceeding 38°C (100°F) during summer months. Without proper cooling, natural decomposition accelerates rapidly. AC funeral vans maintain a consistent temperature between 18-22°C, preserving the deceased's appearance for viewings and extended ceremonies.

## Extended Preservation During Legal Delays
Sometimes funerals must wait for relatives traveling from abroad or for completion of legal formalities. Our freezer vans can maintain optimal conditions for up to 72 hours, giving families the time they need without compromising dignity.

## Comfort for Mourning Families
Attending a funeral procession in Chennai's heat can be physically exhausting. AC vans provide a comfortable environment for family members accompanying their loved one on the final journey.

## Professional Standards
Modern AC funeral vans come equipped with:
- Sealed temperature-controlled compartments
- Elegant interior finishes with soft lighting
- GPS tracking for coordinated processions
- Hydraulic lift systems for easy loading
- Sound systems for religious ceremonies

Flying Squad's fleet of hi-tech AC funeral vans represents the gold standard in funeral transportation across Chennai. Each van is meticulously maintained and sanitized after every service.`,
    featured_image: 'B 4.jpg',
    category: 'Funeral Care',
    tags: 'AC funeral van, funeral transport, Chennai heat, funeral preservation',
    meta_title: 'Benefits of AC Funeral Vans in Chennai | Flying Squad',
    meta_description: 'Why air-conditioned funeral vans are essential in Chennai climate. Learn about temperature control, preservation, and comfort for mourning families.',
    status: 'published',
    created_at: '2026-02-20T14:00:00Z',
  },
  {
    id: 5,
    title: 'Emergency Kit Checklist: What Every Home Should Have',
    slug: 'home-emergency-kit-checklist',
    content: `Medical emergencies can happen at any time. Having a well-stocked emergency kit at home can make a critical difference while waiting for professional medical help.

## Essential Items

### Basic First Aid
- Adhesive bandages (various sizes)
- Sterile gauze pads and medical tape
- Antiseptic wipes and solution
- Antibiotic ointment
- Pain relievers (paracetamol, ibuprofen)
- Antihistamines for allergic reactions
- Thermometer (digital)
- Tweezers and scissors
- Disposable gloves
- CPR face mask or shield

### Emergency Medications
- Prescribed medications (with valid prescription)
- Aspirin (for suspected heart attack)
- Activated charcoal (for poisoning — use only on medical advice)
- Oral rehydration salts
- Anti-diarrheal medication

### Tools and Supplies
- Flashlight with extra batteries
- Emergency contact numbers list
- Notepad and pen
- Blanket
- Hand sanitizer

## Important Numbers to Keep Handy
Display these numbers prominently near your emergency kit:
- **Flying Squad Ambulance**: +91 74491 77777
- Local police station
- Nearest hospital emergency room
- Family doctor
- Poison control center

## Maintenance Tips
- Check expiry dates every 3 months
- Replace used or expired items immediately
- Keep the kit in an easily accessible location
- Ensure all family members know where it is stored

Being prepared doesn't mean being paranoid. It means being responsible for your family's safety.`,
    featured_image: 'B 5.jpg',
    category: 'Health Tips',
    tags: 'emergency kit, first aid, home safety, medical preparedness',
    meta_title: 'Home Emergency Kit Checklist | Flying Squad Ambulance',
    meta_description: 'Essential items every home should have in a medical emergency kit. First aid supplies, emergency medications, and important numbers.',
    status: 'published',
    created_at: '2026-03-05T10:15:00Z',
  },
  {
    id: 6,
    title: 'Understanding Funeral Customs Across Different Religions in India',
    slug: 'funeral-customs-indian-religions',
    content: `India's rich cultural diversity is reflected in its funeral traditions. Understanding these customs helps funeral service providers offer respectful and appropriate support to families from all faiths.

## Hindu Funeral Customs
Hindus typically practice cremation, with the ceremony led by a priest (pandit). Key elements include:
- The body is bathed and dressed in traditional clothes
- Flowers and garlands adorn the body
- The eldest son or male relative lights the funeral pyre
- Ashes are collected after 3 days and immersed in a sacred river
- Mourning period lasts 13 days with specific rituals

## Christian Funeral Customs
Christian funerals in India vary by denomination but generally include:
- The body is placed in a coffin for a wake/viewing
- A funeral service is held at the church or funeral home
- Burial is the most common practice
- Prayers, hymns, and scripture readings are part of the service
- Flowers and wreaths are customary

## Muslim Funeral Customs
Islamic funerals follow specific rituals (Janazah):
- The body is washed and shrouded in white cloth (kafan)
- Burial should occur as soon as possible, ideally within 24 hours
- A funeral prayer (Salat al-Janazah) is performed
- The body is placed directly in the grave, facing Mecca
- Mourning period of 3 days is traditional

## Sikh Funeral Customs
Sikhs also practice cremation with these traditions:
- The body is bathed and dressed with the Five Ks
- Kirtan Sohila prayers are recited
- Cremation is followed by gathering the ashes
- Ardas (prayer) is offered at the Gurdwara
- The community serves Langar (communal meal) after the service

## How Flying Squad Respects All Traditions
Our funeral care team is trained in multiple religious customs and works closely with community leaders to ensure every ceremony is conducted with proper respect and dignity, regardless of faith.`,
    featured_image: 'B 6.jpg',
    category: 'Funeral Care',
    tags: 'funeral customs, Hindu funeral, Christian funeral, Muslim funeral, Sikh funeral',
    meta_title: 'Funeral Customs Across Indian Religions | Flying Squad',
    meta_description: 'Understanding funeral customs across Hindu, Christian, Muslim, and Sikh traditions in India. Respectful funeral services for all faiths.',
    status: 'published',
    created_at: '2026-03-18T13:30:00Z',
  },
  {
    id: 7,
    title: 'When to Call an Ambulance vs. Visiting a Clinic',
    slug: 'when-to-call-ambulance',
    content: `One of the most common questions people face is whether their medical situation warrants calling an ambulance or if they can simply visit a clinic. Making the right decision can save valuable time and potentially a life.

## Call an Ambulance Immediately For:

### Life-Threatening Conditions
- Chest pain or pressure (suspected heart attack)
- Difficulty breathing or shortness of breath
- Uncontrolled bleeding
- Loss of consciousness or fainting
- Severe allergic reaction with swelling
- Stroke symptoms (facial drooping, arm weakness, speech difficulty)
- Seizures
- Severe trauma from accidents or falls

### Signs of Stroke — Act FAST
- **F**ace: Ask the person to smile. Does one side droop?
- **A**rms: Ask the person to raise both arms. Does one drift downward?
- **S**peech: Ask the person to repeat a simple sentence. Is speech slurred?
- **T**ime: If any of these signs are present, call emergency services immediately.

## When to Visit a Clinic Instead
- Minor cuts and scrapes
- Mild fevers without other symptoms
- Routine checkups and vaccinations
- Common cold and flu symptoms
- Minor sprains or strains
- Prescription refills

## When in Doubt, Call
If you are unsure about the severity of a medical situation, it is always better to err on the side of caution. Call the ambulance helpline at +91 74491 77777, and the dispatcher can help assess whether an ambulance is needed.

Remember: Flying Squad Ambulance Service provides free medical advice over the phone to help you make informed decisions during emergencies.`,
    featured_image: 'B 7.jpg',
    category: 'Health Tips',
    tags: 'ambulance, emergency, medical advice, when to call ambulance',
    meta_title: 'When to Call an Ambulance vs Clinic | Flying Squad',
    meta_description: 'Know when to call an ambulance vs visiting a clinic. Learn FAST stroke signs and life-threatening symptoms requiring emergency medical transport.',
    status: 'published',
    created_at: '2026-04-02T07:45:00Z',
  },
  {
    id: 8,
    title: 'A Guide to Pre-Planning Funeral Arrangements',
    slug: 'pre-planning-funeral-guide',
    content: `Pre-planning funeral arrangements is a thoughtful gift to your loved ones, sparing them from making difficult decisions during a time of grief. Here is how to approach this important task.

## Why Pre-Plan?
- **Relieves Burden**: Your family won't have to guess your wishes
- **Locks in Costs**: Funeral costs rise yearly — pre-planning can save money
- **Ensures Wishes Are Honored**: You decide the type of service, burial or cremation, and venue
- **Peace of Mind**: Knowing everything is arranged provides comfort

## Steps to Pre-Plan

### 1. Decide on Disposition
Choose between burial, cremation, or donation to science. Each option has different requirements and associated costs.

### 2. Choose Service Type
- Traditional funeral with viewing
- Memorial service without body present
- Direct burial or cremation (no service)
- Green or eco-friendly funeral

### 3. Select Venue
- Religious institution (church, temple, mosque, gurdwara)
- Funeral home
- Community hall
- Family property
- Crematorium or cemetery

### 4. Choose Personal Elements
- Music and songs
- Readings and scriptures
- Eulogy speakers
- Flowers and decorations
- Photographs and memorabilia
- Catering for post-service gathering

### 5. Financial Arrangements
Many funeral homes offer pre-need insurance or payment plans. Discuss options with your chosen provider.

## How Flying Squad Can Help
Our funeral counselors provide free consultations for pre-planning funeral arrangements. We help document your wishes and offer flexible payment plans. Call +91 74491 77777 to schedule a confidential consultation.

Pre-planning is not about dwelling on death — it is about showing love and consideration for the family you will leave behind.`,
    featured_image: 'B 8.jpg',
    category: 'Funeral Care',
    tags: 'pre-planning funeral, funeral arrangements, advance planning, end of life',
    meta_title: 'Guide to Pre-Planning Funeral Arrangements | Flying Squad',
    meta_description: 'Step-by-step guide to pre-planning funeral arrangements. Learn about disposition, service types, costs, and how to document your wishes.',
    status: 'published',
    created_at: '2026-04-15T10:00:00Z',
  },
  {
    id: 9,
    title: 'How Ambulance Services in Chennai Are Responding to Emergencies',
    slug: 'ambulance-response-chennai',
    content: `Chennai, as a rapidly growing metropolitan city, faces unique challenges in emergency medical response. Traffic congestion, dense urban areas, and the city's spread across 426 square kilometers require sophisticated ambulance deployment strategies.

## The Challenge of Chennai Traffic
Average traffic speeds in Chennai during peak hours can drop to 15-20 km/h. Ambulance services use strategic bay positioning and real-time traffic monitoring to navigate these challenges.

## Flying Squad's Deployment Strategy

### Zone-Based Standby Bays
We maintain 14 strategically located standby bays across Chennai including:
- Kilpauk (HQ)
- T Nagar
- Anna Nagar
- Tambaram
- OMR
- Porur
- Avadi
- Guindy

### Traffic Navigation Technology
- GPS-enabled fleet management
- Real-time traffic integration
- Emergency lane coordination with traffic police
- Alternative route planning

## Response Time Targets
- **Core areas**: 10-15 minutes
- **Extended areas**: 20-25 minutes
- **Highway corridors**: 30 minutes (for inter-city transfers)

## Specialized Response Teams
Flying Squad's emergency operations center (EOC) operates 24/7 with trained dispatchers who assess each call and dispatch the appropriate vehicle type based on the medical situation described.

## Continuous Improvement
We conduct regular response time audits and debrief sessions after every emergency call to identify improvement opportunities. Our average response time has improved by 23% over the past two years through these measures.

Chennai residents can take comfort knowing that Flying Squad's network of ambulances and trained paramedics is ready to respond at any hour.`,
    featured_image: 'B 9.jpg',
    category: 'Services Guide',
    tags: 'Chennai ambulance, emergency response, standby bays, traffic navigation',
    meta_title: 'How Ambulance Services Respond in Chennai | Flying Squad',
    meta_description: 'Learn how Flying Squad Ambulance Service responds to emergencies across Chennai with zone-based standby bays, traffic navigation, and rapid deployment.',
    status: 'published',
    created_at: '2026-05-01T09:00:00Z',
  },
];
```

## src\data\service-areas.ts

```typescript
import { ServiceArea } from '../types';

export const serviceAreas: ServiceArea[] = [
  {
    id: 1,
    name: 'Anna Nagar',
    slug: 'ambulance-service-in-anna-nagar',
    description: 'Emergency ICU and ventilator ambulance services in Anna Nagar with 10-minute response time. Round-the-clock standby at our Anna Nagar West bay.',
    content_html: `<h2>Ambulance Service in Anna Nagar, Chennai</h2>
<p>Anna Nagar is one of Chennai's most well-planned residential neighborhoods. R.G. Ambulance Service maintains a dedicated ambulance standby bay near Anna Nagar West to ensure rapid emergency response across this sprawling locality.</p>
<h3>Coverage Areas</h3>
<ul>
<li>Anna Nagar East</li>
<li>Anna Nagar West</li>
<li>Anna Nagar West Extension</li>
<li>Shanthi Colony</li>
<li>Sarathy Nagar</li>
</ul>
<h3>Service Features</h3>
<p>Our Anna Nagar bay is equipped with BLS, ALS, and cardiac care ambulances staffed by experienced paramedics familiar with the area's layout and nearest hospitals including Sri Ramachandra Medical Centre and Apollo Hospitals Greams Road.</p>`,
    faqs: [
      { question: 'How quickly can an ambulance reach Anna Nagar?', answer: 'Our Anna Nagar standby bay ensures an average response time of 8-12 minutes within Anna Nagar and surrounding areas.' },
      { question: 'What types of ambulances are available in Anna Nagar?', answer: 'BLS, ALS, cardiac care, and neonatal ambulances are available at our Anna Nagar bay.' },
      { question: 'Which hospitals do you typically transfer to from Anna Nagar?', answer: 'We commonly transfer patients to Sri Ramachandra Medical Centre, Apollo Hospitals, and Kilpauk Medical College.' },
    ],
    meta_title: 'Ambulance Service in Anna Nagar, Chennai | R.G. Ambulance Service',
    meta_description: '24/7 emergency ambulance service in Anna Nagar Chennai. ICU, ventilator, and cardiac ambulances with 10-minute response time. Call +91 95516 63530.',
    meta_keywords: 'ambulance anna nagar, emergency ambulance chennai, icu ambulance anna nagar',
    is_active: true,
  },
  {
    id: 2,
    name: 'T Nagar',
    slug: 'ambulance-service-in-t-nagar',
    description: 'Rapid ambulance response in T Nagar, Chennai. Our central bay serves this busy commercial and residential district with all types of emergency vehicles.',
    content_html: `<h2>Ambulance Service in T Nagar, Chennai</h2>
<p>T Nagar is a bustling commercial and residential hub. Our ambulance bay near Pondy Bazaar ensures quick access to all parts of T Nagar and neighboring localities.</p>
<h3>Coverage Areas</h3>
<ul>
<li>Pondy Bazaar</li>
<li>Ranganathan Street</li>
<li>G N Chetty Road</li>
<li>North Usman Road</li>
        <li>South Usman Road</li>
      </ul>`,
          faqs: [
      { question: 'What is the response time in T Nagar?', answer: 'Our T Nagar bay provides 8-10 minute response times across the locality.' },
      { question: 'Do you provide funeral services in T Nagar?', answer: 'Yes, we provide funeral and homage services including AC funeral vans and freezer boxes across T Nagar.' },
    ],
    meta_title: 'Ambulance Service in T Nagar, Chennai | R.G. Ambulance Service',
... (truncated, 2478 lines, 110 locations, ~330 keywords)
    description: '24/7 emergency ambulance service in RA Puram, Chennai. Rapid response with ICU, BLS, and cardiac care vehicles.',
    content_html: `<h2>Ambulance Service in RA Puram, Chennai</h2>
<p>RA Puram is an upscale residential locality in Chennai, known for its tree-lined streets and elite neighborhoods. R.G. Ambulance Service maintains a dedicated ambulance standby bay to ensure rapid emergency response across this area.</p>
<h3>Coverage Areas</h3>
<ul>
<li>RA Puram Main Road</li>
<li>RA Puram Colony</li>
<li>Surrounding neighborhoods</li>
</ul>
<h3>Service Features</h3>
<p>Our RA Puram bay is equipped with BLS, ALS, cardiac care, and patient transport ambulances staffed by experienced paramedics.</p>`,
    faqs: [
      { question: 'What is the response time in RA Puram?', answer: 'Our RA Puram standby bay provides a response time of 10-15 minutes across the locality.' },
    ],
    meta_title: 'Ambulance Service in RA Puram, Chennai | R.G. Ambulance Service',
    meta_description: '24/7 emergency ambulance service in RA Puram Chennai. ICU, BLS, and cardiac ambulances available. Call +91 95516 63530.',
    meta_keywords: 'ambulance ra puram, emergency service ra puram, chennai upscale area ambulance',
    is_active: true,
  },
];
```

## src\hooks\useKeyboardShortcuts.ts

```typescript
import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Shortcut {
  keys: string;
  description: string;
  category: string;
  pagePattern?: string;
  action: () => void;
}

const BUFFER_TIMEOUT = 900;

function normalizeKey(e: KeyboardEvent): string {
  if (['Escape', 'Backspace', 'Tab', 'Enter'].includes(e.key)) return e.key;
  if (e.key === ' ') return 'Space';
  if (e.key === '/') return '/';
  if (e.key === '?') return '?';
  if (e.key.length === 1) {
    const lower = e.key.toLowerCase();
    if (e.shiftKey && /^[a-zA-Z]$/.test(e.key)) return `Shift+${e.key.toUpperCase()}`;
    if (e.shiftKey && /^[0-9]$/.test(lower)) return `Shift+${lower}`;
    return lower;
  }
  return e.key;
}

function pathMatches(pattern: string | undefined, path: string): boolean {
  if (!pattern) return true;
  if (pattern.includes('*')) {
    const re = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
    return re.test(path);
  }
  return path === pattern;
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showHelp, setShowHelp] = useState(false);
  const buffer = useRef<{ key: string; time: number } | null>(null);
  const showHelpRef = useRef(showHelp);
  showHelpRef.current = showHelp;

  const shortcuts: Shortcut[] = [
    { keys: '?', description: 'Toggle keyboard shortcuts help', category: 'Help', action: () => setShowHelp(p => !p) },

    { keys: 'g h', description: 'Go to Home', category: 'Navigation', action: () => navigate('/') },
    { keys: 'g a', description: 'Go to Ambulance Services', category: 'Navigation', action: () => navigate('/ambulance-services') },
    { keys: 'g f', description: 'Go to Funeral Services', category: 'Navigation', action: () => navigate('/funeral-services') },
    { keys: 'g t', description: 'Go to Testimonials', category: 'Navigation', action: () => navigate('/testimonials') },
    { keys: 'g b', description: 'Go to Blog', category: 'Navigation', action: () => navigate('/blog') },
    { keys: 'g c', description: 'Go to Contact', category: 'Navigation', action: () => navigate('/contact') },

    { keys: 'c', description: 'Call 24/7 Emergency Hotline', category: 'Quick Actions', action: () => { window.location.href = 'tel:+917449177777'; } },
    { keys: 'w', description: 'Open WhatsApp Chat', category: 'Quick Actions', action: () => { window.open('https://wa.me/917449177777?text=Hi%20Flying%20Squad%2C%20I%20need%20emergency%20ambulance%20assistance.', '_blank'); } },
    { keys: 'm', description: 'Toggle mobile menu', category: 'Quick Actions', action: () => { document.querySelector('[data-toggle-mobile-menu]')?.dispatchEvent(new MouseEvent('click', { bubbles: true })); } },
    { keys: 'Escape', description: 'Close any open modal / overlay / menu', category: 'Quick Actions', action: () => { window.dispatchEvent(new CustomEvent('shortcut:escape')); } },

    { keys: 'j', description: 'Scroll down 100px', category: 'Scrolling', action: () => window.scrollBy(0, 100) },
    { keys: 'k', description: 'Scroll up 100px', category: 'Scrolling', action: () => window.scrollBy(0, -100) },
    { keys: 'd', description: 'Scroll down half page', category: 'Scrolling', action: () => window.scrollBy(0, window.innerHeight / 2) },
    { keys: 'u', description: 'Scroll up half page', category: 'Scrolling', action: () => window.scrollBy(0, -window.innerHeight / 2) },
    { keys: 't', description: 'Scroll to top of page', category: 'Scrolling', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { keys: 'b', description: 'Scroll to bottom of page', category: 'Scrolling', action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) },
    { keys: 'g g', description: 'Scroll to top (vim-style)', category: 'Scrolling', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { keys: 'G', description: 'Scroll to bottom (vim-style)', category: 'Scrolling', action: () => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) },

    { keys: '/', description: 'Focus first search / filter input', category: 'Scrolling', action: () => { (document.querySelector('input[type="text"][placeholder*="earch"], input[type="text"][placeholder*="Search"], input[placeholder*="location"], input[placeholder*="Location"]') as HTMLInputElement)?.focus(); } },

    { keys: 'h s', description: 'Scroll to statistics section', category: 'Home Page', pagePattern: '/', action: () => document.querySelector('section:nth-of-type(2)')?.scrollIntoView({ behavior: 'smooth' }) },
    { keys: 'h v', description: 'Scroll to services section', category: 'Home Page', pagePattern: '/', action: () => document.querySelector('section:nth-of-type(3)')?.scrollIntoView({ behavior: 'smooth' }) },
    { keys: 'h b', description: 'Scroll to booking form section', category: 'Home Page', pagePattern: '/', action: () => document.getElementById('booking-sec')?.scrollIntoView({ behavior: 'smooth' }) },
    { keys: 'h l', description: 'Scroll to locations section', category: 'Home Page', pagePattern: '/', action: () => document.querySelector('section:nth-of-type(5)')?.scrollIntoView({ behavior: 'smooth' }) },
    { keys: 'h t', description: 'Scroll to get in touch section', category: 'Home Page', pagePattern: '/', action: () => document.querySelector('section:nth-of-type(6)')?.scrollIntoView({ behavior: 'smooth' }) },
    { keys: 'h x', description: 'Toggle Show All Locations button', category: 'Home Page', pagePattern: '/', action: () => { (document.querySelector('section:nth-of-type(5) button') as HTMLButtonElement)?.click(); } },
    { keys: 'h n', description: 'Focus booking form name field', category: 'Home Page', pagePattern: '/', action: () => (document.querySelector('#booking-sec input') as HTMLInputElement)?.focus() },
    { keys: 'h p', description: 'Focus contact form name field', category: 'Home Page', pagePattern: '/', action: () => (document.querySelector('section:nth-of-type(6) input[placeholder*="Name"]') as HTMLInputElement)?.focus() },
    { keys: 'h 1', description: 'Focus booking form pickup', category: 'Home Page', pagePattern: '/', action: () => (document.querySelector('#booking-sec input[placeholder*="Pickup"]') as HTMLInputElement)?.focus() },
    { keys: 'h 2', description: 'Focus contact form phone', category: 'Home Page', pagePattern: '/', action: () => (document.querySelector('section:nth-of-type(6) input[placeholder*="Mobile"]') as HTMLInputElement)?.focus() },

    { keys: '1', description: 'Open detail: BLS Ambulance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 0 } })) },
    { keys: '2', description: 'Open detail: ALS Ambulance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 1 } })) },
    { keys: '3', description: 'Open detail: Neonatal Ambulance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 2 } })) },
    { keys: '4', description: 'Open detail: ICU Ventilator', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 3 } })) },
    { keys: '5', description: 'Open detail: Patient Transport', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 4 } })) },
    { keys: '6', description: 'Open detail: Long Distance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 5 } })) },
    { keys: '7', description: 'Open detail: Cardiac Care', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-detail', { detail: { index: 6 } })) },
    { keys: 'Shift+1', description: 'Open booking: BLS Ambulance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 0 } })) },
    { keys: 'Shift+2', description: 'Open booking: ALS Ambulance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 1 } })) },
    { keys: 'Shift+3', description: 'Open booking: Neonatal', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 2 } })) },
    { keys: 'Shift+4', description: 'Open booking: ICU Ventilator', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 3 } })) },
    { keys: 'Shift+5', description: 'Open booking: Patient Transport', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 4 } })) },
    { keys: 'Shift+6', description: 'Open booking: Long Distance', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 5 } })) },
    { keys: 'Shift+7', description: 'Open booking: Cardiac Care', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-ambulance-booking', { detail: { index: 6 } })) },
    { keys: 'a c', description: 'Call ambulance standby hotline', category: 'Ambulance Services', pagePattern: '/ambulance-services', action: () => { window.location.href = 'tel:+917449177777'; } },

    { keys: '1', description: 'Open detail: AC Funeral Van', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 0 } })) },
    { keys: '2', description: 'Open detail: Freezer Box', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 1 } })) },
    { keys: '3', description: 'Open detail: Motorized Coffin', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 2 } })) },
    { keys: '4', description: 'Open detail: VIP Funeral', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 3 } })) },
    { keys: '5', description: 'Open detail: Casket & Urn', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 4 } })) },
    { keys: '6', description: 'Open detail: Death Certificate', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 5 } })) },
    { keys: '7', description: 'Open detail: Religious Ceremony', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 6 } })) },
    { keys: '8', description: 'Open detail: Dead Body Transport', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-detail', { detail: { index: 7 } })) },
    { keys: 'Shift+1', description: 'Open booking: AC Funeral Van', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 0 } })) },
    { keys: 'Shift+2', description: 'Open booking: Freezer Box', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 1 } })) },
    { keys: 'Shift+3', description: 'Open booking: Motorized Coffin', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 2 } })) },
    { keys: 'Shift+4', description: 'Open booking: VIP Funeral', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 3 } })) },
    { keys: 'Shift+5', description: 'Open booking: Casket & Urn', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 4 } })) },
    { keys: 'Shift+6', description: 'Open booking: Death Certificate', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 5 } })) },
    { keys: 'Shift+7', description: 'Open booking: Religious Ceremony', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 6 } })) },
    { keys: 'Shift+8', description: 'Open booking: Dead Body Transport', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-funeral-booking', { detail: { index: 7 } })) },
    { keys: 'f c', description: 'Call funeral support desk', category: 'Funeral Services', pagePattern: '/funeral-services', action: () => { window.location.href = 'tel:+917449177777'; } },

    { keys: '1', description: 'Open blog post 1', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 0 } })) },
    { keys: '2', description: 'Open blog post 2', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 1 } })) },
    { keys: '3', description: 'Open blog post 3', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 2 } })) },
    { keys: '4', description: 'Open blog post 4', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 3 } })) },
    { keys: '5', description: 'Open blog post 5', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 4 } })) },
    { keys: '6', description: 'Open blog post 6', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 5 } })) },
    { keys: '7', description: 'Open blog post 7', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 6 } })) },
    { keys: '8', description: 'Open blog post 8', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 7 } })) },
    { keys: '9', description: 'Open blog post 9', category: 'Blog', pagePattern: '/blog', action: () => window.dispatchEvent(new CustomEvent('shortcut:open-blog', { detail: { index: 8 } })) },
    { keys: 'b c', description: 'Focus category filters on blog', category: 'Blog', action: () => (document.querySelector('[class*="category"] button, button:has(span:contains("All"))') as HTMLButtonElement)?.focus() },

    { keys: 'Backspace', description: 'Go back to blog list', category: 'Blog Detail', pagePattern: '/blog/*', action: () => navigate('/blog') },

    { keys: 'k 1', description: 'Focus name field', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('input[placeholder*="Name"]') as HTMLInputElement)?.focus() },
    { keys: 'k 2', description: 'Focus email field', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus() },
    { keys: 'k 3', description: 'Focus phone field', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('input[type="tel"]') as HTMLInputElement)?.focus() },
    { keys: 'k 4', description: 'Focus address field', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('input[placeholder*="Address"]') as HTMLInputElement)?.focus() },
    { keys: 'k 5', description: 'Focus requirements select', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('select') as HTMLSelectElement)?.focus() },
    { keys: 'k 6', description: 'Focus message textarea', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('textarea') as HTMLTextAreaElement)?.focus() },
    { keys: 'k s', description: 'Submit contact form', category: 'Contact', pagePattern: '/contact', action: () => (document.querySelector('button:has(svg.lucide-send), button:contains("Send Message")') as HTMLButtonElement)?.click() },

    { keys: 't 1', description: 'Verify review 1', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[0] as HTMLAnchorElement)?.click() },
    { keys: 't 2', description: 'Verify review 2', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[1] as HTMLAnchorElement)?.click() },
    { keys: 't 3', description: 'Verify review 3', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[2] as HTMLAnchorElement)?.click() },
    { keys: 't 4', description: 'Verify review 4', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[3] as HTMLAnchorElement)?.click() },
    { keys: 't 5', description: 'Verify review 5', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[4] as HTMLAnchorElement)?.click() },
    { keys: 't 6', description: 'Verify review 6', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[5] as HTMLAnchorElement)?.click() },
    { keys: 't 7', description: 'Verify review 7', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[6] as HTMLAnchorElement)?.click() },
    { keys: 't 8', description: 'Verify review 8', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[7] as HTMLAnchorElement)?.click() },
    { keys: 't 9', description: 'Verify review 9', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelectorAll('a[href*="g.co"],[href*="google"]')[8] as HTMLAnchorElement)?.click() },
    { keys: 't w', description: 'Write a Google Review', category: 'Testimonials', pagePattern: '/testimonials', action: () => (document.querySelector('a[href*="search?q="]') as HTMLAnchorElement)?.click() },

    { keys: 'l c', description: 'Call standby bay', category: 'Location Page', pagePattern: '/ambulance-service-in-*', action: () => { window.location.href = 'tel:+917449177777'; } },
    { keys: 'l w', description: 'WhatsApp standby bay', category: 'Location Page', pagePattern: '/ambulance-service-in-*', action: () => (document.querySelector('button:has(svg.lucide-message-square)') as HTMLButtonElement)?.click() },
    { keys: 'l b', description: 'Focus booking form name', category: 'Location Page', pagePattern: '/ambulance-service-in-*', action: () => (document.querySelector('input[placeholder*="Contact Name"]') as HTMLInputElement)?.focus() },
    { keys: 'l f', description: 'Toggle first FAQ', category: 'Location Page', pagePattern: '/ambulance-service-in-*', action: () => (document.querySelector('button:has(svg.lucide-chevron-down)') as HTMLButtonElement)?.click() },
    { keys: 'l s', description: 'Submit location booking', category: 'Location Page', pagePattern: '/ambulance-service-in-*', action: () => (document.querySelector('button:has(svg.lucide-calendar), button:contains("Submit")') as HTMLButtonElement)?.click() },

    { keys: 'o f', description: 'Open Facebook page', category: 'Footer', action: () => window.open('https://facebook.com', '_blank') },
    { keys: 'o t', description: 'Open Twitter page', category: 'Footer', action: () => window.open('https://twitter.com', '_blank') },
    { keys: 'o y', description: 'Open YouTube page', category: 'Footer', action: () => window.open('https://youtube.com', '_blank') },
    { keys: 'o e', description: 'Send email', category: 'Footer', action: () => { window.location.href = 'mailto:info@flyinngsquad.com'; } },
    { keys: 'o u', description: 'Scroll back to top', category: 'Footer', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
  ];

  const findByKeys = useCallback((normalizedKeys: string): Shortcut | undefined => {
    return shortcuts.find(s => {
      if (!pathMatches(s.pagePattern, location.pathname)) return false;
      return s.keys === normalizedKeys;
    });
  }, [location.pathname]);

  const startsTwoKeySequence = useCallback((key: string): boolean => {
    return shortcuts.some(s => {
      if (!pathMatches(s.pagePattern, location.pathname)) return false;
      return s.keys.startsWith(key + ' ') && s.keys.length > key.length + 1;
    });
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInputFocused = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable;

      const key = normalizeKey(e);

      if (isInputFocused) {
        if (key === 'Escape') {
          e.preventDefault();
          window.dispatchEvent(new CustomEvent('shortcut:escape'));
        }
        return;
      }

      const buf = buffer.current;

      if (buf && Date.now() - buf.time < BUFFER_TIMEOUT) {
        const combo = `${buf.key} ${key}`;
        buffer.current = null;
        const match = findByKeys(combo);
        if (match) {
          e.preventDefault();
          match.action();
          return;
        }
        return;
      }

      buffer.current = null;

      if (startsTwoKeySequence(key)) {
        buffer.current = { key, time: Date.now() };
        e.preventDefault();
        return;
      }

      const direct = findByKeys(key);
      if (direct) {
        e.preventDefault();
        direct.action();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [findByKeys, startsTwoKeySequence]);

  return { showHelp, setShowHelp, shortcuts };
}
```

## api\contact.mjs

```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, address, requirements, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0A1F44; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0;">R.G. Ambulance Service</h2>
          <p style="color: #90A4AE; margin: 5px 0 0; font-size: 12px;">New Contact Form Inquiry</p>
        </div>
        <div style="background: #f8f9fc; padding: 25px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333; width: 120px;">Name:</td>
              <td style="padding: 8px 12px; color: #555;">${name}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 12px; color: #555;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 12px; color: #555;">${phone}</td>
            </tr>
            <tr style="background: #fff;">
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Address:</td>
              <td style="padding: 8px 12px; color: #555;">${address || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; font-weight: bold; color: #333;">Service:</td>
              <td style="padding: 8px 12px; color: #555;">${requirements}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #fff; border-radius: 8px; border-left: 4px solid #0047AB;">
            <p style="margin: 0 0 8px; font-weight: bold; color: #333; font-size: 13px;">Message:</p>
            <p style="margin: 0; color: #555; font-size: 13px; line-height: 1.6;">${message}</p>
          </div>
        </div>
        <div style="text-align: center; padding: 15px; color: #90A4AE; font-size: 11px;">
          <p style="margin: 0;">Sent from R.G. Ambulance Service Contact Form</p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'ebenezer.r@rgambulanceservice.com',
      subject: `Contact Form Inquiry from ${name} - ${requirements} Service`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || 'N/A'}\nService Required: ${requirements}\nMessage: ${message}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
}
```

