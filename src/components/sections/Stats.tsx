"use client";

import { Reveal } from "@/components/motion/Reveal";
import { CountUp } from "@/components/motion/CountUp";
import { useT } from "@/i18n/LanguageProvider";
import type { TKey } from "@/i18n/translations";

const STATS = [
  { value: 100, suffix: "+",    labelKey: "stats.projects" as TKey, accent: "emerald" },
  { value: 500, suffix: "+ kW", labelKey: "stats.capacity" as TKey, accent: "sun"     },
  { value: 6,   suffix: "",     labelKey: "stats.cities"   as TKey, accent: "mint"    },
  { value: 100, suffix: "%",    labelKey: "stats.team"     as TKey, accent: "emerald" },
] as const;

const ACCENT: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-700",
  sun:     "from-sun-500 to-sun-600",
  mint:    "from-mint-400 to-emerald-500",
};

export function Stats() {
  const { t } = useT();
  return (
    <section className="relative -mt-6 border-y border-emerald-100/70 bg-white/60 py-10 backdrop-blur sm:-mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.labelKey} delay={i * 0.08} className="h-full">
              <div className="group glass relative h-full overflow-hidden rounded-2xl border border-emerald-100 p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5 sm:p-6">
                <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${ACCENT[s.accent]} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30`} />
                <div className="relative">
                  <div className={`font-display bg-gradient-to-br ${ACCENT[s.accent]} bg-clip-text text-4xl font-extrabold leading-none tracking-tight text-transparent sm:text-5xl md:text-6xl`}>
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/55 sm:text-xs">
                    {t(s.labelKey)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
