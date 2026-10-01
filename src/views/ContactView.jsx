import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { siteConfig, getWhatsAppLink } from '../data/siteConfig';
import { MessageCircle, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactView({ onNavigate }) {
  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Studio Inquiries</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Connect With Our <br />
          <span className="italic text-[#A85838]">Design Practice.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          We welcome residential homeowners, builders, and commercial clients for studio visits or remote worldwide consultations.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* WhatsApp Card */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-3">
              <MessageCircle size={22} />
            </div>
            <h3 className="font-serif text-xl text-[#161514]">WhatsApp Studio</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              Instant responses from our principal design team for quick queries and floor plan evaluations.
            </p>
          </div>
          <a
            href={getWhatsAppLink("Hello, I am reaching out to discuss a design consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1a8a43] hover:underline"
          >
            <span>Message on WhatsApp</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Phone Card */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] text-[#B89758] flex items-center justify-center mb-3">
              <Phone size={20} />
            </div>
            <h3 className="font-serif text-xl text-[#161514]">Direct Phone</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              Speak directly with our studio coordinator regarding booking slots and site visits.
            </p>
          </div>
          <a
            href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`}
            className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] hover:text-[#A85838]"
          >
            <span>{siteConfig.phoneDisplay}</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Email Card */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] text-[#A85838] flex items-center justify-center mb-3">
              <Mail size={20} />
            </div>
            <h3 className="font-serif text-xl text-[#161514]">Email Blueprint</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              Send large architectural CAD drawings, PDF floor plans, or project RFPs.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] hover:text-[#A85838]"
          >
            <span>{siteConfig.email}</span>
            <ArrowRight size={13} />
          </a>
        </div>

        {/* Studio Location Card */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] text-[#607261] flex items-center justify-center mb-3">
              <MapPin size={20} />
            </div>
            <h3 className="font-serif text-xl text-[#161514]">Physical Studio</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              {siteConfig.address}, {siteConfig.city}, Gujarat {siteConfig.pincode}
            </p>
          </div>
          <div className="pt-2 text-xs text-[#A85838] font-medium">
            {siteConfig.workingHours}
          </div>
        </div>

      </div>

      {/* Architectural Studio Location Showcase */}
      <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="editorial-subheading text-[#B89758]">Studio Visit & Material Library</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
            Experience the Materials in Person
          </h2>
          <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
            Our Bodakdev studio houses physical swatches of all natural Italian travertines, reclaimed Burma teaks, acoustic fabrics, and handcrafted brass hardware. Schedule an in-person walkthrough with our principal architects.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => onNavigate("consultation")}
              className="px-6 py-3 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-semibold hover:bg-[#634832] transition-colors"
            >
              Book In-Studio Walkthrough
            </button>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Studio Design Space"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}
