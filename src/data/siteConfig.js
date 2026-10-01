export const siteConfig = {
  brandName: "AstroInterior",
  tagline: "Where Energy Meets Design",
  subtitle: "Understand yourself. Understand your space. Design a place that feels right.",
  phone: "+91 98765 43210",
  phoneDisplay: "+91 98765 43210",
  whatsappNumber: "919876543210", // International format without +
  email: "hello@astrointerior.in",
  consultationEmail: "consult@astrointerior.in",
  address: "Studio 402, Signature One, Bodakdev, SG Highway",
  city: "Ahmedabad",
  state: "Gujarat",
  pincode: "380054",
  country: "India",
  workingHours: "Monday – Saturday: 10:00 AM – 7:30 PM IST",
  socialLinks: {
    instagram: "https://instagram.com",
    pinterest: "https://pinterest.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  },
  citiesServed: ["Ahmedabad", "Surat", "Vadodara", "Mumbai", "Pune", "Bengaluru", "Delhi NCR"],
  disclaimer: "Astrology, Numerology, and Vastu consultations provide holistic guidance and spatial balance. They complement architectural planning and personal mindfulness, and are designed for intentional living."
};

export const getWhatsAppLink = (customText) => {
  const defaultText = `Hello ${siteConfig.brandName}, I would like to enquire about your design and consultation services.`;
  const text = encodeURIComponent(customText || defaultText);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
};
