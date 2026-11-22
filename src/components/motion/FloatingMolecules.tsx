"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Ambient brand-decoration layer: tiny suns, solar panels, and houses
 * drifting across the whole viewport behind every page. Low opacity so
 * the molecules read as atmosphere, not content. `pointer-events-none`
 * so they never block clicks.
 *
 * Fixed to the viewport: as the user scrolls, the same molecules keep
 * floating in place — a persistent "we're a solar company" visual
 * language for the entire site.
 */

type MoleculeType = "sun" | "panel" | "house";

type Molecule = {
  type: MoleculeType;
  /** Starting position as a percentage of the viewport. */
  xPct: number;
  yPct: number;
  /** Icon size in px. */
  size: number;
  /** One full drift-loop duration in seconds. */
  duration: number;
  delay: number;
  /** Which of the drift patterns below to follow. */
  patternIdx: number;
};

// Drift patterns — keyframes for x/y translation (in px) that each
// molecule loops through. Patterns are varied so neighbouring molecules
// don't all move in the same direction.
const DRIFT_PATTERNS = [
  { x: [0,  55, -25,  10, 0], y: [0, -35,  25, -15, 0], r: [0,  12, -8,   5, 0] },
  { x: [0, -45,  30, -10, 0], y: [0,  30, -40,  10, 0], r: [0,  -9, 11,  -4, 0] },
  { x: [0,  40,  50,   0, 0], y: [0, -50, -15,  20, 0], r: [0,  14, -6, -10, 0] },
  { x: [0, -60, -20,  15, 0], y: [0,  35,  50, -10, 0], r: [0,  -5, 10,  -3, 0] },
];

const MOLECULES: Molecule[] = [
  // Top band
  { type: "sun",   xPct:  6, yPct:  8, size: 38, duration: 46, delay: 0.0, patternIdx: 0 },
  { type: "panel", xPct: 46, yPct:  6, size: 30, duration: 52, delay: 3.0, patternIdx: 1 },
  { type: "house", xPct: 90, yPct: 11, size: 32, duration: 44, delay: 2.0, patternIdx: 2 },

  // Upper-middle
  { type: "sun",   xPct: 68, yPct: 24, size: 22, duration: 58, delay: 8.0, patternIdx: 3 },
  { type: "panel", xPct: 20, yPct: 30, size: 26, duration: 54, delay: 5.0, patternIdx: 1 },
  { type: "house", xPct: 58, yPct: 48, size: 24, duration: 50, delay: 2.5, patternIdx: 2 },

  // Lower-middle
  { type: "panel", xPct:  8, yPct: 50, size: 28, duration: 48, delay: 4.5, patternIdx: 0 },
  { type: "sun",   xPct: 92, yPct: 46, size: 28, duration: 50, delay: 6.5, patternIdx: 3 },

  // Bottom band
  { type: "house", xPct: 16, yPct: 74, size: 34, duration: 44, delay: 3.5, patternIdx: 2 },
  { type: "sun",   xPct: 52, yPct: 80, size: 26, duration: 48, delay: 1.0, patternIdx: 0 },
  { type: "panel", xPct: 84, yPct: 72, size: 30, duration: 46, delay: 6.0, patternIdx: 1 },

  // Extras
  { type: "sun",   xPct: 34, yPct: 22, size: 20, duration: 60, delay: 5.5, patternIdx: 0 },
  { type: "house", xPct: 76, yPct: 88, size: 22, duration: 56, delay: 7.0, patternIdx: 3 },
];

export function FloatingMolecules() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden" aria-hidden>
      {MOLECULES.map((m, i) => {
        const pattern = DRIFT_PATTERNS[m.patternIdx]!;
        return (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{ left: `${m.xPct}%`, top: `${m.yPct}%` }}
            animate={reduce ? undefined : { x: pattern.x, y: pattern.y, rotate: pattern.r }}
            transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <MoleculeIcon type={m.type} size={m.size} />
          </motion.div>
        );
      })}
    </div>
  );
}

function MoleculeIcon({ type, size }: { type: MoleculeType; size: number }) {
  if (type === "sun")   return <SunIcon size={size} />;
  if (type === "panel") return <PanelIcon size={size} />;
  return <HouseIcon size={size} />;
}

function SunIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <defs>
        <radialGradient id={`sun-grad-${size}`}>
          <stop offset="0%"   stopColor="#fef08a" />
          <stop offset="60%"  stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="10" fill={`url(#sun-grad-${size})`} />
      <g stroke="#f59e0b" strokeWidth="2.4" strokeLinecap="round">
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const r1 = 15, r2 = 22;
          const r = (n: number) => Math.round(n * 100) / 100;
          const x1 = r(24 + r1 * Math.cos(angle));
          const y1 = r(24 + r1 * Math.sin(angle));
          const x2 = r(24 + r2 * Math.cos(angle));
          const y2 = r(24 + r2 * Math.sin(angle));
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
}

function PanelIcon({ size }: { size: number }) {
  // Panel sits in a 3:2-ish box, slightly rotated for an isometric feel.
  const h = Math.round((size * 32) / 48);
  return (
    <svg viewBox="0 0 48 32" width={size} height={h}>
      <g transform="rotate(-15 24 16)">
        <rect x="6" y="6" width="36" height="20" rx="2" fill="#1e40af" stroke="#0f172a" strokeWidth="0.8" />
        <g stroke="#60a5fa" strokeWidth="0.8" opacity="0.6">
          <line x1="6" y1="13" x2="42" y2="13" />
          <line x1="6" y1="19" x2="42" y2="19" />
          <line x1="15" y1="6" x2="15" y2="26" />
          <line x1="24" y1="6" x2="24" y2="26" />
          <line x1="33" y1="6" x2="33" y2="26" />
        </g>
      </g>
    </svg>
  );
}

function HouseIcon({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size}>
      <polygon points="6,26 24,8 42,26" fill="#047857" stroke="#065f46" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="10" y="26" width="28" height="18" fill="#fef3c7" stroke="#065f46" strokeWidth="1.2" />
      <rect x="20" y="32" width="8" height="12" fill="#78350f" />
      <rect x="30" y="30" width="6" height="6" fill="#bae6fd" stroke="#065f46" strokeWidth="0.6" />
    </svg>
  );
}
