import React, { useState } from 'react';
import { Sparkles, Bot, Palette, Layers, IndianRupee, Compass, MessageCircle, RotateCcw } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

const roomConcepts = {
  "Living Room": {
    "Modern Luxury": {
      title: "The Sculptural Travertine Salon",
      palette: ["Honed Navona Travertine", "Champagne Velvet", "Smoked Walnut", "Charcoal Bronze"],
      lighting: "Circadian cove lighting (2700K) with linear brass pendant over monolithic coffee table.",
      vastuTip: "Anchor heavy low-slung seating against the South & West boundaries, keeping the North-East open to invite morning solar prana.",
      estimatedTimeline: "8 - 12 Weeks",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    },
    "Contemporary Indian": {
      title: "The Earth & Handcraft Verandah Lounge",
      palette: ["Terracotta Lime Wash", "Reclaimed Teak", "Handspun Oatmeal Linen", "Aged Brass"],
      lighting: "Soft perimeter floor lamps paired with perforated brass lanterns casting meditative shadow motifs.",
      vastuTip: "North-East niche reserved for an artisanal brass Urli or marble water feature to elevate household abundance.",
      estimatedTimeline: "6 - 10 Weeks",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
    },
    "Warm Minimal": {
      title: "The Wabi-Sabi Sandstone Retreat",
      palette: ["Bone Plaster", "Ash Wood", "Natural Jute", "Muted Sage"],
      lighting: "Concealed 3000K architectural downlights with anti-glare baffles.",
      vastuTip: "Zero visual obstruction in the central Brahmasthan, enabling fluid circulation of natural energy.",
      estimatedTimeline: "6 - 8 Weeks",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
    }
  },
  "Master Bedroom": {
    "Modern Luxury": {
      title: "The Nai-Ritya Executive Suite",
      palette: ["Deep Taupe Leather", "Solid Walnut", "Armani Bronze", "Silk Velvet"],
      lighting: "Warm dim-to-warm bedside reading drops (2200K) to enhance natural melatonin release.",
      vastuTip: "Position bed headboard strictly towards South or East in the South-West sector to anchor personal peace.",
      estimatedTimeline: "8 - 10 Weeks",
      image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
    },
    "Contemporary Indian": {
      title: "The Heritage Teak Rest Sanctuary",
      palette: ["Warm Sand Plaster", "Handcrafted Burma Teak", "Block-print Raw Cotton", "Muted Mustard"],
      lighting: "Handmade ceramic wall sconces giving ambient warm wash over textured lime walls.",
      vastuTip: "No reflective mirrors facing the bed; wardrobes located along South/West walls for acoustic grounding.",
      estimatedTimeline: "7 - 9 Weeks",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
    },
    "Warm Minimal": {
      title: "The Serene Monastic Haven",
      palette: ["Off-white Linen", "Natural Ash Timber", "Micro-cement", "Bone"],
      lighting: "Soft continuous headboard cove lighting with concealed bedside touch controls.",
      vastuTip: "South-West quadrant with zero water tanks or sumps directly overhead.",
      estimatedTimeline: "5 - 7 Weeks",
      image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80"
    }
  },
  "Pooja Room": {
    "Modern Luxury": {
      title: "The Backlit Makrana Shrine",
      palette: ["Pure Makrana White Marble", "Champagne Gold Jaali", "Alabaster", "Natural Linen"],
      lighting: "Backlit translucent CNC jaali providing continuous halo illumination.",
      vastuTip: "North-East (Ishanya) orientation with deity pedestal raised 6 inches above floor level.",
      estimatedTimeline: "5 - 7 Weeks",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
    },
    "Contemporary Indian": {
      title: "The Fluted Teak & Brass Mandir",
      palette: ["Burma Teak", "Unlacquered Brass", "Terracotta Bell", "Makrana Inlay"],
      lighting: "Warm 2700K pinpoint spotlight illuminating idols with brass bell accents.",
      vastuTip: "Worshiper faces East or North during prayer; copper vessels placed in the North-East corner.",
      estimatedTimeline: "4 - 6 Weeks",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
    },
    "Warm Minimal": {
      title: "The Contemplative Minimalist Altar",
      palette: ["Honed Limestone", "Pale Oak", "White Slub Linen", "Matte Brass"],
      lighting: "Floating concealed linear base lighting casting a tranquil floor wash.",
      vastuTip: "Strictly uncluttered and free of redundant storage.",
      estimatedTimeline: "3 - 5 Weeks",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
    }
  }
};

export default function AISpaceAdvisor() {
  const [selectedRoom, setSelectedRoom] = useState("Living Room");
  const [selectedStyle, setSelectedStyle] = useState("Modern Luxury");
  const [selectedBudget, setSelectedBudget] = useState("₹10–20 Lakh");
  const [considerVastu, setConsiderVastu] = useState(true);
  const [concept, setConcept] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const rooms = ["Living Room", "Master Bedroom", "Pooja Room"];
  const styles = ["Modern Luxury", "Contemporary Indian", "Warm Minimal"];
  const budgets = ["Under ₹5 Lakh", "₹5–10 Lakh", "₹10–20 Lakh", "₹20–40 Lakh", "₹40 Lakh+"];

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const roomData = roomConcepts[selectedRoom] || roomConcepts["Living Room"];
      const styleData = roomData[selectedStyle] || roomData["Modern Luxury"];

      setConcept({
        room: selectedRoom,
        style: selectedStyle,
        budget: selectedBudget,
        vastuActive: considerVastu,
        data: styleData
      });
      setIsGenerating(false);
    }, 450);
  };

  const handleReset = () => {
    setConcept(null);
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161514] text-[#DEC695] text-xs font-medium mb-3">
          <Bot size={14} className="text-[#B89758]" />
          <span>Interactive AI Concept Generator</span>
        </div>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
          Imagine Your Room Differently
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] mt-2 leading-relaxed">
          Select your room type, aesthetic aspiration, budget bracket, and Vastu preference to generate a customized architectural concept.
        </p>
      </div>

      {!concept ? (
        <form onSubmit={handleGenerate} className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-sm space-y-6">
          {/* Room Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2.5">
              1. Select Room
            </label>
            <div className="grid grid-cols-3 gap-2">
              {rooms.map((rm) => (
                <button
                  type="button"
                  key={rm}
                  onClick={() => setSelectedRoom(rm)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedRoom === rm
                      ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-sm"
                      : "bg-[#F7F3EB] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                  }`}
                >
                  {rm}
                </button>
              ))}
            </div>
          </div>

          {/* Style Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2.5">
              2. Architectural Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {styles.map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setSelectedStyle(st)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedStyle === st
                      ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-sm"
                      : "bg-[#F7F3EB] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2.5">
              3. Approximate Budget Bracket
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {budgets.map((b) => (
                <button
                  type="button"
                  key={b}
                  onClick={() => setSelectedBudget(b)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedBudget === b
                      ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-sm"
                      : "bg-[#F7F3EB] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          {/* Vastu Toggle */}
          <div className="pt-2 flex items-center justify-between p-4 rounded-xl bg-[#F7F3EB] border border-[#EFE8DC]">
            <div className="flex items-center gap-3">
              <Compass size={20} className="text-[#A85838]" />
              <div>
                <p className="text-xs font-semibold text-[#161514]">Harmonize with Vastu Shastra</p>
                <p className="text-[11px] text-[#634832]">Align spatial zoning, directional furniture, and elemental materials</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setConsiderVastu(!considerVastu)}
              className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 transition-colors ${
                considerVastu ? "bg-[#607261]" : "bg-[#D8CEBE]"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                  considerVastu ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 bg-[#161514] text-[#FDFBF7] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#634832] transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles size={16} className="text-[#B89758]" />
              <span>{isGenerating ? "Synthesizing Space Blueprint..." : "Generate Design Concept"}</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-[#634832]/60">
            * Interactive frontend concept generator. Full custom 3D architectural schemes produced upon project onboarding.
          </p>
        </form>
      ) : (
        <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE8DC] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="editorial-subheading text-[#A85838]">{concept.room} Concept</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#161514] text-[#DEC695] font-medium">
                  {concept.style}
                </span>
                {concept.vastuActive && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#607261]/15 text-[#404c41] font-medium border border-[#607261]/30">
                    Vastu Integrated
                  </span>
                )}
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-1 font-normal">
                {concept.data.title}
              </h4>
              <p className="text-xs text-[#634832]">
                Budget Scope: <strong className="text-[#161514]">{concept.budget}</strong> • Timeline: <strong className="text-[#161514]">{concept.data.estimatedTimeline}</strong>
              </p>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#634832] border border-[#D8CEBE] rounded-lg hover:bg-[#F7F3EB] transition-colors"
            >
              <RotateCcw size={13} />
              <span>New Concept</span>
            </button>
          </div>

          {/* Visual Concept Banner */}
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-[#EFE8DC]">
            <img 
              src={concept.data.image} 
              alt={concept.data.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
              <div>
                <p className="text-xs font-serif text-[#DEC695] uppercase tracking-widest">Architectural Scheme</p>
                <h5 className="font-serif text-xl sm:text-2xl text-white font-normal">{concept.data.title}</h5>
              </div>
            </div>
          </div>

          {/* Specifications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Palette & Materials */}
            <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#EFE8DC] space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A85838] block">
                Material & Color Resonance
              </span>
              <div className="flex flex-wrap gap-1.5">
                {concept.data.palette.map((item, idx) => (
                  <span key={idx} className="text-xs px-2.5 py-1 rounded-md bg-[#FDFBF7] border border-[#D8CEBE] text-[#161514] font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Lighting Psychology */}
            <div className="p-4 rounded-xl bg-[#F7F3EB] border border-[#EFE8DC] space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#607261] block">
                Circadian Lighting Strategy
              </span>
              <p className="text-xs text-[#22201E] leading-relaxed">
                {concept.data.lighting}
              </p>
            </div>
          </div>

          {/* Vastu Tip Box */}
          {concept.vastuActive && (
            <div className="p-4 rounded-xl bg-[#607261]/10 border border-[#607261]/25 flex items-start gap-3">
              <Compass size={18} className="text-[#607261] shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-[#404c41] block mb-0.5">Vastu Spatial Synthesis:</span>
                <p className="text-[#22201E] leading-relaxed">{concept.data.vastuTip}</p>
              </div>
            </div>
          )}

          {/* WhatsApp Blueprint Share */}
          <div className="pt-4 border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#634832]">
              Love this direction? Send this concept directly to our design studio for an architectural estimate.
            </p>
            <a
              href={getWhatsAppLink(`Hello! I generated an AI concept: "${concept.data.title}" for my ${concept.room} in ${concept.style} (Budget: ${concept.budget}). I would like to discuss implementing it.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors shadow-sm"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>Share Concept on WhatsApp</span>
            </a>
          </div>

        </div>
      )}
    </div>
  );
}
