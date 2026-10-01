import React, { useState, useRef } from 'react';
import { floorPlanRooms } from '../../data/floorPlanRooms';
import { Sparkles, Compass, CheckCircle, Lightbulb, Palette, Box, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function VastuFloorPlan() {
  const [selectedRoomId, setSelectedRoomId] = useState("pooja");
  const detailRef = useRef(null);
  const selectedRoom = floorPlanRooms.find((r) => r.id === selectedRoomId) || floorPlanRooms[0];

  const handleRoomSelect = (id) => {
    setSelectedRoomId(id);
    if (typeof window !== 'undefined' && window.innerWidth < 1024 && detailRef.current) {
      setTimeout(() => {
        detailRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    }
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
      {/* Room Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8 border-b border-[#EFE8DC] pb-4">
        {floorPlanRooms.map((room) => {
          const isSelected = selectedRoomId === room.id;
          return (
            <button
              key={room.id}
              onClick={() => handleRoomSelect(room.id)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#161514] text-[#FDFBF7] shadow-sm font-semibold"
                  : "bg-[#FDFBF7] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              <span>{room.name}</span>
              <span className={`ml-1.5 sm:ml-2 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-[#B89758] text-[#161514] font-bold" : "bg-[#EFE8DC] text-[#634832]"}`}>
                {room.directionCode}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Floor Plan Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        {/* Left Col: Interactive Architectural Plan Layout */}
        <div className="lg:col-span-5 bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="editorial-subheading text-[#B89758]">Interactive Plan Matrix</span>
            <span className="text-[10.5px] sm:text-[11px] text-[#634832] flex items-center gap-1 font-mono">
              <Compass size={12} className="text-[#A85838]" /> North $\uparrow$
            </span>
          </div>

          {/* Architectural 2D Zone Grid */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 p-2 sm:p-3 bg-[#EFE8DC]/60 rounded-xl border border-[#D8CEBE]">
            {/* North-West: Bathroom / Guest */}
            <button
              onClick={() => handleRoomSelect("bathroom")}
              className={`p-2 sm:p-3 rounded-lg text-left transition-all flex flex-col justify-between h-20 sm:h-24 ${
                selectedRoomId === "bathroom"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-[#A85838]">NW (Vayavya)</span>
              <span className="text-[11px] sm:text-xs font-serif font-medium leading-tight">Spa & Bath</span>
              <span className="text-[8px] sm:text-[9px] opacity-70">Air Element</span>
            </button>

            {/* North: Living / Terrace */}
            <button
              onClick={() => setSelectedRoomId("living")}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between h-24 ${
                selectedRoomId === "living"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[9px] font-bold text-[#607261]">NORTH (Kuber)</span>
              <span className="text-xs font-serif font-medium">Living Area</span>
              <span className="text-[9px] opacity-70">Water Element</span>
            </button>

            {/* North-East: Pooja / Sacred */}
            <button
              onClick={() => setSelectedRoomId("pooja")}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between h-24 ${
                selectedRoomId === "pooja"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[9px] font-bold text-[#B89758]">NE (Ishanya)</span>
              <span className="text-xs font-serif font-medium">Pooja Mandir</span>
              <span className="text-[9px] opacity-70">Sacred Space</span>
            </button>

            {/* West: Study / Library */}
            <button
              onClick={() => setSelectedRoomId("study")}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between h-24 ${
                selectedRoomId === "study"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[9px] font-bold text-[#634832]">WEST (Varuna)</span>
              <span className="text-xs font-serif font-medium">Study Office</span>
              <span className="text-[9px] opacity-70">Intellect Zone</span>
            </button>

            {/* Center: Brahmasthan */}
            <div className="p-3 rounded-lg border border-dashed border-[#B89758]/50 bg-[#FDFBF7]/60 flex flex-col items-center justify-center text-center h-24">
              <span className="text-[9px] font-bold text-[#B89758] tracking-widest uppercase">Center Core</span>
              <span className="text-xs font-serif text-[#161514] mt-0.5">Brahmasthan</span>
              <span className="text-[9px] text-[#634832]/70">Open Energy</span>
            </div>

            {/* East: Main Entrance / Foyer */}
            <button
              onClick={() => setSelectedRoomId("entrance")}
              className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between h-24 ${
                selectedRoomId === "entrance"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[9px] font-bold text-[#607261]">EAST (Indra)</span>
              <span className="text-xs font-serif font-medium">Foyer Entrance</span>
              <span className="text-[9px] opacity-70">Solar Prana</span>
            </button>

            {/* South-West: Master Bed */}
            <button
              onClick={() => handleRoomSelect("master-bedroom")}
              className={`p-2 sm:p-3 rounded-lg text-left transition-all flex flex-col justify-between h-20 sm:h-24 ${
                selectedRoomId === "master-bedroom"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-[#634832]">SW (Nairitya)</span>
              <span className="text-[11px] sm:text-xs font-serif font-medium leading-tight">Master Suite</span>
              <span className="text-[8px] sm:text-[9px] opacity-70">Earth Grounding</span>
            </button>

            {/* South: Rest Area */}
            <div className="p-2 sm:p-3 rounded-lg bg-[#FDFBF7] text-[#634832] flex flex-col justify-between h-20 sm:h-24">
              <span className="text-[8px] sm:text-[9px] font-bold text-[#634832]">SOUTH (Yama)</span>
              <span className="text-[11px] sm:text-xs font-serif font-medium leading-tight">Wardrobe</span>
              <span className="text-[8px] sm:text-[9px] opacity-70">Heavy Core</span>
            </div>

            {/* South-East: Kitchen */}
            <button
              onClick={() => handleRoomSelect("kitchen")}
              className={`p-2 sm:p-3 rounded-lg text-left transition-all flex flex-col justify-between h-20 sm:h-24 ${
                selectedRoomId === "kitchen"
                  ? "bg-[#161514] text-[#FDFBF7] ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#22201E] hover:bg-[#FDFBF7]/80"
              }`}
            >
              <span className="text-[8px] sm:text-[9px] font-bold text-[#A85838]">SE (Agneya)</span>
              <span className="text-[11px] sm:text-xs font-serif font-medium leading-tight">Kitchen</span>
              <span className="text-[8px] sm:text-[9px] opacity-70">Fire Element</span>
            </button>
          </div>

          {/* Room Image Preview */}
          <div className="mt-5 relative rounded-xl overflow-hidden aspect-video border border-[#EFE8DC]">
            <img 
              src={selectedRoom.image} 
              alt={selectedRoom.name} 
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <span className="text-xs font-serif text-white tracking-wide">{selectedRoom.name} Reference</span>
            </div>
          </div>
        </div>

        {/* Right Col: Deep Dual Analysis (Vastu vs Interior Design) */}
        <div ref={detailRef} className="lg:col-span-7 space-y-6 scroll-mt-24">
          
          {/* Room Header */}
          <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl p-5 sm:p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EFE8DC] pb-4 mb-4">
              <div>
                <span className="editorial-subheading text-[#B89758]">Spatial Alignment</span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#161514] mt-0.5">{selectedRoom.name}</h3>
                <p className="text-xs text-[#634832]">Optimal Location: <strong className="text-[#161514]">{selectedRoom.zone}</strong></p>
              </div>
              <div className="text-right">
                <span className="text-xs px-3 py-1 rounded-full bg-[#161514] text-[#DEC695] font-mono font-medium">
                  {selectedRoom.directionCode} Sector
                </span>
              </div>
            </div>

            {/* Dual Column Breakdown: Vastu Considerations vs Interior Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Vastu Considerations */}
              <div className="space-y-3 p-4 rounded-xl bg-[#F7F3EB]/60 border border-[#EFE8DC]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A85838] flex items-center gap-1.5">
                  <Compass size={15} />
                  <span>Vastu Considerations</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedRoom.vastuRules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-[#22201E] leading-relaxed flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A85838] shrink-0 mt-1.5"></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interior Architecture Solutions */}
              <div className="space-y-3 p-4 rounded-xl bg-[#FDFBF7] border border-[#D8CEBE]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#607261] flex items-center gap-1.5">
                  <Lightbulb size={15} />
                  <span>Interior Solutions</span>
                </h4>
                <ul className="space-y-2.5">
                  {selectedRoom.interiorSolutions.map((sol, idx) => (
                    <li key={idx} className="text-xs text-[#22201E] leading-relaxed flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#607261] shrink-0 mt-1.5"></span>
                      <span>{sol}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Material & Color Resonance */}
            <div className="mt-5 pt-4 border-t border-[#EFE8DC] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Palette size={16} className="text-[#B89758] shrink-0" />
                <div>
                  <span className="font-semibold text-[#161514]">Harmonious Palette: </span>
                  <span className="text-[#634832]">{selectedRoom.palette.join(", ")}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Box size={16} className="text-[#B89758] shrink-0" />
                <div>
                  <span className="font-semibold text-[#161514]">Tactile Materials: </span>
                  <span className="text-[#634832]">{selectedRoom.materials}</span>
                </div>
              </div>
            </div>

            {/* Quick Consultation Trigger */}
            <div className="mt-6 pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
              <p className="text-xs text-[#634832]">Need a customized layout plan for your {selectedRoom.name}?</p>
              <a
                href={getWhatsAppLink(`Hello! I would like to consult on the Vastu and interior layout of my ${selectedRoom.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#161514] text-[#FDFBF7] rounded-lg text-xs font-medium hover:bg-[#634832] transition-colors"
              >
                <MessageCircle size={14} className="text-[#25D366]" />
                <span>Discuss {selectedRoom.name}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
