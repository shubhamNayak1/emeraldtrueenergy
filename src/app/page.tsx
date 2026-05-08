import Link from "next/link";
import { ArrowRight, Sun, ShieldCheck, Wrench, Phone } from "lucide-react";
import { SERVICES } from "@/content/services";
import { PROJECTS } from "@/content/projects";
import { REVIEWS } from "@/content/reviews";
import { SETTINGS } from "@/content/settings";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-cream to-sun-50" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-16 pb-20 sm:px-6 md:grid-cols-2 md:pt-24 md:pb-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
              <Sun className="h-3.5 w-3.5" /> {SETTINGS.heroEyebrow}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight text-emerald-900 sm:text-5xl md:text-6xl">
              {SETTINGS.heroTitle1} <br />
              <span className="text-emerald-700">{SETTINGS.heroTitle2}</span>{" "}
              <span className="text-sun-500">{SETTINGS.heroTitle3}</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/70">
              {SETTINGS.heroSubtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-800 hover:border-emerald-400"
              >
                See our work
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -right-6 -top-6 h-40 w-40 rounded-full bg-sun-200/60 blur-2xl" />
            <div className="absolute -left-8 bottom-0 h-48 w-48 rounded-full bg-emerald-200/70 blur-2xl" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-100 via-white to-sun-100 shadow-xl">
              <SolarIllustration />
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-emerald-100 bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <Trust icon={<ShieldCheck />} title="Tier-1 components" body="Mono-PERC panels, branded inverters, certified mounting." />
          <Trust icon={<Wrench />} title="In-house team" body="No subcontractors. Same engineers from quote to commissioning." />
          <Trust icon={<Sun />} title="End-to-end support" body="Net-meter paperwork, monitoring, and AMC handled by us." />
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            eyebrow="What we do"
            title="Solar solutions for every roof"
            sub="From small homes to commercial sites, we design and install systems sized to your bill."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((s) => (
              <article key={s.title} className="rounded-2xl border border-emerald-100 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Sun className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-emerald-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65 line-clamp-3">{s.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/services" className="text-sm font-semibold text-emerald-700 hover:text-emerald-900">
              View all services →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50/50 section-pad">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead
            eyebrow="Recent projects"
            title="Installations across Madhya Pradesh"
            sub="A glimpse of what we've delivered for homes and businesses near you."
          />
          {PROJECTS.length === 0 ? (
            <EmptyState text="Project photos will appear here once added to src/content/projects.ts." />
          ) : (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.slice(0, 6).map((p) => (
                <article key={p.photo} className="overflow-hidden rounded-2xl bg-white shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.photo} alt={p.title} className="aspect-[4/3] w-full object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-emerald-900">{p.title}</h3>
                    <p className="mt-1 text-sm text-ink/60">{p.location}{p.kW ? ` · ${p.kW} kW` : ""}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {REVIEWS.length > 0 && (
        <section className="section-pad">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SectionHead eyebrow="Client voices" title="Trusted by homes & businesses" />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {REVIEWS.slice(0, 3).map((r, idx) => (
                <figure key={idx} className="rounded-2xl border border-emerald-100 bg-white p-6">
                  <div className="flex gap-0.5 text-sun-500">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>
                  <blockquote className="mt-3 text-sm leading-relaxed text-ink/75">"{r.text}"</blockquote>
                  <figcaption className="mt-4 text-xs font-semibold text-emerald-800">
                    {r.clientName}{r.location ? ` · ${r.location}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-pad">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 px-8 py-12 text-center text-white sm:px-12">
            <h2 className="text-3xl font-bold sm:text-4xl">Ready to switch to solar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-emerald-50/90">
              Get a personalized quotation in under a minute — designed around your roof and your bill.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
                <Phone className="h-4 w-4" /> Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{eyebrow}</span>
      <h2 className="mt-2 text-3xl font-bold text-emerald-900 sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-base text-ink/65">{sub}</p>}
    </div>
  );
}

function Trust({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-emerald-900">{title}</h3>
        <p className="mt-1 text-sm text-ink/65">{body}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="mx-auto mt-10 max-w-md rounded-2xl border border-dashed border-emerald-200 bg-white/60 px-6 py-10 text-center text-sm text-ink/55">
      {text}
    </div>
  );
}

function Star() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
      <path d="M9.05.46c.35-.7 1.55-.7 1.9 0l2.07 4.2 4.63.67c.78.11 1.09 1.06.53 1.6l-3.35 3.27.79 4.61c.13.78-.69 1.36-1.39.99L10 13.6l-4.13 2.18c-.7.37-1.52-.21-1.39-.99l.79-4.61L1.92 6.93c-.56-.54-.25-1.49.53-1.6l4.63-.67L9.05.46z" />
    </svg>
  );
}

function SolarIllustration() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbeafe" />
          <stop offset="100%" stopColor="#fffbeb" />
        </linearGradient>
        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#sky)" />
      <circle cx="320" cy="70" r="34" fill="#fbbf24" />
      <g stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
        <line x1="320" y1="20" x2="320" y2="32" />
        <line x1="320" y1="108" x2="320" y2="120" />
        <line x1="270" y1="70" x2="282" y2="70" />
        <line x1="358" y1="70" x2="370" y2="70" />
        <line x1="285" y1="35" x2="293" y2="43" />
        <line x1="347" y1="97" x2="355" y2="105" />
        <line x1="285" y1="105" x2="293" y2="97" />
        <line x1="347" y1="43" x2="355" y2="35" />
      </g>
      <polygon points="20,220 200,150 380,220 380,260 20,260" fill="#fef3c7" />
      <polygon points="20,220 200,150 380,220" fill="#fde68a" opacity="0.5" />
      <g transform="translate(75 165) rotate(-12)">
        <rect width="240" height="80" rx="3" fill="url(#panel)" />
        <g stroke="#60a5fa" strokeWidth="0.6" opacity="0.6">
          <line x1="0" y1="20" x2="240" y2="20" />
          <line x1="0" y1="40" x2="240" y2="40" />
          <line x1="0" y1="60" x2="240" y2="60" />
          <line x1="48" y1="0" x2="48" y2="80" />
          <line x1="96" y1="0" x2="96" y2="80" />
          <line x1="144" y1="0" x2="144" y2="80" />
          <line x1="192" y1="0" x2="192" y2="80" />
        </g>
      </g>
    </svg>
  );
}
