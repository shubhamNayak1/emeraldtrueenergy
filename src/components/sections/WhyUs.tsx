"use client";

import { ShieldCheck, Users, HeadphonesIcon, Leaf } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const PROPS = [
  {
    icon: ShieldCheck,
    title: "Tier-1 components only",
    body: "Mono-PERC and TopCon panels, branded inverters, and galvanized hot-dip mounting — every part is specified for 25+ years of outdoor service.",
  },
  {
    icon: Users,
    title: "Our team end-to-end",
    body: "No subcontractors shuffling your project. The same engineers survey, design, install, and commission — one point of accountability.",
  },
  {
    icon: HeadphonesIcon,
    title: "After-install support",
    body: "Net-meter paperwork with DISCOM, annual cleaning, monitoring, and AMC — all handled in-house so your system keeps generating peak.",
  },
  {
    icon: Leaf,
    title: "Honest numbers",
    body: "The quotation you download is the quotation we honor — itemized, with no hidden add-ons after installation starts.",
  },
];

export function WhyUs() {
  return (
    <section className="py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Why Emerald True Energy
            </span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-900 sm:text-5xl">
              Built on four promises
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {PROPS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1}>
              <div className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-emerald-900/5">
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative flex gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-lg shadow-emerald-500/30">
                    <p.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-emerald-900">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{p.body}</p>
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
