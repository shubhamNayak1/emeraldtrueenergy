"use client";

import Link from "next/link";
import { ArrowRight, Sun } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";

export function CTA() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 px-8 py-16 text-center text-white shadow-2xl shadow-emerald-900/20 sm:px-12">
            {/* Decorative orbs */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sun-400/30 blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-emerald-400/40 blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                <Sun className="h-7 w-7 text-sun-200" />
              </div>
              <h2 className="mt-5 text-3xl font-bold sm:text-4xl md:text-5xl">
                Ready to switch to solar?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-emerald-50/90">
                Get a personalized quotation in under a minute — designed around your roof, your bill, and your goals.
              </p>
              <div className="mt-8">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-emerald-700 shadow-xl shadow-black/10 transition hover:scale-105 hover:bg-emerald-50"
                >
                  Talk to us
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
