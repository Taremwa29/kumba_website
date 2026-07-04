# Kumba Education Center Website Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.
>
> **Design work:** When building any UI in this plan, invoke the `frontend-design:frontend-design` skill for visual polish (typography, spacing, aesthetic decisions). The tokens and structure below are the frame; frontend-design refines within it.

**Goal:** Replace the sprawling "eduka" school template with a focused, 7-page marketing site for Kumba Education Center that is simple, easy to navigate, and message-first.

**Architecture:** Static HTML site, no build step. One shared design-system stylesheet (`assets/css/kumba.css`), one small script (`assets/js/kumba.js`), an inline-SVG logo, and identical shared header/footer markup duplicated across every page. Each page pulls copy verbatim from the source document.

**Tech Stack:** HTML5, custom CSS (CSS custom properties, flex/grid), vanilla JS, existing Font Awesome in `assets/`, Google Fonts (Sora + Inter).

## Global Constraints

- **Not a git repo.** Commit steps are optional. If the user wants version control, run `git init` first; otherwise skip every commit step. Do not fabricate commits.
- **Colors (verbatim):** primary teal `#116E63`, accent amber `#FDA31B`, ink `#19232B`, warm off-white `#F7FAF9`, secondary text `#5B6B66`, white surfaces `#FFFFFF`.
- **Fonts:** headings `Sora`, body `Inter` (Google Fonts).
- **Contact (verbatim):** email `info@kumbaeducenter.com`; phones `+256 765 227828` and `+256 775 264136`; WhatsApp `https://wa.me/256765227828`; location Kampala, Uganda; socials Facebook, Instagram, WhatsApp, YouTube.
- **Nav (exactly these links, no others):** Home (`index.html`), About (`about.html`), Services (`services.html`) with dropdown to Training (`training.html`) / Research (`research.html`) / Study in Uganda (`study-in-uganda.html`), Contact (`contact.html`). Plus a "Get in touch" button → `contact.html`.
- **No invented content.** All body copy must trace to the source document (`docs/superpowers/specs/2026-07-04-kumba-website-redesign-design.md` summarizes it). No fake stats, staff, or testimonials.
- **Verification is browser-based.** "Run" a page = open it in a browser (or via the `/run` skill) and visually confirm. No unit-test framework.

---

## File Structure

- Create `assets/css/kumba.css` — design system: tokens, reset, typography, layout, components.
- Create `assets/js/kumba.js` — mobile nav toggle, scroll-fade observer, contact-form mailto handler.
- Create/overwrite `index.html`, `about.html`, `services.html`, `training.html`, `research.html`, `study-in-uganda.html`, `contact.html`.
- Reuse `assets/css/all-fontawesome.min.css` and `assets/fonts/` (Font Awesome) — already present.
- Canonical **shared header** and **shared footer** markup are defined once in Task 2 and pasted verbatim into every page.

---

### Task 1: Design system stylesheet

**Files:**
- Create: `assets/css/kumba.css`
- Test: temporary `_preview.html` (delete after)

**Interfaces:**
- Produces: CSS classes consumed by all later tasks — `.container`, `.btn`, `.btn--primary`, `.btn--outline`, `.btn--accent`, `.section`, `.eyebrow`, `.card`, `.grid`, `.grid--3`, `.grid--2`, `.chip`, `.step`, `.cta-band`, `.reveal` (scroll-fade hook), and CSS variables `--teal --amber --ink --bg --muted --white`.

- [ ] **Step 1: Write the design tokens and base layer**

```css
:root{
  --teal:#116E63; --teal-dark:#0d564d; --amber:#FDA31B;
  --ink:#19232B; --bg:#F7FAF9; --muted:#5B6B66; --white:#fff;
  --radius:14px; --shadow:0 10px 30px rgba(17,110,99,.08);
  --maxw:1140px; --pad:clamp(1rem,4vw,2rem);
  --h-font:"Sora",system-ui,sans-serif; --b-font:"Inter",system-ui,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:var(--b-font);color:var(--ink);background:var(--bg);line-height:1.65;-webkit-font-smoothing:antialiased}
h1,h2,h3,h4{font-family:var(--h-font);line-height:1.15;font-weight:700;color:var(--ink)}
h1{font-size:clamp(2rem,5vw,3.25rem)} h2{font-size:clamp(1.6rem,3.5vw,2.4rem)} h3{font-size:1.25rem}
p{color:var(--muted)} a{color:inherit;text-decoration:none}
img,svg{max-width:100%;display:block}
```

- [ ] **Step 2: Add layout + component classes**

Add `.container{max-width:var(--maxw);margin-inline:auto;padding-inline:var(--pad)}`, `.section{padding-block:clamp(3rem,7vw,6rem)}`, `.eyebrow{color:var(--teal);font-weight:600;letter-spacing:.08em;text-transform:uppercase;font-size:.8rem}`. Buttons: `.btn{display:inline-flex;gap:.5rem;align-items:center;padding:.85rem 1.5rem;border-radius:999px;font-weight:600;transition:.2s;border:2px solid transparent}` with `.btn--primary{background:var(--teal);color:#fff}` (hover `--teal-dark`, lift `translateY(-2px)`), `.btn--accent{background:var(--amber);color:var(--ink)}`, `.btn--outline{border-color:var(--teal);color:var(--teal)}`. Cards: `.card{background:var(--white);border-radius:var(--radius);padding:1.75rem;box-shadow:var(--shadow);transition:.25s}` hover `translateY(-4px)`. Grids: `.grid{display:grid;gap:1.5rem}` `.grid--3{grid-template-columns:repeat(3,1fr)}` `.grid--2{grid-template-columns:repeat(2,1fr)}`. `.chip{display:inline-block;background:#e7f2f0;color:var(--teal-dark);padding:.5rem 1rem;border-radius:999px;font-weight:500;font-size:.95rem}`. `.step{display:flex;gap:1rem}` with numbered circle badge in teal. `.cta-band{background:var(--teal);color:#fff;border-radius:24px;text-align:center;padding:clamp(2rem,5vw,4rem)}` (its h2 + p become white).

- [ ] **Step 3: Add scroll-fade + responsive rules**

`.reveal{opacity:0;transform:translateY(20px);transition:.6s ease}` and `.reveal.is-visible{opacity:1;transform:none}`. Media query `@media(max-width:820px){.grid--3,.grid--2{grid-template-columns:1fr}}`. Respect `@media(prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none;transition:none}}`.

- [ ] **Step 4: Verify in browser**

Create `_preview.html` linking the fonts + `kumba.css` with one of each: h1, `.btn--primary`, `.btn--accent`, `.card` inside `.grid--3`, a `.chip`, a `.cta-band`. Open it. Expected: teal/amber palette, rounded cards with shadow, 3-col grid collapsing to 1 col when narrowed. Delete `_preview.html`.

- [ ] **Step 5 (optional): Commit** — only if git initialized.

---

### Task 2: Logo SVG + shared header & footer + JS behaviors

**Files:**
- Create: `assets/js/kumba.js`
- Reference blocks (pasted into every page in later tasks): **LOGO SVG**, **SHARED HEADER**, **SHARED FOOTER**.

**Interfaces:**
- Produces: `window` auto-init on `DOMContentLoaded` for `[data-nav-toggle]`, `.reveal` observer, and `#enquiry-form` mailto handler (used in Task 9). Header/footer markup consumed verbatim by Tasks 3–9.

- [ ] **Step 1: Define the LOGO SVG reference block**

A compact inline SVG: open-book mark (two teal `#116E63` pages + an amber `#FDA31B` spine/pages accent) followed by wordmark. Structure:

```html
<a class="brand" href="index.html" aria-label="Kumba Education Center home">
  <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 12C18 8 9 8 5 10v26c4-2 13-2 19 2 6-4 15-4 19-2V10c-4-2-13-2-19 2z" fill="#116E63"/>
    <path d="M24 12v28" stroke="#fff" stroke-width="2"/>
    <path d="M24 12C24 12 30 9 37 9l-2 6c-5 0-11 3-11 3z" fill="#FDA31B"/>
  </svg>
  <span class="brand__text"><strong>Kumba</strong><small>EDUCATION CENTER</small></span>
</a>
```

Add matching CSS to `kumba.css`: `.brand{display:inline-flex;align-items:center;gap:.6rem}` `.brand__text strong{font-family:var(--h-font);font-size:1.25rem;color:var(--teal);display:block;line-height:1}` `.brand__text small{font-size:.6rem;letter-spacing:.18em;color:var(--muted)}`. For the dark footer add `.footer .brand__text strong{color:#fff}`.

- [ ] **Step 2: Define the SHARED HEADER reference block**

Sticky header with the LOGO SVG (left), nav (center/right) with a Services dropdown, and a "Get in touch" `.btn--accent`, plus a `[data-nav-toggle]` hamburger for mobile. Nav links exactly per Global Constraints. Add header CSS to `kumba.css`: sticky, white background, subtle bottom border, `z-index:50`; dropdown shows on hover (desktop) and on `.open` (mobile); nav collapses under `@media(max-width:820px)` into a drawer toggled by `body.nav-open` / `[data-nav-toggle]`. Mark the current page's link with `aria-current="page"` (styled underline in amber).

- [ ] **Step 3: Define the SHARED FOOTER reference block**

Dark footer (`background:var(--ink);color:#cdd6d3`) with 4 columns: (1) LOGO light + one-line mission; (2) Quick links (the 7 nav pages); (3) Programmes (Training/Research/Study in Uganda); (4) Contact — email, both phones, Kampala Uganda, and social icons (Font Awesome: `fa-facebook-f`, `fa-instagram`, `fa-whatsapp`, `fa-youtube`) linking out (placeholder `#` until real URLs supplied). Bottom bar: `© 2026 Kumba Education Center. All rights reserved.` Footer link/color CSS added to `kumba.css`.

- [ ] **Step 4: Write `assets/js/kumba.js`**

```js
document.addEventListener('DOMContentLoaded',()=>{
  // mobile nav
  const t=document.querySelector('[data-nav-toggle]');
  if(t)t.addEventListener('click',()=>document.body.classList.toggle('nav-open'));
  // scroll reveal
  const io=new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.15});
  document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  // contact mailto (Task 9)
  const f=document.querySelector('#enquiry-form');
  if(f)f.addEventListener('submit',ev=>{
    ev.preventDefault();
    const g=n=>encodeURIComponent((f.elements[n]?.value||'').trim());
    const subject=`Enquiry: ${decodeURIComponent(g('programme'))}`;
    const body=`Name: ${decodeURIComponent(g('name'))}%0D%0AEmail: ${decodeURIComponent(g('email'))}%0D%0AProgramme: ${decodeURIComponent(g('programme'))}%0D%0A%0D%0A${g('message')}`;
    window.location.href=`mailto:info@kumbaeducenter.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
});
```

- [ ] **Step 5: Verify** — In a scratch page, paste header + footer, link `kumba.css` + `kumba.js`. Open in browser: logo renders (book + "Kumba"), nav dropdown works on hover, hamburger toggles the drawer at mobile width, footer shows 4 columns + social icons. Fix CSS until correct.

- [ ] **Step 6 (optional): Commit.**

---

### Task 3: Home page (`index.html`)

**Files:** Create/overwrite `index.html`.
**Interfaces:** Consumes LOGO/HEADER/FOOTER (Task 2), all classes (Task 1), `kumba.js`.

- [ ] **Step 1: Page shell** — `<!doctype html>`, `<head>` with title `Kumba Education Center — Institutional Strengthening, Research & Study in Uganda`, meta description (one sentence from About), Google Fonts preconnect + Sora/Inter link, `assets/css/all-fontawesome.min.css`, `assets/css/kumba.css`. Paste SHARED HEADER with `aria-current="page"` on Home. Body ends with `assets/js/kumba.js`.

- [ ] **Step 2: Hero** — headline **"Strengthening institutions. Supporting research. Opening doors to education."** subhead (first About paragraph, trimmed), CTAs `.btn--accent` "Explore our services" → `services.html` and `.btn--outline` "Get in touch" → `contact.html`. Teal-tinted background, roomy.

- [ ] **Step 3: Who-we-are intro** — `.section` with eyebrow "About Kumba", the specialist-hub paragraph + "We work with schools, universities, hospitals, NGOs…" line. Add `.reveal`.

- [ ] **Step 4: Three programme cards** — `.grid.grid--3` of `.card`, each with a Font Awesome icon, title, one-line summary (from "Our Programmes"), and "Learn more →" link to `training.html` / `research.html` / `study-in-uganda.html`.

- [ ] **Step 5: Why Choose Us** — eyebrow + `.grid` of the 5 points (Expert Support, Practical Solutions, Tailored Services, Long-Term Focus, Cross-Sector Experience) each as icon + title + sentence.

- [ ] **Step 6: Our Approach** — 5 `.step` items (Understand the Need → Design the Solution → Deliver the Service → Strengthen Capacity → Follow Up) with numbered badges.

- [ ] **Step 7: Who We Serve** — `.chip` list of the 8 audiences from "Who We Serve".

- [ ] **Step 8: CTA band + footer** — `.cta-band` "Ready to strengthen your institution?" + `.btn--accent` → `contact.html`. Paste SHARED FOOTER.

- [ ] **Step 9: Verify** — Open `index.html`. Expected: all sections render top-to-bottom, cards link correctly, chips wrap, scroll-fade fires, mobile view (≤820px) shows single column + working hamburger. No console errors.

- [ ] **Step 10 (optional): Commit.**

---

### Task 4: About page (`about.html`)

**Files:** Create/overwrite `about.html`.

- [ ] **Step 1: Shell + header** (aria-current on About) + page hero band titled "About Us".
- [ ] **Step 2: Intro** — the five About paragraphs (professional-services platform, specialist-hub model, belief statement, who we work with).
- [ ] **Step 3: Vision & Mission** — two `.card`s side by side (`.grid--2`) with the exact Vision and Mission text.
- [ ] **Step 4: Core Values** — `.grid--3` cards for Excellence, Integrity, Innovation, Collaboration, Impact (icon + name + sentence).
- [ ] **Step 5: Why Choose Us** — 5 points (reuse copy from doc).
- [ ] **Step 6: Our Approach** — 5 numbered steps.
- [ ] **Step 7: Who We Serve** — chips (8 audiences) + CTA band + SHARED FOOTER.
- [ ] **Step 8: Verify** — open, confirm every doc section present, links good, responsive. 
- [ ] **Step 9 (optional): Commit.**

---

### Task 5: Services overview (`services.html`)

**Files:** Create/overwrite `services.html`.

- [ ] **Step 1: Shell + header** (aria-current on Services) + hero titled "Our Services" with the intro line about the specialist-hub model.
- [ ] **Step 2: Three programme cards** — larger `.card`s (`.grid--3` → stacked on mobile): Organisational Training, Research Support, Study in Uganda. Each: icon, title, 2–3 line summary from the doc, bullet list of 3–4 highlight areas, and a `.btn--outline` "View programme" → respective page.
- [ ] **Step 3: CTA band + SHARED FOOTER.**
- [ ] **Step 4: Verify** — open, confirm 3 cards link to the 3 programme pages, responsive.
- [ ] **Step 5 (optional): Commit.**

---

### Task 6: Organisational Training (`training.html`)

**Files:** Create/overwrite `training.html`.

- [ ] **Step 1: Shell + header** (Services active) + hero "Organisational Training" with the two intro paragraphs.
- [ ] **Step 2: Core Training Areas** — `.grid--3` chips/cards for the 9 areas (Corporate Governance … Grants Writing and Management).
- [ ] **Step 3: Our Approach** — the 5-item approach list (Training Needs Assessment … Systems strengthening) as steps/cards, preceded by the "every organisation has unique challenges" paragraph.
- [ ] **Step 4: Who We Serve** — chips for the 7 audiences (NGOs … SMEs).
- [ ] **Step 5: CTA band ("Discuss a training programme" → contact) + SHARED FOOTER.**
- [ ] **Step 6: Verify** — open, all doc content present, responsive.
- [ ] **Step 7 (optional): Commit.**

---

### Task 7: Research Support (`research.html`)

**Files:** Create/overwrite `research.html`.

- [ ] **Step 1: Shell + header** (Services active) + hero "Research Support" with the intro paragraphs.
- [ ] **Step 2: Core Service Areas** — `.grid--2` cards for the 6 areas (Academic Research Support, Data Analysis, Research Capacity Building, MEAL Research, Grants & Proposal Development, Publication Support) each with its description.
- [ ] **Step 3: Research Systems Strengthening** — intro line + `.grid--3` chips for the 8 items.
- [ ] **Step 4: Research Ethics and Governance** — intro line + list of the 11 items + the "protect research participants…" closing line.
- [ ] **Step 5: Our Approach** — 6 steps + Who We Serve chips (9 audiences).
- [ ] **Step 6: CTA band + SHARED FOOTER.**
- [ ] **Step 7: Verify** — open, confirm all six subsections present, responsive.
- [ ] **Step 8 (optional): Commit.**

---

### Task 8: Study in Uganda (`study-in-uganda.html`)

**Files:** Create/overwrite `study-in-uganda.html`.

- [ ] **Step 1: Shell + header** (Services active) + hero "Study in Uganda" with the intro paragraphs (education destination, "make that journey easier").
- [ ] **Step 2: Our Services** — cards for the 6 services (University & College Placement + its 5 sub-bullets, Career Guidance, Admissions Documentation, International Student Transition Support + its 6 sub-bullets, Postgraduate Placement, Institutional Linkages).
- [ ] **Step 3: Who We Serve** — chips for the 5 audiences.
- [ ] **Step 4: Our Process** — 6 numbered steps (Consultation → Settlement & onboarding).
- [ ] **Step 5: Why Study in Uganda with Us** — 6 points as icon list.
- [ ] **Step 6: CTA band ("Start your application journey" → contact) + SHARED FOOTER.**
- [ ] **Step 7: Verify** — open, all sections present, responsive.
- [ ] **Step 8 (optional): Commit.**

---

### Task 9: Contact page (`contact.html`)

**Files:** Create/overwrite `contact.html`.
**Interfaces:** Consumes `#enquiry-form` handler from `kumba.js` (Task 2).

- [ ] **Step 1: Shell + header** (aria-current on Contact) + hero "Get in touch" with a one-line invite.
- [ ] **Step 2: Two-column layout** (`.grid--2`): left = contact channels, right = enquiry form.
- [ ] **Step 3: Contact channels** — big tap-friendly buttons: WhatsApp (`https://wa.me/256765227828`, `fa-whatsapp`), Call (`tel:+256765227828` and second number `+256775264136`), Email (`mailto:info@kumbaeducenter.com`), plus Kampala, Uganda with a location icon, and social icons row.
- [ ] **Step 4: Enquiry form** — `<form id="enquiry-form">` with fields `name` (text, required), `email` (email, required), `programme` (`<select>`: Organisational Training / Research Support / Study in Uganda / General Enquiry), `message` (textarea, required), and a `.btn--accent` submit "Send enquiry". Style inputs to match the system (rounded, teal focus ring). Add a small note: "This opens your email app with the message ready to send."
- [ ] **Step 5: SHARED FOOTER.**
- [ ] **Step 6: Verify** — open `contact.html`; fill the form and submit; confirm the browser opens a `mailto:` to `info@kumbaeducenter.com` with subject `Enquiry: <programme>` and the name/email/message in the body. Confirm WhatsApp/Call/Email buttons have correct hrefs. Responsive check.
- [ ] **Step 7 (optional): Commit.**

---

### Task 10: Cross-page QA pass

**Files:** all 7 pages.

- [ ] **Step 1: Link audit** — from every page, click each nav link, footer link, card link, and CTA. Confirm all resolve to one of the 7 new pages (no links to old template pages, no 404s). Fix any stragglers.
- [ ] **Step 2: Consistency** — header, footer, fonts, colors, and active-state highlighting identical across all pages. `aria-current` correct per page.
- [ ] **Step 3: Responsive sweep** — at ~375px and ~1280px widths, confirm hero, grids, cards, chips, and footer reflow cleanly; hamburger works on every page.
- [ ] **Step 4: Content trace** — spot-check each programme page against the source document; every section from the doc is present and unaltered in meaning; no invented content.
- [ ] **Step 5: Console check** — no JS errors on any page.
- [ ] **Step 6 (optional): Final commit / summary.**

---

## Self-Review

- **Spec coverage:** structure (Tasks 3–9) ✓, warm-professional visual system (Task 1) ✓, logo (Task 2) ✓, mailto contact + WhatsApp/Call/Email (Task 9) ✓, all three programmes with full doc content (Tasks 6–8) ✓, About sections (Task 4) ✓, no-backend/static (throughout) ✓, old pages unlinked (Task 10 Step 1) ✓, no invented content (Task 10 Step 4) ✓.
- **Placeholders:** none — code blocks provided for CSS tokens, logo SVG, and JS; page tasks reference exact doc sections. Social URLs are intentional `#` placeholders pending real links (noted in Task 2 Step 3).
- **Type/name consistency:** classes defined in Task 1 (`.card`, `.grid--3`, `.chip`, `.step`, `.cta-band`, `.reveal`, `.btn--*`) are the same names used in Tasks 3–9; `#enquiry-form` defined in Task 9 matches the handler selector in Task 2 Step 4; nav filenames match Global Constraints everywhere.
