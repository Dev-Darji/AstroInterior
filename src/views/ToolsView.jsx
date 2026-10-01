import React, { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import NumerologyCalculator from '../components/interactive/NumerologyCalculator';
import AstrologyKundliDemo from '../components/interactive/AstrologyKundliDemo';
import VastuCompass from '../components/interactive/VastuCompass';
import VastuFloorPlan from '../components/interactive/VastuFloorPlan';
import AISpaceAdvisor from '../components/interactive/AISpaceAdvisor';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import { Sparkles, Compass, Bot, Layers, Sliders, Hash } from 'lucide-react';

export default function ToolsView() {
  const [activeTool, setActiveTool] = useState("advisor");

  const tools = [
    { id: "advisor", label: "AI Space Advisor", icon: Bot, badge: "Concept Generator" },
    { id: "compass", label: "Vastu Compass", icon: Compass, badge: "8 Directions" },
    { id: "floorplan", label: "Interactive Floor Plan", icon: Layers, badge: "Vastu × Design" },
    { id: "numerology", label: "Numerology Calculator", icon: Hash, badge: "Life Path & Space" },
    { id: "kundli", label: "Astrology Kundli Demo", icon: Sparkles, badge: "Vedic Chart" },
    { id: "slider", label: "Before / After Slider", icon: Sliders, badge: "Transformations" }
  ];

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Interactive Spatial Suite</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Explore, Calculate & <br />
          <span className="italic text-[#A85838]">Visualize Your Space.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Interactive tools designed to demystify Vedic spatial energies, personal numbers, natal configurations, and contemporary interior concepts.
        </p>
      </div>

      {/* Tool Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto border-b border-[#EFE8DC] pb-6">
        {tools.map((t) => {
          const Icon = t.icon;
          const isSelected = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                isSelected
                  ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-md ring-2 ring-[#B89758]"
                  : "bg-[#FDFBF7] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              <Icon size={16} className={isSelected ? "text-[#B89758]" : "text-[#634832]"} />
              <span>{t.label}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? "bg-[#B89758] text-[#161514] font-bold" : "bg-[#EFE8DC] text-[#634832]"}`}>
                {t.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Interactive Component View */}
      <div className="animate-in fade-in duration-300">
        {activeTool === "advisor" && <AISpaceAdvisor />}
        {activeTool === "compass" && <VastuCompass />}
        {activeTool === "floorplan" && <VastuFloorPlan />}
        {activeTool === "numerology" && <NumerologyCalculator />}
        {activeTool === "kundli" && <AstrologyKundliDemo />}
        {activeTool === "slider" && <BeforeAfterSlider />}
      </div>

    </div>
  );
}
