"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Brand splash that plays once on first paint. ~2 seconds total:
 *   - Sun orb scales in with a spring
 *   - Rays start rotating around it
 *   - Six satellite dots burst outward (like molecules spreading)
 *   - Brand name types in with wide letterspacing
 *   - A gradient scan-line sweeps vertically across the viewport
 *   - A progress bar fills left-to-right
 *   - Everything fades out on completion, revealing the real site
 *
 * Users with `prefers-reduced-motion` skip the animation entirely so
 * the site appears instantly for them.
 */
export function LoadingSplash() {
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setDone(true);
      document.body.style.overflow = "";
    }, 2800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.65, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-cream" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.08),_transparent_70%)]" />

          {/* Subtle solar-tech grid */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(167,243,208,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(167,243,208,0.4) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            }}
          />

          {/* Vertical scan line sweeping top → bottom */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
            initial={{ top: "0%", opacity: 0 }}
            animate={{ top: "100%", opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.3, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Main stack: sun + brand + progress */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Sun with rotating rays */}
            <motion.svg
              viewBox="0 0 120 120"
              className="h-24 w-24 sm:h-28 sm:w-28"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, type: "spring", stiffness: 140, damping: 16 }}
            >
              <defs>
                <radialGradient id="splash-sun" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#fffbeb" />
                  <stop offset="40%" stopColor="#fde047" />
                  <stop offset="75%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </radialGradient>
                <radialGradient id="splash-halo">
                  <stop offset="0%"   stopColor="#fbbf24" stopOpacity="0.6" />
                  <stop offset="70%"  stopColor="#fbbf24" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
                </radialGradient>
                <filter id="splash-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
              </defs>

              {/* Breathing halo */}
              <motion.circle
                cx="60" cy="60" r="55"
                fill="url(#splash-halo)"
                filter="url(#splash-glow)"
                animate={{ scale: [1, 1.18, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Rotating ray cage */}
              <motion.g
                style={{ transformOrigin: "60px 60px" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              >
                {Array.from({ length: 12 }).map((_, i) => {
                  const angle = (i * 30 * Math.PI) / 180;
                  const r = (n: number) => Math.round(n * 100) / 100;
                  const x1 = r(60 + 32 * Math.cos(angle));
                  const y1 = r(60 + 32 * Math.sin(angle));
                  const x2 = r(60 + 46 * Math.cos(angle));
                  const y2 = r(60 + 46 * Math.sin(angle));
                  return (
                    <line
                      key={i}
                      x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke="#f59e0b"
                      strokeWidth="2.6"
                      strokeLinecap="round"
                    />
                  );
                })}
              </motion.g>

              {/* Core disc */}
              <circle cx="60" cy="60" r="22" fill="url(#splash-sun)" />
              <circle cx="54" cy="54" r="7" fill="#fffbeb" opacity="0.8" />
            </motion.svg>

            {/* Satellite dots bursting outward — "molecules" spreading */}
            {!reduce && (
              <div className="pointer-events-none absolute top-[calc(50%-1rem)] left-1/2 h-0 w-0">
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = (i * 45 * Math.PI) / 180;
                  const r = (n: number) => Math.round(n * 100) / 100;
                  const dx = r(Math.cos(angle) * 180);
                  const dy = r(Math.sin(angle) * 180);
                  return (
                    <motion.span
                      key={i}
                      className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-emerald-400 to-mint-300 shadow-[0_0_12px] shadow-emerald-300"
                      initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                      animate={{ x: dx, y: dy, opacity: [0, 0.9, 0], scale: [0, 1, 0.3] }}
                      transition={{ duration: 2.0, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                    />
                  );
                })}
              </div>
            )}

            {/* Brand name with wide spacing */}
            <motion.div
              initial={{ opacity: 0, y: 12, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.3em" }}
              transition={{ delay: 0.6, duration: 0.95, ease: "easeOut" }}
              className="text-center"
            >
              <div className="font-display text-base font-extrabold text-emerald-800 sm:text-lg">
                EMERALD<span className="text-sun-500">·</span>TRUE<span className="text-sun-500">·</span>ENERGY
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.6 }}
                className="mt-2 text-[9px] font-semibold uppercase tracking-[0.3em] text-emerald-700/60 sm:text-[10px]"
              >
                Powering Madhya Pradesh
              </motion.div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "14rem" }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="relative h-[2px] overflow-hidden rounded-full bg-emerald-100/80"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-mint-400 to-sun-500"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.85, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
              {/* Shimmer on the leading edge */}
              <motion.div
                className="absolute inset-y-0 w-10 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ left: "-10%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.85, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          </div>

          {/* Corner marks — futuristic UI chrome */}
          {!reduce && (
            <>
              <CornerMark className="top-6 left-6 rotate-0" />
              <CornerMark className="top-6 right-6 rotate-90" />
              <CornerMark className="bottom-6 right-6 rotate-180" />
              <CornerMark className="bottom-6 left-6 -rotate-90" />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function CornerMark({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className={`absolute h-5 w-5 text-emerald-600/50 ${className}`}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.75, duration: 0.5 }}
    >
      <path d="M 2 10 L 2 2 L 10 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="2" cy="2" r="1.5" fill="currentColor" />
    </motion.svg>
  );
}
