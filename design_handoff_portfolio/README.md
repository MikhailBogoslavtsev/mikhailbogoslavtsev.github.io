# Handoff: Mikhail Bogoslavtsev — Personal Portfolio Site

## Overview
A single-page, long-scroll personal portfolio for a senior product leader. It positions Mikhail across three offerings (full-time Head of Product, fractional Head of Product, mentor), shows anonymized selected work, explains how he leads, summarizes his background, and converts via a single contact form. "Executive one-pager," not a designer case-study wall: clean, lots of whitespace, one accent color, strong typographic hierarchy, mobile-first.

## About the Design Files
The file in this bundle (`Mikhail Bogoslavtsev - Portfolio.dc.html`) is a **design reference created in HTML** — a prototype showing the intended look and behavior. It is **not production code to copy directly**. Your task is to **recreate this design in a real codebase** using that project's established patterns and libraries (e.g. Next.js + React, Astro, plain Vite, etc.). If no codebase exists yet, pick the most appropriate stack for a fast, mostly-static marketing/portfolio page — **Astro or Next.js (static export) are both ideal** — and implement the design there.

Two implementation notes:
- The prototype includes a **"Direction" switcher pill** floating at the bottom (Editorial / Structured / Warm). That is a **design-selection tool, not part of the real site** — do not build it. Ship only the **Editorial** direction (the default). The tokens for it are in the Design Tokens section below.
- The headshot uses a custom drag-and-drop image component for prototyping. In production this is just an `<img>` (circle, 300×300, object-fit: cover).

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions. Recreate the UI pixel-perfectly using the codebase's libraries and patterns. All copy in this README is final and should be used verbatim.

## Tech Notes / Recommended Stack
- Mostly static content + one form → **Astro** or **Next.js static export**. No heavy client framework needed.
- Fonts via Google Fonts: **Newsreader** (display/serif) and **Hanken Grotesk** (body/labels). Self-host for performance if possible.
- The contact form in the prototype is front-end only (shows a success state on submit). **Wire it to a real backend**: a serverless function + email (e.g. Resend, Postmark) or a form service (Formspree, Basin). Add spam protection (honeypot or hCaptcha). See State Management.
- Smooth-scroll anchor nav. Sticky translucent header with backdrop blur.

---

## Global Layout
- **Max content width:** 1080px, centered (`margin: 0 auto`).
- **Horizontal page padding:** `clamp(20px, 5vw, 56px)`.
- **Section vertical padding:** `clamp(56px, 9vw, 116px)` (hero is `clamp(44px,7vw,80px)` top / `clamp(56px,9vw,104px)` bottom).
- **Scroll-margin-top** on each section: ~80–88px (so the sticky nav doesn't cover anchored headings).
- **Section background alternation:** white default; the **Selected Work** and **Background** sections use a faint accent tint: `color-mix(in srgb, #E5484D 3%, #FFFFFF)`.
- **Mobile-first, fully responsive** via flex-wrap and CSS grid `auto-fit` (no JS breakpoints needed). All multi-column areas collapse to a single column on narrow screens.

## Section order
1. Sticky nav
2. Hero (`#top`)
3. How I help (`#help`) — 3 cards
4. Selected work (`#work`) — 3 stacked entries
5. How I work / About (`#about`) — 2 intro paragraphs + 4 belief cards + closing line
6. Background (`#background`) — vertical timeline, 4 items
7. Contact (`#contact`) — form
8. Footer

---

## Screens / Views (single page — sections)

### 1. Sticky Nav
- **Layout:** Full-width sticky bar, `height: 66px`, content constrained to 1080px. Flex row, space-between. Name/wordmark left, links right.
- **Background:** `color-mix(in srgb, #FFFFFF 86%, transparent)` + `backdrop-filter: saturate(180%) blur(14px)`. Bottom border `1px solid #EBE5DB`.
- **Wordmark (left):** "Mikhail Bogoslavtsev" — Newsreader, 500 weight, 1.05rem, letter-spacing -0.005em, color #17120D. Links to `#top`.
- **Nav links (right):** "Work", "How I help", "About", "Contact". Hanken Grotesk, 0.82rem, 500 weight, color #7C7264; hover → #E5484D. Gap `clamp(12px, 2.4vw, 28px)`, wrap allowed.
- **Contact link** is emphasized: colored #E5484D with a 1px bottom border at 40% accent.
- **Anchors:** Work→`#work`, How I help→`#help`, About→`#about`, Contact→`#contact`.

### 2. Hero (`#top`)
- **Layout:** Flex row, `gap: clamp(34px,5vw,68px)`, vertically centered, wraps on mobile. Left text column `flex: 1 1 440px`; right image column `flex: 0 0 auto`, max-width 340px, centered.
- **Eyebrow:** small red dot (7px circle, #E5484D) + label "Product leadership · Fractional · Mentor". Label: uppercase, letter-spacing 0.14em, 0.7rem, 600 weight, #7C7264.
- **H1:** "Product leadership that turns messy, high-stakes problems into software people actually use." — Newsreader, 500 weight, `font-size: clamp(2.25rem, 5.2vw, 3.85rem)`, line-height 1.04, letter-spacing -0.005em, color #17120D, `text-wrap: balance`. Margin-top 22px from eyebrow.
- **Subhead (body):** "13+ years in B2B SaaS — most recently building construction-tech products for some of the largest US homebuilders. I help founders ship the right thing, then build the team to keep shipping it." — Hanken Grotesk, `clamp(1.04rem,1.5vw,1.22rem)`, line-height 1.55, color #3A352C, max-width 42ch, margin-top 26px.
- **Supporting line (muted):** "Full-time, fractional, or mentor. Based in Spain, working remotely across the US and Europe." — 0.93rem, line-height 1.55, color #7C7264, max-width 44ch, margin-top 18px.
- **Primary CTA button:** "Start a conversation →" — links to `#contact`. Background #E5484D, white text, Hanken Grotesk 600, 0.96rem, padding 14px 26px, border-radius 9px. Hover: `color-mix(in srgb, #E5484D 86%, #000)`. Margin-top 32px. Inline-flex with 9px gap to the arrow.
- **Headshot:** circle, 300×300px, `object-fit: cover`, `border-radius: 50%`, 1px border #EBE5DB, faint tinted background. In production this is a plain `<img>`. Source image to be supplied by Mikhail.

### 3. How I help (`#help`)
- **Section header:** small index "01" (Hanken Grotesk 600, 0.82rem, #E5484D) + H2 "How I can be useful" (Newsreader 500, `clamp(1.5rem,3vw,2.25rem)`, -0.005em, #17120D), baseline-aligned, gap 14px.
- **Intro line:** "Three ways to work together, depending on where you are." — 1.02rem, #7C7264, margin 14px top / `clamp(32px,4vw,48px)` bottom.
- **Cards:** CSS grid, `repeat(auto-fit, minmax(255px, 1fr))`, gap `clamp(16px,2.4vw,26px)`. Each card: white background, 1px border #EBE5DB, border-radius 14px, padding `clamp(24px,2.6vw,32px)`, flex column, gap 13px.
  - **Card top accent:** 30px × 3px bar, #E5484D, border-radius 2px.
  - **Card label:** uppercase, 0.14em, 0.7rem, 600, #7C7264.
  - **Card heading (h3):** Newsreader 500, 1.17rem, line-height 1.3, -0.005em, #17120D.
  - **Card body:** Hanken Grotesk, 0.92rem, line-height 1.6, #3A352C.
  - **Card 1** — Label: "Head of Product (FTE)". Heading: "Own product end to end as part of your leadership team." Body: "For companies ready for a senior owner of strategy, roadmap, and team. I set direction, build the cross-functional org, and tie what we ship to how the business grows. Best when product needs an owner, not just more hands."
  - **Card 2** — Label: "Fractional Head of Product". Heading: "Senior product leadership without a full-time hire." Body: "Senior product direction now, without a full-time exec. I come in part-time to set strategy, untangle the roadmap, fix process, and coach your PMs and engineers into stronger calls — scoped to exactly what you need."
  - **Card 3** — Label: "Mentor & coaching". Heading: "Help PMs and founders make sharper product calls." Body: "For PMs leveling up and founders learning to own product. We work through the real calls you're facing — discovery, prioritization, stakeholder pressure, careers — not generic theory. Direct, honest, grounded in having done the job."
- **Text link under cards:** "Not sure which fits? Tell me what you're working on →" — links to `#contact`, #E5484D, 600, 0.95rem. Hover increases the gap to the arrow (subtle nudge).

### 4. Selected work (`#work`)
- **Background:** faint accent tint (see Global Layout).
- **Section header:** index "02" + H2 "Selected work" (same style as section 3).
- **Confidentiality line (muted):** "Engagements shown anonymized to respect client confidentiality." — 1.02rem, line-height 1.55, #7C7264, max-width 62ch.
- **Entries:** 3 stacked blocks, each `flex` with `padding: clamp(28px,4vw,40px) 0` and a top border `1px solid #EBE5DB`; the last entry also has a bottom border. No big leading numbers (intentionally removed).
  - **Entry title (h3):** Newsreader 500, `clamp(1.2rem,2vw,1.5rem)`, line-height 1.28, -0.005em, #17120D.
  - **Entry context line:** uppercase, 0.14em, 0.7rem, 600, #7C7264, margin-top 12px.
  - **Entry body:** Hanken Grotesk, 0.97rem, line-height 1.62, #3A352C, max-width 64ch, margin-top 14px.
  - **Entry 1** — Title: "Product for a venture-backed construction-tech platform serving the top thirty US homebuilders." Context: "Drone-based site intelligence for residential land developers". Body: "Built a new product area from zero — turning aerial imagery, plans, and AI into tools that catch construction problems early. Ran discovery with enterprise homebuilders and led the team that shipped it to live job sites."
  - **Entry 2** — Title: "Product for a B2B fintech / wealth-management SaaS platform." Context: "Enterprise platform, regulated environment". Body: "Owned product improvements and customer integrations for institutional clients. Treated enterprise security and compliance as product requirements, not afterthoughts, and built the integration and onboarding foundations to land bigger partners."
  - **Entry 3** — Title: "A decade in technical sales and product across heavy industry." Context: "Paper, wood, food, glass, steel, pharma, construction, etc." Body: "Eleven years close to industrial customers — 500+ site visits across factory floors — selling, specifying, then shaping the products themselves. It's where I learned to trust the field over the conference room: sit with the customer first, build second."

### 5. How I work / About (`#about`)
- **Section header:** index "03" + H2 "How I work".
- **Intro paragraphs:** max-width 68ch, Hanken Grotesk, 1.06rem, line-height 1.68, #3A352C.
  - P1: "13+ years in B2B SaaS, most recently in construction tech — turning messy operational problems into software people rely on every day."
  - P2: "I didn't start in product. A decade in technical sales taught me more than any framework: trust what you see in the field over what sounds good in the room, and build the second version of something real over the first version of something theoretical."
- **Sub-label:** "A few things I believe" — uppercase, 0.14em, 0.72rem, 600, #7C7264.
- **Belief cards:** CSS grid `repeat(auto-fit, minmax(280px,1fr))`, gap `clamp(22px,3vw,40px)`, max-width 880px. Each: top border `2px solid #E5484D`, padding-top 16px.
  - **Belief heading (h4):** Newsreader 500, 1.12rem, -0.005em, #17120D, margin-bottom 8px.
  - **Belief body:** Hanken Grotesk, 0.95rem, line-height 1.62, #3A352C.
  - "Outcomes over output." — "Shipping a lot isn't the goal. I'd rather ship three things that change the trajectory than thirty that fill a changelog."
  - "Love the problem, not the solution." — "The fastest way to waste a quarter is to fall for your own idea. Stay anchored to the problem and the people you're solving for."
  - "Give teams the \"why\" and room to solve it." — "The best work comes from teams who understand the goal and are trusted to find the how. Make the direction unmistakable, then get out of the way."
  - "Bridge the technical and the commercial." — "I've worked both sides — engineering rooms and customer negotiations. A lot of my value is translating between them so everyone pulls the same direction."
- **Closing line:** "Full-time, fractional, or mentoring — the through-line is the same: get close to the real problem, make the direction clear, and help good people do their best work." — 1.06rem, line-height 1.68, #3A352C, max-width 68ch.

### 6. Background (`#background`)
- **Background:** faint accent tint.
- **Section header:** index "04" + H2 "Background".
- **Timeline:** vertical list with a left border `1px solid #EBE5DB`, max-width 760px, gap `clamp(26px,3vw,38px)`. Each item: `padding-left: 30px`, with a 9px accent dot (`#E5484D`, circle) absolutely positioned on the left border line.
  - **Item heading (h4):** Newsreader 500, 1.14rem, -0.005em, #17120D.
  - **Item body:** Hanken Grotesk, 0.96rem, line-height 1.6, #3A352C.
  - "Product leadership — construction tech" — "Built a new product area from zero for a platform serving the top thirty US homebuilders; led discovery, roadmap, and a cross-functional team to live product."
  - "Product management — B2B fintech SaaS" — "Owned platform improvements, enterprise compliance, and customer integrations on a regulated wealth-management platform."
  - "Technical sales & product — heavy industry" — "Eleven years across paper, wood, food, glass, steel, pharma, and construction; 500+ customer site visits; progressed from technical sales into shaping the products themselves."
  - "Education & foundations" — "MBA in International Business. Professional Scrum Master (PSM). Google Project Management certificate. Working across Russian (native), English (fluent), Spanish (A1), and German (A1)."
- **Muted line under list:** "Full background and references available on request." — 0.9rem, #7C7264, padding-left 30px.

### 7. Contact (`#contact`)
- **Layout:** Flex row, gap `clamp(34px,5vw,72px)`, wraps on mobile. Left intro column `flex: 1 1 320px`; right form column `flex: 1 1 380px`.
- **Left column:** index "05" + H2 "Start a conversation" (Newsreader 500, `clamp(1.6rem,3.2vw,2.45rem)`). Intro paragraph: "Tell me what you're building or wrestling with — hiring, fractional help, or mentorship. I read everything that comes in." — 1.04rem, line-height 1.62, #3A352C, max-width 44ch.
- **Form fields** (flex column, gap 16px). Each field: uppercase label (0.14em, 0.68rem, 600, #7C7264) + input. Inputs: Hanken Grotesk 0.98rem, color #17120D, white background, 1px border #EBE5DB, border-radius 9px, padding 13px 14px, full width. Focus: border #E5484D + `box-shadow: 0 0 0 3px color-mix(in srgb, #E5484D 16%, transparent)`.
  - **Name** — text, required.
  - **Email** — email, required.
  - **What's this about?** — select, required. Options: "Full-time role", "Fractional product help", "Mentorship", "Something else" (plus a disabled "Select one…" placeholder). Custom chevron icon.
  - **Message** — textarea, 4 rows, required, vertical resize.
- **Submit button:** "Send" — left-aligned, background #E5484D, white, 600, padding 14px 30px, border-radius 9px. Hover `color-mix(in srgb, #E5484D 86%, #000)`.
- **Success state:** On submit, replace the form with a confirmation card (white, 1px border #EBE5DB, border-radius 14px, padding `clamp(28px,4vw,40px)`): a 42px accent-tint circle with a ✓, heading "Message received." (Newsreader 500, 1.4rem), body "Thanks for reaching out — I read everything that comes in and will get back to you soon."

### 8. Footer
- Top border `1px solid #EBE5DB`, padding `clamp(28px,4vw,40px) 0`. Flex row, space-between, wraps.
- **Left text (muted):** "Mikhail Bogoslavtsev · Product leadership, fractional & mentorship · Valencia, Spain · Remote worldwide" — 0.86rem, #7C7264. (Note: hero says "Based in Spain"; footer keeps the fuller "Valencia, Spain" — keep as written unless Mikhail says otherwise.)
- **Right link:** "Back to top ↑" → `#top`, 0.82rem, 500, #7C7264, hover #E5484D.

---

## Interactions & Behavior
- **Smooth scroll** to anchors (`scroll-behavior: smooth` on `html`, or JS smooth scroll). Respect `prefers-reduced-motion`.
- **Sticky header** stays pinned; translucent with backdrop blur over content.
- **Hover states:** nav links and footer link shift to accent; primary buttons darken; the two "→" text links nudge their arrow (increase gap) on hover.
- **Focus states:** form inputs get accent border + 3px accent-tint focus ring. Ensure visible keyboard focus on all interactive elements (accessibility).
- **Form submit:** prevent default, validate (HTML5 required + email type at minimum), then POST to the backend and show the success card. Show inline error states if the request fails. Keep the success copy above.
- **Responsive:** everything collapses to a single column on mobile via flex-wrap / grid auto-fit; no fixed breakpoints required, but verify at ~360px, ~768px, ~1080px.
- **Do NOT build the floating "Direction" switcher pill** — prototype-only.

## State Management
Minimal. Only the contact form needs state:
- `formState`: `idle | submitting | success | error`.
- On submit → `submitting` → POST → `success` (render confirmation card) or `error` (show message, keep form).
- Field values: Name, Email, Topic (enum), Message.
- **Backend:** serverless function or form service + transactional email. Add a honeypot field and/or captcha. Validate server-side too.

## Design Tokens (Editorial direction — ship this one)
**Colors**
- Background: `#FFFFFF`
- Section tint background: `color-mix(in srgb, #E5484D 3%, #FFFFFF)`
- Ink / headings: `#17120D`
- Body text: `#3A352C`
- Muted / labels: `#7C7264`
- Hairline / borders: `#EBE5DB`
- Accent (single accent color): `#E5484D`
- Accent hover (buttons): `color-mix(in srgb, #E5484D 86%, #000)`
- Focus ring: `color-mix(in srgb, #E5484D 16%, transparent)`

**Typography**
- Display / headings: **Newsreader** (serif), weight 500, letter-spacing -0.005em.
- Body / labels / UI: **Hanken Grotesk** (sans), weights 400/500/600/700.
- Uppercase labels: letter-spacing 0.14em, weight 600.
- Type scale (rem / clamp): H1 `clamp(2.25,5.2vw,3.85rem)`; section H2 `clamp(1.5,3vw,2.25rem)`; contact H2 `clamp(1.6,3.2vw,2.45rem)`; work entry h3 `clamp(1.2,2vw,1.5rem)`; card h3 1.17; belief/timeline h4 1.12–1.14; lead body 1.06; standard body 0.92–0.97; small/muted 0.82–0.93; labels 0.68–0.72.

**Spacing / radius**
- Page padding: `clamp(20px,5vw,56px)`; section padding: `clamp(56px,9vw,116px)`.
- Border radius: cards 14px; buttons/inputs 9px; pills/dots 50%.
- Hairline borders: 1px #EBE5DB; belief card top accent 2px #E5484D.

## Assets
- **Fonts:** Newsreader + Hanken Grotesk (Google Fonts). Self-host recommended.
- **Headshot:** circular photo, supplied by Mikhail (replace the prototype's drag-drop slot with a plain `<img>`). Provide an optimized version (e.g. 600×600 for retina at 300px display) with appropriate `alt`.
- **Icons:** only a small chevron on the select (inline SVG, stroke #7C7264) and a ✓ in the success state. No icon library needed.
- No logos anywhere (intentional — see Content Rules).

## Content Rules (important — do not violate)
- **No downloadable CV / PDF resume** anywhere.
- **Contact = form only.** Do not display an email address or the LinkedIn URL on the page. (Mikhail's LinkedIn: https://www.linkedin.com/in/mikhail-bogoslavtsev/ — kept off the page by request; add only if he changes his mind.)
- **No client logos.** Construction-tech and fintech employers stay anonymized.
- **No invented metrics** — copy is qualitative by design. Don't add numbers, percentages, dates, or team sizes beyond what's written here.
- Tone: confident but approachable, plain-spoken. Avoid buzzwords ("passionate", "data-driven", "synergy", "results-driven").

## Files
- `Mikhail Bogoslavtsev - Portfolio.dc.html` — the hi-fi HTML prototype (open in a browser to see the live design and interactions). Reference for exact layout, spacing, and behavior. Ignore the framework-specific wrappers (`x-dc`, `support.js`) and the Direction switcher — they're prototype scaffolding.
