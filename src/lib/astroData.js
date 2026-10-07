// Classical Jyotish reference tables shared by the Kundli, Numerology and Space tools.

export const SIGNS = [
  { name: "Aries", sanskrit: "Mesha", lord: "Mars", element: "Fire", glyph: "♈" },
  { name: "Taurus", sanskrit: "Vrishabha", lord: "Venus", element: "Earth", glyph: "♉" },
  { name: "Gemini", sanskrit: "Mithuna", lord: "Mercury", element: "Air", glyph: "♊" },
  { name: "Cancer", sanskrit: "Karka", lord: "Moon", element: "Water", glyph: "♋" },
  { name: "Leo", sanskrit: "Simha", lord: "Sun", element: "Fire", glyph: "♌" },
  { name: "Virgo", sanskrit: "Kanya", lord: "Mercury", element: "Earth", glyph: "♍" },
  { name: "Libra", sanskrit: "Tula", lord: "Venus", element: "Air", glyph: "♎" },
  { name: "Scorpio", sanskrit: "Vrishchika", lord: "Mars", element: "Water", glyph: "♏" },
  { name: "Sagittarius", sanskrit: "Dhanu", lord: "Jupiter", element: "Fire", glyph: "♐" },
  { name: "Capricorn", sanskrit: "Makara", lord: "Saturn", element: "Earth", glyph: "♑" },
  { name: "Aquarius", sanskrit: "Kumbha", lord: "Saturn", element: "Air", glyph: "♒" },
  { name: "Pisces", sanskrit: "Meena", lord: "Jupiter", element: "Water", glyph: "♓" }
];

export const PLANET_ORDER = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"];

// direction = Vastu dik ruled by the graha; number = Chaldean/Indian numerology vibration
export const PLANETS = {
  Sun: {
    sanskrit: "Surya", abbr: "Su", glyph: "☉", direction: "E", number: 1,
    gem: "Ruby (Manik)", color: "Saffron, copper & warm gold", day: "Sunday", metal: "Copper",
    exalt: 0, debil: 6, own: [4],
    friends: ["Moon", "Mars", "Jupiter"], enemies: ["Venus", "Saturn"],
    interior: "Keep East windows unobstructed for sunrise light, add copper or brass accents and a Surya motif; never store junk in the East."
  },
  Moon: {
    sanskrit: "Chandra", abbr: "Mo", glyph: "☽", direction: "NW", number: 2,
    gem: "Pearl (Moti)", color: "Pearl white & silver", day: "Monday", metal: "Silver",
    exalt: 1, debil: 7, own: [3],
    friends: ["Sun", "Mercury"], enemies: [],
    interior: "Soften the North-West with pearl-white and silver tones, curved silhouettes and dimmable 2700K lighting; a small silver water bowl calms the mind."
  },
  Mars: {
    sanskrit: "Mangal", abbr: "Ma", glyph: "♂", direction: "S", number: 9,
    gem: "Red Coral (Moonga)", color: "Coral red & terracotta", day: "Tuesday", metal: "Copper",
    exalt: 9, debil: 3, own: [0, 7],
    friends: ["Sun", "Moon", "Jupiter"], enemies: ["Mercury"],
    interior: "Anchor the South with solid, heavy furniture and red-earth or terracotta accents; avoid water features there. A good zone for fitness equipment."
  },
  Mercury: {
    sanskrit: "Budha", abbr: "Me", glyph: "☿", direction: "N", number: 5,
    gem: "Emerald (Panna)", color: "Leaf & emerald green", day: "Wednesday", metal: "Bronze",
    exalt: 5, debil: 11, own: [2, 5],
    friends: ["Sun", "Venus"], enemies: ["Moon"],
    interior: "Keep the North light and open with live green plants and an organised desk or bookshelf — Mercury rewards clarity and flow."
  },
  Jupiter: {
    sanskrit: "Guru", abbr: "Ju", glyph: "♃", direction: "NE", number: 3,
    gem: "Yellow Sapphire (Pukhraj)", color: "Turmeric yellow & gold", day: "Thursday", metal: "Gold",
    exalt: 3, debil: 9, own: [8, 11],
    friends: ["Sun", "Moon", "Mars"], enemies: ["Mercury", "Venus"],
    interior: "The North-East must stay the lightest, cleanest corner — pooja, books, yellow-gold accents. No toilets, heavy storage or clutter."
  },
  Venus: {
    sanskrit: "Shukra", abbr: "Ve", glyph: "♀", direction: "SE", number: 6,
    gem: "Diamond / White Sapphire", color: "Ivory, pastel pink & rose gold", day: "Friday", metal: "Silver",
    exalt: 11, debil: 5, own: [1, 6],
    friends: ["Mercury", "Saturn"], enemies: ["Sun", "Moon"],
    interior: "Refine the South-East with luxurious textures — silk, crystal, rose-gold hardware and fresh flowers; keep the kitchen fire bright and clean."
  },
  Saturn: {
    sanskrit: "Shani", abbr: "Sa", glyph: "♄", direction: "W", number: 8,
    gem: "Blue Sapphire (Neelam)", color: "Deep indigo, charcoal & black", day: "Saturday", metal: "Iron",
    exalt: 6, debil: 0, own: [9, 10],
    friends: ["Mercury", "Venus"], enemies: ["Sun", "Moon", "Mars"],
    interior: "Give the West sturdy storage, disciplined order and indigo or charcoal tones; blackened-steel details suit Shani. Repair anything broken."
  },
  Rahu: {
    sanskrit: "Rahu", abbr: "Ra", glyph: "☊", direction: "SW", number: 4,
    gem: "Hessonite (Gomed)", color: "Smoky grey & earthy brown", day: "Saturday", metal: "Lead",
    exalt: 1, debil: 7, own: [10],
    friends: ["Mercury", "Venus", "Saturn"], enemies: ["Sun", "Moon", "Mars"],
    interior: "Keep the South-West heavy, closed and grounded — no cuts, sumps or water. Earthy greys and browns, and zero clutter, calm Rahu."
  },
  Ketu: {
    sanskrit: "Ketu", abbr: "Ke", glyph: "☋", direction: null, number: 7,
    gem: "Cat's Eye (Lehsunia)", color: "Smoke grey & multi-tone earth", day: "Tuesday", metal: "Mixed alloys",
    exalt: 7, debil: 1, own: [7],
    friends: ["Mars", "Venus", "Saturn"], enemies: ["Sun", "Moon"],
    interior: "Create a quiet meditation nook with minimal ornament, natural fibres and soft grey tones — Ketu thrives on detachment and stillness."
  }
};

export const NAKSHATRAS = [
  ["Ashwini", "Ashwini Kumaras"], ["Bharani", "Yama"], ["Krittika", "Agni"],
  ["Rohini", "Brahma"], ["Mrigashira", "Soma"], ["Ardra", "Rudra"],
  ["Punarvasu", "Aditi"], ["Pushya", "Brihaspati"], ["Ashlesha", "Sarpa"],
  ["Magha", "Pitrs"], ["Purva Phalguni", "Bhaga"], ["Uttara Phalguni", "Aryaman"],
  ["Hasta", "Savitar"], ["Chitra", "Vishvakarma"], ["Swati", "Vayu"],
  ["Vishakha", "Indra-Agni"], ["Anuradha", "Mitra"], ["Jyeshtha", "Indra"],
  ["Mula", "Nirriti"], ["Purva Ashadha", "Apas"], ["Uttara Ashadha", "Vishvedevas"],
  ["Shravana", "Vishnu"], ["Dhanishta", "Vasus"], ["Shatabhisha", "Varuna"],
  ["Purva Bhadrapada", "Aja Ekapada"], ["Uttara Bhadrapada", "Ahir Budhnya"], ["Revati", "Pushan"]
].map(([name, deity], i) => ({
  name,
  deity,
  lord: ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"][i % 9]
}));

export const DASHA_SEQUENCE = ["Ketu", "Venus", "Sun", "Moon", "Mars", "Rahu", "Jupiter", "Saturn", "Mercury"];
export const DASHA_YEARS = { Ketu: 7, Venus: 20, Sun: 6, Moon: 10, Mars: 7, Rahu: 18, Jupiter: 16, Saturn: 19, Mercury: 17 };

export const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami",
  "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi"
];

export const NITYA_YOGAS = [
  "Vishkambha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula",
  "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyana",
  "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"
];

export const VAARS = ["Ravivar", "Somvar", "Mangalvar", "Budhvar", "Guruvar", "Shukravar", "Shanivar"];

export const HOUSE_MEANINGS = [
  "Self & vitality", "Wealth & family", "Courage & siblings", "Home, mother & comfort",
  "Creativity & children", "Health & service", "Marriage & partnership", "Transformation",
  "Fortune & dharma", "Career & status", "Gains & networks", "Rest, sleep & spirituality"
];

export const DIRECTION_NAMES = {
  N: "North", NE: "North-East", E: "East", SE: "South-East",
  S: "South", SW: "South-West", W: "West", NW: "North-West", C: "Centre"
};

// Pancha-bhoota interior translation of the four sign elements
export const ELEMENT_INTERIOR = {
  Fire: {
    zone: "SE",
    palette: ["Terracotta", "Warm ochre", "Brass gold", "Saffron"],
    materials: "Brass, copper, terracotta tile, warm 2700K lighting, diyas or a fireplace",
    mood: "energising, expressive and warm"
  },
  Earth: {
    zone: "SW",
    palette: ["Sand", "Warm taupe", "Walnut brown", "Clay"],
    materials: "Natural stone, solid timber, clay plaster, low heavy furniture",
    mood: "grounded, stable and secure"
  },
  Air: {
    zone: "NW",
    palette: ["Alabaster", "Silver grey", "Powder blue", "Pale sage"],
    materials: "Sheer linen, cane & rattan, open shelving, cross-ventilation, wind chimes",
    mood: "light, social and free-flowing"
  },
  Water: {
    zone: "NE",
    palette: ["Pearl white", "Aqua", "Deep indigo", "Seafoam"],
    materials: "Curved forms, glass, a small water feature, mirrors on the North wall",
    mood: "calm, intuitive and restorative"
  }
};
