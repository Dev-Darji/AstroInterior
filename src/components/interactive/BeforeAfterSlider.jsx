import React, { useState, useRef, useCallback } from 'react';
import { projects } from '../../data/projects';
import { MoveHorizontal, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function BeforeAfterSlider() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const currentProject = projects[activeProjectIndex] || projects[0];

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(100, (x / width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-5xl mx-auto">
      {/* Project Switcher Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => {
              setActiveProjectIndex(idx);
              setSliderPosition(50);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              activeProjectIndex === idx
                ? "bg-[#161514] text-[#FDFBF7] shadow-sm font-semibold"
                : "bg-[#FDFBF7] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
            }`}
          >
            {proj.title} • <span className="text-[11px] opacity-75">{proj.location.split(',')[0]}</span>
          </button>
        ))}
      </div>

      {/* Interactive Slider Viewport */}
      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after transformation slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#D8CEBE] shadow-md focus:outline-none focus:ring-2 focus:ring-[#B89758] touch-none"
      >
        {/* AFTER Image (Background full width) */}
        <img
          src={currentProject.afterImage}
          alt={`After: ${currentProject.title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* AFTER Label */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[#FDFBF7] text-[11px] font-semibold tracking-wider uppercase border border-[#B89758]/30">
          After (Vastu × Design)
        </div>

        {/* BEFORE Image (Clipped container) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={currentProject.beforeImage}
            alt={`Before: ${currentProject.title}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none max-w-none"
            style={{
              width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
              height: '100%'
            }}
          />
          {/* BEFORE Label */}
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[#FDFBF7] text-[11px] font-semibold tracking-wider uppercase border border-white/20">
            Before (Raw Space)
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-[#FDFBF7] shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#161514] border-2 border-[#B89758] text-[#DEC695] flex items-center justify-center shadow-xl">
            <MoveHorizontal size={20} />
          </div>
        </div>
      </div>

      {/* Slider Instruction Prompt */}
      <p className="text-[11px] text-center text-[#634832]/80 mt-3 flex items-center justify-center gap-1.5">
        <Sparkles size={13} className="text-[#B89758]" />
        <span>Drag the slider left and right or touch to view the before & after transformation</span>
      </p>

      {/* Story & Transformation Details */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#EFE8DC]">
        <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#EFE8DC]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#A85838] block mb-1">
            Raw Space Challenges
          </span>
          <p className="text-xs text-[#634832] leading-relaxed">
            {currentProject.beforeDesc}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FDFBF7] border border-[#EFE8DC]">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#607261] block mb-1">
            Architectural & Vastu Intervention
          </span>
          <p className="text-xs text-[#22201E] leading-relaxed">
            {currentProject.afterDesc}
          </p>
        </div>
      </div>

      {/* Discuss CTA */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#EFE8DC]">
        <div>
          <span className="text-xs font-serif text-[#161514] text-base">{currentProject.title}</span>
          <p className="text-[11px] text-[#634832]">{currentProject.location} • {currentProject.scope}</p>
        </div>

        <a
          href={getWhatsAppLink(`Hello! I saw your Before/After transformation of ${currentProject.title} (${currentProject.location}) and would like to explore a similar transformation for my home.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
        >
          <MessageCircle size={15} className="text-[#25D366]" />
          <span>Discuss Similar Transformation</span>
        </a>
      </div>
    </div>
  );
}
