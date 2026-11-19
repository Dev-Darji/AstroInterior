import React from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { siteConfig, getWhatsAppLink, fullAddress } from '../data/siteConfig';
import { MessageCircle, Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactView({ onNavigate }) {
  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Get in Touch</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Connect With <br />
          <span className="italic text-[#A85838]">{siteConfig.founderName}.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Homeowners, businesses, clinics and builders are welcome — visit the Kandivali West office or book an online consultation from anywhere.
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
            <h3 className="font-serif text-xl text-[#161514]">WhatsApp</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              The quickest way to reach us — share your query, floor plan or birth details directly.
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
            <h3 className="font-serif text-xl text-[#161514]">Call</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              Call to book a consultation slot or arrange a site visit.
            </p>
          </div>
          <div className="pt-2 flex flex-col gap-1.5">
            {[[siteConfig.phone, siteConfig.phoneDisplay], [siteConfig.phoneAlt, siteConfig.phoneAltDisplay]].map(([tel, label]) => (
              <a key={tel} href={`tel:${tel}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] hover:text-[#A85838]">
                <span>{label}</span>
                <ArrowRight size={13} />
              </a>
            ))}
          </div>
        </div>

        {/* Email Card */}
        <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] space-y-3 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#F7F3EB] text-[#A85838] flex items-center justify-center mb-3">
              <Mail size={20} />
            </div>
            <h3 className="font-serif text-xl text-[#161514]">Email</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              Send floor plans, property drawings or detailed questions.
            </p>
          </div>
          <a
            href={`mailto:${siteConfig.email}`}
            className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] hover:text-[#A85838] break-all"
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
            <h3 className="font-serif text-xl text-[#161514]">Office</h3>
            <p className="text-xs text-[#634832] mt-1 leading-relaxed">
              {fullAddress}
            </p>
          </div>
          <a
            href={siteConfig.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="pt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#161514] hover:text-[#A85838]"
          >
            <span>Open in Google Maps</span>
            <ArrowRight size={13} />
          </a>
        </div>

      </div>

      {/* Architectural Studio Location Showcase */}
      <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 space-y-4">
          <span className="editorial-subheading text-[#B89758]">Visit or Consult Online</span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
            Meet in Kandivali West or From Anywhere
          </h2>
          <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
            Meet {siteConfig.founderName} at the Kandivali West office (opposite Assumption Church, Dahanukarwadi), schedule
            a site visit to your home or business in Mumbai, or book an online consultation from anywhere in India or abroad.
            {" "}{siteConfig.workingHours}.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate("consultation")}
              className="px-6 py-3 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-semibold hover:bg-[#634832] transition-colors"
            >
              Book a Consultation
            </button>
            <a
              href={siteConfig.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#FDFBF7] border border-[#D8CEBE] text-[#161514] rounded-xl text-xs font-semibold hover:border-[#B89758] transition-colors inline-flex items-center gap-1.5"
            >
              <MapPin size={14} />Get Directions
            </a>
          </div>
        </div>

        <div className="lg:col-span-6 aspect-[16/10] rounded-2xl overflow-hidden border border-[#EFE8DC] shadow-md">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Calm, well-lit consultation space"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </div>
  );
}
