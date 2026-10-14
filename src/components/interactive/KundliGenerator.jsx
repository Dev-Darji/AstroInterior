import React, { useRef, useState } from 'react';
import {
  Sparkles, Calendar, Clock, MapPin, User, MessageCircle, Pencil, Moon, Sun, Sunrise,
  Compass, Home, AlertTriangle, Info, Gem, BedDouble
} from 'lucide-react';
import PlaceSearch from '../astro/PlaceSearch';
import KundliChart from '../astro/KundliChart';
import { glyph } from '../astro/ZodiacWheel';
import { computeKundli } from '../../lib/vedicAstro';
import { buildBlueprint } from '../../lib/kundliInsights';
import { localToUtc, formatOffset, formatCoords } from '../../lib/geo';
import { SIGNS } from '../../lib/astroData';
import { getWhatsAppLink } from '../../data/siteConfig';

const DIGNITY_STYLE = {
  "Exalted": "text-[#9FD6A8] border-[#9FD6A8]/40 bg-[#9FD6A8]/10",
  "Own sign": "text-[#DEC695] border-[#DEC695]/40 bg-[#DEC695]/10",
  "Friendly sign": "text-[#E8E2D4] border-white/15 bg-white/5",
  "Neutral sign": "text-[#E8E2D4]/70 border-white/10 bg-transparent",
  "Enemy sign": "text-[#F0C08A] border-[#F0C08A]/30 bg-[#F0C08A]/5",
  "Debilitated": "text-[#F0A58A] border-[#F0A58A]/40 bg-[#F0A58A]/10"
};

const fmtMonth = (d) => d.toLocaleDateString("en-IN", { month: "short", year: "numeric" });
const fmtDate = (s) => new Date(`${s}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function SectionTitle({ icon: Icon, eyebrow, title }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-9 h-9 rounded-xl border border-[#DEC695]/30 bg-[#DEC695]/10 flex items-center justify-center text-[#DEC695] shrink-0">
        <Icon size={17} />
      </span>
      <div>
        <span className="astro-label">{eyebrow}</span>
        <h4 className="font-serif text-xl sm:text-2xl text-[#F5EFE2] leading-tight">{title}</h4>
      </div>
    </div>
  );
}

function BigThree({ icon: Icon, label, sign, detail }) {
  return (
    <div className="astro-card-glow px-2 py-3 sm:p-4 text-center min-w-0">
      <span className="astro-label flex items-center justify-center gap-1.5 !tracking-[0.12em] sm:!tracking-[0.18em]"><Icon size={12} className="hidden sm:block" />{label}</span>
      <div className="text-2xl sm:text-3xl text-[#DEC695] mt-2 leading-none">{glyph(sign.glyph)}</div>
      <p className="font-serif text-base sm:text-xl text-[#F5EFE2] mt-1 truncate">{sign.name}</p>
      <p className="text-[10px] sm:text-[11px] text-[#E8E2D4]/60 truncate">
        <span className="hidden sm:inline">{sign.sanskrit} · </span>{detail}
      </p>
    </div>
  );
}

export default function KundliGenerator() {
  const [form, setForm] = useState({ name: "", dob: "", tob: "", place: null });
  const [chartStyle, setChartStyle] = useState("north");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const resultRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.place) {
      setError("Please choose your birth place from the suggestions so we can fix its latitude, longitude and timezone.");
      return;
    }
    try {
      const { date, offsetMinutes } = localToUtc(form.dob, form.tob, form.place.timezone);
      const kundli = computeKundli({
        date,
        latitude: form.place.latitude,
        longitude: form.place.longitude,
        utcOffsetMinutes: offsetMinutes
      });
      setResult({ kundli, blueprint: buildBlueprint(kundli), offsetMinutes, input: { ...form } });
      setError("");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    } catch (err) {
      setError("We couldn't cast this chart. Please check the date and time and try again.");
    }
  };

  const k = result?.kundli;
  const bp = result?.blueprint;

  return (
    <div className="space-y-6">
      {/* ── Birth details form ── */}
      {!result ? (
        <div className="astro-panel p-5 sm:p-8 md:p-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <span className="astro-label">Janma Kundli · Lahiri Ayanamsa</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFE2] leading-tight">
                Cast your <span className="italic text-gold-gradient">Vedic birth chart</span>
              </h3>
              <p className="text-sm text-[#E8E2D4]/70 leading-relaxed">
                Planet positions are computed live from a precise astronomical ephemeris for your exact birth moment and
                place — then translated into the directions, colours and rooms that support you.
              </p>
              <ul className="space-y-2 text-[13px] text-[#E8E2D4]/75">
                {[
                  "Lagna, Rashi & Nakshatra",
                  "North & South Indian Rasi chart",
                  "Current Mahadasha & Manglik check",
                  "Simple Vastu tips for your home"
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Sparkles size={13} className="text-[#DEC695] shrink-0" />{t}
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleSubmit} className="lg:col-span-7 astro-card p-5 sm:p-7 space-y-5">
              <div>
                <label htmlFor="k-name" className="astro-label mb-2 flex items-center gap-1.5"><User size={12} />Full Name</label>
                <input id="k-name" required className="astro-input" placeholder="e.g. Ananya Patel"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="k-dob" className="astro-label mb-2 flex items-center gap-1.5"><Calendar size={12} />Date of Birth</label>
                  <input id="k-dob" type="date" required min="1900-01-01" max="2100-12-31" className="astro-input"
                    value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
                </div>
                <div>
                  <label htmlFor="k-tob" className="astro-label mb-2 flex items-center gap-1.5"><Clock size={12} />Exact Time of Birth</label>
                  <input id="k-tob" type="time" required className="astro-input"
                    value={form.tob} onChange={(e) => setForm({ ...form, tob: e.target.value })} />
                </div>
              </div>
              <div>
                <label htmlFor="k-place" className="astro-label mb-2 flex items-center gap-1.5"><MapPin size={12} />Place of Birth</label>
                <PlaceSearch id="k-place" value={form.place} onChange={(place) => setForm((f) => ({ ...f, place }))} />
                {form.place && (
                  <p className="text-[11px] text-[#E8E2D4]/55 mt-1.5">
                    {formatCoords(form.place.latitude, form.place.longitude)} · {form.place.timezone}
                  </p>
                )}
              </div>

              {error && (
                <p className="text-xs text-[#F0A58A] flex items-start gap-2"><AlertTriangle size={14} className="shrink-0 mt-0.5" />{error}</p>
              )}

              <button type="submit" className="astro-btn w-full">
                <Sparkles size={16} />Generate My Kundli
              </button>
              <p className="text-[11px] text-[#E8E2D4]/45 flex items-start gap-2">
                <Info size={13} className="shrink-0 mt-0.5" />
                Birth time accuracy matters: the Lagna moves one sign roughly every two hours. Historical timezone and war-time offsets are applied automatically.
              </p>
            </form>
          </div>
        </div>
      ) : (
        <div ref={resultRef} className="space-y-6 scroll-mt-28 astro-fade-in">
          {/* ── Header ── */}
          <div className="astro-panel p-5 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="min-w-0">
              <span className="astro-label">Janma Kundli</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F5EFE2] leading-tight truncate">{result.input.name}</h3>
              <p className="text-xs sm:text-sm text-[#E8E2D4]/65 mt-1">
                {fmtDate(result.input.dob)} · {result.input.tob} ({formatOffset(result.offsetMinutes)}) · {result.input.place.name}, {result.input.place.region}
              </p>
            </div>
            <button onClick={() => setResult(null)} className="astro-btn-ghost self-start md:self-auto shrink-0">
              <Pencil size={13} />Edit birth details
            </button>
          </div>

          {/* ── Chart + Big three ── */}
          <div className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 astro-panel p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4 gap-3">
                <span className="astro-label">Rasi Chart (D1)</span>
                <div className="flex rounded-lg border border-[#DEC695]/25 p-0.5 text-[11px]">
                  {[["north", "North"], ["south", "South"]].map(([id, label]) => (
                    <button key={id} onClick={() => setChartStyle(id)}
                      className={`px-3 py-1 rounded-md transition-colors ${chartStyle === id ? "bg-[#DEC695] text-[#161514] font-semibold" : "text-[#E8E2D4]/70 hover:text-[#F5EFE2]"}`}>
                      {label} Indian
                    </button>
                  ))}
                </div>
              </div>
              <div className="max-w-[420px] mx-auto">
                <KundliChart kundli={k} style={chartStyle} name={result.input.name} />
              </div>
              <p className="text-[10px] text-[#E8E2D4]/45 mt-3 text-center">
                Numbers mark signs (1 = Aries). <span className="text-[#F0A58A]">Coral</span> = natural malefics · <sup className="text-[#DEC695]">R</sup> = retrograde
              </p>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <BigThree icon={Sunrise} label="Lagna" sign={SIGNS[k.lagna.sign]} detail={k.lagna.degree} />
                <BigThree icon={Moon} label="Rashi" sign={SIGNS[k.moonSign]} detail={k.planets.Moon.degree} />
                <BigThree icon={Sun} label="Surya" sign={SIGNS[k.sunSign]} detail={k.planets.Sun.degree} />
              </div>

              <div className="astro-panel p-5 sm:p-6">
                <span className="astro-label">Janma Nakshatra</span>
                <div className="flex flex-wrap items-end justify-between gap-3 mt-1">
                  <p className="font-serif text-3xl text-[#F5EFE2]">
                    {k.planets.Moon.nakshatra.name} <span className="text-lg text-[#DEC695] italic">pada {k.planets.Moon.nakshatra.pada}</span>
                  </p>
                  <p className="text-xs text-[#E8E2D4]/65">
                    Lord <strong className="text-[#F5EFE2]">{k.planets.Moon.nakshatra.lord}</strong> · Deity <strong className="text-[#F5EFE2]">{k.planets.Moon.nakshatra.deity}</strong>
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {[
                    ["Vaar", k.panchang.vaar],
                    ["Tithi", k.panchang.tithi]
                  ].map(([label, value]) => (
                    <div key={label} className="astro-card p-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#E8E2D4]/50">{label}</span>
                      <p className="text-sm text-[#F5EFE2] mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Current dasha & Manglik */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="astro-panel p-5 sm:p-6">
                  <span className="astro-label">Current Dasha</span>
                  {k.dasha.current ? (
                    <>
                      <p className="font-serif text-2xl text-[#F5EFE2] mt-1">
                        {k.dasha.current.lord} <span className="text-[#DEC695] italic">Mahadasha</span>
                      </p>
                      <p className="text-xs text-[#E8E2D4]/60 mt-1">Until {fmtMonth(k.dasha.current.end)}</p>
                    </>
                  ) : (
                    <p className="text-sm text-[#E8E2D4]/70 mt-1">Dasha cycle begins at birth.</p>
                  )}
                </div>
                <div className="astro-panel p-5 sm:p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="astro-label">Manglik Dosha</span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full border ${k.manglik.fromLagna || k.manglik.fromMoon ? DIGNITY_STYLE.Debilitated : DIGNITY_STYLE.Exalted}`}>
                      {k.manglik.fromLagna && k.manglik.fromMoon ? "Present" : k.manglik.fromLagna || k.manglik.fromMoon ? "Partial" : "Not present"}
                    </span>
                  </div>
                  <p className="text-xs text-[#E8E2D4]/60 mt-2 leading-relaxed">
                    Mars is in house {k.manglik.marsHouseLagna} of your chart. Confirm with an astrologer before any decision.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Vastu & interior blueprint ── */}
          <div className="astro-panel p-5 sm:p-8">
            <SectionTitle icon={Home} eyebrow="Astro × Vastu" title="Simple home tips for you" />
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="astro-card-glow p-5">
                <span className="astro-label flex items-center gap-1.5"><Compass size={12} />Power direction</span>
                <p className="font-serif text-2xl text-[#F5EFE2] mt-1">{bp.power.directionName}</p>
                <p className="text-xs text-[#E8E2D4]/75 mt-3 leading-relaxed">{bp.power.tip} Face this direction at your desk.</p>
              </div>

              <div className="astro-card p-5">
                <span className="astro-label flex items-center gap-1.5"><BedDouble size={12} />Bedroom · Moon in {bp.bedroom.sign.name}</span>
                <p className="text-xs text-[#E8E2D4]/75 mt-2 leading-relaxed">
                  Your Moon governs rest and the mind. A {bp.bedroom.element.toLowerCase()}-toned bedroom feels {bp.bedroom.mood}.
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {bp.bedroom.palette.map((c) => <span key={c} className="text-[11px] px-2 py-0.5 rounded-md border border-white/15 text-[#F5EFE2]">{c}</span>)}
                </div>
              </div>

              <div className="astro-card p-5">
                <span className="astro-label flex items-center gap-1.5"><Gem size={12} />Lagna lord essentials</span>
                <dl className="mt-3 space-y-2 text-xs">
                  {[["Gemstone", bp.lucky.gem], ["Colours", bp.lucky.color], ["Day", bp.lucky.day], ["Metal", bp.lucky.metal]].map(([t, v]) => (
                    <div key={t} className="flex justify-between gap-3">
                      <dt className="text-[#E8E2D4]/55">{t}</dt>
                      <dd className="text-[#F5EFE2] text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="text-[10.5px] text-[#E8E2D4]/45 mt-3">Consult an astrologer before wearing any gemstone.</p>
              </div>
            </div>
          </div>

          {/* ── CTA ── */}
          <div className="astro-panel p-5 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <p className="text-sm text-[#E8E2D4]/75 max-w-xl">
              Want divisional charts, dasha predictions and a room-by-room Vastu plan built on this Kundli? Our astrologer and
              design team can take it further in a 1-on-1 session.
            </p>
            <a
              href={getWhatsAppLink(`Hello! I generated my Kundli on your site: Lagna ${SIGNS[k.lagna.sign].name}, Moon ${SIGNS[k.moonSign].name} (${k.planets.Moon.nakshatra.name}), running ${k.dasha.current?.lord ?? ""} Mahadasha. I'd like a full astrology & Vastu consultation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="astro-btn w-full md:w-auto shrink-0"
            >
              <MessageCircle size={16} />Book a full reading
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
