import { getProjects } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const projects = await safe(getProjects);

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Projects
          </span>
          <h1 className="mt-2 text-4xl font-bold text-emerald-900 sm:text-5xl">
            Installations we're proud of
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-ink/65">
            Rooftop solar across homes and businesses in Madhya Pradesh.
          </p>
        </header>

        {projects.length === 0 ? (
          <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-emerald-200 bg-white/60 px-6 py-10 text-center text-sm text-ink/55">
            Project photos will appear here once uploaded from the admin panel.
          </div>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.photoUrl} alt={p.title} className="aspect-[4/3] w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-semibold text-emerald-900">{p.title}</h3>
                  <p className="mt-1 text-sm text-ink/60">
                    {p.location}{p.kW ? ` · ${p.kW} kW` : ""}
                  </p>
                  {p.description && (
                    <p className="mt-3 text-sm text-ink/65 line-clamp-3">{p.description}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

async function safe<T>(fn: () => Promise<T[]>): Promise<T[]> {
  try { return await fn(); } catch { return []; }
}
