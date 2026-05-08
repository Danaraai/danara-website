"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="max-w-[60ch] text-[20px] leading-[1.55] text-ink md:text-[22px]">
            Hi, I&rsquo;m{" "}
            <span className="font-medium">Danara</span> &mdash; I build
            AI-powered systems for real-world problems. At work, I automate
            complex processes. At hackathons, I test new ideas fast. On the
            side, I geek out about AI infra and neuroscience.
          </p>

          <p className="mt-8 max-w-[64ch] font-serif text-[15.5px] italic leading-[1.65] text-ink-muted md:text-[16px]">
            Looking back at the projects I&rsquo;ve built &mdash; across my
            career and on free time &mdash; the common thread is that I love
            building and exploring systems, understanding dependencies.
            That&rsquo;s why I love automating supply chain processes,
            building agentic AI, understanding inference infrastructure, and
            taking neuroscience courses on the side. All of it fascinates me.
          </p>

          <p className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-ink-muted">
            <span>
              Some of what I&rsquo;ve built &mdash; pick one to see how
              it&rsquo;s wired.
            </span>
            <span className="text-ink-faint" aria-hidden>
              ·
            </span>
            <a
              href="#resume"
              className="group inline-flex items-center gap-1 text-ink-secondary underline decoration-ink/20 underline-offset-[5px] transition hover:text-ink hover:decoration-ink"
            >
              Or read the résumé
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
