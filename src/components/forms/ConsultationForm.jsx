import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle2, MessageCircle, Phone, Mail, Sparkles, Building, MapPin, IndianRupee, ChevronDown, Check, X } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';

export default function ConsultationForm({ defaultService = "Vastu × Interior Design" }) {
  const [formData, setFormData] = useState({
    services: defaultService ? [defaultService] : ["Vastu × Interior Design"],
    name: "",
    phone: "",
    email: "",
    city: "",
    propertyType: "Apartment / High-Rise",
    propertySize: "1,500 - 2,500 sq.ft.",
    budget: "₹10–20 Lakh",
    preferredContact: "WhatsApp",
    message: ""
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Vastu × Interior Design",
    "Residential Vastu",
    "Commercial / Office / Shop Vastu",
    "Medical Vastu (Clinic / Hospital)",
    "Plot & Land Vastu",
    "Interior Design",
    "Astrology & Horoscope",
    "Muhurta & Event Selection",
    "Vedic Numerology"
  ];

  const propertyTypes = [
    "Apartment / High-Rise",
    "Duplex / Penthouse",
    "Independent Bungalow / Villa",
    "Office / Shop / Showroom",
    "Clinic / Hospital",
    "Factory / Industrial",
    "Plot / Land",
    "Not applicable (Astrology / Numerology)"
  ];

  const budgets = [
    "Under ₹5 Lakh",
    "₹5–10 Lakh",
    "₹10–20 Lakh",
    "₹20–40 Lakh",
    "₹40 Lakh+",
    "Not Sure / Custom"
  ];

  const toggleService = (srv) => {
    setFormData((prev) => {
      const exists = prev.services.includes(srv);
      const updated = exists
        ? prev.services.filter((s) => s !== srv)
        : [...prev.services, srv];
      return { ...prev, services: updated };
    });
  };

  const removeService = (e, srv) => {
    e.stopPropagation();
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s !== srv)
    }));
  };

  const getCustomWhatsAppText = () => {
    const servicesList = formData.services.length > 1
      ? formData.services.map((s) => `  ▫️ ${s}`).join("\n")
      : (formData.services[0] || "General Consultation");

    const emailLine = formData.email ? `• *Email:* ${formData.email.trim()}\n` : "";
    const messageLine = formData.message.trim() ? `\n💬 *Note / Requirement:*\n"${formData.message.trim()}"\n` : "";

    return `Hello ${siteConfig.founderName},

I would like to schedule a consultation session. Here is an overview of my requirements:

📋 *CONSULTATION REQUEST*
━━━━━━━━━━━━━━━━━━━━
👤 *Client Details*
• *Name:* ${formData.name.trim()}
• *Phone:* ${formData.phone.trim()}
${emailLine}• *City / Location:* ${formData.city.trim()}

🏛️ *Focus Area & Property*
${formData.services.length > 1 ? `• *Selected Focus Areas:*\n${servicesList}` : `• *Focus Area:* ${servicesList}`}
• *Property Typology:* ${formData.propertyType}
• *Estimated Budget:* ${formData.budget}

📞 *Preferred Contact:* ${formData.preferredContact}
${messageLine}━━━━━━━━━━━━━━━━━━━━
Please let me know a convenient time to connect and discuss the next steps.`;
  };

  // No backend: the enquiry is delivered by opening WhatsApp with every detail pre-filled.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.services.length === 0) {
      alert("Please select at least one discipline / focus area.");
      setIsDropdownOpen(true);
      return;
    }
    setIsSubmitting(true);
    window.open(getWhatsAppLink(getCustomWhatsAppText()), "_blank", "noopener,noreferrer");
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#EFE8DC] pb-5">
            <span className="editorial-subheading text-[#B89758]">Initiate Dialogue</span>
            <h3 className="font-serif text-3xl text-[#161514] mt-1 font-normal">
              Request a Consultation with {siteConfig.founderName}
            </h3>
            <p className="text-xs sm:text-sm text-[#634832] mt-1 leading-relaxed">
              Every enquiry is reviewed personally. Fill in a few details — pressing the button opens WhatsApp with your
              request ready to send.
            </p>
          </div>

          {/* Service Track Selection (Multi-Select Dropdown) */}
          <div className="relative" ref={dropdownRef}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
                Select Discipline / Focus Area <span className="text-[#A85838]">*</span>
              </label>
              <span className="text-[11px] text-[#634832] font-medium">
                {formData.services.length} selected
              </span>
            </div>

            {/* Dropdown Trigger Box */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsDropdownOpen((prev) => !prev);
                }
              }}
              className={`w-full min-h-[48px] px-3.5 py-2 bg-[#F7F3EB] border rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all ${
                isDropdownOpen
                  ? "border-[#B89758] ring-2 ring-[#B89758]/30 bg-[#FDFBF7]"
                  : "border-[#D8CEBE] hover:border-[#B89758]"
              }`}
            >
              <div className="flex flex-wrap items-center gap-1.5 flex-1 pr-1 py-0.5">
                {formData.services.length === 0 ? (
                  <span className="text-sm text-[#634832]/60 select-none">
                    Select discipline / focus area(s)...
                  </span>
                ) : (
                  formData.services.map((srv) => (
                    <span
                      key={srv}
                      className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#161514] text-[#FDFBF7] pl-2.5 pr-1.5 py-1 rounded-lg shadow-xs select-none"
                    >
                      <span>{srv}</span>
                      <button
                        type="button"
                        onClick={(e) => removeService(e, srv)}
                        className="hover:bg-white/20 rounded p-0.5 transition-colors"
                        title={`Remove ${srv}`}
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))
                )}
              </div>

              <div className="flex items-center gap-2 text-[#634832] shrink-0 pl-1 border-l border-[#D8CEBE]">
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    isDropdownOpen ? "rotate-180 text-[#B89758]" : "text-[#634832]"
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu Overlay */}
            {isDropdownOpen && (
              <div className="absolute z-30 left-0 right-0 mt-1.5 bg-[#FDFBF7] border border-[#D8CEBE] rounded-2xl shadow-xl p-3 space-y-2">
                <div className="flex items-center justify-between px-1 pb-1.5 border-b border-[#EFE8DC] text-xs text-[#634832]">
                  <span className="font-medium">Choose one or more disciplines:</span>
                  {formData.services.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, services: [] }))}
                      className="text-[#A85838] hover:underline font-semibold text-[11px]"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-64 overflow-y-auto pr-1">
                  {services.map((srv) => {
                    const isSelected = formData.services.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs text-left transition-all ${
                          isSelected
                            ? "bg-[#161514] text-[#FDFBF7] font-semibold shadow-xs"
                            : "bg-[#F7F3EB] text-[#161514] hover:bg-[#EFE8DC] border border-transparent"
                        }`}
                      >
                        <span className="pr-2">{srv}</span>
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border transition-colors ${
                            isSelected
                              ? "bg-[#B89758] border-[#B89758] text-[#161514]"
                              : "border-[#D8CEBE] bg-[#FDFBF7]"
                          }`}
                        >
                          {isSelected && <Check size={11} strokeWidth={3.5} />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-1 border-t border-[#EFE8DC] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(false)}
                    className="px-4 py-1.5 bg-[#161514] text-[#FDFBF7] text-xs font-semibold rounded-lg hover:bg-[#634832] transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Personal Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                Your Full Name <span className="text-[#A85838]">*</span>
              </label>
              <input
                type="text"
                required
                autoComplete="name"
                placeholder="e.g. Rajesh Patel"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:ring-2 focus:ring-[#B89758]/40 focus:border-[#B89758] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                Phone / WhatsApp Number <span className="text-[#A85838]">*</span>
              </label>
              <input
                type="tel"
                inputMode="tel"
                required
                autoComplete="tel"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:ring-2 focus:ring-[#B89758]/40 focus:border-[#B89758] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="rajesh@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:ring-2 focus:ring-[#B89758]/40 focus:border-[#B89758] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                City / Location <span className="text-[#A85838]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kandivali, Borivali, Thane"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-3 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:ring-2 focus:ring-[#B89758]/40 focus:border-[#B89758] transition-all"
              />
            </div>
          </div>

          {/* Property Specifications (only if spatial/design) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                Property Typology
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
              >
                {propertyTypes.map((pt) => (
                  <option key={pt} value={pt}>{pt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
                Budget Scope
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
              >
                {budgets.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Preferred Communication */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2">
              Preferred Contact Channel
            </label>
            <div className="grid grid-cols-3 gap-3">
              {["WhatsApp", "Phone Call", "Email"].map((ch) => (
                <button
                  type="button"
                  key={ch}
                  onClick={() => setFormData({ ...formData, preferredContact: ch })}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                    formData.preferredContact === ch
                      ? "bg-[#161514] text-[#FDFBF7] border-[#161514] font-semibold"
                      : "bg-[#F7F3EB] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-1.5">
              Specific Questions or Brief Summary
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your home, layout questions, or consultation requirements..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-2.5 bg-[#F7F3EB] border border-[#D8CEBE] rounded-xl text-sm text-[#161514] focus:outline-none focus:border-[#B89758]"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 bg-[#161514] text-[#FDFBF7] rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-[#634832] transition-colors shadow-md disabled:opacity-50"
            >
              <Send size={16} className="text-[#DEC695]" />
              <span>{isSubmitting ? "Opening WhatsApp..." : "Send Request via WhatsApp"}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-[#634832] pt-1">
            <span>Or connect instantly:</span>
            <a
              href={getWhatsAppLink("Hello, I would like to chat directly on WhatsApp regarding a new consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="tap text-[#25D366] font-semibold hover:underline flex items-center gap-1"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </form>
      ) : (
        /* Polished Success State */
        <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-[#607261]/20 text-[#607261] mx-auto flex items-center justify-center">
            <CheckCircle2 size={36} />
          </div>

          <div>
            <span className="editorial-subheading text-[#B89758]">Almost Done</span>
            <h3 className="font-serif text-3xl text-[#161514] mt-1">
              Thank You, {formData.name}
            </h3>
            <p className="text-sm text-[#634832] max-w-md mx-auto mt-2 leading-relaxed">
              Your enquiry for <strong>{formData.services.join(", ")}</strong> is ready in WhatsApp — just press <strong>Send</strong> there.
              If WhatsApp didn't open, use the button below or call {siteConfig.phoneDisplay}.
            </p>
          </div>

          {/* Instant WhatsApp Action */}
          <div className="pt-4 max-w-sm mx-auto space-y-3">
            <a
              href={getWhatsAppLink(getCustomWhatsAppText())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#25D366] text-white rounded-xl text-sm font-semibold hover:bg-[#22bf5b] transition-colors shadow-md"
            >
              <MessageCircle size={18} />
              <span>Open WhatsApp Again</span>
            </a>

            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs text-[#634832] hover:text-[#161514] underline"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
