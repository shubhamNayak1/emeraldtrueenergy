"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";

const STATS = [
  { value: 12, suffix: "+", label: "Projects completed" },
  { value: 50, suffix: "+ kW", label: "Installed capacity" },
  { value: 6,  suffix: "",   label: "Cities covered" },
  { value: 100, suffix: "%", label: "In-house team" },
];

export function Stats() {
  return (
    <section className="border-y border-emerald-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:gap-8 sm:px-6 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1}>
            <div className="text-center sm:text-left">
              <div className="font-display text-4xl font-extrabold tracking-tight text-emerald-700 sm:text-5xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-ink/55 sm:text-sm">
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
