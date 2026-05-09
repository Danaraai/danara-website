"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative pb-4 pt-16 md:pb-6 md:pt-20"
    >
      <div className="mx-auto max-w-2xl px-6 md:px-10 text-center">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[18px] leading-[1.5] text-ink md:text-[19px]">
            Hi, I&rsquo;m{" "}
            <span className="font-medium">Danara</span> &mdash; I build
            AI-powered systems for real-world problems. At work, I automate
            complex processes. At hackathons, I test new ideas fast. On the
            side, I geek out about AI infra and neuroscience.
          </p>

          <p className="mt-5 font-serif text-[14.5px] italic leading-[1.6] text-ink-muted md:text-[15px]">
            The common thread across my work is systems. I like
            understanding how complex parts connect &mdash; then turning
            that complexity into automation, infrastructure, and intelligent
            workflows. That&rsquo;s what draws me to supply chain
            automation, agentic AI, inference infrastructure, and
            neuroscience.
          </p>

        </motion.div>
      </div>
    </section>
  );
}
