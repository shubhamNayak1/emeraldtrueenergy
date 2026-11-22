"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  number: string; // "01", "02", …
  eyebrow: string;
  title: string;
  /** Soft paragraph under the title (optional). */
  sub?: string;
  align?: "center" | "left";
};

/**
 * Editorial-style section header: an oversized, ghosted numeral as the
 * backdrop, with the eyebrow + title layered over it. Anchors every
 * major section so visitors remember the page as a designed experience.
 */
export function SectionLabel({ number, eyebrow, title, sub, align = "center" }: Props) {
  const reduce = useReducedMotion();
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`relative flex flex-col ${alignClass}`}>
      <motion.span
        aria-hidden
        initial={reduce ? { opacity: 0.55 } : { opacity: 0, y: 16, scale: 0.94 }}
        whileInView={{ opacity: 0.55, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.21, 1.02, 0.73, 0.99] }}
        className="font-display pointer-events-none -mb-9 bg-gradient-to-b from-emerald-200/80 via-emerald-100/60 to-transparent bg-clip-text text-[clamp(3rem,8vw,5.5rem)] font-black leading-none tracking-tighter text-transparent sm:-mb-14"
      >
        {number}
      </motion.span>
      <motion.span
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700"
      >
        <span className="mr-2 inline-block h-px w-5 translate-y-[-3px] bg-emerald-500 align-middle" />
        {eyebrow}
      </motion.span>
      <motion.h2
        initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="relative z-10 mt-2 text-3xl font-bold leading-tight text-emerald-900 sm:text-4xl md:text-5xl"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="relative z-10 mx-auto mt-3 max-w-2xl text-sm text-ink/65 sm:mt-4 sm:text-base"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
