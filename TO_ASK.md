# TO ASK — Client Questions & Where to Apply the Answers

This website belongs to **Jinisha Parmar** (Vastu Consultant · Astrologer · Numerologist · Interior Designer,
Kandivali West, Mumbai). Everything printed on her visiting card is already on the site. The questions below cover
details that were **not on the card**, so the site currently uses a placeholder or assumption for each one.

The site owner will collect the client's answers and hand them, together with this file, to an AI assistant (or a
developer). For every question this file gives the current value, a space for the answer, and the exact files to
change.

---

## Part 1 — Instructions for the AI applying the answers

**Project:** Vite + React 18 + Tailwind CSS v4, frontend only (no backend, no database). Hash-based routing in
`src/App.jsx`. Run `npm install` once, `npm run dev` to preview, `npm run build` to verify.

**Rules**

1. **Use only what the client actually answered.** Don't invent stats, prices, qualifications, project stories or
   testimonials. If an answer is missing or unclear, leave that item unchanged and say so.
2. **Find code by the search strings given here, not by line numbers.** Line numbers drift; the quoted strings are
   exact text from the code at the time of writing. Search with `grep -rn "<string>" src index.html`.
3. **Change `src/data/siteConfig.js` first.** It is the single source for contact details, and most components read
   from it. Then fix the hard-coded copies listed under each question. Several values are also repeated in
   `index.html` (SEO tags + JSON-LD structured data), which cannot import `siteConfig.js`, so update those by hand.
4. **After all edits:** run `npm run build` (must pass), then run `grep` for the old value to confirm no copy was
   missed. Finally, tick the item in the status table at the end of this file.
5. **Never commit** `1795087738374.jpg` (the visiting card, which holds her personal phone numbers and email). It is
   already in `.gitignore`.

**Key files at a glance**

| What | File |
|---|---|
| Contact details, brand, areas, hours, social links | `src/data/siteConfig.js` |
| SEO title/description, canonical URL, Google business data (JSON-LD) | `index.html` |
| Services and astrology session details | `src/data/services.js` |
| FAQs | `src/data/faqs.js` |
| Testimonials (section hidden while empty) | `src/data/testimonials.js` |
| Portfolio / "Design Concepts" | `src/data/projects.js`, images in `public/images/` |
| Insights articles | `src/data/insights.js`, `src/views/InsightsView.jsx` |
| Homepage | `src/views/HomeView.jsx` |
| About page (route `#about`) | `src/views/VastuInteriorsView.jsx` |
| Contact / Consultation pages | `src/views/ContactView.jsx`, `src/views/ConsultationView.jsx` |
| Footer, navbar, logo | `src/components/layout/Footer.jsx`, `src/components/layout/Navbar.jsx`, `src/components/ui/AstroLogo.jsx` |
| Kundli / numerology tip texts | `src/lib/kundliInsights.js`, `src/lib/numerology.js`, `src/lib/astroData.js` |

---

## Part 2 — The questions

### 🔴 Must confirm before launch

#### Q1. Which phone number is on WhatsApp?

- **Current:** `+91 97692 38325` (the first number on the card). The consultation form and **every** WhatsApp button
  send leads here. If this is wrong, enquiries are lost.
- **Answer:** ______________________
- **Where to change:**
  - `src/data/siteConfig.js` → `whatsappNumber: "919769238325"`. Use international format, digits only, no `+`
    (e.g. `917900161377`). This one field feeds every WhatsApp link through `getWhatsAppLink()`.
  - If the client also wants the **primary call number** swapped, change `phone`/`phoneDisplay` and
    `phoneAlt`/`phoneAltDisplay` in the same file, and the `"telephone"` array in `index.html`.
  - Remove the comment `// ... (confirm with client which number is on WhatsApp)` once confirmed.

---

### 🟡 Confirm soon (one WhatsApp message to the client)

#### Q2. Office pincode

- **Current:** `400067` (Kandivali West). Not on the card.
- **Answer:** ______________________
- **Where to change:**
  - `src/data/siteConfig.js` → `pincode: "400067"`
  - `index.html` → `"postalCode": "400067"`

#### Q3. Office timings

- **Current:** `"Consultations by appointment"`. No fixed hours are shown, and the old made-up hours were removed.
- **Answer:** ______________________ (e.g. "Mon–Sat 11:00 AM – 7:00 PM, Sunday closed")
- **Where to change:**
  - `src/data/siteConfig.js` → `workingHours: "Consultations by appointment"`. This shows in the footer and on the
    Contact page.
  - `src/views/ContactView.jsx` uses it inside a sentence: `{" "}{siteConfig.workingHours}.` Make sure the sentence
    still reads well.
  - **If fixed hours are given:** add `openingHoursSpecification` back to the JSON-LD in `index.html` (inside the
    `ProfessionalService` object), e.g.
    ```json
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "11:00",
      "closes": "19:00"
    }
    ```

#### Q4. Service area for site visits

- **Current:** Mumbai, Thane, Navi Mumbai (assumed; the card only gives a Mumbai address).
- **Answer:** ______________________
- **Where to change:**
  - `src/data/siteConfig.js` → `citiesServed: ["Mumbai", "Thane", "Navi Mumbai"]`. This shows in the footer
    "Service Footprint" bar.
  - `index.html` → the `"areaServed"` array (one `{ "@type": "City", "name": "..." }` per city).
  - `src/components/forms/ConsultationForm.jsx` → placeholder `"e.g. Kandivali, Borivali, Thane"` (optional).

#### Q5. Does she offer online consultations?

- **Current:** the site says she does ("online across India & abroad"). Not on the card.
- **Answer:** Yes / No / Only for: ______________________
- **Where to change (only if the answer is No or limited).** Each of these mentions online consultations; reword or
  remove:
  - `src/components/layout/Footer.jsx` → `• Online Consultations Across India & Abroad`
  - `src/views/ServicesView.jsx` → `on-site across Mumbai and online across India and worldwide`
  - `src/views/ContactView.jsx` → `book an online consultation from anywhere`, the heading `Visit or Consult Online`,
    `Meet in Kandivali West or From Anywhere`, and `or book an online consultation from anywhere in India or abroad`
  - `src/views/ConsultationView.jsx` → hero paragraph containing `an astrology and numerology reading online`
  - `src/views/HomeView.jsx` → "How a Consultation Works" step: `at your property in Mumbai, or online — whichever suits you`
  - `src/data/faqs.js` → answer starting `You can meet Jinisha Parmar at the Kandivali West office`
  - `src/data/services.js` → `duration: "In-person or Online"` (3 places) and `type: "On-site / Online Blueprint Analysis"`
  - `index.html` → `<meta name="description" ...>` ends with `online consultations worldwide`

#### Q6. Website / brand name

- **Current:** "AstroInterior by Jinisha Parmar". "AstroInterior" is **not** on her card; the card and her Instagram
  (`astro.jinishaparmar`) use her own name.
- **Answer:** Keep "AstroInterior" / Use only "Jinisha Parmar" / Other: ______________________
- **Where to change (if renaming):**
  - `src/data/siteConfig.js` → `brandName: "AstroInterior"` (used in the footer copyright line)
  - `src/components/ui/AstroLogo.jsx` → the logo wordmark is split into two spans, `Astro` and `Interior`, plus the
    tagline `by Jinisha Parmar`. Replace the wordmark text and drop or adjust the tagline.
  - `src/components/layout/Navbar.jsx` → `aria-label="AstroInterior Home"`
  - `src/views/HomeView.jsx` → eyebrow text `The Astro Interior Difference`
  - `index.html` → `og:site_name`, JSON-LD `"name"` and `"alternateName"`, and the `<title>`
  - Favicon: `public/favicon.svg` and the inline data-URI icon in `index.html` (only if the emblem changes)

#### Q7. Fees

- **Current:** no prices anywhere; visitors must enquire.
- **Answer:** Show prices / Show "starting from" / Keep "enquire for fees". Prices if any: ______________________
- **Where to change (if showing prices):**
  - `src/data/services.js` → `astrologyServices` array. Each item has `title`, `duration`, `description`,
    `deliverables`. Add a `price` field (e.g. `price: "From ₹2,100"`).
  - `src/views/ServicesView.jsx` → render `astro.price` in the astrology cards, next to `{astro.duration}`.
  - `src/data/services.js` → `serviceCatalogue` (the "Complete Services" grid). Add a price per group if given.
  - `src/data/faqs.js` → the `"Consultations & Pricing"` group. Add an FAQ such as "What are your consultation fees?"

---

### 🟢 Content needed from the client (can come after launch)

#### Q8. Professional photo of Jinisha

- **Current:** no photo anywhere. This is the biggest trust gap for an astrology/Vastu practice.
- **Answer:** photo file received? ______________________
- **Where to add:**
  - Save as `public/images/jinisha-parmar.jpg` (portrait, ~1200px tall, compressed under ~250 KB; a `.webp` is fine).
  - `src/views/VastuInteriorsView.jsx` → section marked `{/* Founder */}`. Its right column is
    `<ul className="lg:col-span-4 grid grid-cols-2 gap-3 text-xs">` (the list of skills). Add the portrait above or
    instead of that list.
  - `src/views/HomeView.jsx` → section with eyebrow `About {siteConfig.founderName}`. Add the photo beside or above
    the heading.
  - `src/views/HomeView.jsx` → hero `{/* Founder card floating over the photograph */}` (desktop) and the mobile
    trust line with the `10+` circle. A small round avatar can replace the `10+` circle.
  - Use `alt="Jinisha Parmar, Vastu consultant and astrologer"` and `loading="lazy"` (except in the hero).

#### Q9. Real project photos

- **Current:** stock photos from Unsplash, clearly labelled "Design Concept" / "illustrative", with no fake client
  names or locations.
- **Answer:** photos received for which projects? ______________________
- **Where to change:**
  - Save images in `public/images/projects/<project-slug>/...` and reference them as `/images/projects/...`.
  - `src/data/projects.js` → each project object has `title`, `category` (`"Residential"`/`"Commercial"`), `scope`,
    `location`, `area`, `year`, `style`, `heroImage`, `beforeImage`, `afterImage`, `beforeDesc`, `afterDesc`,
    `summary`, `designStory`, `vastuHighlights[]`, `materials[]`, `gallery[]`. Replace or add real projects with
    real facts only. Location can be just the area (e.g. "Borivali West") if the client prefers privacy. Remove the
    `beforeCredit` field when the image is her own.
  - When **real** projects replace the concepts, also update these labels:
    - `src/views/HomeView.jsx` → `Design Concepts` eyebrow and `Illustrative concepts showing how Vastu principles...`
    - `src/views/InteriorsView.jsx` → `The spaces below are illustrative design concepts...` note, `Design Concept`
      in the modal eyebrow, `View Concept Details` button, the WhatsApp texts mentioning "design concept", and the
      slider subtitle ending `(illustrative)`.
    - `src/views/VastuInteriorsView.jsx` → slider subtitle ending `(illustrative)`.
    - `src/views/InteriorsView.jsx` modal line `{activeModalProject.scope} • {activeModalProject.area}` → can show
      location and year again for real projects.

#### Q10. Client testimonials (3–5, with permission)

- **Current:** `src/data/testimonials.js` exports an empty array, so the homepage testimonials section is
  automatically hidden.
- **Answer:** testimonials received? ______________________
- **Where to change:** add objects to `src/data/testimonials.js`, following the shape documented at the top of the
  file:
  ```js
  { id: "1", client: "Priya S.", city: "Borivali", service: "Residential Vastu", property: "2BHK Apartment", quote: "...", year: "2026" }
  ```
  The section in `src/views/HomeView.jsx` (`{testimonials.length > 0 && ...}`) appears on its own and shows up to
  3 in a grid. Use real words only, never paraphrase into stronger claims.

#### Q11. Insights / articles

- **Current:** `src/data/insights.js` holds 4 article previews with dates (Jul–Oct 2025) that the client never wrote,
  and there is no full article page. The Insights page (`#insights`) is **not linked** in the navbar or footer.
- **Answer:** Client will provide articles / Hide the page / Remove dates: ______________________
- **Where to change:**
  - To hide: nothing is required (it is already unlinked), but you can remove the route
    `{activeTab === "insights" && ...}` in `src/App.jsx`.
  - To remove dates: delete the `date` fields in `src/data/insights.js` and the `<Calendar ... /> {art.date}` span in
    `src/views/InsightsView.jsx`.
  - To publish real articles: replace entries in `src/data/insights.js`. A full-article view would need a new
    component and route (hash route such as `#insights/<id>`, parsed by `parseHash()` in `src/App.jsx`). Then add
    an "Insights" item to `navItems` in `src/components/layout/Navbar.jsx` and to the list in
    `src/components/layout/MobileDrawer.jsx`.

#### Q12. Does she approve the tips the free tools give?

- **Current:** the Kundli and Numerology tools show generic Vastu and lifestyle tips (e.g. "Face this direction at
  your desk", gemstones, colours, missing-number remedies). These are standard, but they are not her personal advice.
- **Answer:** Approved / Changes: ______________________
- **Where to change:**
  - Kundli "Simple home tips" card → `src/lib/kundliInsights.js` (`buildBlueprint()`), which draws on `PLANETS`
    (`gem`, `color`, `day`, `metal`, `direction`, `interior`) and `ELEMENT_INTERIOR` in `src/lib/astroData.js`.
  - Numerology → `src/lib/numerology.js`: `MISSING_REMEDY` (missing Lo Shu number remedies), `NUMBER_PROFILE`
    (space profile per Mulank), `PERSONAL_YEAR_THEME`, `KUA_LABELS`.
  - Only edit the **text** values. Don't touch the calculation functions (`computeKundli`, `computeNumerology`,
    `kuaNumber`, etc.). Those were verified against reference charts.

#### Q13. Qualifications / certifications (if any)

- **Current:** none shown; only "10+ Years of Experience" (from the card).
- **Answer:** ______________________
- **Where to add:**
  - `src/data/siteConfig.js` → add e.g. `qualifications: ["...", "..."]`.
  - `src/views/VastuInteriorsView.jsx` → `{/* Founder */}` section, below the paragraph that ends
    `{siteConfig.cardTagline}.`
  - Optionally add to `index.html` JSON-LD `"founder"` as `"hasCredential"`.

#### Q14. Google Business Profile & custom domain

- **Current:** no Google Business link; the site lives on `astro-interior-beta.vercel.app`.
- **Answer:** Google Business URL ______________________ · Domain ______________________
- **Where to change:**
  - Google Business URL:
    - `src/data/siteConfig.js` → add to `socialLinks` (e.g. `google: "https://g.page/..."`)
    - `index.html` → add the URL to the JSON-LD `"sameAs"` array
    - Optionally use it as `siteConfig.mapsLink` so "Open in Google Maps" opens her profile.
  - Custom domain: replace `https://astro-interior-beta.vercel.app` in `index.html` (three places: `<link
    rel="canonical">`, `og:url`, and JSON-LD `"url"`). The domain itself is configured in the Vercel dashboard, not
    in code.

---

## Part 3 — Status

Tick when applied, built and verified.

| # | Item | Status |
|---|---|---|
| 1 | WhatsApp number | ☐ |
| 2 | Pincode | ☐ |
| 3 | Office timings | ☐ |
| 4 | Service area | ☐ |
| 5 | Online consultations | ☐ |
| 6 | Brand name | ☐ |
| 7 | Fees | ☐ |
| 8 | Founder photo | ☐ |
| 9 | Real project photos | ☐ |
| 10 | Testimonials | ☐ |
| 11 | Insights articles | ☐ |
| 12 | Tool tips approval | ☐ |
| 13 | Qualifications | ☐ |
| 14 | Google Business & domain | ☐ |
