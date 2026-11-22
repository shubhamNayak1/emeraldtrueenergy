"use client";

import { motion, useReducedMotion } from "motion/react";
import { Sparkles } from "lucide-react";

type Props = {
  items: string[];
  /** Seconds for one full loop. Default 32. */
  duration?: number;
};

/**
 * Infinite horizontal marquee of trust phrases. Pauses on hover.
 * Items are rendered twice back-to-back so the loop is seamless.
 */
export function Marquee({ items, duration = 32 }: Props) {
  const reduce = useReducedMotion();
  const group = (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {items.map((item) => (
        <span
          key={item}
          className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-800 sm:text-sm"
        >
          {item}
          <Sparkles className="h-4 w-4 text-sun-500" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="group/marquee relative overflow-hidden border-y border-emerald-100/70 bg-gradient-to-r from-emerald-50 via-cream to-sun-50 py-4">
      {/* Edge fade so items don't clip harshly at the viewport edges. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-cream to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-cream to-transparent" />
      <motion.div
        className="flex w-max"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        style={{ animationPlayState: "running" }}
      >
        {group}
        {group}
      </motion.div>
    </div>
  );
}
