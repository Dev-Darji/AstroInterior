import React from 'react';
import { X, MessageCircle, Phone, ArrowRight, Compass, Home, Sparkles, BookOpen, Layers } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';
import AstroLogo from '../ui/AstroLogo';

export default function MobileDrawer({ isOpen, onClose, currentTab, onNavigate }) {
  if (!isOpen) return null;

  const navLinks = [
    { id: "home", label: "Home", icon: Home },
    { id: "astrology", label: "Astrology", icon: Sparkles },
    { id: "vastu", label: "Vastu", icon: Compass },
    { id: "numerology", label: "Numerology", icon: Layers },
    { id: "interiors", label: "Interiors", icon: Home },
    { id: "about", label: "About", icon: BookOpen },
    { id: "contact", label: "Contact", icon: Phone }
  ];

  const handleLinkClick = (tabId) => {
    onNavigate(tabId);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative ml-auto flex h-full w-[85%] max-w-sm flex-col bg-[#161514] text-[#FDFBF7] shadow-2xl p-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#33312E]">
          <AstroLogo light={true} size="small" />
          <button 
            onClick={onClose}
            className="p-2 text-[#D8CEBE] hover:text-white rounded-full bg-[#22201E] border border-[#33312E]"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation list */}
        <div className="py-6 flex-1 space-y-1">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm tracking-wide transition-all ${
                  isActive 
                    ? "bg-[#B89758]/15 text-[#DEC695] font-medium border border-[#B89758]/30" 
                    : "text-[#D8CEBE] hover:text-[#FDFBF7] hover:bg-[#22201E]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-[#B89758]" : "text-[#D8CEBE]/70"} />
                  <span>{item.label}</span>
                </div>
                <ArrowRight size={14} className="opacity-50" />
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="pt-6 border-t border-[#33312E] space-y-3">
          <a
            href={getWhatsAppLink("Hello, I would like to connect with your team from the mobile menu.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] text-white rounded-md font-medium text-sm shadow hover:bg-[#22bf5b] transition-colors"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#22201E] text-[#D8CEBE] border border-[#33312E] rounded-md text-xs hover:text-white transition-colors"
          >
            <Phone size={14} />
            <span>Call Studio: {siteConfig.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
