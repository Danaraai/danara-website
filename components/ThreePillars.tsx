"use client";

import { motion } from "framer-motion";
import SectionLabel from "./SectionLabel";

type Pillar = {
  number: string;
  title: string;
  description: string;
  accent: string;
  tags: string[];
  href: string;
};

const pillars: Pillar[] = [
  {
    number: "01",
    title: "AI Automation & Agentic AI",
    description:
      "Building agentic pipelines to scale operational bandwidth without scaling headcount.",
    accent: "#8B6BB5",
    tags: ["supply chain", "LangGraph", "AI ops", "n8n"],
    href: "#work",
  },
  {
    number: "02",
    title: "Apps I'm Building",
    description:
      "Designing human-in-the-loop interfaces that abstract away model complexities.",
    accent: "#6B9EC8",
    tags: ["hackathons", "vibe coding", "prototypes"],
    href: "#apps",
  },
  {
    number: "03",
    title: "Research & Passion",
    description:
      "Exploring novel embedding spaces and their alignment with cognitive models.",
    accent: "#C47EA0",
    tags: ["AI infrastructure", "GPU systems", "Neuromatch", "neuroscience"],
    href: "#research",
  },
];

export default function ThreePillars() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel number="01" title="what I'm building" />

        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.a
              key={p.number}
              href={p.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-card border border-hairline border-border bg-surface p-6 shadow-card transition-shadow hover:shadow-cardHover"
              style={
                {
                  ["--accent" as string]: p.accent,
                } as React.CSSProperties
              }
            >
              {/* Top accent line */}
              <span
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: p.accent }}
              />

              {/* Faint number background */}
              <span
                className="pointer-events-none absolute -bottom-4 right-2 select-none text-[88px] font-light leading-none text-ink"
                style={{ opacity: 0.05 }}
                aria-hidden
              >
                {p.number}
              </span>

              <div className="relative">
                <span
                  className="text-[11px] uppercase tracking-eyebrow"
                  style={{ color: p.accent }}
                >
                  {p.number}
                </span>
                <h3 className="mt-2 text-[15px] font-medium text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-[28ch] text-[13px] leading-relaxed text-ink-secondary">
                  {p.description}
                </p>

                <ul className="mt-6 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-pill bg-violet-chip px-2.5 py-1 text-[11px] text-violet-deep"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
