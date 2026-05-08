# Google Stitch Prompt — Danara's AI Portfolio (v2, video-informed)

---

## Prompt to paste into Stitch:

Design a personal AI portfolio website for **Danara**, an AI systems builder specializing in agentic workflows, AI automation for operations/supply chain, and AI infrastructure. The aesthetic is drawn directly from a Runway AI-generated video showing neurons and distributed systems as the same visual language: **light, scientific, precise, and quietly beautiful.**

---

### Core aesthetic: light neuroscience meets system design

This is NOT a dark developer portfolio. This is light, airy, and deliberately scientific — closer to a research lab's visual identity than a startup's landing page. The video background establishes the entire world:

- **Background**: near-white with a subtle warm lavender tint (#F5F3F8 or #F7F5FC). Almost white, but alive.
- **Primary accent**: soft violet / lavender (#8B6BB5, #9B7EC8). Used for CTAs, active states, hover glows.
- **Secondary accent**: dusty rose / pink (#D4A0C4, #E8B4D0). Used for particle trails, thin lines, subtle dividers.
- **Text (primary)**: deep charcoal-violet (#1A1625). Not black. Has a hint of the palette.
- **Text (secondary)**: muted violet-gray (#6B5F85).
- **Cards**: pure white (#FFFFFF) with a 0.5px border in soft lavender (#D8D0EC), slight shadow: `0 2px 16px rgba(140,100,200,0.06)`.
- **No gradients, no neon, no glow effects.** Beauty comes from restraint and the palette.

### Typography
- **Headings**: thin/light weight (300) for the first line, medium (500) for the second line. This split-weight approach matches the video's contrast of delicate particle trails vs solid structural nodes.
- **Font**: Inter or a clean geometric sans (Instrument Sans, DM Sans). Never serif, never mono for body.
- **Sizing**: hero headline 48–56px, section headlines 28px, body 15px, tags/labels 11px.
- **Letter-spacing**: headlines −0.5px (slightly tight), uppercase labels +0.1em.
- **Sentence case throughout.** No ALL CAPS except the brand name "DANARA."

---

### Video background treatment (hero section)

The Runway AI video shows two visual worlds that are secretly the same:
- **Frame 1**: A neuron — organic purple/violet cell body, pink dendrites dissolving into scattered particles. Right-side composition, trails flowing left.
- **Frame 2**: Distributed system nodes — white 3D cubes connected by the same flowing pink particle streams. Right-side composition, trails flowing left.

**Implementation:**
- `<video>` element, full bleed, `autoplay muted loop playsinline`, `object-fit: cover`
- The video is LIGHT (near-white background) so text must be **dark**, not white
- Text sits on the **LEFT** portion — the sparse particle region — with no overlay needed (the left side of the video is naturally open)
- If legibility is an issue on some frames, a very subtle `radial-gradient` mask at 8% white opacity on the left half is the maximum allowed
- Right half of hero: let the video breathe — neuron / system nodes visible unobstructed
- The video IS the art. Do not cover it.

---

### Page sections

**1. Navigation bar** (sticky, transparent → blur on scroll)
- Left: "DANARA" — 14px, weight 500, letter-spacing 0.08em, color #1A1625
- Right: text links in #6B5F85 (Work · Apps · Research · About) + a small pulsing-dot pill "✦ Ask Danara's AI" in violet
- Backdrop-filter blur on scroll: `backdrop-filter: blur(12px); background: rgba(245,243,248,0.85)`
- No border on transparent state; thin bottom border on blur state

**2. Hero section** (full viewport height, 100vh)

Left side (text):
- Small eyebrow label: "AI systems builder" — uppercase, 11px, violet, letter-spacing 0.12em
- Headline line 1: "DANARA builds" — weight 300, 48px, #1A1625
- Headline line 2: "intelligent systems." — weight 500, 48px, #1A1625
- Sub-headline (below, 15px, #6B5F85, max-width 380px):
  "AI-powered automations for real-world operations, supply chain & pricing — not AI for the sake of AI."
- Tag chips (small pill row, 12px):
  AI automation · operations · supply chain · multi-agent workflows · AI infrastructure · neuroscience
- CTAs:
  - Primary: [View resume] — violet fill (#8B6BB5), white text, 8px radius
  - Secondary: [Ask me anything →] — transparent, violet border (#C4B3E0), violet text
- Bottom center: subtle scroll indicator (down arrow, 11px, #B4A0CC)

Right side (video breathing room):
- The neuron/system visualization plays in the right 55% of the viewport, unobstructed

**3. Three pillars** (3 equal columns, full width)

Section label: "01 — what I'm building" — 11px, uppercase, letter-spacing 0.1em, #9B7EC8

Each card:
- White card with 0.5px lavender border
- Top accent line: 2px solid, color unique to pillar
- Number in large faint background text (e.g. "01") — 72px, 5% opacity, positioned behind content
- Title (14px, weight 500)
- 2-line description (13px, #6B5F85)
- Tag chips at bottom
- Hover: card rises 3px, border transitions to accent color at 60% opacity, subtle shadow appears

Cards:
- **01 · AI Automation & Agentic AI** — accent: violet (#8B6BB5). Tags: supply chain · LangGraph · AI ops · n8n
- **02 · Apps I'm Building** — accent: teal-violet (#6B9EC8). Tags: hackathons · vibe coding · prototypes
- **03 · Research & Passion** — accent: rose (#C47EA0). Tags: AI infrastructure · GPU systems · Neuromatch · neuroscience

Click behavior: filters the project grid below to this pillar

**4. Projects grid** (section "02 — projects")

Filter pills above the grid: [All] [Automation] [Apps] [Research]
— Active pill: violet fill, white text. Inactive: transparent, #6B5F85 text

3-column card grid:
- Project card: white, 0.5px lavender border, 1rem padding
- Colored top stripe (2px, matching pillar color)
- Project title (14px, weight 500, #1A1625)
- Problem statement (12px, #6B5F85, 2 lines max)
- Stack tags (11px pill chips, light violet background)
- Category label bottom-right (10px, #B4A0CC)
- Hover: arrow icon appears top-right, card lifts 3px

**Project overlay (full-screen, on card click):**
- Dark blur backdrop: `background: rgba(26,22,37,0.7); backdrop-filter: blur(20px)`
- White card, max-width 900px, centered, border-radius 16px
- Three columns:
  - **Left (narrative)**: Problem / What was built / Outcome / Links (GitHub, Demo)
  - **Center (system diagram)**: Interactive React Flow diagram. Nodes are rounded rectangles colored by component type:
    - LLM/AI → violet (#D0BEF0 fill, #8B6BB5 stroke)
    - Database/Vector store → teal (#BDE8DC fill, #2D9E7E stroke)
    - External API → rose (#F0D0DC fill, #C47EA0 stroke)
    - Frontend/UI → warm gray (#E8E4EC fill, #9490A4 stroke)
    - Agent/Orchestration → deep violet (#C4B0E8 fill, #5A4090 stroke)
    - Clicking a node: triggers AI (Fireworks) to explain the component in a tooltip/side panel
  - **Right (stack + meta)**: Full stack list, build context, links
- Close button: top-right X, #6B5F85

**5. Skill constellation** (section "03 — how it all connects")

D3 force-directed graph on the light background. Nodes use the same palette: violet for AI domains, rose for neuroscience, teal for infra. Edge lines in #D8D0EC (15% opacity). Hover: node glows softly (box-shadow in its color), connected nodes stay visible, others dim.

**6. Site architecture** (section "04 — this site is AI-native")

Thin, understated horizontal pipeline diagram (not a busy chart):
```
[ Your question ]  →  [ Embeddings ]  →  [ Vector DB ]  →  [ Fireworks AI / Llama 3.3 ]  →  [ Answer ]
```
Each step is a small white card with a 0.5px violet border. Arrow connectors are 1px rose lines. Brief paragraph below in #6B5F85.

**7. Footer** (minimal)
- Left: DANARA · 2025
- Center: "Building intelligent systems."
- Right: LinkedIn · GitHub · Email · "Built with Fireworks AI"
- Border-top: 0.5px solid #E0D8EE

---

### Persistent floating chat widget

Always visible, bottom-right corner, on all sections.

Default state: pill button — `background: white; border: 1px solid #C4B3E0; border-radius: 24px; padding: 8px 16px`
- A pulsing violet dot + "✦ Ask Danara's AI" in #7B5FA8
- Subtle shadow: `0 4px 20px rgba(140,100,200,0.15)`

Expanded state: slides up as a 380×520px panel
- White background, 0.5px lavender border, 16px radius
- Header: "Danara's AI" + small badge "Fireworks AI · Llama 3.3"
- Message bubbles:
  - User: right-aligned, light violet background (#EDE5F8)
  - AI: left-aligned, white, 0.5px border
- Input bar: clean, 0.5px border, violet focus ring
- "Powered by Fireworks AI · open source" — 10px, #B4A0CC, bottom

---

### Component tokens

| Token | Value |
|---|---|
| Background | #F5F3F8 |
| Surface (cards) | #FFFFFF |
| Border default | 0.5px solid #D8D0EC |
| Text primary | #1A1625 |
| Text secondary | #6B5F85 |
| Text muted | #B4A0CC |
| Accent violet | #8B6BB5 |
| Accent rose | #C47EA0 |
| Accent teal | #5DCAA5 |
| Border radius (cards) | 12px |
| Border radius (pills) | 20px |
| Card shadow | 0 2px 16px rgba(140,100,200,0.06) |
| Hover shadow | 0 6px 24px rgba(140,100,200,0.12) |

---

### What makes this site distinct

The Runway AI video creates the insight: **a neuron firing and a distributed system activating look identical.** That's not an accident — it's the thesis. Danara moves between neuroscience and AI infrastructure because she sees them as the same problem at different scales. The site must carry this idea visually. The light palette, the organic particle trails, the clean white system nodes — everything connects back to those two frames.

---

### Mood references
- Notion's website circa 2023 (light, editorial, premium)
- Anthropic.com (scientific restraint, not tech flashy)
- Framer's personal portfolio templates (clean interactions, white space)
- The aesthetic of beautiful scientific illustration (cell atlases, brain mapping papers)
