"use client";

import { motion } from "motion/react";
import { Sun, Battery, Factory, Droplets, Wrench, FileCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";

const ICONS = [Sun, Battery, Factory, Droplets, Wrench, FileCheck];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              What we do
            </span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-900 sm:text-5xl">
              Solar solutions for every roof
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
              From small homes to commercial sites, we design and install systems
              sized to your bill — with full end-to-end support.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-900/5"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                      <Icon className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-emerald-900">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.description}</p>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
