"use client";

import { Reveal } from "@/components/motion/Reveal";
import { REVIEWS } from "@/content/reviews";

export function Reviews() {
  if (REVIEWS.length === 0) return null;

  return (
    <section className="bg-emerald-50/40 pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Client voices
            </span>
            <h2 className="mt-3 text-4xl font-bold text-emerald-900 sm:text-5xl">
              Trusted by homes & businesses
            </h2>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {REVIEWS.slice(0, 6).map((r, i) => (
            <Reveal key={`${r.clientName}-${i}`} delay={(i % 3) * 0.1} className="h-full">
              <figure className="group relative flex h-full flex-col rounded-2xl border border-emerald-100 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5">
                <div className="mb-3 flex gap-0.5 text-sun-500">
                  {Array.from({ length: r.stars }).map((_, k) => (
                    <Star key={k} />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-ink/75">"{r.text}"</blockquote>
                <figcaption className="mt-5 text-xs font-semibold text-emerald-800">
                  {r.clientName}
                  {r.location && <span className="text-ink/50"> · {r.location}</span>}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M9.05.46c.35-.7 1.55-.7 1.9 0l2.07 4.2 4.63.67c.78.11 1.09 1.06.53 1.6l-3.35 3.27.79 4.61c.13.78-.69 1.36-1.39.99L10 13.6l-4.13 2.18c-.7.37-1.52-.21-1.39-.99l.79-4.61L1.92 6.93c-.56-.54-.25-1.49.53-1.6l4.63-.67L9.05.46z" />
    </svg>
  );
}
