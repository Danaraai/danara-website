export type Pillar = "automation" | "apps" | "research";

export type NodeKind = "llm" | "db" | "api" | "ui" | "agent";

export type ArchNode = {
  id: string;
  label: string;
  kind: NodeKind;
};

export type ArchEdge = {
  from: string;
  to: string;
  label?: string;
};

export type VideoEmbed = {
  type: "youtube" | "loom" | "mp4";
  url: string;
  label?: string;
};

export type Tag = {
  label: string;
  color: string;
};

export type Project = {
  id: string;
  title: string;
  pillar: Pillar;
  year: string;
  context: string;
  problem: string;
  built: string;
  outcome: string;
  role?: string;
  stack: string[];
  tags?: Tag[];
  featured?: boolean;
  links: {
    github?: string;
    demo?: string;
    writeup?: string;
    deck?: string;
    sheet?: string;
    notion?: string;
  };
  video?: VideoEmbed;
  images?: string[];
  architecture: { nodes: ArchNode[]; edges: ArchEdge[] };
};

export const pillarMeta: Record<
  Pillar,
  { label: string; accent: string; chip: string }
> = {
  automation: {
    label: "Automation",
    accent: "#9479B5",
    chip: "#EFE7DD",
  },
  apps: {
    label: "Apps",
    accent: "#7AA0BD",
    chip: "#E2ECF2",
  },
  research: {
    label: "Research",
    accent: "#BD8AA0",
    chip: "#F0DCE2",
  },
};

// Real project content from Danara's Notion portfolio.
// Outcome metrics use [bracketed placeholders] where real numbers should
// go — fill in before publishing.
export const projects: Project[] = [
  {
    id: "nordstrom-returns",
    title: "Nordstrom Returns — Agentic AI Automation",
    pillar: "automation",
    year: "2026",
    context: "internal tool",
    featured: true,
    tags: [
      { label: "agentic AI", color: "#9B7AE5" },
      { label: "automation", color: "#7DAFD3" },
      { label: "supply chain", color: "#94BAA8" },
      { label: "API orchestration", color: "#F5A962" },
    ],
    problem:
      "We sell on Nordstrom through Mirakl Connect (dropship layer). When a customer returns a product, the return flows through Nordstrom → Mirakl → Shopify — but nothing automatically notified our WMS (Redo for returns). Parcels arrived at FC with no record, causing inventory inaccuracy and manual ops overhead. The challenge: a fragmented tech stack across four disconnected systems with no native integration.",
    built:
      "Two-layer solution: (1) Shopify Flow automation that triggers when Nordstrom approves a return and automatically creates a WMS RMA via Redo's API. (2) A daily autonomous agent that bridges the tracking number gap — it pulls open ShipBob RMAs with no TN, looks up the Shopify order to get the Mirakl order ID (stored in tags), calls Mirakl API to retrieve the carrier TN, and updates ShipBob RMA with it. Warehouse can now scan and receive every Nordstrom return normally.",
    outcome:
      "Eliminated manual parcel matching at FC. Returns now flow end-to-end without ops overhead. Inventory accuracy improved across all Nordstrom returns. Agent runs daily, 100% autonomous.",
    role: "Product + Automation Lead",
    stack: ["Shopify Flow", "Redo API", "Mirakl API", "ShipBob API", "Node.js"],
    links: {
      notion:
        "https://www.notion.so/Danara-s-AI-Projects-Portfolio-73fda0197f564f80820f1c0fa8950cea",
    },
    architecture: {
      nodes: [
        { id: "nordstrom", label: "Nordstrom", kind: "api" },
        { id: "mirakl", label: "Mirakl Connect", kind: "api" },
        { id: "shopify", label: "Shopify", kind: "api" },
        { id: "flow", label: "Shopify Flow", kind: "agent" },
        { id: "redo", label: "Redo WMS", kind: "api" },
        { id: "agent", label: "TN Agent", kind: "agent" },
        { id: "shipbob", label: "ShipBob", kind: "api" },
      ],
      edges: [
        { from: "nordstrom", to: "mirakl", label: "return approved" },
        { from: "mirakl", to: "shopify", label: "sync" },
        { from: "shopify", to: "flow", label: "trigger" },
        { from: "flow", to: "redo", label: "create RMA" },
        { from: "agent", to: "shopify", label: "get order" },
        { from: "agent", to: "mirakl", label: "get TN" },
        { from: "agent", to: "shipbob", label: "update RMA" },
      ],
    },
  },
  {
    id: "hive",
    title: "Hive — Multiplayer AI Coding",
    pillar: "apps",
    year: "2026",
    context: "hackathon",
    featured: true,
    tags: [
      { label: "agentic AI", color: "#9B7AE5" },
      { label: "multimodal", color: "#7DAFD3" },
      { label: "collaboration", color: "#D4A8BC" },
      { label: "real-time", color: "#F5A962" },
    ],
    problem:
      "PRs show what was built. They never show why. And when two engineers use AI agents on the same project, all of that reasoning is invisible to everyone else on the team.",
    built:
      "The first multiplayer AI coding environment. Hive connects Claude Code and Gemini CLI through a shared relay — two agents, one project, in real time. Engineers see each other's agent decisions as they happen. PMs get a chat that answers \"why did we build it this way?\" with the source session cited. Drop a whiteboard screenshot in and Gemini Vision cross-references the diagram against every agent session.",
    outcome:
      "Two AI agents from two different companies sharing context through one relay — live, working, and (as far as we know) the only tool doing this.",
    stack: [
      "Claude Code",
      "Gemini CLI",
      "Railtracks",
      "Claude Sonnet",
      "Gemini Flash",
      "Assistant UI",
      "DigitalOcean",
    ],
    links: {},
    video: {
      type: "youtube",
      url: "https://youtu.be/VvuwTTuI1JY",
      label: "demo",
    },
    architecture: {
      nodes: [
        { id: "claude", label: "Claude Code", kind: "agent" },
        { id: "gemini", label: "Gemini CLI", kind: "agent" },
        { id: "relay", label: "DigitalOcean relay", kind: "api" },
        { id: "rt", label: "Railtracks", kind: "agent" },
        { id: "sonnet", label: "Claude Sonnet", kind: "llm" },
        { id: "ui", label: "Chat UI", kind: "ui" },
      ],
      edges: [
        { from: "claude", to: "relay", label: "sessions" },
        { from: "gemini", to: "relay", label: "sessions" },
        { from: "relay", to: "rt", label: "events" },
        { from: "rt", to: "sonnet", label: "Q&A" },
        { from: "sonnet", to: "ui", label: "answer" },
      ],
    },
  },
  {
    id: "neuroquest",
    title: "Neuroquest — Duolingo for Computational Neuroscience",
    pillar: "apps",
    year: "2025 — 2026",
    context: "side project",
    tags: [
      { label: "AI-coded app", color: "#9B7AE5" },
      { label: "spaced repetition", color: "#7DAFD3" },
      { label: "neuroscience", color: "#BD8AA0" },
    ],
    problem:
      "Learning computational neuroscience from textbooks is dense and dry. I wanted something fun and interactive — closer to Duolingo than a 600-page PDF.",
    built:
      "A maze-like treasure hunt with a deer mascot (Ilya) guiding you through lessons. Every concept is followed by an immediate quiz, so there's no passive reading — and a spaced-repetition layer brings cards back when you're about to forget them. Vibe-coded the whole thing with Claude in tight feedback loops.",
    outcome:
      "Live and shareable. Now opening it up to the broader neuroscience community to help democratize computational neuroscience learning.",
    stack: ["Next.js", "Zustand", "Spaced repetition", "Vercel", "Claude"],
    links: {
      demo: "https://neuroquest-danaraais-projects.vercel.app/map",
    },
    architecture: {
      nodes: [
        { id: "ui", label: "Next.js app", kind: "ui" },
        { id: "state", label: "Zustand store", kind: "db" },
        { id: "sr", label: "Spaced repetition", kind: "agent" },
        { id: "content", label: "Lesson content", kind: "db" },
      ],
      edges: [
        { from: "ui", to: "state", label: "progress" },
        { from: "content", to: "ui", label: "lessons" },
        { from: "state", to: "sr", label: "review queue" },
        { from: "sr", to: "ui", label: "due cards" },
      ],
    },
  },
  {
    id: "npd-assistant",
    title: "NPD Assistant — Multi-Agent Copilot for Shopify Brands",
    pillar: "automation",
    year: "2025",
    context: "hackathon · partnered with Amazon AI advisors",
    role: "Product + AI logic",
    featured: true,
    tags: [
      { label: "agentic AI", color: "#9B7AE5" },
      { label: "multi-agent", color: "#7DAFD3" },
      { label: "market research", color: "#94BAA8" },
    ],
    problem:
      "80% of new apparel SKUs fail, and mistimed launches cause customer churn. Small Shopify founders have to weigh historical sales, seasonality, trending colors, and customer demographics in their head — one of the most expensive and uncertain decisions in e-commerce.",
    built:
      "An AI-powered copilot that tells Shopify merchants what to launch next, and why. A multi-agent system on Amazon Bedrock: a Market Research agent (Tavily web search) pulls trending colors and categories; a Sales Analysis agent ingests the brand's own Shopify CSV and finds top sellers, underperformers, and category gaps; a Strategic Advisor agent synthesizes both and produces a final product recommendation with reasoning.",
    outcome:
      "Validated against 2024 Jack Archer sales data: the copilot recommended athletic shorts. The brand independently launched athletic shorts in 2025 — they became a top 2 bestseller.",
    stack: [
      "Amazon Bedrock",
      "Multi-agent",
      "Tavily Search API",
      "Shopify CSV",
      "Python",
    ],
    links: {
      github: "https://github.com/Danaraai/new-prod-dev-assistant",
      demo: "https://www.loom.com/share/fea90acc795f4d78b587122c1b6fe83f",
      deck: "https://drive.google.com/file/d/1QDhF8krLrsU1aEBtW9zwXGD7tnmUC8l-/view?usp=drive_link",
    },
    video: {
      type: "loom",
      url: "https://www.loom.com/share/fea90acc795f4d78b587122c1b6fe83f",
      label: "walkthrough",
    },
    architecture: {
      nodes: [
        { id: "csv", label: "Shopify CSV", kind: "ui" },
        { id: "tavily", label: "Tavily search", kind: "api" },
        { id: "sales", label: "Sales Analysis", kind: "agent" },
        { id: "research", label: "Market Research", kind: "agent" },
        { id: "advisor", label: "Strategic Advisor", kind: "agent" },
        { id: "rec", label: "Recommendation", kind: "ui" },
      ],
      edges: [
        { from: "csv", to: "sales", label: "data" },
        { from: "tavily", to: "research", label: "trends" },
        { from: "sales", to: "advisor", label: "insights" },
        { from: "research", to: "advisor", label: "signals" },
        { from: "advisor", to: "rec", label: "decision" },
      ],
    },
  },
  {
    id: "wholesale-onboarding",
    title: "Wholesale Customer Onboarding Automation",
    pillar: "automation",
    year: "2026",
    context: "internal tool",
    tags: [
      { label: "AI automation", color: "#9B7AE5" },
      { label: "supply chain", color: "#7DAFD3" },
    ],
    problem:
      "Onboarding new wholesale customers required manual coordination across multiple internal systems before a new account could place its first order — slow, repetitive, and error-prone.",
    built:
      "An automation that handles the end-to-end setup: collecting customer info, configuring account terms, syncing across systems, and confirming when the account is ready to order.",
    outcome:
      "Reduced onboarding time from [N] days to [N] hours and removed the manual hand-offs between teams.",
    stack: ["Internal automation", "ops integrations"],
    links: {},
    video: {
      type: "loom",
      url: "https://www.loom.com/share/6a49d3179c1648d1aa5385d8d5746792",
      label: "walkthrough",
    },
    architecture: { nodes: [], edges: [] },
  },
  {
    id: "3pl-billing-calculator",
    title: "3PL Billing Calculator — Built with AI Tooling",
    pillar: "automation",
    year: "2025",
    context: "internal tool · 3PL operations",
    tags: [
      { label: "automation", color: "#9B7AE5" },
      { label: "operations", color: "#7DAFD3" },
      { label: "billing", color: "#94BAA8" },
      { label: "prompt engineering", color: "#F5A962" },
    ],
    problem:
      "Our warehouse transitioned to a 3PL business model, taking on external brand fulfillment. We needed a scalable billing system to invoice clients across four service categories — fulfillment, receiving, storage, and value-added services — that consolidated PowerBI exports, WRO logs, and storage tracking into client-ready invoices, automatically.",
    built:
      "An 8-tab Excel billing calculator with 110+ interconnected formulas. A single dropdown filters all transactions by month and produces an itemized invoice — every shipment with tracking ID, every WRO with labor details, every storage item pro-rated. Built end-to-end with Claude as the development accelerant: I designed the architecture and wrote a 500-word prompt specifying data flows, formula logic, and edge cases. I tested the same prompt across Claude, ChatGPT, and Perplexity — Claude was the only one that produced a working spreadsheet with proper formulas (the others returned hardcoded values or non-downloadable files).",
    outcome:
      "Eliminated manual invoice creation, cut the billing cycle from hours to minutes, and gave clients line-by-line transparency. Claude delivered ~90% production-ready output in 30 minutes (vs. ~6 hours of manual build).",
    stack: ["Excel", "Claude (dev tool)", "Prompt engineering", "PowerBI"],
    links: {
      sheet: "https://docs.google.com/spreadsheets/d/1XOG7CfhknDSfvXoQtEnylJos5P_lDy1F/edit?gid=198696196",
    },
    architecture: {
      nodes: [
        { id: "powerbi", label: "PowerBI exports", kind: "api" },
        { id: "wro", label: "WRO logs", kind: "api" },
        { id: "storage", label: "Storage data", kind: "api" },
        { id: "addon", label: "Add-on services", kind: "api" },
        { id: "calc", label: "Excel calculator", kind: "agent" },
        { id: "invoice", label: "Client invoice", kind: "ui" },
      ],
      edges: [
        { from: "powerbi", to: "calc", label: "shipments" },
        { from: "wro", to: "calc", label: "receiving" },
        { from: "storage", to: "calc", label: "inventory" },
        { from: "addon", to: "calc", label: "services" },
        { from: "calc", to: "invoice", label: "itemized" },
      ],
    },
  },
];
