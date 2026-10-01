import React, { useState } from 'react';
import { Send, CheckCircle2, MessageCircle, Phone, Mail, Sparkles, Building, MapPin, IndianRupee } from 'lucide-react';
import { siteConfig, getWhatsAppLink } from '../../data/siteConfig';

export default function ConsultationForm({ defaultService = "Vastu × Interior Design" }) {
  const [formData, setFormData] = useState({
    service: defaultService,
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const services = [
    "Vastu × Interior Design",
    "Complete Interior Architecture",
    "Residential Vastu Audit",
    "Commercial / Office Vastu",
    "Vedic Kundli & Astrology",
    "Numerology Blueprint"
  ];

  const propertyTypes = [
    "Apartment / High-Rise",
    "Duplex / Penthouse",
    "Independent Bungalow / Villa",
    "Commercial Office / Studio",
    "Raw Plot / Land"
  ];

  const budgets = [
    "Under ₹5 Lakh",
    "₹5–10 Lakh",
    "₹10–20 Lakh",
    "₹20–40 Lakh",
    "₹40 Lakh+",
    "Not Sure / Custom"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const getCustomWhatsAppText = () => {
    return `Hello ${siteConfig.brandName}, I have submitted a consultation request for ${formData.service}.
Name: ${formData.name}
City: ${formData.city}
Property: ${formData.propertyType} (${formData.propertySize})
Budget: ${formData.budget}
Preferred Contact: ${formData.preferredContact}
Message: ${formData.message || 'None'}`;
  };

  return (
    <div className="bg-[#FDFBF7] border border-[#EFE8DC] rounded-3xl p-6 sm:p-10 shadow-sm max-w-3xl mx-auto">
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-[#EFE8DC] pb-5">
            <span className="editorial-subheading text-[#B89758]">Initiate Dialogue</span>
            <h3 className="font-serif text-3xl text-[#161514] mt-1 font-normal">
              Request an Architectural & Vastu Consultation
            </h3>
            <p className="text-xs sm:text-sm text-[#634832] mt-1 leading-relaxed">
              Every inquiry is reviewed directly by our principal studio. Please provide basic details about your project or consultation focus.
            </p>
          </div>

          {/* Service Track Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514] mb-2">
              Select Discipline / Focus Area <span className="text-[#A85838]">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {services.map((srv) => (
                <button
                  type="button"
                  key={srv}
                  onClick={() => setFormData({ ...formData, service: srv })}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    formData.service === srv
                      ? "bg-[#161514] text-[#FDFBF7] border-[#161514] shadow-sm font-semibold"
                      : "bg-[#F7F3EB] text-[#634832] border-[#D8CEBE] hover:border-[#B89758]"
                  }`}
                >
                  {srv}
                </button>
              ))}
            </div>
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
                placeholder="+91 98765 43210"
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
                placeholder="e.g. Ahmedabad, Surat, Mumbai"
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
              <span>{isSubmitting ? "Transmitting Request..." : "Request Consultation"}</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-[#634832] pt-1">
            <span>Or connect instantly:</span>
            <a
              href={getWhatsAppLink("Hello, I would like to chat directly on WhatsApp regarding a new consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] font-semibold hover:underline flex items-center gap-1"
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
            <span className="editorial-subheading text-[#B89758]">Consultation Received</span>
            <h3 className="font-serif text-3xl text-[#161514] mt-1">
              Thank You, {formData.name}
            </h3>
            <p className="text-sm text-[#634832] max-w-md mx-auto mt-2 leading-relaxed">
              We have received your enquiry for <strong>{formData.service}</strong> in {formData.city}. Our studio team will reach out via {formData.preferredContact} within 24 hours.
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
              <span>Forward Request to Studio WhatsApp</span>
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
