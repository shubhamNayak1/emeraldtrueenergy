"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "motion/react";

type Props = {
  to: number;
  /** Suffix like "+" or "kW" — rendered as part of the final string. */
  suffix?: string;
  /** Animation duration in seconds. */
  duration?: number;
  className?: string;
};

/**
 * Animates a number from 0 up to `to` the first time it scrolls into view.
 * Falls back to the final value immediately when prefers-reduced-motion.
 */
export function CountUp({ to, suffix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(motionValue, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, motionValue, reduce]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
