"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin bar at the very top of the viewport that fills from left to right
 * as the user scrolls. The spring smooths the raw scroll progress so it
 * never jitters.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-emerald-500 via-mint-400 to-sun-500"
      style={{ scaleX }}
    />
  );
}
