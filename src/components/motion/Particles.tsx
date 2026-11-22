"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

type Props = {
  count?: number;
  /** Colour tokens the dots cycle through. */
  colors?: string[];
  className?: string;
};

/**
 * A field of tiny glowing dots that drift upward, simulating solar
 * sparkles or embers. Uses a single <canvas> so hundreds of particles
 * stay cheap even with motion.
 */
export function Particles({
  count = 36,
  colors = ["#10b981", "#22d3ee", "#f59e0b"],
  className,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0, h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    type P = { x: number; y: number; vx: number; vy: number; r: number; c: string; a: number };
    const rand = (min: number, max: number) => Math.random() * (max - min) + min;
    const spawn = (): P => ({
      x: rand(0, w),
      y: rand(h * 0.5, h + 20),
      vx: rand(-0.08, 0.08),
      vy: rand(-0.4, -0.12),
      r: rand(0.9, 2.4),
      c: colors[Math.floor(Math.random() * colors.length)]!,
      a: rand(0.3, 0.9),
    });

    const particles: P[] = Array.from({ length: count }, spawn);
    let raf = 0;

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          Object.assign(p, spawn(), { y: h + rand(5, 30) });
        }
        ctx.beginPath();
        ctx.fillStyle = p.c + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, colors, reduce]);

  return <canvas ref={ref} aria-hidden className={className} />;
}
