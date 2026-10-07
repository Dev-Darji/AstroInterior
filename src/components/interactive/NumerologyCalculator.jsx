import React, { useRef, useState } from 'react';
import { Sparkles, MessageCircle, Pencil, Home, Compass, Info, User, Calendar, CalendarClock, Gem } from 'lucide-react';
import { getWhatsAppLink } from '../../data/siteConfig';
import { PLANETS, DIRECTION_NAMES } from '../../lib/astroData';
import {
  computeNumerology, NUMBER_PROFILE, NUMBER_PLANET, LO_SHU_LAYOUT, LO_SHU_DIRECTION,
  MISSING_REMEDY, PERSONAL_YEAR_THEME, KUA_DIRECTIONS, KUA_LABELS
} from '../../lib/numerology';

const HARMONY = {
  excellent: { label: "Excellent", cls: "text-[#9FD6A8] border-[#9FD6A8]/40 bg-[#9FD6A8]/10" },
  good: { label: "Supportive", cls: "text-[#DEC695] border-[#DEC695]/40 bg-[#DEC695]/10" },
  neutral: { label: "Neutral", cls: "text-[#E8E2D4]/80 border-white/15 bg-white/5" },
  challenging: { label: "Challenging", cls: "text-[#F0A58A] border-[#F0A58A]/40 bg-[#F0A58A]/10" }
};

function Medallion({ label, value, sub, ruler, featured }) {
  return (
    <div className={`${featured ? "astro-card-glow" : "astro-card"} p-5 text-center`}>
      <span className="astro-label">{label}</span>
      <div className="relative w-24 h-24 mx-auto my-3 flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full" aria-hidden="true">
          <circle cx="50" cy="50" r="47" fill="none" stroke="#DEC695" strokeWidth="0.8" opacity="0.5" />
          <circle cx="50" cy="50" r="40" fill="none" stroke="#DEC695" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.5" />
        </svg>
        <span className="font-serif text-5xl text-gold-gradient leading-none">{value ?? "–"}</span>
      </div>
      <p className="text-xs text-[#F5EFE2]">{ruler}</p>
      <p className="text-[11px] text-[#E8E2D4]/55 mt-0.5">{sub}</p>
    </div>
  );
}

export default function NumerologyCalculator() {
  const [form, setForm] = useState({ name: "", dob: "", kua: "" });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.dob) return;
    setResult({ ...computeNumerology({ name: form.name, dob: form.dob, kuaFormula: form.kua || null }), name: form.name });
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };

  if (!result) {
    return (
      <div className="astro-panel p-5 sm:p-8 md:p-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="astro-label">Ank Jyotish · Chaldean System</span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFE2] leading-tight">
              Decode the <span className="italic text-gold-gradient">numbers you were born with</span>
            </h3>
            <p className="text-sm text-[#E8E2D4]/70 leading-relaxed">
              Indian numerology links every number to a graha. We compute your Mulank, Bhagyank and Chaldean name number,
              map your birth date onto the Lo Shu grid and translate it into directions and design choices for your home.
            </p>
            <div className="grid grid-cols-3 gap-2 max-w-sm">
              {LO_SHU_LAYOUT.flat().map((n) => (
                <div key={n} className="aspect-square rounded-lg border border-[#DEC695]/20 flex items-center justify-center font-serif text-2xl text-[#DEC695]/70">
                  {n}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="lg:col-span-7 astro-card p-5 sm:p-7 space-y-5">
            <div>
              <label htmlFor="n-name" className="astro-label mb-2 flex items-center gap-1.5"><User size={12} />Name you use daily</label>
              <input id="n-name" required className="astro-input" placeholder="e.g. Ananya Patel"
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <p className="text-[11px] text-[#E8E2D4]/45 mt-1.5">Your Naamank vibrates through the name you sign and are called by.</p>
            </div>
            <div>
              <label htmlFor="n-dob" className="astro-label mb-2 flex items-center gap-1.5"><Calendar size={12} />Date of Birth</label>
              <input id="n-dob" type="date" required min="1900-01-01" max="2100-12-31" className="astro-input"
                value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
            </div>
            <div>
              <span className="astro-label mb-2 flex items-center gap-1.5"><Compass size={12} />Kua directions (optional)</span>
              <div className="grid grid-cols-3 gap-2">
                {[["", "Skip"], ["male", "Male formula"], ["female", "Female formula"]].map(([v, label]) => (
                  <button type="button" key={v || "skip"} data-active={form.kua === v} onClick={() => setForm({ ...form, kua: v })}
                    className="astro-chip px-2 py-2.5 text-xs">
                    {label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-[#E8E2D4]/45 mt-1.5">The traditional Kua calculation differs by gender and reveals your four best directions for sleeping and working.</p>
            </div>
            <button type="submit" className="astro-btn w-full"><Sparkles size={16} />Reveal My Numbers</button>
          </form>
        </div>
      </div>
    );
  }

  const r = result;
  const profile = NUMBER_PROFILE[r.mulank];
  const planet = PLANETS[r.ruler];

  return (
    <div ref={resultRef} className="space-y-6 scroll-mt-28 astro-fade-in">
      <div className="astro-panel p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="astro-label">Numerology Profile</span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFE2] leading-tight truncate">{r.name}</h3>
          <p className="text-sm text-[#E8E2D4]/65 mt-1">Mulank {r.mulank} · {profile.title} · {profile.keywords}</p>
        </div>
        <button onClick={() => setResult(null)} className="astro-btn-ghost self-start md:self-auto shrink-0"><Pencil size={13} />Edit details</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Medallion featured label="Mulank · Root" value={r.mulank} ruler={`${r.ruler} (${PLANETS[r.ruler].sanskrit})`} sub="Your personality & instincts" />
        <Medallion label="Bhagyank · Destiny" value={r.bhagyank} ruler={`${r.destinyRuler} (${PLANETS[r.destinyRuler].sanskrit})`} sub={`Life path · compound ${r.bhagyankCompound}`} />
        <Medallion label="Naamank · Name" value={r.naamank} ruler={r.naamank ? `${NUMBER_PLANET[r.naamank]}` : "Add a name"} sub={r.naamank ? `Chaldean compound ${r.naamCompound}` : ""} />
      </div>

      {/* Harmony */}
      <div className="astro-panel p-5 sm:p-7">
        <span className="astro-label">Number Harmony</span>
        <div className="grid sm:grid-cols-3 gap-3 mt-4">
          {[
            ["Mulank ↔ Bhagyank", r.mulankBhagyank],
            ["Name ↔ Mulank", r.nameHarmony?.withMulank],
            ["Name ↔ Bhagyank", r.nameHarmony?.withBhagyank]
          ].filter(([, v]) => v).map(([label, v]) => (
            <div key={label} className="astro-card p-4 flex items-center justify-between gap-3">
              <span className="text-sm text-[#F5EFE2]">{label}</span>
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${HARMONY[v].cls}`}>{HARMONY[v].label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#E8E2D4]/65 mt-4 leading-relaxed">
          Harmony follows the natural friendships of the ruling grahas.
          {r.nameHarmony && (r.nameHarmony.withMulank === "challenging" || r.nameHarmony.withBhagyank === "challenging")
            ? ` Your name number clashes with your birth numbers — a spelling adjustment towards ${r.luckyNumbers.join(", ")} is traditionally recommended.`
            : " Your name supports your birth numbers — no spelling correction is needed."}
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Lo Shu grid */}
        <div className="lg:col-span-6 astro-panel p-5 sm:p-7">
          <span className="astro-label">Lo Shu Grid · Vastu Mapping</span>
          <div className="grid grid-cols-3 gap-2 mt-4 max-w-sm mx-auto">
            {LO_SHU_LAYOUT.flat().map((n) => {
              const count = r.loShu.counts[n];
              return (
                <div key={n} className={`aspect-square rounded-xl border flex flex-col items-center justify-center ${count ? "border-[#DEC695]/50 bg-[#DEC695]/10" : "border-dashed border-white/15"}`}>
                  <span className={`font-serif text-2xl sm:text-3xl leading-none ${count ? "text-[#F5EFE2]" : "text-[#E8E2D4]/20"}`}>
                    {count ? String(n).repeat(Math.min(count, 4)) : n}
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#DEC695]/70 mt-1">{LO_SHU_DIRECTION[n] === "C" ? "Centre" : LO_SHU_DIRECTION[n]}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[10.5px] text-[#E8E2D4]/45 mt-3 text-center">
            Includes birth digits + Bhagyank{r.loShu.extras.length > 1 ? ", Mulank" : ""}{r.kua ? " + Kua" : ""}. South at top, as in the traditional Lo Shu.
          </p>
          {r.loShu.planes.length > 0 && (
            <div className="mt-5">
              <span className="text-[10px] uppercase tracking-wider text-[#E8E2D4]/50">Completed planes</span>
              <ul className="mt-2 space-y-1.5">
                {r.loShu.planes.map((p) => (
                  <li key={p.name} className="text-xs text-[#E8E2D4]/75"><strong className="text-[#DEC695]">{p.name}</strong> — {p.text}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-6 astro-panel p-5 sm:p-7">
          <span className="astro-label">Missing numbers → Vastu remedies</span>
          {r.loShu.missing.length ? (
            <ul className="mt-4 space-y-3">
              {r.loShu.missing.map((n) => (
                <li key={n} className="astro-card p-3.5 flex gap-3">
                  <span className="w-9 h-9 shrink-0 rounded-lg border border-[#F0A58A]/40 text-[#F0A58A] font-serif text-xl flex items-center justify-center">{n}</span>
                  <p className="text-xs text-[#E8E2D4]/75 leading-relaxed">{MISSING_REMEDY[n]}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#E8E2D4]/70 mt-4">A complete grid — every number is present. Rare and well balanced.</p>
          )}
        </div>
      </div>

      {/* Kua */}
      {r.kua && (
        <div className="astro-panel p-5 sm:p-7">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <span className="astro-label">Kua Number {r.kua}</span>
              <h4 className="font-serif text-2xl text-[#F5EFE2]">{[1, 3, 4, 9].includes(r.kua) ? "East" : "West"} group directions</h4>
            </div>
            <p className="text-xs text-[#E8E2D4]/55 max-w-sm">Point your bed headboard to the Health direction and face the Success direction while working.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-5">
            {KUA_DIRECTIONS[r.kua].good.map((d, i) => (
              <div key={d} className={`${i === 0 ? "astro-card-glow" : "astro-card"} p-4`}>
                <span className="text-[10px] uppercase tracking-wider text-[#E8E2D4]/55">{KUA_LABELS[i]}</span>
                <p className="font-serif text-xl text-[#F5EFE2] mt-1">{DIRECTION_NAMES[d]}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#E8E2D4]/55 mt-4">
            Directions to avoid facing: <span className="text-[#F0A58A]">{KUA_DIRECTIONS[r.kua].bad.map((d) => DIRECTION_NAMES[d]).join(" · ")}</span>
          </p>
        </div>
      )}

      {/* Space profile */}
      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 astro-panel p-5 sm:p-7">
          <span className="astro-label flex items-center gap-1.5"><Home size={12} />Your space · Mulank {r.mulank}</span>
          <h4 className="font-serif text-2xl text-[#F5EFE2] mt-1">{profile.title}'s home</h4>
          <p className="text-sm text-[#E8E2D4]/75 mt-3 leading-relaxed">{profile.spatial}</p>
          <p className="text-xs text-[#E8E2D4]/60 mt-3"><strong className="text-[#F5EFE2]">Materials:</strong> {profile.materials}</p>
          {planet.direction && (
            <p className="text-xs text-[#E8E2D4]/60 mt-2">
              <strong className="text-[#F5EFE2]">Activate the {DIRECTION_NAMES[planet.direction]}:</strong> {planet.interior}
            </p>
          )}
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="astro-panel p-5 sm:p-7">
            <span className="astro-label flex items-center gap-1.5"><Gem size={12} />Lucky for you</span>
            <dl className="mt-3 space-y-2 text-xs">
              {[
                ["Numbers", r.luckyNumbers.join(", ")],
                ["Colours", planet.color],
                ["Day", planet.day],
                ["Gemstone", planet.gem]
              ].map(([t, v]) => (
                <div key={t} className="flex justify-between gap-3">
                  <dt className="text-[#E8E2D4]/55">{t}</dt>
                  <dd className="text-[#F5EFE2] text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="astro-panel p-5 sm:p-7">
            <span className="astro-label flex items-center gap-1.5"><CalendarClock size={12} />Personal year {new Date().getFullYear()}</span>
            <p className="font-serif text-4xl text-gold-gradient mt-1">{r.personalYear}</p>
            <p className="text-xs text-[#E8E2D4]/70 mt-1">{PERSONAL_YEAR_THEME[r.personalYear]}</p>
          </div>
        </div>
      </div>

      <div className="astro-panel p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-[#E8E2D4]/75 max-w-xl flex items-start gap-2">
          <Info size={15} className="text-[#DEC695] shrink-0 mt-0.5" />
          Name corrections, business-name and house-number analysis are part of a full numerology consultation.
        </p>
        <a
          href={getWhatsAppLink(`Hello! My Mulank is ${r.mulank}, Bhagyank ${r.bhagyank} and Name number ${r.naamank ?? "-"}. I'd like a numerology & home consultation.`)}
          target="_blank" rel="noopener noreferrer" className="astro-btn w-full md:w-auto shrink-0"
        >
          <MessageCircle size={16} />Discuss my numbers
        </a>
      </div>
    </div>
  );
}
