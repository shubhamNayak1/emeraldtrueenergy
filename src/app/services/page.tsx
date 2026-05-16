import { Sun } from "lucide-react";
import { SERVICES } from "@/content/services";

export const metadata = {
  title: "Solar Services",
  description:
    "Residential, commercial and industrial rooftop solar — on-grid, off-grid with battery, solar water pumps, AMC, and net-meter assistance across Madhya Pradesh.",
};

export default function ServicesPage() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Services
          </span>
          <h1 className="mt-2 text-4xl font-bold text-emerald-900 sm:text-5xl">
            Solar solutions, end to end
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink/65">
            Sized for your bill, engineered for your roof, supported for the long run.
          </p>
        </header>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article key={s.title} className="rounded-2xl border border-emerald-100 bg-white p-6 transition hover:border-emerald-300 hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Sun className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-emerald-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{s.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
