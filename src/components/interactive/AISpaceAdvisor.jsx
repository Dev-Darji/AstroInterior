import React, { useRef, useState } from 'react';
import { Sparkles, Wand2, Palette, Lightbulb, Compass, MessageCircle, Pencil, CheckCircle2, AlertTriangle, Star, Calendar } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';
import { PLANETS, DIRECTION_NAMES } from '../../lib/astroData';
import { reduce, NUMBER_PLANET } from '../../lib/numerology';

const UNSPLASH = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

const ROOMS = {
  living: {
    name: "Living Room", noun: "Salon", weeks: [6, 10],
    image: UNSPLASH("photo-1600210492486-724fe5c67fb0"),
    ideal: ["N", "NE", "E"], good: ["NW", "W"],
    lighting: "Layered 2700–3000K cove light with a sculptural pendant over the coffee table; keep the brightest light in the North-East.",
    tips: [
      "Heavy sofas along the South and West walls so the family faces North or East.",
      "Keep the centre (Brahmasthan) open — a low, light coffee table only.",
      "TV unit on the South-East or West wall; no heavy beams over seating."
    ],
    caution: "Keep the North-East corner of the room light and open, seat the head of the family in its South-West, and use warm uplighting to lift the energy."
  },
  master: {
    name: "Master Bedroom", noun: "Suite", weeks: [7, 10],
    image: UNSPLASH("photo-1616594039964-ae9021a400a0"),
    ideal: ["SW"], good: ["S", "W"],
    lighting: "Dim-to-warm downlights (3000K → 2200K) and low bedside drops to support melatonin; no harsh overhead light above the bed.",
    tips: [
      "Headboard to the South (or East); never sleep with your head to the North.",
      "Full-height wardrobes on the South or West wall for grounding.",
      "No mirror reflecting the bed; keep electronics away from the headboard."
    ],
    caution: "Place the bed in the room's own South-West quadrant, use heavy solid-wood furniture and earthy tones, and avoid water features or plants with water in the room."
  },
  kitchen: {
    name: "Kitchen", noun: "Kitchen", weeks: [6, 9],
    image: UNSPLASH("photo-1556911220-e15b29be8c8f"),
    ideal: ["SE"], good: ["NW"],
    lighting: "Bright 4000K task lighting under cabinets with warm ambient cove light — Agni loves a well-lit kitchen.",
    tips: [
      "Cook facing East with the hob in the South-East corner.",
      "Sink in the North-East of the counter, at least an arm's length from the hob.",
      "Refrigerator and tall storage on the South or West walls."
    ],
    caution: "If the kitchen can't move, shift the cooktop to the kitchen's own South-East corner, cook facing East, and keep sink and stove on separate counters."
  },
  pooja: {
    name: "Pooja Room", noun: "Mandir", weeks: [3, 6],
    image: UNSPLASH("photo-1593811167562-9cef47bfc4d7"),
    ideal: ["NE"], good: ["E", "N"],
    lighting: "Soft 2700K halo light behind a jaali or the deity niche; a single warm spotlight, never glare.",
    tips: [
      "Face East or North while praying; deities raised slightly above floor level.",
      "No storage clutter, no shared wall with a toilet, never under a staircase.",
      "White marble, brass and wood — keep it the lightest-feeling room in the home."
    ],
    caution: "Use a raised wall-mounted mandir on the East or North wall of the room, keep it spotless, and add a brass diya and copper water vessel."
  },
  study: {
    name: "Study / Home Office", noun: "Study", weeks: [4, 7],
    image: UNSPLASH("photo-1524758631624-e2822e304c36"),
    ideal: ["W", "NE"], good: ["N", "E"],
    lighting: "Anti-glare 4000K task lighting at the desk with warm perimeter light to avoid eye fatigue.",
    tips: [
      "Sit facing North or East with a solid wall behind you.",
      "Bookshelves on the South or West wall; keep the North-East uncluttered.",
      "Hide cables and keep the desk surface clear — Mercury loves order."
    ],
    caution: "Turn the desk so you face North or East, place a solid backrest wall behind you and add a green plant in the room's North."
  },
  kids: {
    name: "Kids' Bedroom", noun: "Nest", weeks: [4, 7],
    image: UNSPLASH("photo-1615874959474-d609969a20ed"),
    ideal: ["W", "NW"], good: ["E", "N"],
    lighting: "Warm dimmable night light plus a 4000K study lamp; avoid cool blue light near bedtime.",
    tips: [
      "Head towards East while sleeping for focus and healthy growth.",
      "Study table facing East or North; display achievements on the South wall.",
      "Soft rounded furniture and open floor in the centre for play."
    ],
    caution: "Keep the room light and airy, set the bed head to the East, and avoid heavy dark furniture that belongs to the parents' South-West zone."
  }
};

const STYLES = {
  luxury: {
    name: "Modern Luxury", adjective: "Travertine & Brass",
    palette: ["Honed travertine", "Champagne velvet", "Smoked walnut", "Brushed bronze"],
    mood: "sculptural, layered and quietly opulent",
    tiers: {
      essential: "Travertine-look porcelain, walnut veneer, velvet-finish fabrics, PVD brass hardware",
      premium: "Honed travertine slabs, solid walnut, Italian velvet, linear brass detailing",
      luxe: "Book-matched natural stone, bespoke walnut joinery, silk-velvet upholstery, custom bronze castings"
    }
  },
  indian: {
    name: "Contemporary Indian", adjective: "Teak & Terracotta",
    palette: ["Terracotta lime wash", "Burma teak", "Handspun linen", "Aged brass"],
    mood: "warm, crafted and rooted",
    tiers: {
      essential: "Lime-wash paint, teak-finish laminates, handloom cotton, cast-brass accents",
      premium: "Solid teak joinery, handmade terracotta tile, block-printed linens, artisan brass",
      luxe: "Reclaimed heritage teak, hand-carved jaali, Kota stone, bespoke Moradabad brass"
    }
  },
  minimal: {
    name: "Warm Minimal", adjective: "Sandstone & Linen",
    palette: ["Bone plaster", "Ash wood", "Natural jute", "Muted sage"],
    mood: "calm, uncluttered and tactile",
    tiers: {
      essential: "Textured matte paint, ash laminates, jute rugs, cotton-linen blends",
      premium: "Mineral plaster, solid ash, micro-cement, Belgian linen",
      luxe: "Lime tadelakt, custom ash joinery, honed limestone, hand-loomed linen"
    }
  },
  heritage: {
    name: "Royal Heritage", adjective: "Jaali & Marble",
    palette: ["Makrana white", "Deep emerald", "Antique gold", "Rosewood"],
    mood: "regal, ornate and celebratory",
    tiers: {
      essential: "Marble-look surfaces, emerald accent paint, gold-finish trims, carved MDF jaali",
      premium: "Makrana marble, rosewood furniture, silk cushions, brass-inlay detailing",
      luxe: "Pietra dura inlay, hand-carved rosewood, zardozi textiles, gilded ceilings"
    }
  }
};

const BUDGETS = [
  { label: "Under ₹5 Lakh", tier: "essential", factor: 0.8 },
  { label: "₹5–10 Lakh", tier: "essential", factor: 0.9 },
  { label: "₹10–20 Lakh", tier: "premium", factor: 1 },
  { label: "₹20–40 Lakh", tier: "premium", factor: 1.15 },
  { label: "₹40 Lakh+", tier: "luxe", factor: 1.35 }
];

const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function vastuVerdict(room, dir) {
  if (!dir) return null;
  if (room.ideal.includes(dir)) return { level: "ideal", label: "Ideal placement", text: `The ${DIRECTION_NAMES[dir]} is the classical Vastu zone for a ${room.name.toLowerCase()}.` };
  if (room.good.includes(dir)) return { level: "good", label: "Acceptable", text: `The ${DIRECTION_NAMES[dir]} works well; the ideal zone is the ${room.ideal.map((d) => DIRECTION_NAMES[d]).join(" or ")}.` };
  return { level: "caution", label: "Needs balancing", text: `A ${room.name.toLowerCase()} in the ${DIRECTION_NAMES[dir]} isn't ideal (best: ${room.ideal.map((d) => DIRECTION_NAMES[d]).join(" or ")}). ${room.caution}` };
}

const VERDICT_STYLE = {
  ideal: { icon: CheckCircle2, cls: "border-[#9FD6A8]/40 bg-[#9FD6A8]/10 text-[#9FD6A8]" },
  good: { icon: CheckCircle2, cls: "border-[#DEC695]/40 bg-[#DEC695]/10 text-[#DEC695]" },
  caution: { icon: AlertTriangle, cls: "border-[#F0A58A]/40 bg-[#F0A58A]/10 text-[#F0A58A]" }
};

function ChipGroup({ label, options, value, onChange, cols }) {
  return (
    <div>
      <span className="astro-label mb-2.5">{label}</span>
      <div className={`grid ${cols} gap-2`}>
        {options.map(([v, text]) => (
          <button type="button" key={v} data-active={value === v} onClick={() => onChange(v)} className="astro-chip px-3 py-2.5 text-xs font-medium">
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AISpaceAdvisor() {
  const [form, setForm] = useState({ room: "living", style: "luxury", budget: 2, direction: "", dob: "" });
  const [concept, setConcept] = useState(null);
  const resultRef = useRef(null);
  const set = (key) => (v) => setForm((f) => ({ ...f, [key]: v }));

  const handleGenerate = (e) => {
    e.preventDefault();
    const room = ROOMS[form.room];
    const style = STYLES[form.style];
    const budget = BUDGETS[form.budget];
    const ruler = form.dob ? NUMBER_PLANET[reduce(Number(form.dob.split("-")[2]))] : null;

    setConcept({
      room, style, budget, ruler,
      direction: form.direction,
      title: `The ${style.adjective} ${room.noun}`,
      materials: style.tiers[budget.tier],
      weeks: room.weeks.map((w) => Math.round(w * budget.factor)),
      verdict: vastuVerdict(room, form.direction)
    });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  if (!concept) {
    return (
      <form onSubmit={handleGenerate} className="astro-panel p-5 sm:p-8 md:p-10 space-y-7">
        <div className="text-center max-w-2xl mx-auto">
          <span className="astro-label">Space Concept Advisor</span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFE2] mt-1">
            Design a room <span className="italic text-gold-gradient">in tune with you</span>
          </h3>
          <p className="text-sm text-[#E8E2D4]/65 mt-2">Pick a room, its direction and your style — we check it against Vastu and tune the palette to your ruling planet.</p>
        </div>

        <ChipGroup label="1 · Room" cols="grid-cols-2 sm:grid-cols-3" value={form.room} onChange={set("room")}
          options={Object.entries(ROOMS).map(([k, r]) => [k, r.name])} />

        <div>
          <span className="astro-label mb-2.5">2 · Which zone of the home is it in?</span>
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
            {[["", "Not sure"], ...DIRECTIONS.map((d) => [d, d])].map(([v, text]) => (
              <button type="button" key={v || "unknown"} data-active={form.direction === v} onClick={() => set("direction")(v)}
                className={`astro-chip py-2.5 text-xs font-medium ${v ? "" : "col-span-3 sm:col-span-1"}`} title={v ? DIRECTION_NAMES[v] : "Skip the Vastu check"}>
                {text}
              </button>
            ))}
          </div>
        </div>

        <ChipGroup label="3 · Style" cols="grid-cols-2 sm:grid-cols-4" value={form.style} onChange={set("style")}
          options={Object.entries(STYLES).map(([k, s]) => [k, s.name])} />

        <ChipGroup label="4 · Budget for this room" cols="grid-cols-2 sm:grid-cols-5" value={form.budget} onChange={set("budget")}
          options={BUDGETS.map((b, i) => [i, b.label])} />

        <div>
          <label htmlFor="adv-dob" className="astro-label mb-2.5 flex items-center gap-1.5"><Calendar size={12} />5 · Date of birth (optional — personalises colours)</label>
          <input id="adv-dob" type="date" min="1900-01-01" max="2100-12-31" className="astro-input sm:max-w-xs" value={form.dob} onChange={(e) => set("dob")(e.target.value)} />
        </div>

        <button type="submit" className="astro-btn w-full"><Wand2 size={16} />Generate My Concept</button>
      </form>
    );
  }

  const c = concept;
  const planet = c.ruler ? PLANETS[c.ruler] : null;
  const VerdictIcon = c.verdict ? VERDICT_STYLE[c.verdict.level].icon : null;

  return (
    <div ref={resultRef} className="astro-panel overflow-hidden scroll-mt-28 astro-fade-in">
      <div className="relative aspect-[16/10] sm:aspect-[21/9]">
        <img src={c.room.image} alt={`${c.room.name} reference`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d24] via-[#0d0d24]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#DEC695] text-[#161514] font-semibold">{c.style.name}</span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-white/25 text-[#F5EFE2]">{c.budget.label}</span>
            </div>
            <h4 className="font-serif text-3xl sm:text-5xl text-[#F5EFE2] leading-tight">{c.title}</h4>
            <p className="text-xs sm:text-sm text-[#E8E2D4]/75 mt-1">{c.room.name} · {c.style.mood} · {c.weeks[0]}–{c.weeks[1]} weeks</p>
          </div>
          <button onClick={() => setConcept(null)} className="astro-btn-ghost self-start sm:self-auto bg-[#0d0d24]/60"><Pencil size={13} />New concept</button>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-5">
        {c.verdict && (
          <div className={`rounded-xl border p-4 flex gap-3 ${VERDICT_STYLE[c.verdict.level].cls}`}>
            <VerdictIcon size={18} className="shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold">Vastu check · {c.verdict.label}</p>
              <p className="text-xs text-[#E8E2D4]/80 mt-1 leading-relaxed">{c.verdict.text}</p>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="astro-card p-5">
            <span className="astro-label flex items-center gap-1.5"><Palette size={12} />Palette & materials</span>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {c.style.palette.map((p) => <span key={p} className="text-[11px] px-2 py-0.5 rounded-md border border-white/15 text-[#F5EFE2]">{p}</span>)}
              {planet && <span className="text-[11px] px-2 py-0.5 rounded-md border border-[#DEC695]/50 text-[#DEC695]">Accent: {planet.color}</span>}
            </div>
            <p className="text-xs text-[#E8E2D4]/70 mt-3 leading-relaxed"><strong className="text-[#F5EFE2]">Spec for your budget:</strong> {c.materials}.</p>
          </div>
          <div className="astro-card p-5">
            <span className="astro-label flex items-center gap-1.5"><Lightbulb size={12} />Lighting</span>
            <p className="text-xs text-[#E8E2D4]/75 mt-3 leading-relaxed">{c.room.lighting}</p>
          </div>
        </div>

        <div className="astro-card p-5">
          <span className="astro-label flex items-center gap-1.5"><Compass size={12} />Vastu layout essentials</span>
          <ul className="mt-3 space-y-2">
            {c.room.tips.map((t) => (
              <li key={t} className="text-xs text-[#E8E2D4]/75 flex gap-2 leading-relaxed">
                <Sparkles size={12} className="text-[#DEC695] shrink-0 mt-0.5" />{t}
              </li>
            ))}
          </ul>
        </div>

        {planet && (
          <div className="astro-card-glow p-5">
            <span className="astro-label flex items-center gap-1.5"><Star size={12} />Personal touch · ruled by {c.ruler}</span>
            <p className="text-xs text-[#E8E2D4]/80 mt-2 leading-relaxed">
              Your birth day vibrates with {c.ruler} ({planet.sanskrit}). Weave {planet.color.toLowerCase()} into cushions, art or hardware.
              {planet.direction && c.direction === planet.direction && ` This room sits in ${c.ruler}'s own ${DIRECTION_NAMES[planet.direction]} zone — an especially supportive space for you.`}
            </p>
          </div>
        )}

        <div className="pt-2 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-white/10">
          <p className="text-xs text-[#E8E2D4]/60 pt-4 md:pt-0 max-w-lg">Concept guidance only — full 3D design, measured drawings and a detailed BOQ follow on project onboarding.</p>
          <a
            href={getWhatsAppLink(`Hello! I created a concept "${c.title}" for my ${c.room.name}${c.direction ? ` (${DIRECTION_NAMES[c.direction]} zone)` : ""} in ${c.style.name}, budget ${c.budget.label}. I'd like to discuss it.`)}
            target="_blank" rel="noopener noreferrer" className="astro-btn w-full md:w-auto mt-0 md:mt-4"
          >
            <MessageCircle size={16} />Share with the studio
          </a>
        </div>
      </div>
    </div>
  );
}
