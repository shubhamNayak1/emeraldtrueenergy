"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles } from "lucide-react";
import { SETTINGS } from "@/content/settings";
import { getTimeOfDay, type TimeOfDay } from "@/lib/sun";

// Background gradient shifts subtly across the day. Tailwind only ships
// classes it sees as literal strings, so it's a fixed lookup.
const PHASE_BG: Record<TimeOfDay, string> = {
  dawn:   "from-sun-100 via-cream to-mint-100",
  day:    "from-emerald-50 via-cream to-sun-50",
  golden: "from-sun-200 via-sun-50 to-emerald-50",
  dusk:   "from-sun-300 via-sun-100 to-mint-100",
  night:  "from-mint-100 via-cream to-emerald-100",
};

export function Hero() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<TimeOfDay>("day");

  useEffect(() => {
    const tick = () => setPhase(getTimeOfDay(new Date()));
    tick();
    const i = setInterval(tick, 60_000);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="relative isolate flex min-h-[78vh] items-center overflow-hidden grain">
      {/* Layered background (the FloatingMolecules in the layout drift on top of this) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-[1500ms] ${PHASE_BG[phase]}`} />
        <div className="bg-grid absolute inset-0 opacity-70" />
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
          className="absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-mint-200/40 blur-3xl"
          animate={reduce ? undefined : { scale: [1, 1.18, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-14 text-center sm:px-6 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full border border-emerald-200/80 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-sun-500" />
            {SETTINGS.heroEyebrow}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: "easeOut" }}
          className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-emerald-900 sm:text-6xl md:text-7xl"
        >
          <span className="block">{SETTINGS.heroTitle1}</span>
          <span className="block bg-gradient-to-r from-emerald-700 via-emerald-500 to-mint-400 bg-clip-text text-transparent">
            {SETTINGS.heroTitle2}
          </span>
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-sun-600 via-sun-500 to-sun-400 bg-clip-text text-transparent">
              {SETTINGS.heroTitle3}
            </span>
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
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ink/70 sm:text-lg"
        >
          {SETTINGS.heroSubtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/25 transition hover:shadow-xl hover:shadow-emerald-600/40"
          >
            <span className="relative z-10">Talk to us</span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-500 via-emerald-600 to-mint-400 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="#projects"
            className="glass inline-flex items-center gap-2 rounded-full border border-emerald-200 px-7 py-3.5 text-sm font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:border-emerald-400"
          >
            See our work
          </Link>
        </motion.div>

        {/* First-fold trust row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-900/60 sm:text-xs"
        >
          <TrustDot>100+ installations</TrustDot>
          <TrustDot>6 cities in MP</TrustDot>
          <TrustDot>Tier-1 components</TrustDot>
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

function TrustDot({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-emerald-500 to-mint-400 shadow-[0_0_8px] shadow-mint-300" />
      {children}
    </span>
  );
}
