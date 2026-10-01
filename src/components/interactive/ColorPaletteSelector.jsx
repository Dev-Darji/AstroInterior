import React, { useState } from 'react';
import { Palette, Sparkles, Check, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

const palettes = [
  {
    id: "warm-earth",
    name: "Warm Earth & Terracotta",
    mood: "Grounding, nurturing, welcoming",
    description: "Deep clay tones, sand, and warm ochre inspired by traditional Indian courtyards and sun-baked soils.",
    hexCodes: ["#A85838", "#D8CEBE", "#EFE8DC", "#634832"],
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
    vastuElement: "Earth (Prithvi) & Agni",
    bestFor: "South-West Master Suites, Formal Living Salons"
  },
  {
    id: "soft-neutral",
    name: "Soft Architectural Neutral",
    mood: "Airy, luminous, understated",
    description: "Layered ivory, bone plaster, natural linen, and bleached oak reflecting diffused morning light.",
    hexCodes: ["#FDFBF7", "#F7F3EB", "#D8CEBE", "#22201E"],
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1200&q=80",
    vastuElement: "Space (Akasha) & Water",
    bestFor: "North-East Living Rooms, Zen Balconies"
  },
  {
    id: "natural-green",
    name: "Biophilic Sage & Forest",
    mood: "Restorative, fresh, calming",
    description: "Muted olive, eucalyptus sage, raw jute, and living indoor foliage bringing outdoor prana indoors.",
    hexCodes: ["#607261", "#8E9F8F", "#EFE8DC", "#453222"],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    vastuElement: "Air (Vayu) & Wood",
    bestFor: "East Workstations, Meditation Corners, Verandahs"
  },
  {
    id: "contemporary-contrast",
    name: "Architectural Charcoal & Travertine",
    mood: "Sophisticated, sculptural, dramatic",
    description: "High-contrast charcoal steel accents softened by warm vein-matched Italian travertine.",
    hexCodes: ["#161514", "#E4DAC9", "#B89758", "#33312E"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    vastuElement: "Metal & Earth",
    bestFor: "Double-Height Penthouses, Executive Cabins"
  },
  {
    id: "indian-heritage",
    name: "Contemporary Indian Heritage",
    mood: "Sacred, noble, handcrafted",
    description: "Antique unlacquered brass, deep Burma teak, raw hand-spun silk, and Makrana marble white.",
    hexCodes: ["#B89758", "#5A3825", "#FDFBF7", "#8E4426"],
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    vastuElement: "Solar Fire & Sacred Ether",
    bestFor: "Pooja Sanctuaries, Dining Galleries, Entrance Foyers"
  }
];

export default function ColorPaletteSelector() {
  const [activePaletteId, setActivePaletteId] = useState("warm-earth");
  const currentPalette = palettes.find((p) => p.id === activePaletteId) || palettes[0];

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="editorial-subheading text-[#B89758]">Spatial Emotion</span>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
          Find Your Interior Mood
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] mt-2 leading-relaxed">
          Color psychology in Vastu directly impacts circadian rhythms and mental clarity. Select an elemental palette below to preview its spatial atmosphere.
        </p>
      </div>

      {/* Palette Selectors */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {palettes.map((p) => {
          const isSelected = activePaletteId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePaletteId(p.id)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected
                  ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-md ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#161514] border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              {/* Swatch chips */}
              <div className="flex h-5 w-full rounded-md overflow-hidden mb-3 border border-black/10">
                {p.hexCodes.map((hex, i) => (
                  <div key={i} className="flex-1 h-full" style={{ backgroundColor: hex }} />
                ))}
              </div>

              <div>
                <span className="text-xs font-serif font-medium block leading-snug">
                  {p.name}
                </span>
                <span className={`text-[10px] block mt-0.5 ${isSelected ? "text-[#DEC695]" : "text-[#634832]"}`}>
                  {p.vastuElement}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Visual Preview */}
      <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
        {/* Rendered Room Image */}
        <div className="md:col-span-6 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EFE8DC]">
          <img
            src={currentPalette.image}
            alt={currentPalette.name}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <span className="text-xs font-serif text-white tracking-wide">
              {currentPalette.name} Mood Simulation
            </span>
          </div>
        </div>

        {/* Details & Color Breakdown */}
        <div className="md:col-span-6 space-y-4">
          <div>
            <span className="editorial-subheading text-[#B89758]">Elemental Mood</span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-0.5">
              {currentPalette.name}
            </h4>
            <p className="text-xs text-[#634832] italic mt-0.5">
              "{currentPalette.mood}"
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
            {currentPalette.description}
          </p>

          {/* Color Chips with Hex Codes */}
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#634832] block mb-2">
              Curated Swatch Palette
            </span>
            <div className="grid grid-cols-4 gap-2">
              {currentPalette.hexCodes.map((hex, idx) => (
                <div key={idx} className="p-2 rounded-xl border border-[#D8CEBE] bg-[#F7F3EB] text-center">
                  <div
                    className="w-full h-8 rounded-lg mb-1.5 shadow-inner border border-black/10"
                    style={{ backgroundColor: hex }}
                  />
                  <span className="text-[10px] font-mono text-[#634832] uppercase">{hex}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs">
            <span className="font-semibold text-[#161514]">Ideal Zonal Application: </span>
            <span className="text-[#634832]">{currentPalette.bestFor}</span>
          </div>

          <div className="pt-2">
            <a
              href={getWhatsAppLink(`Hello, I love your "${currentPalette.name}" mood palette and would like to explore applying it to my home interiors.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
            >
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>Discuss {currentPalette.name} Palette</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
