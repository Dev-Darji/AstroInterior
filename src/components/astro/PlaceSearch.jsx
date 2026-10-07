import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Loader2, Check } from 'lucide-react';
import { searchOfflineCities, searchPlaces, formatCoords } from '../../lib/geo';

const placeKey = (p) => `${p.name}|${p.latitude.toFixed(2)}|${p.longitude.toFixed(2)}`;

export default function PlaceSearch({ id, value, onChange }) {
  const [query, setQuery] = useState(value ? `${value.name}, ${value.region}` : "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [error, setError] = useState("");
  const boxRef = useRef(null);

  useEffect(() => {
    if (value || query.trim().length < 2) {
      setResults([]);
      return undefined;
    }
    const offline = searchOfflineCities(query);
    setResults(offline);
    setError("");

    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const remote = await searchPlaces(query, controller.signal);
        const seen = new Set(offline.map(placeKey));
        setResults([...offline, ...remote.filter((p) => !seen.has(placeKey(p)))].slice(0, 8));
      } catch (err) {
        if (err.name !== "AbortError" && offline.length === 0) {
          setError("Couldn't reach the place directory — try a major nearby city.");
        }
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, value]);

  useEffect(() => {
    const close = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  const select = (place) => {
    onChange(place);
    setQuery(`${place.name}, ${place.region}`);
    setOpen(false);
  };

  const handleKey = (e) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      select(results[highlight]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <input
          id={id}
          type="text"
          autoComplete="off"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls={`${id}-list`}
          placeholder="Start typing a city, e.g. Ahmedabad"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setHighlight(0);
            if (value) onChange(null);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKey}
          className="astro-input pr-10"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DEC695]">
          {loading ? <Loader2 size={16} className="animate-spin" /> : value ? <Check size={16} /> : <MapPin size={16} className="opacity-60" />}
        </span>
      </div>

      {open && results.length > 0 && (
        <ul
          id={`${id}-list`}
          role="listbox"
          className="absolute z-30 mt-2 w-full max-h-72 overflow-auto rounded-xl border border-[#DEC695]/25 bg-[#0d0d24]/95 backdrop-blur-xl shadow-2xl py-1"
        >
          {results.map((p, i) => (
            <li key={placeKey(p)} role="option" aria-selected={i === highlight}>
              <button
                type="button"
                onPointerEnter={() => setHighlight(i)}
                onClick={() => select(p)}
                className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${i === highlight ? "bg-[#DEC695]/12" : ""}`}
              >
                <MapPin size={14} className="text-[#DEC695] mt-1 shrink-0" />
                <span className="min-w-0">
                  <span className="block text-sm text-[#F5EFE2] truncate">{p.name}</span>
                  <span className="block text-[11px] text-[#E8E2D4]/50 truncate">
                    {p.region} · {formatCoords(p.latitude, p.longitude)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-[11px] text-[#F0A58A] mt-1.5">{error}</p>}
    </div>
  );
}
