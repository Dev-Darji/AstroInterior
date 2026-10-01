import React, { useState } from 'react';
import { Sparkles, Calendar, Clock, MapPin, User, Info, MessageCircle, RotateCcw } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function AstrologyKundliDemo() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    tob: "",
    pob: ""
  });
  const [isPreviewGenerated, setIsPreviewGenerated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsPreviewGenerated(true);
      setIsProcessing(false);
    }, 400);
  };

  const handleReset = () => {
    setIsPreviewGenerated(false);
    setFormData({ name: "", dob: "", tob: "", pob: "" });
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="editorial-subheading text-[#B89758]">Cosmic Alignment & Kundli</span>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-1 font-normal">
          Interactive Vedic Chart Preview
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] mt-2 leading-relaxed">
          In traditional Indian architecture, your natal planetary alignments guide room placements and personalized circadian lighting. Generate a basic preview below.
        </p>
      </div>

      {!isPreviewGenerated ? (
        <form onSubmit={handleSubmit} className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5 flex items-center gap-1.5">
              <User size={13} className="text-[#B89758]" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Singhania"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5 flex items-center gap-1.5">
                <Calendar size={13} className="text-[#B89758]" />
                <span>Date of Birth</span>
              </label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5 flex items-center gap-1.5">
                <Clock size={13} className="text-[#B89758]" />
                <span>Exact Time of Birth</span>
              </label>
              <input
                type="time"
                required
                value={formData.tob}
                onChange={(e) => setFormData({ ...formData, tob: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5 flex items-center gap-1.5">
              <MapPin size={13} className="text-[#B89758]" />
              <span>Place of Birth (City, Country)</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ahmedabad, India"
              value={formData.pob}
              onChange={(e) => setFormData({ ...formData, pob: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-6 bg-[#161514] text-[#FDFBF7] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#634832] transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles size={16} className="text-[#B89758]" />
              <span>{isProcessing ? "Synthesizing Astrological Grid..." : "Generate Basic Preview"}</span>
            </button>
          </div>

          <div className="p-2.5 rounded-lg bg-[#EFE8DC]/50 border border-[#D8CEBE] flex items-center gap-2 text-[11px] text-[#634832]">
            <Info size={14} className="shrink-0 text-[#B89758]" />
            <span>Interactive frontend preview. Real professional Kundli analysis includes full ephemeris calculation during 1-on-1 consultation.</span>
          </div>
        </form>
      ) : (
        <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE8DC] pb-4">
            <div>
              <span className="editorial-subheading text-[#A85838]">Preview Natal Configuration</span>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-0.5">
                Chart for {formData.name || "Consultant"}
              </h4>
              <p className="text-xs text-[#634832]">
                Born: {formData.dob} at {formData.tob} • {formData.pob}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#634832] border border-[#D8CEBE] rounded-lg hover:bg-[#F7F3EB] transition-colors"
            >
              <RotateCcw size={13} />
              <span>Modify Details</span>
            </button>
          </div>

          {/* Visual Vedic Diamond Chart Grid (North Indian Style) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* SVG Diamond Kundli Chart */}
            <div className="md:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 bg-[#FDFBF7] border-2 border-[#B89758] p-2 rounded-lg shadow-inner">
                <svg viewBox="0 0 200 200" className="w-full h-full stroke-[#B89758] stroke-[1.25]">
                  {/* Outer Square */}
                  <rect x="0" y="0" width="200" height="200" fill="none" />
                  {/* Inner Diamond (Houses 1, 4, 7, 10) */}
                  <polygon points="100,0 200,100 100,200 0,100" fill="#F7F3EB" opacity="0.6" />
                  {/* Diagonal Crosses */}
                  <line x1="0" y1="0" x2="200" y2="200" />
                  <line x1="200" y1="0" x2="0" y2="200" />

                  {/* House Labels (Vedic House Numbers) */}
                  {/* 1st House (Lagna / Ascendant) */}
                  <text x="100" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#A85838" stroke="none">1 (Lagna)</text>
                  <text x="100" y="85" textAnchor="middle" fontSize="8" fill="#161514" stroke="none">Surya • Budha</text>

                  {/* 2nd House */}
                  <text x="60" y="35" textAnchor="middle" fontSize="8" fill="#634832" stroke="none">2 (Shukra)</text>
                  {/* 3rd House */}
                  <text x="35" y="60" textAnchor="middle" fontSize="8" fill="#634832" stroke="none">3</text>
                  {/* 4th House (Sukha / Home) */}
                  <text x="70" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#607261" stroke="none">4 (Home)</text>
                  <text x="70" y="115" textAnchor="middle" fontSize="8" fill="#161514" stroke="none">Chandra</text>

                  {/* 7th House (Partnerships) */}
                  <text x="100" y="135" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#161514" stroke="none">7 (Kendra)</text>
                  <text x="100" y="148" textAnchor="middle" fontSize="8" fill="#634832" stroke="none">Brihaspati</text>

                  {/* 10th House (Career / Karma) */}
                  <text x="130" y="100" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B89758" stroke="none">10 (Karma)</text>
                  <text x="130" y="115" textAnchor="middle" fontSize="8" fill="#161514" stroke="none">Mangal</text>
                </svg>
              </div>
              <span className="text-[10px] text-[#B89758] tracking-widest uppercase mt-3 font-semibold">
                Classical Vedic D-1 Rasi Diagram
              </span>
            </div>

            {/* Synthesized Spatial Resonance */}
            <div className="md:col-span-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#EFE8DC]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A85838] block mb-1">
                  Primary Elemental Dominance
                </span>
                <p className="text-sm font-medium text-[#161514]">
                  Earth & Solar Prana Resonance
                </p>
                <p className="text-xs text-[#634832] mt-1 leading-relaxed">
                  Your planetary positioning highlights a profound grounding requirement. Rooms designed with natural travertine, solid timber, and warm East illumination will nurture your clarity.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#EFE8DC]">
                  <span className="text-[#634832]">4th House (Residence Anchor):</span>
                  <span className="font-semibold text-[#161514]">Exalted Moon / Calming Hues</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#EFE8DC]">
                  <span className="text-[#634832]">Workstation Direction:</span>
                  <span className="font-semibold text-[#161514]">Face East towards Surya Axis</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#EFE8DC]">
                  <span className="text-[#634832]">Auspicious Color Tone:</span>
                  <span className="font-semibold text-[#161514]">Warm Ochre, Sand & Ivory</span>
                </div>
              </div>
            </div>

          </div>

          {/* Consultation CTA */}
          <div className="pt-4 border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#634832]">
              Book an exhaustive 1-on-1 Vedic Kundli consultation with our senior astrologer.
            </p>
            <a
              href={getWhatsAppLink(`Hello! I generated an astrology preview for ${formData.name || 'myself'} (DOB: ${formData.dob}) and would like to schedule a full Vedic Kundli & space consultation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors shadow-sm"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>Schedule 1-on-1 Astrologer Session</span>
            </a>
          </div>

        </div>
      )}
    </div>
  );
}
