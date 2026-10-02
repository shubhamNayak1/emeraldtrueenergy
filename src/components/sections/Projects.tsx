"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, MapPin, Zap } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { PROJECTS } from "@/content/projects";

const MOBILE_INITIAL_COUNT = 4;

export function Projects() {
  const cities = useMemo(() => {
    const set = new Set<string>();
    for (const p of PROJECTS) {
      const city = p.location.split(",")[0]!.trim();
      set.add(city);
    }
    return ["All", ...Array.from(set).sort()];
  }, []);

  const [filter, setFilter] = useState("All");
  const [showAllMobile, setShowAllMobile] = useState(false);

  const visible = PROJECTS.filter(
    (p) => filter === "All" || p.location.startsWith(filter),
  );
  const hiddenOnMobile = Math.max(0, visible.length - MOBILE_INITIAL_COUNT);

  return (
    <section id="projects" className="scroll-mt-20 bg-gradient-to-b from-emerald-50/40 via-emerald-50/20 to-cream pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Recent projects
            </span>
            <h2 className="mt-3 text-3xl font-bold text-emerald-900 sm:text-4xl md:text-5xl">
              Installations across Madhya Pradesh
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-ink/65 sm:mt-4 sm:text-base">
              A glimpse of real rooftops we've energized — click a city to filter.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {cities.map((c) => {
              const active = c === filter;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/25"
                      : "bg-white text-ink/70 ring-1 ring-emerald-100 hover:bg-emerald-50 hover:text-emerald-800"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.div
          layout
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => {
              const hiddenMobile = i >= MOBILE_INITIAL_COUNT && !showAllMobile;
              return (
                <motion.article
                  key={p.photo}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.3) }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-900/10 ${
                    hiddenMobile ? "hidden sm:block" : ""
                  }`}
                >
                  <div className="overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.photo}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                    <Zap className="h-3 w-3 fill-sun-300 text-sun-300" />
                    {p.kW ? `${p.kW} kW` : "Rooftop"}
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-emerald-900">{p.title}</h3>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink/60">
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                      {p.location}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hiddenOnMobile > 0 && (
          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowAllMobile((v) => !v)}
              className="group inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-5 py-2.5 text-sm font-semibold text-emerald-800 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
            >
              {showAllMobile ? "Show less" : `Show all ${visible.length} projects`}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${showAllMobile ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
