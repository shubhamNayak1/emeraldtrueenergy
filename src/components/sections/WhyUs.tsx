"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HeadphonesIcon, Leaf, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type Promise = { icon: LucideIcon; title: string; body: string };

const PROPS: Promise[] = [
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
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Why Emerald True Energy
            </span>
            <h2 className="mt-3 text-3xl font-bold text-emerald-900 sm:text-5xl">
              Built on four promises
            </h2>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5">
          {PROPS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 0.1} className="h-full">
              <PromiseCard promise={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseCard({ promise }: { promise: Promise }) {
  const [open, setOpen] = useState(false);
  const Icon = promise.icon;

  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-emerald-100 bg-white transition-shadow hover:shadow-lg hover:shadow-emerald-900/5 sm:rounded-3xl">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="relative flex h-full w-full flex-col items-start p-3 text-left sm:cursor-default sm:p-7"
      >
        <div className="flex w-full items-start gap-2 sm:gap-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/30 sm:h-14 sm:w-14 sm:rounded-2xl sm:shadow-lg">
            <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="flex min-w-0 flex-1 items-start gap-1.5 sm:gap-2">
            <h3 className="min-w-0 flex-1 break-words text-[13px] font-semibold leading-tight text-emerald-900 sm:text-lg">
              {promise.title}
            </h3>
            <ChevronDown
              aria-hidden
              className={`mt-0.5 h-4 w-4 shrink-0 text-emerald-700 transition-transform sm:hidden ${open ? "rotate-180" : ""}`}
            />
          </div>
        </div>

        {/* Mobile: expand/collapse. Desktop: always visible. */}
        <div className="sm:mt-2 sm:w-full">
          <AnimatePresence initial={false}>
            {open && (
              <motion.p
                key="body-mobile"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="overflow-hidden text-xs leading-relaxed text-ink/65 sm:hidden"
              >
                <span className="block pt-3">{promise.body}</span>
              </motion.p>
            )}
          </AnimatePresence>
          <p className="hidden text-sm leading-relaxed text-ink/65 sm:block">
            {promise.body}
          </p>
        </div>
      </button>
    </div>
  );
}
