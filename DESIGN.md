---
name: TillTechnologies.ai
description: Ethan Tillmon's career record. Retro code nostalgia on a near-black screen, used sparingly.
colors:
  primary: "#42ba40"
  accent: "#1eae19"
  secondary: "#534a64"
  background: "#020302"
  text: "#e9f1e9"
  error: "#f87171"
typography:
  display:
    fontFamily: "'Press Start 2P', ui-monospace, monospace"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 400
    lineHeight: 1.5
  headline:
    fontFamily: "'Press Start 2P', ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Press Start 2P', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.5
  title:
    fontFamily: "Lato, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.4
  body:
    fontFamily: "Lato, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  lead:
    fontFamily: "Lato, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  eyebrow:
    fontFamily: "Lato, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.33
    letterSpacing: "0.05em"
rounded:
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.background}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-outline-hover:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
  card:
    backgroundColor: "rgba(2, 3, 2, 0.5)"
    rounded: "{rounded.xl}"
    padding: "24px"
  input:
    backgroundColor: "rgba(2, 3, 2, 0.5)"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: "12px 16px"
  badge:
    backgroundColor: "rgba(66, 186, 64, 0.1)"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "4px 12px"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "rgba(233, 241, 233, 0.6)"
    rounded: "{rounded.full}"
    padding: "8px 16px"
  filter-pill-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
---

# Design System: TillTechnologies.ai

## Overview

**Creative North Star: "Hello World, Grown Up"**

The site starts the way every programmer started: a dark screen, green text, a blinking cursor typing "Hello World...". That nostalgia is the hook, and it is rationed. Retro moments mark the entrances: the hero, each page title being typed out, a pixel-font section heading, a title that scrambles when you hover it. Once you reach the work itself (project descriptions, the timeline, the bio), the system steps back into calm Lato on near-black so the content reads like a professional record, not a game.

Density is moderate and centered. Pages open with a centered, typed title and a quiet subtitle, then settle into a 1280px container of dim, thin-bordered cards. Almost everything is near-black, screen-white text at stepped opacities, and hairlines of Dusk Slate. Terminal Green is the only color that speaks, and it speaks when something is interactive, active, or important.

The ambient layer is deliberately faint: twelve 1–3px green particles drift up the page over 20–32 seconds, and the hero carries a 60px grid at 3% opacity. You notice them on a second look, never on the first.

**Key Characteristics:**
- Near-black screen (#020302) with a faint green cast, never pure black.
- One chromatic voice: Terminal Green, with Deep Green as its pressed/hover state.
- Press Start 2P for a few words at a time; Lato for everything a visitor actually reads.
- Flat at rest; a green glow and a small lift appear only on interaction.
- Motion that types, scrambles and reveals once, then gets out of the way.

## Colors

A monochrome near-black screen lit by a single phosphor green, with a muted violet-gray for structure.

### Primary
- **Terminal Green** (#42ba40): The voice of the system. Page titles, section headings, the "TT" logo, the active nav link, primary buttons, outline buttons, tech badges, the active filter pill, timeline education dots, focus borders, the scrollbar thumb, and the ambient particles.
- **Deep Green** (#1eae19): Terminal Green's pressed state. Primary button hover, logo hover, scrollbar thumb hover, and personal-type timeline dots. It is never used as a resting color on its own.

### Secondary
- **Dusk Slate** (#534a64): Structure, not emphasis. Card and input borders at 30% opacity, header and footer dividers at 20%, image wells at 10%, and career dots on the timeline at full strength. It is the only non-green hue in the system.

### Neutral
- **Night Black** (#020302): Page background, button text on green fills, and card/input fills at 50% opacity, which lets the particles show faintly through the cards.
- **Screen White** (#e9f1e9): All text, a white with a slight green tint. Hierarchy comes from opacity steps (see the Opacity Ladder Rule), not from extra grays.
- **Error Red** (#f87171): Form validation messages and send failures only.

### Named Rules
**The One Green Voice Rule.** Terminal Green (and Deep Green as its hover) is the only accent. No blues, oranges or second brand colors. The one exception is the yellow star next to GitHub star counts, kept because it reads as the universal "star" icon.

**The Opacity Ladder Rule.** Text hierarchy is Screen White at fixed opacities: 100% for titles, 70% for subtitles and inactive nav, 60% for descriptions, 50% for links in tertiary positions and social icons, 40% for metadata (locations, footer copyright), 30% for placeholders. Don't introduce new gray hex values. Note: the 40% and 30% steps fall below 4.5:1 contrast on Night Black, so keep them to non-essential text.

## Typography

**Display Font:** Press Start 2P (with a monospace fallback, which stays blocky; `cursive` fell back to Comic Sans)
**Body Font:** Lato (with system-ui, sans-serif fallback), loaded at weights 300, 400, 700 and 900

Both faces are self-hosted through `next/font` in `layout.tsx`, not requested from Google at runtime.

**Character:** An 8-bit arcade face paired with a warm, humanist sans-serif. The pixel font is the "Hello World" and Lato is the "Grown Up". The pixel font gets the first word; Lato carries the story.

### Hierarchy
- **Display** (Press Start 2P 400, 1.5rem → 2.25rem by breakpoint, line-height 1.5): Page titles, typed out on load, and the hero lines (1rem → 1.875rem, reaching the 2.25rem maximum at 1536px+, relaxed leading). Always Terminal Green, always centered.
- **Headline** (Press Start 2P 400, 0.875rem → 1rem): Section headings within a page ("Timeline", "Projects", "Skills", "Resume"). Terminal Green, left-aligned, 16–24px above their content.
- **Label** (Press Start 2P 400, 0.75rem): Short labels: skill category names (Screen White 70%), the home preview card titles, the project title in an image-less media well, and the "TT" logo (1.125rem). Mobile nav links use it at 1.125rem.
- **Title** (Lato 700, 1rem–1.125rem, line-height ~1.4): Project titles and timeline entry titles, in Screen White.
- **Lead** (Lato 400, 1.125rem): Page subtitles under the typed title, Screen White at 70%.
- **Body** (Lato 400, 0.875rem, line-height 1.625): Project descriptions, bio, timeline descriptions, at 60–70% opacity.
- **Eyebrow** (Lato 700, 0.75rem, uppercase, 0.05em tracking): Timeline dates, in Terminal Green at 70%.

### Named Rules
**The Few-Words Rule.** Press Start 2P is for short labels only: the logo, page titles, section headings, nav labels and labels of a few words. Never use it for body text, descriptions, button labels, form text, or anything that wraps to a second line on mobile.

**The Loaded-Weights Rule.** Lato ships at 300/400/700/900 only. Code that asks for 600 (`font-semibold`) renders a synthesized or substituted weight; use 700 for titles and buttons.

## Layout

A centered page model inside a 1280px container (`max-w-7xl`), with side padding of 16px on mobile, 24px from 640px, and 32px from 1024px. Each page is **one section** with 64px of vertical padding. Every page opens with a centered header block (typed title plus lead subtitle, 48px bottom margin) before content begins. Inside it, sub-sections ("Projects", "Skills", "Resume") start with a left-aligned Headline and sit 64px apart.

**Reading order follows product priority.** The work leads and the newest facts come first:

- **Portfolio:** Projects → Skills → Résumé, the order its subtitle promises.
- **About on mobile:** Bio → Timeline → Education → Places.
- **Timeline:** renders newest-first.

Content grids collapse cleanly:

- **Project cards:** 1 column → 2 at 768px → 3 at 1024px, with 24px gaps.
- **Skill categories:** 1 → 2 at 640px → 4 at 1024px, with 32px gaps. Each category is a Label plus a wrapping row of tech badges, grouped by proximity, not cards.
- **Home preview grid:** caps at 896px and runs 1 → 3 at 768px, never 2, so no card is orphaned.
- **About:** splits into two columns at 1024px. The timeline spans the right column, and bio, education and places stack on the left. A `auto auto 1fr` row template keeps the left stack tight when the timeline runs longer.
- **Contact:** the form is a single centered column capped at 576px, with the social links 48px below it in the same section.

**The Heading Proximity Rule.** A heading sits closer to its own content than to the group above it. Section and sub-section headings use a 16–24px bottom margin, while groups are separated by 48–64px. Never give a heading equal space on both sides.

Spacing follows Tailwind's 4px rhythm. The recurring steps are 4, 8, 16, 24, 32, 48 and 64px:

- Card interiors use 24px (preview cards 32px).
- Stacked cards use 16–24px gaps.
- Timeline entries use 4px inside an entry and 40px between entries.

**Touch targets.** Anything tappable gets at least a 40px hit area through padding, even when its visible mark is smaller: icons, the hamburger, carousel dots, text links. Hover-only controls stay visible on devices without hover.

The fixed header is 64px tall, and page content starts below it. The hero is 70% of the viewport tall below 1024px, so the section cards begin on a phone's first screen. From 1024px it fills the viewport, capped at 960px so a large desktop screen doesn't push the section cards out of view.

**Input modes.** Hover effects are mouse-only, triggered by `pointerType === "mouse"` or `@media (hover: hover)`: card lifts, the home cards' tilt, glitch titles, and demo videos that play on hover. Touch and keyboard get the same content through taps and focus: a tap plays or stops a demo, and carousel arrows stay visible. No hover effect may leave a card stuck in its hovered state after a tap.

**Narrow phones.** Below 640px, the filter pills form one row that scrolls sideways instead of wrapping, so no pill sits alone on a second line.

**Print.** About and Portfolio print as a paper career record in the same words:

- Night Black on white, with every accent color mapped to black.
- No header, footer, particles, buttons, forms, videos or résumé panel.
- Every scroll reveal shown at rest.
- Cards and timeline entries kept whole across page breaks, and projects two to a row.
- External links followed by their URL.

The rules live in the `@media print` block at the end of `globals.css`.

## Elevation & Depth

The system is flat at rest. Surfaces separate from Night Black through a 50% fill, an 8px backdrop blur, and a Dusk Slate hairline, not through shadows. Depth appears only as a response to the pointer: the surface lifts 4–6px, its border turns 50% Terminal Green, and a soft green glow blooms around it. The header picks up a 90% Night Black fill, a 12px backdrop blur and a hairline once the page scrolls past 20px.

### Shadow Vocabulary
- **Card glow** (`box-shadow: 0 0 20px rgba(66, 186, 64, 0.15)`): Hover state of generic cards.
- **Project card glow** (`box-shadow: 0 0 25px rgba(66, 186, 64, 0.1)`): Hover state of project cards.
- **Preview card glow** (`box-shadow: 0 0 30px rgba(66, 186, 64, 0.12)`): Hover state of the home section cards, which also tilt up to 8° toward the pointer.

### Named Rules
**The Glow Is Earned Rule.** Nothing glows or casts a shadow at rest. Green light appears only in response to hover or focus, and it is always green, never a neutral drop shadow.

## Shapes

Softly rounded rectangles for containers, full capsules for anything tag-like. Cards, the résumé panel and other containers use a 12px radius. Buttons, inputs and the embedded résumé frame use 8px. Badges, filter pills, status chips, carousel arrows and dots, and timeline markers are fully round. Borders are always 1px hairlines, except the outline button (2px) and timeline dots (2px ring). Images are clipped to their card's corners and sit in fixed 192px-tall wells.

## Components

**Quiet until touched.** Every component is dim and thin-bordered at rest, then comes alive in Terminal Green on hover and focus.

### Buttons
- **Shape:** Gently rounded (8px).
- **Primary:** Terminal Green fill with Night Black text, Lato bold, 12px × 24px padding (sm 8×16, lg 16×32). Hover deepens to Deep Green.
- **Outline:** 2px Terminal Green border with green text ("Download PDF"). Hover fills green and flips text to Night Black.
- **Motion:** All buttons scale to 1.03 on hover and 0.97 on press. Disabled buttons drop to 50% opacity.
- **Secondary / Ghost:** The Button API also offers a Dusk Slate fill and a text-only ghost with a 5% white hover wash. Neither is used on any current page.

### Chips
- **Tech badge:** Capsule, Terminal Green text at 12px, 10% green fill, 30% green border. Purely informational.
- **Category / status chip:** Capsule at 2px × 8px. "In Development" uses the badge treatment. Category ("Professional") is a borderless 10% green fill with 70% green text.
- **Filter pill:** Capsule, 40px tall, 12px side padding (16px from 640px), left-aligned under the "Projects" heading so all four fit one row on a phone. Inactive pills have a Dusk Slate 30% border with 60% Screen White text, shifting to a green border and text on hover. The active pill is solid Terminal Green with Night Black text.

### Cards / Containers
- **Corner Style:** 12px.
- **Background:** Night Black at 50% with an 8px backdrop blur.
- **Border:** 1px Dusk Slate at 30%. On hover it becomes Terminal Green at 50%.
- **Shadow Strategy:** None at rest. Green glow and a 4px lift on hover (see Elevation & Depth).
- **Internal Padding:** 24px. The home preview cards use 32px with centered content.
- **Project card anatomy:** The card stacks:
  - A 192px media well: a single image, side-by-side screenshots, a carousel, or a hover-to-play demo video. Carousel arrows reveal on hover, stay visible on touch, and are labeled.
  - A chip row (category, then status).
  - The title, Lato 700 at 1.125rem with the full row to itself, so it never wraps to make room for chips.
  - A description, then tech badges.
  - A row of quiet "Code" / "Live" links that turn green on hover.
- **Missing image:** When a project has no screenshot, the well stays (rows stay even) and draws a blank screen instead: the hero's grid at 5% opacity with the project title in a pixel Label at 40% green. Never "coming soon" copy.
- **Résumé panel:** A card with one row: a "Preview" toggle (the whole label is the hit area) and the outline "Download PDF" button. The preview opens inline below.

### Inputs / Fields
- **Style:** Night Black at 50% fill, 1px Dusk Slate 30% border, 8px radius, 12px × 16px padding, Screen White text, placeholder at 30%.
- **Focus:** The border turns Terminal Green. There is no separate focus ring.
- **Labels:** Placeholders are the visible labels; each field also has a screen-reader-only `<label>`. Near the 5,000-character cap, a counter appears under the message at 60% opacity.
- **Keyboard focus elsewhere:** Every other focusable element gets a 2px Terminal Green outline, offset 3px, on `:focus-visible` only. Text selection is Terminal Green at 35%.
- **Error:** A 12px Error Red message directly under the field. Send failures show a centered Error Red line. Success shows a centered Terminal Green line.

### Navigation
- **Header:** Fixed and transparent over the hero. After 20px of scroll it gains a 90% Night Black fill, a 12px backdrop blur and a Dusk Slate 20% bottom border. It slides down into place on load.
- **Logo:** "TT" in Press Start 2P, Terminal Green, deepening to Deep Green on hover.
- **Links:** Lato 14px. Inactive links are Screen White at 70%; the active link and hover state are Terminal Green.
- **Mobile:** Below 768px a hamburger opens a full-screen overlay (95% Night Black, 16px blur) with centered pixel-font links that stagger in.
- **Footer:** Centered stack of the "Till Technologies" pixel wordmark, social icons at 50% that turn green on hover, and a copyright line at 40%.

### Typed Page Header (signature)
Each page title types itself out in Press Start 2P with a blinking cursor (react-type-animation, speed 50). The subtitle fades and rises 10px once typing finishes, and the page content fades and rises 20px after that. This is the system's main retro moment. The hero repeats it in two lines, "Hello World..." followed by "Welcome to my site", with a slow bouncing chevron that appears after five seconds.

### Glitch Title (signature)
Card titles scramble into symbols and binary (`!@#$%…01`) on hover, then resolve left to right over 400ms in 30ms ticks. It is used on project titles and home preview card labels: a small reward for pointing at something, never an automatic loop.

### Timeline (signature)
A vertical Dusk Slate hairline with 16px ringed dots color-coded by entry type: Terminal Green for education, Dusk Slate for career, Deep Green for personal. Each entry stacks an uppercase green eyebrow date, a bold Lato title, a 60% description and a 40% location, sliding in from the left as it scrolls into view.

## Do's and Don'ts

### Do:
- **Do** keep Terminal Green (#42ba40) as the only accent, with Deep Green (#1eae19) strictly as its hover/pressed state.
- **Do** build text hierarchy from Screen White opacity steps (100 / 70 / 60 / 50 / 40 / 30), and keep anything a visitor must read at 60% or above.
- **Do** give new containers the card recipe: 50% Night Black fill, 8px blur, 1px Dusk Slate 30% border, 12px radius, 24px padding.
- **Do** reserve retro motion (typing, glitch scramble) for entrances and hover rewards. Reveal content once on scroll, never on a loop.
- **Do** use Lato 700 wherever code reaches for semibold.

### Don't:
- **Don't** set body text, descriptions, buttons or form text in Press Start 2P (the Few-Words Rule).
- **Don't** add resting shadows or neutral drop shadows. Glow is green and appears only on interaction.
- **Don't** introduce new hues or gray hex values beyond the six tokens.
- **Don't** replace Night Black with pure #000000 or Screen White with pure #ffffff. The faint green cast is part of the screen.
- **Don't** let the ambient particles or the grid get louder than their current 1–3px dots and 3% opacity.
