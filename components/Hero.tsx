"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative pb-3 pt-16 md:pb-4 md:pt-20"
    >
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          <p className="text-[18px] leading-[1.6] text-ink md:text-[20px]">
            Hi, I&rsquo;m{" "}
            <span className="font-medium">Danara</span> &mdash; I build
            AI-powered systems for real-world problems. At work, I automate
            complex processes. At hackathons, I test new ideas fast. On the
            side, I geek out about AI infra and neuroscience.
          </p>
        </div>

        <div className="mx-auto max-w-[820px] px-6 md:px-10 mt-4">
          <div className="rounded-card bg-violet-fill bg-opacity-40 px-5 py-4">
            <p className="text-[14.5px] leading-[1.65] text-ink md:text-[15px]">
              The common thread across my work is systems. I like
              understanding how complex parts connect &mdash; then turning
              that complexity into automation, infrastructure, and intelligent
              workflows. That&rsquo;s what draws me to supply chain
              automation, agentic AI, inference infrastructure, and
              neuroscience.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
