"use client";

import { motion } from "motion/react";
import { Sun, Battery, Factory, Droplets, Wrench, FileCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SERVICES } from "@/content/services";

const ICONS = [Sun, Battery, Factory, Droplets, Wrench, FileCheck];

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 pt-16 pb-10 sm:pt-20 sm:pb-12">
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

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-900/5 sm:p-6"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-tight text-emerald-900 sm:mt-5 sm:text-lg">{s.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/65 sm:mt-2 sm:text-sm">{s.description}</p>
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
