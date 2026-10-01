import React, { useState, useEffect } from 'react';
import { Menu, MessageCircle, Phone, ArrowUpRight, Sparkles, ChevronDown } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';
import MobileDrawer from './MobileDrawer';

import AstroLogo from '../ui/AstroLogo';

export default function Navbar({ activeTab, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Overview" },
    { id: "vastu-interiors", label: "Vastu × Interiors" },
    { id: "vastu", label: "Vastu Shastra" },
    { id: "interiors", label: "Portfolio" },
    { id: "services", label: "Services" },
    { id: "insights", label: "Insights" }
  ];

  const interactiveTools = [
    { id: "compass", tab: "vastu", label: "Interactive Vastu Compass", desc: "8-directional elemental mapping" },
    { id: "floorplan", tab: "vastu-interiors", label: "Room-by-Room Floor Plan", desc: "Vastu rules vs interior solutions" },
    { id: "numerology", tab: "tools", label: "Numerology Calculator", desc: "Life Path & spatial resonance" },
    { id: "kundli", tab: "tools", label: "Astrology Birth Chart Demo", desc: "Vedic planetary alignment" },
    { id: "advisor", tab: "tools", label: "AI Space Concept Advisor", desc: "Interactive room concept generator" }
  ];

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
              <AstroLogo />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm tracking-wide transition-all ${
                    activeTab === item.id
                      ? "text-[#161514] font-semibold bg-[#EFE8DC]/70"
                      : "text-[#634832] hover:text-[#161514] hover:bg-[#F7F3EB]"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Interactive Tools Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setToolsDropdownOpen(true)}
                onMouseLeave={() => setToolsDropdownOpen(false)}
              >
                <button
                  onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                  aria-haspopup="true"
                  aria-expanded={toolsDropdownOpen}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm tracking-wide flex items-center gap-1.5 transition-all ${
                    activeTab === "tools"
                      ? "text-[#161514] font-semibold bg-[#EFE8DC]/70"
                      : "text-[#634832] hover:text-[#161514] hover:bg-[#F7F3EB]"
                  }`}
                >
                  <Sparkles size={14} className="text-[#B89758]" />
                  <span>Interactive Tools</span>
                  <ChevronDown size={12} className={`transition-transform duration-200 ${toolsDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {toolsDropdownOpen && (
                  <div 
                    role="menu"
                    className="absolute top-full left-0 mt-2 w-72 bg-[#FDFBF7] border border-[#EFE8DC] rounded-xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-3 py-2 text-[10px] uppercase tracking-wider text-[#A85838] font-semibold border-b border-[#EFE8DC]/60 mb-1">
                      Interactive Experiences
                    </div>
                    {interactiveTools.map((tool) => (
                      <button
                        key={tool.id}
                        role="menuitem"
                        onClick={() => {
                          onNavigate(tool.tab);
                          setToolsDropdownOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-[#F7F3EB] group transition-colors block focus:outline-none focus:bg-[#F7F3EB]"
                      >
                        <div className="text-xs font-medium text-[#161514] group-hover:text-[#A85838]">
                          {tool.label}
                        </div>
                        <div className="text-[11px] text-[#634832]/70">
                          {tool.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href={getWhatsAppLink("Hello! I am browsing your website and would like to speak to your design & Vastu team.")}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#25D366]/10 text-[#1a8a43] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors"
                title="Chat with our principal studio on WhatsApp"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => onNavigate("consultation")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium bg-[#161514] text-[#FDFBF7] hover:bg-[#634832] transition-colors shadow-sm"
              >
                <span>Consultation</span>
                <ArrowUpRight size={14} className="text-[#DEC695]" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-[#161514] hover:bg-[#EFE8DC] transition-colors"
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
