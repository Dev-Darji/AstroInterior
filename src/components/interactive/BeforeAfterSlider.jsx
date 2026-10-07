import React, { useState, useRef, useCallback } from 'react';
import { projects } from '../../data/projects';
import { MoveHorizontal, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function BeforeAfterSlider({ dark = false }) {
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

  const t = dark
    ? {
        wrap: "astro-panel p-5 sm:p-8 md:p-10 max-w-5xl mx-auto text-[#E8E2D4]",
        tab: "astro-chip",
        viewport: "border-[#DEC695]/25",
        hint: "text-[#E8E2D4]/55",
        divider: "border-white/10",
        card: "astro-card",
        beforeLabel: "text-[#F0A58A]",
        afterLabel: "text-[#9FD6A8]",
        body: "text-[#E8E2D4]/75",
        title: "text-[#F5EFE2]",
        meta: "text-[#E8E2D4]/55",
        cta: "astro-btn w-full sm:w-auto py-2.5 text-xs"
      }
    : {
        wrap: "bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-5 sm:p-6 md:p-10 shadow-sm max-w-5xl mx-auto",
        tab: "",
        viewport: "border-[#D8CEBE]",
        hint: "text-[#634832]/80",
        divider: "border-[#EFE8DC]",
        card: "rounded-xl bg-[#FDFBF7] border border-[#EFE8DC]",
        beforeLabel: "text-[#A85838]",
        afterLabel: "text-[#607261]",
        body: "text-[#634832]",
        title: "text-[#161514]",
        meta: "text-[#634832]",
        cta: "w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
      };

  return (
    <div className={t.wrap}>
      {/* Project Switcher Tabs — scrolls horizontally on small screens */}
      <div className="-mx-5 sm:mx-0 px-5 sm:px-0 mb-8 overflow-x-auto no-scrollbar">
        <div className="flex sm:flex-wrap sm:justify-center gap-2 w-max sm:w-auto">
          {projects.map((proj, idx) => {
            const active = activeProjectIndex === idx;
            return (
              <button
                key={proj.id}
                data-active={active}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  setSliderPosition(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  dark
                    ? t.tab
                    : active
                      ? "bg-[#161514] text-[#FDFBF7] shadow-sm font-semibold"
                      : "bg-[#FDFBF7] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
                }`}
              >
                {proj.title} • <span className="text-[11px] opacity-75">{proj.location.split(',')[0]}</span>
              </button>
            );
          })}
        </div>
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
        className={`relative w-full aspect-[4/3] sm:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border shadow-md focus:outline-none focus:ring-2 focus:ring-[#B89758] touch-none ${t.viewport}`}
      >
        <img
          src={currentProject.afterImage}
          alt={`After: ${currentProject.title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2.5 sm:px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[#FDFBF7] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase border border-[#B89758]/30">
          After
        </div>

        {/* BEFORE image clipped in place, so it stays aligned at any width */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={currentProject.beforeImage}
            alt={`Before: ${currentProject.title}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-2.5 sm:px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[#FDFBF7] text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase border border-white/20">
            Before
          </div>
        </div>

        {/* Divider Bar & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 -translate-x-1/2 bg-[#FDFBF7] shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#161514] border-2 border-[#B89758] text-[#DEC695] flex items-center justify-center shadow-xl">
            <MoveHorizontal size={20} />
          </div>
        </div>
      </div>

      <p className={`text-[11px] text-center mt-3 flex items-center justify-center gap-1.5 ${t.hint}`}>
        <Sparkles size={13} className="text-[#B89758]" />
        <span>Drag or use arrow keys to compare the transformation</span>
      </p>
      {currentProject.beforeCredit && (
        <p className={`text-[10px] text-center mt-1 opacity-70 ${t.hint}`}>
          Before photo:{" "}
          <a href={currentProject.beforeCredit.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
            {currentProject.beforeCredit.author}
          </a>{" "}
          · {currentProject.beforeCredit.license}
        </p>
      )}

      <div className={`mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-6 border-t ${t.divider}`}>
        <div className={`p-4 ${t.card}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${t.beforeLabel}`}>Raw Space Challenges</span>
          <p className={`text-xs leading-relaxed ${t.body}`}>{currentProject.beforeDesc}</p>
        </div>
        <div className={`p-4 ${t.card}`}>
          <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${t.afterLabel}`}>Architectural & Vastu Intervention</span>
          <p className={`text-xs leading-relaxed ${t.body}`}>{currentProject.afterDesc}</p>
        </div>
      </div>

      <div className={`mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t ${t.divider}`}>
        <div>
          <span className={`font-serif text-base ${t.title}`}>{currentProject.title}</span>
          <p className={`text-[11px] ${t.meta}`}>{currentProject.location} • {currentProject.scope}</p>
        </div>
        <a
          href={getWhatsAppLink(`Hello! I saw your Before/After transformation of ${currentProject.title} (${currentProject.location}) and would like to explore a similar transformation for my home.`)}
          target="_blank"
          rel="noopener noreferrer"
          className={t.cta}
        >
          <MessageCircle size={15} className={dark ? "" : "text-[#25D366]"} />
          <span>Discuss Similar Transformation</span>
        </a>
      </div>
    </div>
  );
}
