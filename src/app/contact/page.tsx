import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { ContactWhatsAppButton } from "@/components/site/ContactWhatsAppButton";
import { getSiteSettings } from "@/lib/data";
import { DEFAULT_SETTINGS } from "@/lib/data";

export const revalidate = 60;
export const metadata = { title: "Contact" };

export default async function ContactPage() {
  let settings = DEFAULT_SETTINGS;
  try {
    settings = await getSiteSettings();
  } catch {
    /* fall back to defaults */
  }

  return (
    <section className="section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Get in touch
          </span>
          <h1 className="mt-2 text-4xl font-bold text-emerald-900 sm:text-5xl">
            Talk to us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink/65">
            Tell us about your roof and your bill — we'll come back with a sized recommendation.
          </p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-emerald-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-emerald-800">Send us a message</h2>
              <p className="mt-1 text-sm text-ink/60">
                We typically respond within a working day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>

          <aside className="lg:col-span-2 space-y-4">
            <ContactWhatsAppButton phone={settings.ownerWhatsApp} />

            <div className="rounded-2xl border border-emerald-100 bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
                Reach us
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-ink/75">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <a href={`tel:${settings.companyPhone.replace(/\s+/g, "")}`} className="hover:text-emerald-700">
                    {settings.companyPhone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <a href={`mailto:${settings.ownerEmail}`} className="hover:text-emerald-700">
                    {settings.ownerEmail}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{settings.companyAddress}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
