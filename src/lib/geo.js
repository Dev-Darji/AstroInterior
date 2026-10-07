// Birth-place lookup and historical timezone conversion for chart casting.

const IST = "Asia/Kolkata";

// Offline list so common birth places resolve instantly and without network access
export const CITIES = [
  ["Ahmedabad", "Gujarat, India", 23.0225, 72.5714, IST],
  ["Gandhinagar", "Gujarat, India", 23.2156, 72.6369, IST],
  ["Surat", "Gujarat, India", 21.1702, 72.8311, IST],
  ["Vadodara", "Gujarat, India", 22.3072, 73.1812, IST],
  ["Rajkot", "Gujarat, India", 22.3039, 70.8022, IST],
  ["Bhavnagar", "Gujarat, India", 21.7645, 72.1519, IST],
  ["Jamnagar", "Gujarat, India", 22.4707, 70.0577, IST],
  ["Mumbai", "Maharashtra, India", 19.076, 72.8777, IST],
  ["Pune", "Maharashtra, India", 18.5204, 73.8567, IST],
  ["Nagpur", "Maharashtra, India", 21.1458, 79.0882, IST],
  ["Nashik", "Maharashtra, India", 19.9975, 73.7898, IST],
  ["New Delhi", "Delhi, India", 28.6139, 77.209, IST],
  ["Bengaluru", "Karnataka, India", 12.9716, 77.5946, IST],
  ["Mysuru", "Karnataka, India", 12.2958, 76.6394, IST],
  ["Chennai", "Tamil Nadu, India", 13.0827, 80.2707, IST],
  ["Coimbatore", "Tamil Nadu, India", 11.0168, 76.9558, IST],
  ["Madurai", "Tamil Nadu, India", 9.9252, 78.1198, IST],
  ["Hyderabad", "Telangana, India", 17.385, 78.4867, IST],
  ["Visakhapatnam", "Andhra Pradesh, India", 17.6868, 83.2185, IST],
  ["Kolkata", "West Bengal, India", 22.5726, 88.3639, IST],
  ["Jaipur", "Rajasthan, India", 26.9124, 75.7873, IST],
  ["Udaipur", "Rajasthan, India", 24.5854, 73.7125, IST],
  ["Jodhpur", "Rajasthan, India", 26.2389, 73.0243, IST],
  ["Lucknow", "Uttar Pradesh, India", 26.8467, 80.9462, IST],
  ["Kanpur", "Uttar Pradesh, India", 26.4499, 80.3319, IST],
  ["Varanasi", "Uttar Pradesh, India", 25.3176, 82.9739, IST],
  ["Indore", "Madhya Pradesh, India", 22.7196, 75.8577, IST],
  ["Bhopal", "Madhya Pradesh, India", 23.2599, 77.4126, IST],
  ["Patna", "Bihar, India", 25.5941, 85.1376, IST],
  ["Ranchi", "Jharkhand, India", 23.3441, 85.3096, IST],
  ["Raipur", "Chhattisgarh, India", 21.2514, 81.6296, IST],
  ["Bhubaneswar", "Odisha, India", 20.2961, 85.8245, IST],
  ["Guwahati", "Assam, India", 26.1445, 91.7362, IST],
  ["Chandigarh", "Chandigarh, India", 30.7333, 76.7794, IST],
  ["Amritsar", "Punjab, India", 31.634, 74.8723, IST],
  ["Dehradun", "Uttarakhand, India", 30.3165, 78.0322, IST],
  ["Srinagar", "Jammu & Kashmir, India", 34.0837, 74.7973, IST],
  ["Kochi", "Kerala, India", 9.9312, 76.2673, IST],
  ["Thiruvananthapuram", "Kerala, India", 8.5241, 76.9366, IST],
  ["Panaji", "Goa, India", 15.4909, 73.8278, IST],
  ["Kathmandu", "Nepal", 27.7172, 85.324, "Asia/Kathmandu"],
  ["Dhaka", "Bangladesh", 23.8103, 90.4125, "Asia/Dhaka"],
  ["Karachi", "Pakistan", 24.8607, 67.0011, "Asia/Karachi"],
  ["Dubai", "United Arab Emirates", 25.2048, 55.2708, "Asia/Dubai"],
  ["Singapore", "Singapore", 1.3521, 103.8198, "Asia/Singapore"],
  ["London", "United Kingdom", 51.5074, -0.1278, "Europe/London"],
  ["New York", "United States", 40.7128, -74.006, "America/New_York"],
  ["San Francisco", "United States", 37.7749, -122.4194, "America/Los_Angeles"],
  ["Toronto", "Canada", 43.6532, -79.3832, "America/Toronto"],
  ["Sydney", "Australia", -33.8688, 151.2093, "Australia/Sydney"],
  ["Nairobi", "Kenya", -1.2921, 36.8219, "Africa/Nairobi"]
].map(([name, region, latitude, longitude, timezone]) => ({ name, region, latitude, longitude, timezone }));

export function searchOfflineCities(query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return CITIES.filter((c) => c.name.toLowerCase().startsWith(q) || c.name.toLowerCase().includes(q)).slice(0, 6);
}

// Open-Meteo geocoding: free, keyless and CORS-enabled; returns IANA timezone with each place
export async function searchPlaces(query, signal) {
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query.trim())}&count=8&language=en&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(`Geocoding failed (${res.status})`);
  const data = await res.json();
  return (data.results || [])
    .filter((r) => r.timezone)
    .map((r) => ({
      name: r.name,
      region: [r.admin1, r.country].filter(Boolean).join(", "),
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone
    }));
}

function zoneOffsetMinutes(utcMs, timeZone) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).formatToParts(new Date(utcMs));
  const p = Object.fromEntries(parts.map((x) => [x.type, x.value]));
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((asUtc - utcMs) / 60000);
}

// Converts a wall-clock birth time to UTC using the zone's historical rules (DST, war time, etc.)
export function localToUtc(dateStr, timeStr, timeZone) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  const wall = Date.UTC(y, m - 1, d, hh, mm);
  let offset = zoneOffsetMinutes(wall, timeZone);
  const second = zoneOffsetMinutes(wall - offset * 60000, timeZone);
  if (second !== offset) offset = second;
  return { date: new Date(wall - offset * 60000), offsetMinutes: offset };
}

export function formatOffset(minutes) {
  const sign = minutes >= 0 ? "+" : "−";
  const abs = Math.abs(minutes);
  return `UTC${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${String(abs % 60).padStart(2, "0")}`;
}

export function formatCoords(lat, lon) {
  return `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}, ${Math.abs(lon).toFixed(2)}°${lon >= 0 ? "E" : "W"}`;
}
