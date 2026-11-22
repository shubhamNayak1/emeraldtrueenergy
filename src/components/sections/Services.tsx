"use client";

import { motion } from "motion/react";
import { Sun, Battery, Factory, Droplets, Wrench, FileCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/motion/SectionLabel";
import { useT } from "@/i18n/LanguageProvider";
import type { TKey } from "@/i18n/translations";

const ICONS = [Sun, Battery, Factory, Droplets, Wrench, FileCheck];

const SERVICE_KEYS: Array<{ titleKey: TKey; bodyKey: TKey }> = [
  { titleKey: "services.1.title", bodyKey: "services.1.body" },
  { titleKey: "services.2.title", bodyKey: "services.2.body" },
  { titleKey: "services.3.title", bodyKey: "services.3.body" },
  { titleKey: "services.4.title", bodyKey: "services.4.body" },
  { titleKey: "services.5.title", bodyKey: "services.5.body" },
  { titleKey: "services.6.title", bodyKey: "services.6.body" },
];

export function Services() {
  const { t } = useT();
  return (
    <section id="services" className="relative scroll-mt-20 pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionLabel
          number="01"
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          sub={t("services.sub")}
        />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {SERVICE_KEYS.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Reveal key={s.titleKey} delay={(i % 3) * 0.08} className="h-full">
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="conic-border group relative flex h-full flex-col overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-xl hover:shadow-emerald-900/5 sm:p-6"
                >
                  <div className="absolute right-0 top-0 h-32 w-32 translate-x-10 -translate-y-10 rounded-full bg-emerald-50 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-mint-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors group-hover:ring-emerald-300 sm:h-12 sm:w-12">
                      <Icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 sm:h-6 sm:w-6" />
                    </div>
                    <h3 className="mt-3 text-sm font-semibold leading-tight text-emerald-900 sm:mt-5 sm:text-lg">
                      {t(s.titleKey)}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-ink/65 sm:mt-2 sm:text-sm">
                      {t(s.bodyKey)}
                    </p>
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
