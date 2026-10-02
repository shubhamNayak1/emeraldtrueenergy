"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SETTINGS } from "@/content/settings";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden">
      {/* Animated gradient blobs — pure CSS, GPU-accelerated. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-cream to-sun-50" />
        <motion.div
          aria-hidden
          className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-emerald-300/30 blur-3xl"
          animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute -bottom-40 -right-32 h-[36rem] w-[36rem] rounded-full bg-sun-300/35 blur-3xl"
          animate={reduce ? undefined : { x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-200/25 blur-3xl"
          animate={reduce ? undefined : { scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:py-16">
        {/* Text sits above the artwork on mobile (artwork is absolute backdrop below). */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-white/70 px-3 py-1 text-xs font-semibold text-emerald-800 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-sun-500" />
              {SETTINGS.heroEyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
            className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-emerald-900 sm:text-5xl md:text-7xl"
          >
            <span className="block">{SETTINGS.heroTitle1}</span>
            <span className="block text-emerald-700">{SETTINGS.heroTitle2}</span>
            <span className="relative inline-block">
              <span className="relative z-10 text-sun-600">{SETTINGS.heroTitle3}</span>
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-0 h-3 bg-sun-200/70"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-5 max-w-xl text-base leading-relaxed text-ink/70 sm:mt-6 sm:text-lg"
          >
            {SETTINGS.heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="#contact"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:shadow-xl hover:shadow-emerald-600/40"
            >
              <span className="relative z-10">Talk to us</span>
              <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-7 py-3.5 text-sm font-semibold text-emerald-800 backdrop-blur transition hover:-translate-y-0.5 hover:border-emerald-400 hover:bg-white"
            >
              See our work
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          /*
           * Mobile: positioned absolutely BEHIND the text at low opacity so
           *         the artwork acts as a background illustration.
           * Desktop (md+): static grid column, full opacity, next to the
           *                text as before.
           */
          className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-45 sm:opacity-50 md:pointer-events-auto md:static md:z-auto md:mx-auto md:w-full md:max-w-md md:items-stretch md:justify-center md:opacity-100"
        >
          <div className="aspect-square w-80 max-w-full sm:w-[26rem] md:w-full">
            <SolarArtwork />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        aria-hidden
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <motion.div
          className="flex h-10 w-6 justify-center rounded-full border-2 border-emerald-700/40 pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-2 w-1 rounded-full bg-emerald-700/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SolarArtwork() {
  return (
    <div className="relative aspect-square">
      {/* Rotating sun ring */}
      <motion.svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <g stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" opacity="0.7">
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 200 + 150 * Math.cos(angle);
            const y1 = 200 + 150 * Math.sin(angle);
            const x2 = 200 + 170 * Math.cos(angle);
            const y2 = 200 + 170 * Math.sin(angle);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
      </motion.svg>

      {/* Sun core */}
      <div className="absolute inset-[22%] rounded-full bg-gradient-to-br from-sun-300 via-sun-400 to-sun-600 shadow-2xl shadow-sun-500/40" />
      <div className="absolute inset-[27%] rounded-full bg-gradient-to-br from-sun-200 to-sun-400 opacity-80" />

      {/* Solar panel floating in front */}
      <motion.div
        className="absolute left-1/2 bottom-6 -translate-x-1/2"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 220 140" className="w-56 drop-shadow-xl">
          <defs>
            <linearGradient id="panelFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <g transform="skewX(-14) translate(14 0)">
            <rect width="200" height="120" rx="4" fill="url(#panelFront)" />
            <g stroke="#60a5fa" strokeWidth="0.8" opacity="0.6">
              {[30, 60, 90].map((y) => (
                <line key={y} x1="0" y1={y} x2="200" y2={y} />
              ))}
              {[40, 80, 120, 160].map((x) => (
                <line key={x} x1={x} y1="0" x2={x} y2="120" />
              ))}
            </g>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
