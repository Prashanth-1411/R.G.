import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Phone, MessageSquare } from 'lucide-react';

export const FloatingCTA: React.FC = () => {
  const location = useLocation();

  const handleWhatsAppClick = async () => {
    const phoneNumber = '917449177777';
    const prefilledText = `Hi Flying Squad, I am visiting the website page (${window.location.origin}${location.pathname}) and need emergency assistance or booking details. Please reply.`;
    
    // Log the click lead in backend
    try {
      await axios.post('http://localhost:8000/api/public/whatsapp-leads/track/', {
        phone: 'Visitor Click',
        source_page: location.pathname,
        prefilled_message: prefilledText
      });
    } catch (error) {
      console.error("Failed to track WhatsApp lead", error);
    }

    // Redirect to whatsapp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(prefilledText)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Floating Buttons - Desktop only (or right side on tablet) */}
      <div className="fixed right-6 bottom-8 z-40 hidden sm:flex flex-col gap-3">
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center shadow-premium-hover transition-premium duration-300 hover:scale-110"
          title="Chat on WhatsApp"
        >
          {/* Custom WhatsApp Icon */}
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.488 2.01 14.041 1 11.999 1c-5.437 0-9.862 4.37-9.866 9.8.001 1.77.472 3.498 1.362 5.031L2.493 20.3l4.154-1.146zm11.225-7.22c-.104-.176-.388-.282-.813-.495-.426-.213-2.52-1.24-2.91-1.382-.39-.142-.673-.213-.956.213-.283.425-1.098 1.382-1.347 1.666-.25.282-.497.319-.923.106-.426-.213-1.8-.663-3.43-2.113-1.27-1.13-2.128-2.527-2.378-2.952-.25-.425-.027-.655.186-.867.191-.191.425-.496.638-.744.213-.248.283-.425.426-.709.141-.283.07-.531-.035-.744-.106-.213-.956-2.302-1.31-3.153-.346-.832-.7-.72-1.028-.737-.266-.013-.57-.015-.875-.015-.304 0-.8.114-1.22.567-.419.453-1.6 1.56-1.6 3.805 0 2.246 1.637 4.417 1.862 4.721.225.304 3.224 4.922 7.81 6.904 1.09.471 1.943.753 2.61.964 1.096.347 2.095.298 2.88.18.877-.13 2.52-.103 2.878-.971.359-.868.359-1.614.25-1.767z" />
          </svg>
        </button>

        {/* Call Button */}
        <a
          href="tel:+917449177777"
          className="w-14 h-14 bg-brandBlue hover:bg-brandNavy text-white rounded-full flex items-center justify-center shadow-premium-hover transition-premium duration-300 hover:scale-110 border border-white/10"
          title="Call Us (24/7)"
        >
          <Phone className="w-6 h-6 fill-white" />
        </a>
      </div>

      {/* Mobile Sticky Bar - Visible only on small screens at the absolute bottom */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 py-2.5 px-4 z-40 sm:hidden grid grid-cols-2 gap-3 shadow-2xl">
        <a
          href="tel:+917449177777"
          className="flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-extrabold text-sm shadow-md"
        >
          <Phone className="w-4 h-4 fill-white" />
          <span>Call 24/7 Hotline</span>
        </a>
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 py-3 bg-emerald-600 text-white rounded-xl font-extrabold text-sm shadow-md"
        >
          <MessageSquare className="w-4 h-4 text-white" />
          <span>WhatsApp Us</span>
        </button>
      </div>
    </>
  );
};
