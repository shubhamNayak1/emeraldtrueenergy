"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, HeadphonesIcon, Leaf, ShieldCheck, Users, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { useT } from "@/i18n/LanguageProvider";
import type { TKey } from "@/i18n/translations";

type Promise = { icon: LucideIcon; titleKey: TKey; bodyKey: TKey };

const PROPS: Promise[] = [
  { icon: ShieldCheck,    titleKey: "why.1.title", bodyKey: "why.1.body" },
  { icon: Users,          titleKey: "why.2.title", bodyKey: "why.2.body" },
  { icon: HeadphonesIcon, titleKey: "why.3.title", bodyKey: "why.3.body" },
  { icon: Leaf,           titleKey: "why.4.title", bodyKey: "why.4.body" },
];

export function WhyUs() {
  const { t } = useT();
  // Single shared state across all four cards. When any one is tapped on
  // mobile, every card expands together — otherwise the row-mate card
  // would stretch to match the open card's height but show no content.
  const [open, setOpen] = useState(false);

  return (
    <section className="pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel
          number="03"
          eyebrow={t("why.eyebrow")}
          title={t("why.title")}
        />

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-5">
          {PROPS.map((p, i) => (
            <Reveal key={p.titleKey} delay={(i % 2) * 0.1} className="h-full">
              <PromiseCard
                icon={p.icon}
                title={t(p.titleKey)}
                body={t(p.bodyKey)}
                open={open}
                onToggle={() => setOpen((v) => !v)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseCard({
  icon: Icon,
  title,
  body,
  open,
  onToggle,
}: {
  icon: LucideIcon;
  title: string;
  body: string;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-emerald-100 bg-white transition-shadow hover:shadow-lg hover:shadow-emerald-900/5 sm:rounded-3xl">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-emerald-50 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="relative flex h-full w-full flex-col items-start p-3 text-left sm:cursor-default sm:p-7"
      >
        <div className="flex w-full items-start gap-2 sm:gap-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/30 sm:h-14 sm:w-14 sm:rounded-2xl sm:shadow-lg">
            <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
          </div>
          <div className="flex min-w-0 flex-1 items-start gap-1.5 sm:gap-2">
            <h3 className="min-w-0 flex-1 break-words text-sm font-semibold leading-tight text-emerald-900 sm:text-lg">
              {title}
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
                <span className="block pt-3">{body}</span>
              </motion.p>
            )}
          </AnimatePresence>
          <p className="hidden text-sm leading-relaxed text-ink/65 sm:block">
            {body}
          </p>
        </div>
      </button>
    </div>
  );
}
