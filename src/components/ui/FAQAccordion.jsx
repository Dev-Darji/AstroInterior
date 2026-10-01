import React, { useState } from 'react';
import { faqGroups } from '../../data/faqs';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';

export default function FAQAccordion() {
  const [activeGroupId, setActiveGroupId] = useState(faqGroups[0].id);
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0);

  const activeGroup = faqGroups.find((g) => g.id === activeGroupId) || faqGroups[0];

  const toggleQuestion = (idx) => {
    setOpenQuestionIndex(openQuestionIndex === idx ? -1 : idx);
  };

  return (
    <div className="bg-[#F7F3EB] border border-[#EFE8DC] rounded-3xl p-6 md:p-10 shadow-sm max-w-4xl mx-auto">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-[#EFE8DC] pb-4">
        {faqGroups.map((group) => {
          const isSelected = activeGroupId === group.id;
          return (
            <button
              key={group.id}
              onClick={() => {
                setActiveGroupId(group.id);
                setOpenQuestionIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isSelected
                  ? "bg-[#161514] text-[#FDFBF7] shadow-sm"
                  : "bg-[#FDFBF7] text-[#634832] border border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              {group.category}
            </button>
          );
        })}
      </div>

      {/* Accordion Items List */}
      <div className="space-y-3">
        {activeGroup.questions.map((faq, idx) => {
          const isOpen = openQuestionIndex === idx;
          return (
            <div
              key={idx}
              className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggleQuestion(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-serif text-base sm:text-lg text-[#161514] font-medium leading-snug">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full bg-[#F7F3EB] border border-[#D8CEBE] flex items-center justify-center shrink-0 text-[#634832] transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-[#161514] text-white border-[#161514]" : ""
                  }`}
                >
                  <ChevronDown size={15} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#634832] leading-relaxed border-t border-[#EFE8DC]/60 animate-in fade-in duration-200">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Have More Questions Footer */}
      <div className="mt-8 pt-6 border-t border-[#EFE8DC] text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#634832]">
          Have a specific floor plan or question not covered here?
        </p>
        <a
          href={getWhatsAppLink("Hello, I have a specific question about your Vastu and Interior Design approach.")}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#161514] text-[#FDFBF7] rounded-xl text-xs font-medium hover:bg-[#634832] transition-colors"
        >
          <MessageCircle size={14} className="text-[#25D366]" />
          <span>Ask Studio via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
