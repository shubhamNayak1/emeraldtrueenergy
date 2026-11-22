"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

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
 *
 * SEO-aware: the final value is the React child, so SSR HTML contains
 * the real number ("12+") — important for crawlers that don't execute
 * JS. On mount the client resets the text to "0" so when the user
 * scrolls the counter into view, the count animation starts from 0
 * and smoothly reaches the target.
 */
export function CountUp({ to, suffix = "", duration = 1.4, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();

  // Reset to 0 on first paint so the count-up starts from a visible 0 rather
  // than jumping down from the SSR-rendered target value mid-animation.
  useEffect(() => {
    if (reduce) return;
    if (ref.current) ref.current.textContent = `0${suffix}`;
  }, [reduce, suffix]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, to, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {to}
      {suffix}
    </span>
  );
}
