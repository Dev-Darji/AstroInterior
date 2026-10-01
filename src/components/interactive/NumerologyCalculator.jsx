import React, { useState } from 'react';
import { Sparkles, ArrowRight, MessageCircle, RotateCcw, Home, Info } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

const numberArchetypes = {
  1: {
    title: "The Pioneer & Originator",
    ruler: "The Sun (Surya)",
    element: "Fire / Light",
    spatialTraits: "Thrives in high-ceiling, expansive rooms with bold focal points, abundant natural sunlight, and a dedicated executive desk facing East.",
    colors: ["Warm Sunlight Gold", "Rich Terracotta", "Alabaster White"],
    materials: "Travertine stone, bold architectural lines, polished brass"
  },
  2: {
    title: "The Peacemaker & Harmonizer",
    ruler: "The Moon (Chandra)",
    element: "Water",
    spatialTraits: "Requires soft, curved silhouettes, soothing indirect lighting (2700K), tactile bouclé fabrics, and peaceful water features or botanical gardens.",
    colors: ["Pearl White", "Soft Mint", "Seafoam Grey", "Pale Cream"],
    materials: "Handspun raw linen, light oak, frosted textured glass"
  },
  3: {
    title: "The Creator & Expressive Visionary",
    ruler: "Jupiter (Brihaspati)",
    element: "Space / Akasha",
    spatialTraits: "Craves inspiring gallery walls, creative studio spaces, expressive artwork, and versatile open-plan entertainment zones.",
    colors: ["Warm Amber", "Ochre Gold", "Sage Green", "Charcoal accents"],
    materials: "Reclaimed teak wood, statement woven rugs, artisanal ceramics"
  },
  4: {
    title: "The Master Builder & Strategist",
    ruler: "Rahu / Uranus",
    element: "Earth (Prithvi)",
    spatialTraits: "Values geometric order, symmetrical architectural alignments, substantial storage, and deeply grounded South-West master suites.",
    colors: ["Grounded Earth Brown", "Warm Taupe", "Slate Grey", "Sand"],
    materials: "Solid American walnut, vein-matched marble, architectural fluting"
  },
  5: {
    title: "The Free Spirit & Alchemist",
    ruler: "Mercury (Budha)",
    element: "Air (Vayu)",
    spatialTraits: "Loves dynamic multifunctional spaces, seamless indoor-outdoor balcony flow, modular furniture, and sensory textures.",
    colors: ["Soft Olive", "Ecru", "Emerald accents", "Warm Ivory"],
    materials: "Rattan, light ash wood, large sliding glass apertures"
  },
  6: {
    title: "The Nurturer & Aesthetician",
    ruler: "Venus (Shukra)",
    element: "Earth & Water",
    spatialTraits: "The ultimate home-creator. Prioritizes comfortable open family dining tables, cozy hearths, plush bedding, and serene pooja shrines.",
    colors: ["Blush Taupe", "Warm Almond", "Rose Gold", "Muted Sage"],
    materials: "Velvet drapes, honed limestone, warm brushed brass"
  },
  7: {
    title: "The Seeker & Philosophical Thinker",
    ruler: "Ketu / Neptune",
    element: "Water & Space",
    spatialTraits: "Requires extreme quiet, contemplation libraries, acoustic wall buffering, secluded reading alcoves, and clutter-free Zen minimalism.",
    colors: ["Deep Indigo", "Makrana White", "Silver Mist", "Ash Grey"],
    materials: "Natural micro-cement, acoustic fabric panels, bamboo, white marble"
  },
  8: {
    title: "The Sovereign & Executive Power",
    ruler: "Saturn (Shani)",
    element: "Earth & Fire",
    spatialTraits: "Commands architectural grandeur, statement double-height fireplaces, authoritative leather furniture, and monumental stone facades.",
    colors: ["Deep Charcoal", "Dark Bronze", "Warm Sandstone", "Cognac Leather"],
    materials: "Armani bronze marble, blackened steel, heavy solid timber"
  },
  9: {
    title: "The Humanitarian & Universalist",
    ruler: "Mars (Mangal)",
    element: "Fire & Earth",
    spatialTraits: "Thrives in globally inspired spaces celebrating craft heritage, organic biophilic courtyards, and warm gathering pavilions.",
    colors: ["Terracotta Clay", "Brick Red", "Warm Ochre", "Natural Bone"],
    materials: "Handmade clay tiles, exposed lime brick, hand-hammered metals"
  },
  11: {
    title: "Master 11: The Intuitive Illuminator",
    ruler: "High Octane Moon & Neptune",
    element: "Pure Light & Space",
    spatialTraits: "High vibrational nervous system. Demands circadian lighting, zero electromagnetic clutter near sleep zones, and meditative sanctity.",
    colors: ["Pure Alabaster", "Iridescent Champagne", "Pale Sky"],
    materials: "Backlit translucent onyx, acoustic lime plaster, silk rugs"
  },
  22: {
    title: "Master 22: The Master Architect",
    ruler: "Cosmic Earth & Structure",
    element: "Universal Earth",
    spatialTraits: "The visionary builder. Demands timeless sustainable architecture, grand structural proportions, and biophilic legacy design.",
    colors: ["Forest Green", "Imperial Bronze", "Granite Charcoal", "Warm Sand"],
    materials: "Exposed concrete, monumental granite, solid native woods"
  },
  33: {
    title: "Master 33: The Universal Healer",
    ruler: "High Octane Compassion",
    element: "Harmonic Water",
    spatialTraits: "A nurturing sanctuary serving family and community with open, light-drenched communal kitchens and tranquil inner gardens.",
    colors: ["Warm Ivory", "Sage Green", "Soft Gold", "Alabaster"],
    materials: "Honed travertine, living indoor plants, hand-spun textiles"
  }
};

// Calculate single digit sum with master numbers preservation
function reduceNumber(num, preserveMaster = true) {
  while (num > 9) {
    if (preserveMaster && (num === 11 || num === 22 || num === 33)) {
      return num;
    }
    num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
  }
  return num;
}

// Letter value mapping (Pythagorean)
const letterValues = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9
};

export default function NumerologyCalculator() {
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateNumbers = (e) => {
    e.preventDefault();
    if (!birthDate) return;

    setIsCalculating(true);

    setTimeout(() => {
      // 1. Life Path Number from birthdate
      const dateParts = birthDate.split('-'); // [YYYY, MM, DD]
      const yearSum = reduceNumber(parseInt(dateParts[0], 10), false);
      const monthSum = reduceNumber(parseInt(dateParts[1], 10), false);
      const daySum = reduceNumber(parseInt(dateParts[2], 10), false);
      const lifePath = reduceNumber(yearSum + monthSum + daySum, true);

      // 2. Destiny (Expression) Number from Name
      let destiny = 7; // default fallback
      let soulUrge = 3;
      if (fullName.trim()) {
        const cleanName = fullName.toUpperCase().replace(/[^A-Z]/g, '');
        let totalVal = 0;
        let vowelVal = 0;
        const vowels = ['A', 'E', 'I', 'O', 'U'];

        for (let char of cleanName) {
          const val = letterValues[char] || 0;
          totalVal += val;
          if (vowels.includes(char)) {
            vowelVal += val;
          }
        }

        destiny = totalVal > 0 ? reduceNumber(totalVal, true) : 7;
        soulUrge = vowelVal > 0 ? reduceNumber(vowelVal, true) : 3;
      }

      const archetype = numberArchetypes[lifePath] || numberArchetypes[reduceNumber(lifePath, false)] || numberArchetypes[7];

      setResult({
        lifePath,
        destiny,
        soulUrge,
        archetype
      });

      setIsCalculating(false);
    }, 450);
  };

  const handleReset = () => {
    setResult(null);
    setBirthDate("");
    setFullName("");
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="editorial-subheading text-[#B89758]">Sacred Geometry & Vibrations</span>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-1 font-normal">
          Interactive Numerology & Spatial Resonance
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] mt-2 leading-relaxed">
          Discover how your foundational Life Path number resonates with specific architectural proportions, materials, and color frequencies.
        </p>
      </div>

      {!result ? (
        <form onSubmit={calculateNumbers} className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 max-w-xl mx-auto shadow-sm space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2">
              Full Legal Name <span className="text-[#A85838]">*</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ananya Rajesh Patel"
              className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758] transition-colors"
            />
            <p className="text-[11px] text-[#634832]/70 mt-1">Used to compute your Destiny (Expression) & Soul Urge vibration.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2">
              Date of Birth <span className="text-[#A85838]">*</span>
            </label>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758] transition-colors"
            />
            <p className="text-[11px] text-[#634832]/70 mt-1">Calculates your core Life Path frequency.</p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full py-3.5 px-6 bg-[#161514] text-[#FDFBF7] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#634832] transition-colors shadow-sm disabled:opacity-50"
            >
              <Sparkles size={16} className="text-[#B89758]" />
              <span>{isCalculating ? "Calculating Frequencies..." : "Calculate My Spatial Numbers"}</span>
            </button>
          </div>

          <p className="text-[10px] text-center text-[#634832]/60 pt-2">
            * Interactive frontend calculation based on classical Pythagorean numerology.
          </p>
        </form>
      ) : (
        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-400">
          
          {/* Numbers Summary Triad */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Life Path Card */}
            <div className="p-6 rounded-2xl bg-[#161514] text-[#FDFBF7] text-center border border-[#B89758]/30 shadow-md relative overflow-hidden">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B89758]">Core Life Path</span>
              <div className="font-serif text-6xl font-normal text-[#FDFBF7] my-2 text-gold-glow">
                {result.lifePath}
              </div>
              <p className="text-xs font-serif text-[#DEC695]">{result.archetype.title}</p>
            </div>

            {/* Destiny Number */}
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#634832]">Destiny Number</span>
              <div className="font-serif text-5xl font-normal text-[#161514] my-2">
                {result.destiny}
              </div>
              <p className="text-xs text-[#634832]">Expression & Life Purpose</p>
            </div>

            {/* Soul Urge Number */}
            <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#EFE8DC] text-center">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#634832]">Soul Urge Number</span>
              <div className="font-serif text-5xl font-normal text-[#A85838] my-2">
                {result.soulUrge}
              </div>
              <p className="text-xs text-[#634832]">Inner Craving & Sanctuary</p>
            </div>

          </div>

          {/* Archetype & Interior Translation */}
          <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-[#EFE8DC] pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="editorial-subheading text-[#B89758]">Spatial Alignment Archetype</span>
                <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-1">
                  Number {result.lifePath} — {result.archetype.title}
                </h4>
                <p className="text-xs text-[#634832] mt-0.5">
                  Ruler: <strong className="text-[#161514]">{result.archetype.ruler}</strong> • Element: <strong className="text-[#161514]">{result.archetype.element}</strong>
                </p>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#634832] border border-[#D8CEBE] rounded-lg hover:bg-[#F7F3EB] transition-colors"
              >
                <RotateCcw size={13} />
                <span>Calculate Another</span>
              </button>
            </div>

            {/* Spatial Affinity Description */}
            <div className="p-4 rounded-xl bg-[#F7F3EB]/80 border border-[#EFE8DC]">
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold uppercase tracking-wider text-[#A85838]">
                <Home size={15} />
                <span>How Your Space Should Be Designed</span>
              </div>
              <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
                {result.archetype.spatialTraits}
              </p>
            </div>

            {/* Color & Material Recommendations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 rounded-xl border border-[#D8CEBE] bg-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#634832] block mb-1">
                  Resonant Color Palette
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {result.archetype.colors.map((c, idx) => (
                    <span key={idx} className="text-xs px-2.5 py-0.5 rounded-md bg-[#F7F3EB] border border-[#EFE8DC] text-[#161514] font-medium">
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-[#D8CEBE] bg-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#634832] block mb-1">
                  Tactile Materials to Surround Yourself With
                </span>
                <p className="text-xs text-[#161514] mt-2 font-medium">
                  {result.archetype.materials}
                </p>
              </div>
            </div>

            {/* Next Step Action */}
            <div className="pt-4 border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#634832]">
                Take this deeper with a complete personal Life Path & Vastu interior consultation.
              </p>
              <a
                href={getWhatsAppLink(`Hello, my Life Path Number is ${result.lifePath} (${result.archetype.title}). I would like to consult on designing my home aligned with my numerology.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors shadow-sm"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>Discuss Number {result.lifePath} Home Consultation</span>
              </a>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
