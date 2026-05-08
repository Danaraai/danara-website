"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "section" | "span" | "li";
};

export default function Reveal({
  children,
  delay = 0,
  y = 14,
  className,
  as = "div",
}: Props) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;

  return (
    <M
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      }}
      className={className}
    >
      {children}
    </M>
  );
}
