import React, { useState, useRef } from 'react';
import { floorPlanRooms } from '../../data/floorPlanRooms';
import { Compass, Lightbulb, Palette, Box, MessageCircle, ArrowUp } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

// 3×3 Vastu Purusha grid, North at the top
const GRID = [
  { code: "NW", sanskrit: "Vayavya", room: "bathroom", label: "Spa & Bath", element: "Air" },
  { code: "N", sanskrit: "Kubera", room: "living", label: "Living Area", element: "Water" },
  { code: "NE", sanskrit: "Ishanya", room: "pooja", label: "Pooja Mandir", element: "Sacred Water" },
  { code: "W", sanskrit: "Varuna", room: "study", label: "Study Office", element: "Space" },
  { code: "C", sanskrit: "Brahmasthan", room: null, label: "Open Core", element: "Akasha" },
  { code: "E", sanskrit: "Indra", room: "entrance", label: "Foyer Entrance", element: "Solar Prana" },
  { code: "SW", sanskrit: "Nairitya", room: "master-bedroom", label: "Master Suite", element: "Earth" },
  { code: "S", sanskrit: "Yama", room: null, label: "Wardrobe Wall", element: "Heavy Core" },
  { code: "SE", sanskrit: "Agneya", room: "kitchen", label: "Kitchen", element: "Fire" }
];

export default function VastuFloorPlan() {
  const [selectedRoomId, setSelectedRoomId] = useState("pooja");
  const detailRef = useRef(null);
  const selectedRoom = floorPlanRooms.find((r) => r.id === selectedRoomId) || floorPlanRooms[0];

  const handleRoomSelect = (id) => {
    setSelectedRoomId(id);
    if (window.innerWidth < 1024 && detailRef.current) {
      setTimeout(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  };

  return (
    <div className="astro-panel relative overflow-hidden p-4 sm:p-8 md:p-10 text-[#E8E2D4]">
      <div className="absolute inset-0 astro-starfield opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Room tabs — horizontal scroll on mobile */}
      <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex sm:flex-wrap sm:justify-center gap-2 w-max sm:w-auto">
          {floorPlanRooms.map((room) => (
            <button key={room.id} data-active={selectedRoomId === room.id} onClick={() => handleRoomSelect(room.id)}
              className="astro-chip px-3.5 py-2 text-xs sm:text-sm whitespace-nowrap flex items-center gap-2">
              {room.name}
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#DEC695]/15 text-[#DEC695] font-semibold">{room.directionCode}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Plan grid */}
        <div className="lg:col-span-5 astro-card p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="astro-label">Vastu Purusha Mandala</span>
            <span className="text-[11px] text-[#DEC695] flex items-center gap-1 font-semibold"><ArrowUp size={13} />North</span>
          </div>

          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-[#DEC695]/20 bg-[#07071a]/50">
            {GRID.map((cell) => {
              const active = cell.room && selectedRoomId === cell.room;
              const base = "rounded-lg p-2 sm:p-3 h-24 sm:h-28 flex flex-col justify-between text-left transition-all";
              const content = (
                <>
                  <span className={`text-[9px] sm:text-[10px] font-bold tracking-wide ${active ? "text-[#161514]" : "text-[#DEC695]"}`}>
                    {cell.code === "C" ? "CENTRE" : cell.code} · {cell.sanskrit}
                  </span>
                  <span className={`font-serif text-[13px] sm:text-base leading-tight ${active ? "text-[#161514]" : "text-[#F5EFE2]"}`}>{cell.label}</span>
                  <span className={`text-[9px] sm:text-[10px] ${active ? "text-[#161514]/70" : "text-[#E8E2D4]/50"}`}>{cell.element}</span>
                </>
              );
              if (!cell.room) {
                return (
                  <div key={cell.code} className={`${base} border border-dashed border-[#DEC695]/25 ${cell.code === "C" ? "items-center text-center" : ""}`}>
                    {content}
                  </div>
                );
              }
              return (
                <button key={cell.code} onClick={() => handleRoomSelect(cell.room)} aria-pressed={active}
                  className={`${base} ${active ? "bg-gradient-to-br from-[#F3E2B8] to-[#B89758] shadow-[0_0_30px_-8px_rgba(222,198,149,0.7)]" : "bg-white/[0.04] border border-white/10 hover:border-[#DEC695]/50"}`}>
                  {content}
                </button>
              );
            })}
          </div>

          <div className="mt-5 relative rounded-xl overflow-hidden aspect-video border border-white/10">
            <img src={selectedRoom.image} alt={`${selectedRoom.name} reference`} loading="lazy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d24]/90 to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-[#F5EFE2] tracking-wide">{selectedRoom.name} · reference</span>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div ref={detailRef} key={selectedRoom.id} className="lg:col-span-7 astro-card p-5 sm:p-7 scroll-mt-28 astro-fade-in">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4 mb-5">
            <div>
              <span className="astro-label">Spatial Alignment</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#F5EFE2] mt-0.5">{selectedRoom.name}</h3>
              <p className="text-xs text-[#E8E2D4]/60">Optimal zone: <strong className="text-[#F5EFE2]">{selectedRoom.zone}</strong></p>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-[#DEC695] text-[#161514] font-semibold">{selectedRoom.directionCode} sector</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#DEC695]/20 bg-[#DEC695]/[0.04] p-4">
              <h4 className="astro-label mb-3 flex items-center gap-1.5"><Compass size={12} />Vastu rules</h4>
              <ul className="space-y-2.5">
                {selectedRoom.vastuRules.map((rule) => (
                  <li key={rule} className="text-xs text-[#E8E2D4]/80 leading-relaxed flex gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#DEC695] shrink-0 mt-1.5" />{rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-[#9FD6A8]/20 bg-[#9FD6A8]/[0.04] p-4">
              <h4 className="text-[0.68rem] font-semibold tracking-[0.18em] uppercase text-[#9FD6A8] mb-3 flex items-center gap-1.5"><Lightbulb size={12} />Interior solutions</h4>
              <ul className="space-y-2.5">
                {selectedRoom.interiorSolutions.map((sol) => (
                  <li key={sol} className="text-xs text-[#E8E2D4]/80 leading-relaxed flex gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#9FD6A8] shrink-0 mt-1.5" />{sol}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <p className="flex gap-2"><Palette size={15} className="text-[#DEC695] shrink-0" /><span><strong className="text-[#F5EFE2]">Palette: </strong><span className="text-[#E8E2D4]/70">{selectedRoom.palette.join(", ")}</span></span></p>
            <p className="flex gap-2"><Box size={15} className="text-[#DEC695] shrink-0" /><span><strong className="text-[#F5EFE2]">Materials: </strong><span className="text-[#E8E2D4]/70">{selectedRoom.materials}</span></span></p>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-[#E8E2D4]/60">Need a customised layout for your {selectedRoom.name.toLowerCase()}?</p>
            <a href={getWhatsAppLink(`Hello! I would like to consult on the Vastu and interior layout of my ${selectedRoom.name}.`)}
              target="_blank" rel="noopener noreferrer" className="astro-btn w-full sm:w-auto py-2.5 text-xs">
              <MessageCircle size={15} />Discuss this room
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
