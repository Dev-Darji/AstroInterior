import React, { useState, useEffect } from 'react';
import { Menu, MessageCircle, ArrowUpRight } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';
import MobileDrawer from './MobileDrawer';

import AstroLogo from '../ui/AstroLogo';

export default function Navbar({ activeTab, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "astrology", label: "Astrology" },
    { id: "vastu", label: "Vastu" },
    { id: "numerology", label: "Numerology" },
    { id: "interiors", label: "Interiors" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" }
  ];

  const isDarkHero = !isScrolled && activeTab === "home";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FDFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#EFE8DC] py-3.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => onNavigate("home")}
              className="text-left group focus:outline-none"
              aria-label="AstroInterior Home"
            >
              <AstroLogo light={isDarkHero} />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-1.5 rounded-full text-xs xl:text-sm tracking-wide transition-all ${
                      isDarkHero
                        ? isActive
                          ? "text-[#FDFBF7] font-semibold bg-white/20"
                          : "text-[#D8CEBE] hover:text-white hover:bg-white/10"
                        : isActive
                          ? "text-[#161514] font-semibold bg-[#EFE8DC]/70"
                          : "text-[#634832] hover:text-[#161514] hover:bg-[#F7F3EB]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getWhatsAppLink("Hello! I am browsing your website and would like to speak to your design & Vastu team.")}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  isDarkHero
                    ? "bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/40 hover:bg-[#25D366]/30"
                    : "bg-[#25D366]/10 text-[#1a8a43] border border-[#25D366]/30 hover:bg-[#25D366]/20"
                }`}
                title="Chat with our principal studio on WhatsApp"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate("consultation")}
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-colors shadow-sm ${
                  isDarkHero
                    ? "bg-[#B89758] text-[#161514] hover:bg-[#DEC695]"
                    : "bg-[#161514] text-[#FDFBF7] hover:bg-[#634832]"
                }`}
              >
                <span>Consultation</span>
                <ArrowUpRight size={14} className={isDarkHero ? "text-[#161514]" : "text-[#DEC695]"} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isDarkHero
                  ? "text-[#FDFBF7] hover:bg-white/10"
                  : "text-[#161514] hover:bg-[#EFE8DC]"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        currentTab={activeTab}
        onNavigate={onNavigate}
      />
    </>
  );
}
