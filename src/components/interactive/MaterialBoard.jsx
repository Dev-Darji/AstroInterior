import React, { useState } from 'react';
import { materials } from '../../data/materials';
import { Sparkles, Layers, Box, Check, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function MaterialBoard() {
  const [selectedId, setSelectedId] = useState(materials[0].id);
  const selectedMaterial = materials.find((m) => m.id === selectedId) || materials[0];

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="editorial-subheading text-[#B89758]">Tactile & Organic Materiality</span>
        <h3 className="font-serif text-3xl sm:text-4xl text-[#161514] font-normal">
          The Tactile Materials Board
        </h3>
        <p className="text-xs sm:text-sm text-[#634832] mt-2 leading-relaxed">
          In our design philosophy, materials carry elemental frequencies. Explore the natural stones, timbers, and hand-finished plasters we curate.
        </p>
      </div>

      {/* Swatch Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {materials.map((mat) => {
          const isSelected = selectedId === mat.id;
          return (
            <button
              key={mat.id}
              onClick={() => setSelectedId(mat.id)}
              className={`p-2.5 rounded-2xl text-left transition-all border group flex flex-col justify-between ${
                isSelected
                  ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-md ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#161514] border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-2.5">
                <img
                  src={mat.image}
                  alt={mat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#B89758] text-[#161514] flex items-center justify-center">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </div>
              <div>
                <span className={`text-[9px] uppercase tracking-wider block font-semibold ${isSelected ? "text-[#DEC695]" : "text-[#A85838]"}`}>
                  {mat.category}
                </span>
                <span className="text-xs font-serif font-medium line-clamp-1">
                  {mat.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Swatch Deep Dive */}
      <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-sm">
        <div className="md:col-span-5 relative rounded-2xl overflow-hidden aspect-[4/3] border border-[#EFE8DC]">
          <img
            src={selectedMaterial.image}
            alt={selectedMaterial.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[10px] uppercase tracking-widest text-[#DEC695] font-mono">
            {selectedMaterial.element}
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div>
            <span className="editorial-subheading text-[#B89758]">{selectedMaterial.category}</span>
            <h4 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-0.5">
              {selectedMaterial.name}
            </h4>
            <p className="text-xs text-[#634832] mt-0.5">
              Tone: <strong className="text-[#161514]">{selectedMaterial.tone}</strong> • Texture: <strong className="text-[#161514]">{selectedMaterial.texture}</strong>
            </p>
          </div>

          <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
            {selectedMaterial.description}
          </p>

          <div className="space-y-2 pt-1 text-xs">
            <div>
              <span className="font-semibold text-[#161514]">Ideal Interior Applications: </span>
              <span className="text-[#634832]">{selectedMaterial.bestFor}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="font-semibold text-[#161514] mr-1">Harmonious Styles:</span>
              {selectedMaterial.styles.map((st, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded-md bg-[#F7F3EB] border border-[#D8CEBE] text-[11px] text-[#634832]">
                  {st}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <a
              href={getWhatsAppLink(`Hello, I would like to request tactile material samples and discuss using ${selectedMaterial.name} in my upcoming interior project.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
            >
              <MessageCircle size={14} className="text-[#25D366]" />
              <span>Inquire About {selectedMaterial.name} Samples</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
