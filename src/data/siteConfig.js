export const siteConfig = {
  brandName: "AstroInterior",
  founderName: "Jinisha Parmar",
  founderTitle: "Vastu Consultant · Astrologer · Numerologist · Interior Designer",
  experience: "10+ Years",
  tagline: "Where Energy Meets Design",
  cardTagline: "Creating harmonious spaces for a happy, successful and prosperous life",
  subtitle: "Understand yourself. Understand your space. Design a place that feels right.",
  phone: "+919769238325",
  phoneDisplay: "+91 97692 38325",
  phoneAlt: "+917900161377",
  phoneAltDisplay: "+91 79001 61377",
  whatsappNumber: "919769238325", // International format without + (confirm with client which number is on WhatsApp)
  email: "parmarjinisha31@gmail.com",
  address: "Shop No. 4, Atlanta Apartments, Opp. Assumption Church, Dahanukarwadi, Kandivali West",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400067",
  country: "India",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Atlanta+Apartments+Opp+Assumption+Church+Dahanukarwadi+Kandivali+West+Mumbai",
  workingHours: "Consultations by appointment",
  socialLinks: {
    instagram: "https://www.instagram.com/astro.jinishaparmar/",
  },
  instagramHandle: "astro.jinishaparmar",
  citiesServed: ["Mumbai", "Thane", "Navi Mumbai"],
  disclaimer: "Astrology, Numerology, and Vastu consultations provide holistic guidance and spatial balance. They complement architectural planning and personal mindfulness, and are designed for intentional living."
};

export const fullAddress = `${siteConfig.address}, ${siteConfig.city} ${siteConfig.pincode}`;

export const getWhatsAppLink = (customText) => {
  const defaultText = `Hello ${siteConfig.founderName}, I would like to enquire about your Vastu, astrology and interior consultation services.`;
  const text = encodeURIComponent(customText || defaultText);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${text}`;
};
