import React from 'react';
import { MessageCircle, Phone, Calendar } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';

export default function MobileStickyBar({ onOpenConsultation }) {
  return (
    <aside 
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#161514]/95 backdrop-blur-lg border-t border-[#33312E] pt-2 pb-safe px-3 shadow-2xl transition-transform duration-300"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* WhatsApp */}
        <a
          href={getWhatsAppLink("Hello! I am reaching out from your mobile site to discuss a consultation.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#25D366]/15 text-[#25D366] rounded-xl text-[11px] font-medium border border-[#25D366]/30 active:scale-98 active:bg-[#25D366]/25 transition-all focus:outline-none focus:ring-2 focus:ring-[#25D366]"
        >
          <MessageCircle size={18} className="mb-0.5" />
          <span>WhatsApp</span>
        </a>

        {/* Direct Call */}
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#22201E] text-[#D8CEBE] rounded-xl text-[11px] font-medium border border-[#33312E] active:scale-98 active:bg-[#2e2b28] transition-all focus:outline-none focus:ring-2 focus:ring-[#B89758]"
        >
          <Phone size={18} className="mb-0.5 text-[#B89758]" />
          <span>Call Studio</span>
        </a>

        {/* Consultation Modal / Page */}
        <button
          onClick={onOpenConsultation}
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#B89758] text-[#161514] rounded-xl text-[11px] font-bold active:scale-98 active:bg-[#DEC695] transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#DEC695]"
        >
          <Calendar size={18} className="mb-0.5" />
          <span>Consult</span>
        </button>
      </div>
    </aside>
  );
}
