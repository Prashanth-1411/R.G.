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
