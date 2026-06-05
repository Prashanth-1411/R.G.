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
