import React, { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { projects } from '../data/projects';
import BeforeAfterSlider from '../components/interactive/BeforeAfterSlider';
import MaterialBoard from '../components/interactive/MaterialBoard';
import ColorPaletteSelector from '../components/interactive/ColorPaletteSelector';
import { Eye, ArrowRight, Sparkles, MessageCircle, MapPin, Layers, X } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

export default function InteriorsView({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ["All", "Residential", "Commercial"];

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="pt-28 pb-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Architectural Portfolio</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Spaces Designed Around <br />
          <span className="italic text-[#A85838]">The Way You Live.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Contemporary Indian residences and boutique commercial studios celebrating tactile natural stone, honest timber joinery, diffused daylight, and Vastu-aligned flow.
        </p>

        <div className="pt-2 flex justify-center gap-4">
          <button
            onClick={() => onNavigate("consultation")}
            className="px-6 py-3 rounded-full bg-[#161514] text-[#FDFBF7] text-xs font-semibold hover:bg-[#634832] transition-colors"
          >
            Discuss Your Project
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[#161514] text-[#FDFBF7] shadow-sm font-semibold"
                : "bg-[#F7F3EB] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="group bg-[#FDFBF7] border border-[#EFE8DC] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Project Image */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={proj.heroImage}
                alt={proj.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[10px] text-[#DEC695] font-semibold uppercase tracking-wider">
                {proj.style}
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs text-[#DEC695] flex items-center gap-1 mb-0.5">
                  <MapPin size={13} /> {proj.location}
                </span>
                <h3 className="font-serif text-2xl font-normal leading-snug">{proj.title}</h3>
              </div>
            </div>

            {/* Project Details */}
            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
                  {proj.summary}
                </p>

                <div className="mt-4 pt-3 border-t border-[#EFE8DC] space-y-2 text-xs">
                  <div className="flex justify-between text-[#634832]">
                    <span>Scope:</span>
                    <strong className="text-[#161514]">{proj.scope}</strong>
                  </div>
                  <div className="flex justify-between text-[#634832]">
                    <span>Area:</span>
                    <strong className="text-[#161514]">{proj.area}</strong>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(proj)}
                  className="text-xs font-semibold text-[#A85838] hover:text-[#161514] flex items-center gap-1.5"
                >
                  <Eye size={14} />
                  <span>Read Full Case Study</span>
                </button>

                <a
                  href={getWhatsAppLink(`Hello! I saw your ${proj.title} project (${proj.location}) and would like to discuss a similar project for my home.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-[#F7F3EB] hover:bg-[#EFE8DC] text-[#25D366] transition-colors"
                  title="Inquire about this project"
                >
                  <MessageCircle size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] text-[#161514] w-full max-w-4xl max-h-[90vh] rounded-3xl overflow-y-auto shadow-2xl border border-[#D8CEBE] p-6 sm:p-10 relative">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-[#F7F3EB] hover:bg-[#EFE8DC] text-[#161514]"
              aria-label="Close case study"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div>
                <span className="editorial-subheading text-[#B89758]">{activeModalProject.category} Case Study</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#161514] mt-1 font-normal">
                  {activeModalProject.title}
                </h2>
                <p className="text-xs text-[#634832] mt-1">
                  {activeModalProject.location} • {activeModalProject.scope} • Completed {activeModalProject.year}
                </p>
              </div>

              {/* Hero Image */}
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-[#EFE8DC]">
                <img
                  src={activeModalProject.heroImage}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Design Story */}
              <div>
                <h4 className="font-serif text-2xl text-[#161514] mb-2">Design Story & Concept</h4>
                <p className="text-xs sm:text-sm text-[#22201E] leading-relaxed">
                  {activeModalProject.designStory}
                </p>
              </div>

              {/* Vastu Highlights */}
              <div className="p-5 rounded-2xl bg-[#F7F3EB] border border-[#EFE8DC] space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A85838]">
                  Vastu Integrations
                </h4>
                <ul className="space-y-2 text-xs text-[#22201E]">
                  {activeModalProject.vastuHighlights.map((vh, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#A85838] shrink-0 mt-1.5" />
                      <span>{vh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Materials Palette */}
              <div>
                <h4 className="font-serif text-xl text-[#161514] mb-2">Curated Material Palette</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.materials.map((m, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-md bg-[#F7F3EB] border border-[#D8CEBE] text-[#161514]">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-[#EFE8DC] flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#634832]">
                  Inspired by this home? Let’s evaluate your property’s potential.
                </p>
                <a
                  href={getWhatsAppLink(`Hello, I was reviewing your case study for ${activeModalProject.title} and want to discuss designing my home.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-semibold hover:bg-[#634832] transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Discuss Project with Studio</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Draggable Before / After Section */}
      <section>
        <SectionHeader
          eyebrow="Transformation Gallery"
          title="Interactive Before / After Comparisons"
          subtitle="Drag the slider to examine how raw architectural shells evolve into calm sanctuaries."
        />
        <BeforeAfterSlider />
      </section>

      {/* Tactile Material Board */}
      <section>
        <SectionHeader
          eyebrow="Physical Samples"
          title="Tactile Materiality & Finishes"
          subtitle="Explore the hand-finished lime plasters, reclaimed Burma teaks, vein-cut travertines, and raw linens we source."
        />
        <MaterialBoard />
      </section>

      {/* Color Palette Selector */}
      <section>
        <SectionHeader
          eyebrow="Mood Exploration"
          title="Find Your Interior Palette"
          subtitle="Select an elemental color scheme to preview how it transforms lighting and mood."
        />
        <ColorPaletteSelector />
      </section>

    </div>
  );
}
