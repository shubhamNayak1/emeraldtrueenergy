"use client";

import { motion, useReducedMotion } from "motion/react";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Delay in seconds before this item animates in. */
  delay?: number;
  /** Vertical offset to animate from (px). */
  y?: number;
  /** Element to render. Defaults to a div. */
  as?: keyof HTMLMotionProps<"div">;
  className?: string;
};

/**
 * Fade + slide-up on scroll into view. Respects prefers-reduced-motion.
 * Fires once per element, after ~12% of it is visible.
 */
export function Reveal({ children, delay = 0, y = 24, className }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 1.02, 0.73, 0.99] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
