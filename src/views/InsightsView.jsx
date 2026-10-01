import React, { useState } from 'react';
import SectionHeader from '../components/ui/SectionHeader';
import { insights } from '../data/insights';
import { BookOpen, Clock, Calendar, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/siteConfig';

export default function InsightsView({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Vastu × Interior Design", "Vastu Shastra", "Interior Design", "Numerology"];

  const filteredArticles = selectedCategory === "All"
    ? insights
    : insights.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="pt-28 pb-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="editorial-subheading text-[#B89758]">Architectural Journal</span>
        <h1 className="font-serif text-4xl sm:text-6xl text-[#161514] font-normal leading-tight">
          Insights & Thought <br />
          <span className="italic text-[#A85838]">Leadership.</span>
        </h1>
        <p className="text-base sm:text-lg text-[#634832] font-light leading-relaxed">
          Exploring the synergy between Vedic spatial intelligence, lighting psychology, authentic Indian materiality, and contemporary residential design.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
              selectedCategory === cat
                ? "bg-[#161514] text-[#FDFBF7] shadow-sm font-semibold"
                : "bg-[#F7F3EB] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((art) => (
          <article
            key={art.id}
            className="group bg-[#FDFBF7] border border-[#EFE8DC] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#161514]/80 backdrop-blur-md text-[10px] text-[#DEC695] font-semibold uppercase tracking-wider">
                {art.category}
              </span>
            </div>

            <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#634832]">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {art.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {art.readTime}</span>
                </div>

                <h2 className="font-serif text-2xl text-[#161514] group-hover:text-[#A85838] transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#634832] leading-relaxed">
                  {art.excerpt}
                </p>

                {/* Key Takeaway Box */}
                <div className="p-3.5 rounded-xl bg-[#F7F3EB] border border-[#EFE8DC] text-xs">
                  <span className="font-bold text-[#A85838] block mb-0.5 uppercase tracking-wider text-[10px]">
                    Key Architectural Takeaway:
                  </span>
                  <p className="text-[#22201E] italic">"{art.keyTakeaway}"</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EFE8DC] flex items-center justify-between">
                <a
                  href={getWhatsAppLink(`Hello! I read your article "${art.title}" and would like to discuss applying these principles to my home.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-[#161514] group-hover:text-[#A85838] inline-flex items-center gap-1.5"
                >
                  <MessageCircle size={14} className="text-[#25D366]" />
                  <span>Discuss This Insight on WhatsApp</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
}
