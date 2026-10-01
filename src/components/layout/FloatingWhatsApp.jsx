import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-[4.75rem] md:bottom-7 right-3.5 md:right-7 z-40 flex items-center group">
      {/* Tooltip */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 mr-3 bg-[#161514] text-[#FDFBF7] text-xs py-2 px-3.5 rounded-xl shadow-xl border border-[#B89758]/30 max-w-xs animate-in fade-in duration-300">
          <div>
            <p className="font-medium text-[#DEC695]">Have a question?</p>
            <p className="text-[11px] text-[#D8CEBE]/80">Chat directly with our design team.</p>
          </div>
          <button 
            onClick={() => setShowTooltip(false)}
            className="p-1 text-[#D8CEBE]/60 hover:text-white ml-1 rounded transition-colors focus:outline-none"
            aria-label="Dismiss message"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppLink("Hello! I would like to speak to your team regarding Vastu and Interior Design.")}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-[#25D366]/40"
        aria-label="Chat on WhatsApp with Studio"
        title="Direct WhatsApp with our Studio"
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 md:h-3.5 md:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 md:h-3.5 md:w-3.5 bg-white border-2 border-[#25D366]"></span>
        </span>
        <MessageCircle className="w-6 h-6 md:w-7 md:h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
