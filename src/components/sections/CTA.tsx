"use client";

import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { useT } from "@/i18n/LanguageProvider";

export function CTA() {
  const reduce = useReducedMotion();
  const { t } = useT();

  return (
    <section className="py-8 sm:py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="group relative isolate overflow-hidden rounded-[2rem] bg-emerald-800 px-8 py-12 text-center text-white shadow-2xl shadow-emerald-900/20 sm:px-12">
            {/* Aurora mesh — continuously-shifting radial gradients */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800" />
              <motion.div
                className="absolute -left-20 -top-16 h-80 w-80 rounded-full bg-mint-300/40 blur-3xl"
                animate={reduce ? undefined : { x: [0, 60, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute right-0 top-10 h-72 w-72 rounded-full bg-sun-400/45 blur-3xl"
                animate={reduce ? undefined : { x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-20 left-1/3 h-80 w-80 rounded-full bg-emerald-400/50 blur-3xl"
                animate={reduce ? undefined : { x: [0, -30, 20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Grain overlay */}
              <div className="grain absolute inset-0 opacity-50" />
            </div>

            <div className="relative">
              <motion.div
                initial={{ scale: 0.6, rotate: -20, opacity: 0 }}
                whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, delay: 0.15, ease: "backOut" }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur ring-1 ring-white/20"
              >
                <motion.div
                  animate={reduce ? undefined : { rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="h-8 w-8 text-sun-200" />
                </motion.div>
              </motion.div>

              <h2 className="mt-6 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                {t("cta.title")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-emerald-50/90 sm:text-base">
                {t("cta.sub")}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-700 shadow-xl shadow-black/10 transition hover:scale-105 hover:bg-emerald-50"
                >
                  {t("cta.btn")}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
