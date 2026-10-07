import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';
import AstroLogo from '../ui/AstroLogo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#161514] text-[#FDFBF7] pt-16 pb-24 md:pb-16 border-t border-[#292724]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#292724]">
          {/* Col 1 & 2: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-5">
            <AstroLogo light={true} />
            
            <p className="editorial-subheading text-[#B89758] tracking-[0.2em]">
              Where Energy Meets Design
            </p>

            <p className="text-sm text-[#D8CEBE]/80 leading-relaxed max-w-md">
              A contemporary Indian design practice bridging Vedic Astrology, Chaldean Numerology, 
              Vastu Shastra, and bespoke modern interior architecture. We align living spaces with the people who inhabit them.
            </p>

            <div className="pt-2 flex items-center gap-4 text-[#D8CEBE]">
              <a 
                href={siteConfig.socialLinks.instagram} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-[#22201E] hover:text-[#B89758] hover:bg-[#2B2825] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a 
                href={siteConfig.socialLinks.youtube} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-[#22201E] hover:text-[#B89758] hover:bg-[#2B2825] transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
                </svg>
              </a>
              <a 
                href={siteConfig.socialLinks.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-[#22201E] hover:text-[#B89758] hover:bg-[#2B2825] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.8">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a 
                href={getWhatsAppLink("Hello, I am reaching out from your website footer.")}
                target="_blank" 
                rel="noreferrer" 
                className="p-2.5 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          {/* Col 3: Disciplines */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#FDFBF7] tracking-wide">Pillars</h3>
            <ul className="space-y-2.5 text-sm text-[#D8CEBE]/70">
              <li>
                <button onClick={() => onNavigate("vastu-interiors")} className="hover:text-[#FDFBF7] transition-colors">
                  Vastu × Interior Design
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("vastu")} className="hover:text-[#FDFBF7] transition-colors">
                  Vastu Shastra Audits
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("interiors")} className="hover:text-[#FDFBF7] transition-colors">
                  Residential Interiors
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "kundli")} className="hover:text-[#FDFBF7] transition-colors">
                  Vedic Kundli Analysis
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "numerology")} className="hover:text-[#FDFBF7] transition-colors">
                  Chaldean Numerology
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Interactive Demos */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#FDFBF7] tracking-wide">Interactive</h3>
            <ul className="space-y-2.5 text-sm text-[#D8CEBE]/70">
              <li>
                <button onClick={() => onNavigate("tools", "compass")} className="hover:text-[#FDFBF7] transition-colors">
                  8-Direction Vastu Compass
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "floorplan")} className="hover:text-[#FDFBF7] transition-colors">
                  Room-by-Room Floor Plan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "kundli")} className="hover:text-[#FDFBF7] transition-colors">
                  Free Kundli Generator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "advisor")} className="hover:text-[#FDFBF7] transition-colors">
                  Space Concept Advisor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate("tools", "slider")} className="hover:text-[#FDFBF7] transition-colors">
                  Before / After Slider
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Studio Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg text-[#FDFBF7] tracking-wide">Studio</h3>
            <div className="space-y-3 text-xs text-[#D8CEBE]/80">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#B89758] shrink-0 mt-0.5" />
                <span>{siteConfig.address}, {siteConfig.city}, {siteConfig.state}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#B89758] shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#B89758] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                  {siteConfig.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-[#A85838]">
                {siteConfig.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Cities Served Bar */}
        <div className="py-6 border-b border-[#292724] text-xs text-[#D8CEBE]/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#B89758] uppercase font-semibold text-[10px] tracking-wider">Service Footprint:</span>
            <span>{siteConfig.citiesServed.join(" • ")} • Global Online Consultations</span>
          </div>
          <div>
            <button
              onClick={() => onNavigate("consultation")}
              className="text-[#B89758] hover:text-[#DEC695] inline-flex items-center gap-1 font-medium"
            >
              <span>Schedule a 1-on-1 Studio Session</span>
              <ArrowUpRight size={13} />
            </button>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 text-xs text-[#D8CEBE]/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="max-w-2xl text-[11px] leading-relaxed text-center md:text-left">
            <span className="font-semibold text-[#D8CEBE]/70">Disclaimer: </span>
            {siteConfig.disclaimer}
          </p>

          <p className="text-[11px] shrink-0">
            © {new Date().getFullYear()} {siteConfig.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
