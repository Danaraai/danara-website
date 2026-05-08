# PRD — Nara's AI-Native Portfolio Website
**Version**: 1.0  
**Owner**: Nara  
**Status**: Draft  
**Last updated**: May 2025

---

## 1. Overview

### 1.1 Purpose
This document defines the product requirements for Nara's AI-native personal portfolio website. The site is designed to position Nara as an AI systems builder and help her break into roles in AI deployment, AI infrastructure, and agentic AI engineering.

The site is not a traditional static portfolio. It is itself a live deployment of the systems Nara builds — powered by an open-source LLM via Fireworks AI, with an agentic chat layer that knows her entire portfolio, an interactive system design viewer on every project, and a meta-architecture section that shows visitors how the site itself works.

### 1.2 Goals
- **Primary**: Help Nara land interviews in AI deployment, AI infrastructure, and agentic AI engineering roles.
- **Secondary**: Establish a distinctive personal brand as an AI-native systems builder.
- **Tertiary**: Demonstrate live AI deployment skills by making the site itself an AI artifact.

### 1.3 Non-goals
- This is not a blog or content platform.
- This is not a general-purpose SaaS product.
- The site does not need to support multi-user accounts or auth.

---

## 2. Background & Context

Nara has experience across three areas that appear disconnected but share a through-line: **she builds systems with AI**.

- At work: AI automation for supply chain and operations (integrations, agentic workflows)
- At hackathons: vibe-coded apps and prototypes with AI
- As a learner: AI infrastructure, GPU systems, and neuroscience via Neuromatch

The challenge is that this breadth can read as unfocused. The site's architecture and narrative must make the case that these are three expressions of the same drive: understanding and building intelligent systems.

---

## 3. Target Audience

| Audience | What they need to see |
|---|---|
| Technical recruiters at AI companies | Projects with clear impact, recognizable stack, ability to ship |
| Engineering hiring managers | System design thinking, depth in AI tooling, ability to reason about infrastructure |
| Founders / early-stage startups | Speed, versatility, genuine passion for AI |
| AI research-adjacent roles | Evidence of learning (neuroscience, infra) alongside building |

---

## 4. Site Structure

### 4.1 Pages
- `/` — Single-page portfolio (primary experience)
- `/projects/[slug]` — Deep-link to individual project (also accessible via modal overlay)

### 4.2 Section Map

```
01 · Navigation (sticky)
02 · Hero
03 · Three Pillars
04 · Projects Grid
05 · Agentic Chat (inline section + floating widget)
06 · Skill Constellation
07 · Site Architecture (meta section)
08 · Footer
```

---

## 5. Detailed Feature Requirements

### 5.1 Navigation

**Behavior**
- Sticky, transparent on load → blurs/darkens on scroll.
- Links: Work · Apps · Research · About (smooth scroll to sections)
- Right side: persistent "Chat with Nara's AI" CTA — glowing pill button with pulsing dot

**Design notes**
- Monospace font for brand name "NARA"
- No logo needed — the name itself is the mark

---

### 5.2 Hero Section

**Content**
- Headline: "Building intelligent systems."
- Sub-headline: domains listed inline (AI automation · Agentic apps · AI infrastructure · Neuroscience)
- Two CTAs: [View Resume] and [Ask me anything →]

**Interactive elements**
- Background: animated particle network (sparse nodes + edges, low opacity, slow drift). Recommend using tsParticles or a custom canvas sketch.
- On load: headline animates in with a subtle typewriter or fade-stagger effect

**Technical notes**
- Performance: particle canvas must be lazy or requestAnimationFrame-throttled. Target <5% CPU on idle.

---

### 5.3 Three Pillars

**Purpose**: Frame Nara's work into three clear buckets so visitors instantly understand the scope.

| Pillar | Color | Content |
|---|---|---|
| 01 · AI Automation & Agentic AI | Violet / Purple | Supply chain integrations, LangGraph workflows, AI ops at work |
| 02 · Apps I'm Building | Teal | Hackathon projects, vibe-coded prototypes, shipped apps |
| 03 · Research & Learning | Amber | AI infrastructure, GPU systems, Neuromatch, neuroscience |

**Behavior**
- Three equal cards, horizontally arranged on desktop, stacked on mobile
- Hover: card lifts, top accent border brightens, brief description expands or fades in
- Each card links to the relevant filtered view of the projects grid

---

### 5.4 Projects Grid

#### 5.4.1 Project Card (collapsed)

Each project card displays:
- Title
- One-line problem statement
- Category tag (Automation / App / Research)
- 3–4 tech stack tags
- Hover: arrow icon, card lift

#### 5.4.2 Project Detail Overlay (expanded)

Clicking any project card opens a full-screen overlay with three panels:

**Panel 1 — Narrative (left)**
- Problem: 2–3 sentence description of the problem
- What was built: 2–3 sentences on the solution
- Outcome/impact: metrics or qualitative outcome
- Links: GitHub, Demo, Write-up

**Panel 2 — System Architecture (center)**
- An interactive diagram rendered with D3 or React Flow
- Nodes represent components: LLM, Vector DB, API, Frontend, Orchestration Layer, Data Source, etc.
- Edges are directed arrows showing data/control flow
- Node types are color-coded:
  - LLM / AI model → Purple
  - Database / Vector store → Teal
  - External API → Amber
  - Frontend / UI → Gray
  - Orchestration / Agent → Coral

**Agentic interaction on diagram nodes:**
- Clicking any node triggers the AI (via Fireworks API) to explain:
  - What this component is
  - Why Nara chose this component for this project
  - What alternatives exist and why she didn't use them
- Response appears as a tooltip/side panel on the node

**Panel 3 — Stack & Meta (right)**
- Full tech stack list
- Build time / hackathon context
- Links
- "Ask the AI about this project" shortcut (pre-fills chat with project context)

#### 5.4.3 Project Data Format

Each project is defined as a JSON object:

```json
{
  "id": "supply-chain-agent",
  "title": "Supply Chain Automation Agent",
  "pillar": "automation",
  "problem": "Manual order reconciliation took 3 hours/week...",
  "built": "A LangGraph multi-agent loop that...",
  "outcome": "Reduced reconciliation time by 80%",
  "stack": ["LangGraph", "Python", "OpenAI", "PostgreSQL", "n8n"],
  "architecture": {
    "nodes": [...],
    "edges": [...]
  },
  "links": { "github": "...", "demo": "..." }
}
```

---

### 5.5 Agentic Chat

This is the core AI-native feature of the site. The chat widget is powered by Fireworks AI using an open-source LLM (recommended: Llama 3.3 70B Instruct or Mixtral 8x7B).

#### 5.5.1 Chat Modes

**Floating widget** (always present)
- Bottom-right pill button: "✦ Ask Nara's AI"
- Expands to a 380px wide chat panel
- Available on all sections at all times

**Inline chat section**
- A dedicated section on the page (section 05)
- Shows 2–3 pre-populated example exchanges (read-only, demonstrates capability)
- Below: live input field connected to the same API

#### 5.5.2 AI System Prompt

The Fireworks-hosted model receives a system prompt that includes:
- Nara's full resume (name, work history, skills, education)
- All project descriptions (titles, problems, solutions, stack)
- Instructions: answer questions about Nara's background, be specific and honest, cite projects when relevant, keep answers concise (2–4 sentences), suggest relevant follow-up questions

#### 5.5.3 AI Behavior Guidelines

- Always answer in first or third person consistently (recommend: third person — "Nara has worked with…")
- Never fabricate experience Nara doesn't have
- If asked something outside scope (e.g. write code), politely redirect: "I'm Nara's portfolio assistant — happy to answer questions about her work and background"
- Append relevant project links or "see [Project Name]" when answering about specific experience

#### 5.5.4 Fireworks AI Integration

```javascript
// API call structure
const response = await fetch("https://api.fireworks.ai/inference/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${FIREWORKS_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "accounts/fireworks/models/llama-v3p3-70b-instruct",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ],
    max_tokens: 300,
    temperature: 0.4,
    stream: true
  })
});
```

- Use streaming responses for a better chat feel
- Conversation history: keep last 8 turns in context
- Rate limiting: client-side debounce (500ms), max 40 messages per session

---

### 5.6 Skill Constellation

**Purpose**: Visualize that Nara's broad interests are a strength, not scattered noise. Show the connections between domains.

**Behavior**
- D3 force-directed graph
- Nodes: Supply Chain, AI Automation, RAG, Agentic AI, Neuroscience, GPU Infrastructure, Hackathons, API Design, LangGraph, n8n, Fireworks AI, Vector DBs
- Edges drawn from shared projects
- Node size proportional to number of projects in that domain
- Hover: highlights connected nodes, dims unconnected ones, shows tooltip (name + project count)
- Click: optionally triggers AI explanation of how this skill fits Nara's story (using `sendPrompt`-style interaction)

**Visual style**
- Dark canvas, accent-colored nodes with low opacity glow
- Edge lines: white at 10% opacity

---

### 5.7 Site Architecture (Meta Section)

**Purpose**: Demonstrate that the site itself is a live AI deployment — Nara built the thing she's talking about.

**Content**
- Headline: "This site is AI-native."
- 1-paragraph explanation: the chat widget is a RAG agent running on Fireworks AI with an open-source LLM, trained on Nara's portfolio data.
- Architecture diagram (horizontal pipeline):

```
[ Visitor query ]
      ↓
[ Embedding model (e.g. nomic-embed) ]
      ↓
[ Vector DB (Pinecone / Supabase pgvector) ]
      ↓
[ Retrieved project context ]
      ↓
[ Fireworks AI — Llama 3.3 70B ]
      ↓
[ Streamed response → Chat UI ]
```

- Tech stack badges: Fireworks AI · Llama 3.3 70B · Next.js · Supabase · Vercel

---

### 5.8 Footer

- Left: NARA · 2025
- Center: short tagline ("Building intelligent systems.")
- Right: LinkedIn · GitHub · Email · "Built with Fireworks AI"

---

## 6. Technical Architecture

### 6.1 Stack

| Layer | Choice | Notes |
|---|---|---|
| Frontend | Next.js 14 (App Router) | SSR + static for speed |
| Styling | Tailwind CSS | Dark mode first |
| Animations | Framer Motion | Card hovers, page transitions |
| Diagrams | React Flow or D3.js | System architecture diagrams |
| Skill graph | D3 force simulation | Force-directed layout |
| Particles | tsParticles or Canvas | Hero background |
| AI / Chat | Fireworks AI API | Open-source LLM |
| Embeddings | Fireworks or nomic-embed | For RAG layer |
| Vector DB | Supabase pgvector (or Pinecone) | Store project embeddings |
| Deployment | Vercel | CI/CD from GitHub |
| CMS / Data | JSON files or Notion API | Project data source |

### 6.2 Data Flow

```
Notion (project data)
        ↓
  JSON export / Notion API
        ↓
  Embedding pipeline (run on build or on-demand)
        ↓
  Vector DB (Supabase pgvector)
        ↓
  API route (/api/chat) — retrieves relevant context + calls Fireworks API
        ↓
  Streamed response → Chat UI component
```

### 6.3 API Routes

```
POST /api/chat         → Handles chat requests, RAG retrieval, Fireworks AI call
GET  /api/projects     → Returns all project data
GET  /api/projects/[id]→ Returns single project with architecture data
```

### 6.4 Environment Variables

```
FIREWORKS_API_KEY=
SUPABASE_URL=
SUPABASE_ANON_KEY=
NOTION_API_KEY= (optional, if using Notion as CMS)
```

---

## 7. Content Requirements

Nara must provide the following for each project:

- [ ] Project title
- [ ] Problem statement (2–3 sentences)
- [ ] What was built (2–3 sentences)
- [ ] Outcome / impact (metric or qualitative)
- [ ] Tech stack (list)
- [ ] Architecture components list (for the diagram)
- [ ] Architecture connections (what connects to what, with direction)
- [ ] GitHub link (if public)
- [ ] Demo link (if live)

For the AI agent to work well, Nara should also provide:
- [ ] Updated resume text (paste as text)
- [ ] Short first-person bio (3–5 sentences)
- [ ] FAQs she anticipates from recruiters (optional, used to tune AI responses)

---

## 8. Design Principles

1. **Dark, technical, minimal** — not a generic developer portfolio. No light mode.
2. **Systems thinking is visible** — the architecture diagrams are not decoration. They show how Nara thinks.
3. **AI is native, not bolted on** — the chat widget isn't a gimmick. It answers real questions. The site architecture section makes this explicit.
4. **Breadth is a strength** — the skill constellation and three-pillar structure reframe Nara's range as connected curiosity, not scattered interests.
5. **Recruiters and engineers both feel at home** — narrative-first for recruiters (problem → solution → outcome), diagram-first for engineers (architecture, stack, decisions).

---

## 9. Phased Delivery

### Phase 1 — MVP (2–3 weeks)
- [ ] Hero + navigation
- [ ] Three pillars
- [ ] Project cards + expanded overlay with static architecture diagrams
- [ ] Footer
- [ ] Deployed on Vercel

### Phase 2 — AI layer (1–2 weeks)
- [ ] Fireworks AI chat integration
- [ ] System prompt with resume + project data
- [ ] Floating chat widget
- [ ] Inline chat section

### Phase 3 — Advanced (1–2 weeks)
- [ ] RAG pipeline (embeddings + vector DB)
- [ ] Clickable architecture diagram nodes that trigger AI explanations
- [ ] Skill constellation (D3)
- [ ] Site architecture meta-section
- [ ] Streaming responses

---

## 10. Success Metrics

| Metric | Target |
|---|---|
| Time-on-site for technical visitors | > 3 minutes |
| Chat widget engagement rate | > 30% of visitors send ≥1 message |
| Project overlay open rate | > 50% of visitors open ≥1 project |
| Recruiter response rate (external) | Baseline improvement vs. current resume |
| Build time (Phase 1 MVP) | < 3 weeks from kickoff |

---

## 11. Open Questions

1. Should Notion be the CMS for projects, or are JSON files + GitHub sufficient?
2. Which open-source model on Fireworks AI — Llama 3.3 70B vs Mixtral 8x7B? (Recommendation: Llama 3.3 70B for better instruction following)
3. Should projects from work be anonymized/abstracted for confidentiality?
4. Is there a preference for Pinecone vs Supabase pgvector for the vector DB?
5. Should the AI chat be rate-limited per session to avoid API cost blowout?

---

*End of PRD v1.0*
