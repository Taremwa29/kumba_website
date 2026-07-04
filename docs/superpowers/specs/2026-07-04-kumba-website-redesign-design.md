# Kumba Education Center — Website Redesign Spec

**Date:** 2026-07-04
**Goal:** Replace a sprawling ~50-page school template ("eduka") with a focused, simple, easy-to-navigate marketing site for **Kumba Education Center**, a professional-services platform. Attractive but not overwhelming; message-first.

## Business summary

Kumba Education Center (Kumba Educenter) supports institutions, researchers, and students through a **specialist-hub model**. Three core programmes:

1. **Organisational Training** — leadership, governance, finance, MEAL, HR, quality assurance, compliance, grants.
2. **Research Support** — academic research support, data analysis, research systems strengthening, ethics & governance, publication.
3. **Study in Uganda** — education placement, admissions support, and student transition services.

Contact: `info@kumbaeducenter.com` · +256 765 227828 · +256 775 264136 · Kampala, Uganda.
Socials: Facebook, Instagram, WhatsApp, YouTube.

## Decisions (locked with user)

- **Structure:** Small multi-page site (7 pages).
- **Look & feel:** Warm professional — teal-green + amber, generous white space, clean sans-serif.
- **Logo:** Rebuild the existing book-icon style as inline SVG, correctly branded "Kumba".
- **Contact:** Simple, no backend — mailto enquiry form + WhatsApp/Call/Email buttons.

## Site structure

Top nav: `Home · About · Services ▾ (Training · Research · Study in Uganda) · Contact` + a "Get in touch" button.

| File | Purpose |
|------|---------|
| `index.html` | Home |
| `about.html` | Vision, Mission, Core Values, Why Choose Us, Our Approach, Who We Serve |
| `services.html` | Overview + 3 programme cards |
| `training.html` | Organisational Training (full detail from doc) |
| `research.html` | Research Support (full detail from doc) |
| `study-in-uganda.html` | Study in Uganda (full detail from doc) |
| `contact.html` | Enquiry form + contact channels |

The old ~50 template pages remain on disk but are **not linked** from the new navigation. New pages reference only the 7 pages above.

## Visual system

- **Colors:** primary teal `#116E63`, accent amber `#FDA31B`, ink `#19232B`, warm off-white `#F7FAF9`, white surfaces, secondary text `#5B6B66`. Accent used sparingly (CTAs, small highlights).
- **Typography:** headings in a characterful sans (Sora or Poppins), body in Inter. Generous line-height, roomy section padding.
- **Components:** slim sticky header; hero; soft rounded cards with subtle shadow; feature grid; numbered approach steps; "who we serve" chips; CTA band; dark footer.
- **Motion:** subtle scroll-fade + hover-lift only. Nothing flashy.
- **Responsive:** mobile-first; nav collapses to a hamburger drawer.

## Logo

Inline SVG: open-book mark in teal + amber, wordmark "Kumba" with small "EDUCATION CENTER" tagline. Light variant for the dark footer. No dependency on the old raster `logo.png`.

## Home page flow

1. Header / nav
2. Hero — headline + subhead + two CTAs (Explore services / Get in touch)
3. Short "who we are" intro
4. Three programme cards (link to each programme page)
5. Why Choose Us — 5 points
6. Our Approach — 5 numbered steps
7. Who We Serve — chips
8. CTA band → contact
9. Footer (contact, quick links, socials)

All copy drawn verbatim (or lightly trimmed) from the source document.

## Contact mechanism

Enquiry form fields: Name, Email, Programme (dropdown: Organisational Training / Research Support / Study in Uganda / General), Message. On submit, JavaScript builds a prefilled `mailto:info@kumbaeducenter.com`. Alongside the form: large tap-friendly **WhatsApp** (`wa.me/256765227828`), **Call**, **Email** buttons, plus Kampala location. Works on any static host with no backend.

## Build approach

- Static HTML, no build step.
- One fresh, lightweight `assets/css/kumba.css` (CSS custom properties, flex/grid) — replaces the heavy Bootstrap + template `style.css` for the new pages.
- Reuse existing Font Awesome from `assets/` for icons; Google Fonts for typography.
- One small `assets/js/kumba.js` for nav toggle, scroll-fade, and the mailto form handler.
- Shared header/footer markup kept identical across all 7 pages (plain duplication for static-host robustness).

## Out of scope

- Backend / database / CMS.
- Rewriting or deleting the old template pages.
- Real form submission service (can be added later by swapping the form action).
- Content beyond what the source document provides (no invented staff, testimonials, or stats).

## Success criteria

- 7 pages render cleanly on desktop and mobile.
- Navigation reaches every programme in ≤2 clicks; no dead/irrelevant links.
- All copy traceable to the source document or confirmed contact details.
- Fast load (no unused heavy CSS/JS on new pages).
- Contact form opens a correctly prefilled email; WhatsApp/Call/Email buttons work.
