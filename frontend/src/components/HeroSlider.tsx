import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSliders, getMediaUrl, type SliderItem } from '../api';
import slide1 from '../assets/5.jpg';
import slide2 from '../assets/4.jpeg';
import slide3 from '../assets/funeral-6.jpg';

const INTERVAL = 7000;

const FALLBACK_SLIDES: SliderItem[] = [
  {
    id: 1,
    image: slide1,
    image_url: slide1,
    title: 'Emergency Ambulance Services',
    description: 'Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India.',
    subtitle: 'Advanced ICU Ambulances, Trained Medical Staff, and Rapid Emergency Response Across India.',
    button_text: 'Call Now: +91 95516 63530',
    button_link: 'tel:+919551663530',
    order: 1,
    sort_order: 1,
    is_active: 1,
  },
  {
    id: 2,
    image: slide2,
    image_url: slide2,
    title: 'ICU on Wheels',
    description: 'Fully equipped mobile ICU units with ventilators, cardiac monitors, and critical care paramedics.',
    subtitle: 'Fully equipped mobile ICU units with ventilators, cardiac monitors, and critical care paramedics.',
    button_text: 'Book Ambulance',
    button_link: '#booking-sec',
    order: 2,
    sort_order: 2,
    is_active: 1,
  },
  {
    id: 3,
    image: slide3,
    image_url: slide3,
    title: 'Dignified Funeral Care',
    description: 'Compassionate funeral services with AC hearses, deceased preservation, and full ritual support.',
    subtitle: 'Compassionate funeral services with AC hearses, deceased preservation, and full ritual support.',
    button_text: 'Funeral Services',
    button_link: '/funeral-services',
    order: 3,
    sort_order: 3,
    is_active: 1,
  },
];

const getSlideImage = (slide: SliderItem) => {
  const path = slide.image || slide.image_url;
  if (!path) return '';
  if (path.startsWith('http') || path.startsWith('/') || path.includes('assets')) return path;
  return getMediaUrl(path);
};

export const HeroSlider: React.FC = () => {
  const [slides, setSlides] = useState<SliderItem[]>(FALLBACK_SLIDES);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const progressRef = useRef<ReturnType<typeof setInterval>>();
  const isPaused = useRef(false);

  useEffect(() => {
    getSliders().then((items: SliderItem[]) => {
      const active = items
        .filter((s) => s.is_active)
        .sort((a, b) => (a.order || a.sort_order || 0) - (b.order || b.sort_order || 0));
      if (active.length > 0) setSlides(active);
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgress(0);
  }, []);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, [slides.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length < 2) return;
    setProgress(0);
    const tick = 50;
    const step = (tick / INTERVAL) * 100;
    timerRef.current = setInterval(next, INTERVAL);
    progressRef.current = setInterval(() => {
      if (!isPaused.current) {
        setProgress((p) => Math.min(p + step, 100));
      }
    }, tick);
    return () => {
      clearInterval(timerRef.current);
      clearInterval(progressRef.current);
    };
  }, [next, slides.length]);

  const slide = slides[current];
  const secondaryButton = slide.button_link?.startsWith('#')
    ? { href: slide.button_link, isExternal: false }
    : slide.button_link
      ? { href: slide.button_link, isExternal: slide.button_link.startsWith('http') || slide.button_link.startsWith('tel') }
      : { href: '#booking-sec', isExternal: false };

  return (
    <section
      className="relative w-full min-h-[85vh] sm:min-h-[90vh] overflow-hidden bg-navy-900"
      onMouseEnter={() => { isPaused.current = true; }}
      onMouseLeave={() => { isPaused.current = false; }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${getSlideImage(slide)})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 via-navy-900/50 to-navy-900/30" />
          <div className="absolute inset-0 bg-hero-glow" />
          <div className="absolute inset-0 split-pattern opacity-10" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[85vh] sm:min-h-[90vh] flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${slide.id}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl space-y-6 py-20"
          >
            <motion.span
              className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-400 border border-gold-400/30 rounded-full bg-gold-400/5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              R.G. Ambulance Service
            </motion.span>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white font-display leading-[1.05] tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              {slide.title}
            </motion.h1>
            {(slide.description || slide.subtitle) && (
              <motion.p
                className="text-base sm:text-lg text-navy-200 leading-relaxed max-w-2xl font-body"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {slide.description || slide.subtitle}
              </motion.p>
            )}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.a
                href="tel:+919551663530"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-premium !py-4 !px-8 text-base text-center"
              >
                <span>Call Now: +91 95516 63530</span>
              </motion.a>
              {slide.button_text && (
                <motion.a
                  href={secondaryButton.href}
                  target={secondaryButton.isExternal && secondaryButton.href.startsWith('http') ? '_blank' : undefined}
                  rel={secondaryButton.isExternal && secondaryButton.href.startsWith('http') ? 'noreferrer' : undefined}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="btn-outline !py-4 !px-8 text-base !text-white !border-white/20 hover:!border-white/40 hover:!bg-white/5 text-center"
                >
                  <span>{slide.button_text}</span>
                </motion.a>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20 backdrop-blur-md border border-white/15 hover:border-white/30 hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all z-20 backdrop-blur-md border border-white/15 hover:border-white/30 hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-500 ${
                  i === current
                    ? 'bg-white w-10 h-2.5 shadow-[0_0_12px_rgba(255,255,255,0.3)]'
                    : 'bg-white/30 w-2.5 h-2.5 hover:bg-white/50 hover:scale-125'
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-400 to-gold-500"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: 'linear' }}
            />
          </div>
        </>
      )}
    </section>
  );
};
