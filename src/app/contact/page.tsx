import { Mail, MapPin, Phone } from "lucide-react";
import { ContactWhatsAppButton } from "@/components/site/ContactWhatsAppButton";
import { SETTINGS } from "@/content/settings";

export const metadata = {
  title: "Contact Us",
  description:
    "Talk to Emerald True Energy about rooftop solar for your home or business in Madhya Pradesh. Reach us on WhatsApp, phone, or email.",
};

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <header className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Get in touch
          </span>
          <h1 className="mt-2 text-4xl font-bold text-emerald-900 sm:text-5xl">
            Talk to us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink/65">
            The fastest way to reach us is WhatsApp — we typically reply within an hour.
          </p>
        </header>

        <div className="mt-12 space-y-4">
          <ContactWhatsAppButton phone={SETTINGS.ownerWhatsApp} />

          <div className="grid gap-4 sm:grid-cols-2">
            <ActionCard
              href={`tel:${SETTINGS.publicPhone.replace(/\s+/g, "")}`}
              icon={<Phone className="h-6 w-6" />}
              title="Call us"
              detail={SETTINGS.publicPhone}
            />
            <ActionCard
              href={`mailto:${SETTINGS.publicEmail}?subject=${encodeURIComponent("Solar enquiry")}`}
              icon={<Mail className="h-6 w-6" />}
              title="Email us"
              detail={SETTINGS.publicEmail}
            />
          </div>

          <div className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
                Where we are
              </div>
              <div className="text-base font-bold text-ink">{SETTINGS.address}</div>
              <p className="mt-1 text-sm text-ink/60">
                Site visits across Madhya Pradesh — get in touch and we'll set one up.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ActionCard({
  href,
  icon,
  title,
  detail,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 transition hover:border-emerald-300 hover:shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold uppercase tracking-wider text-emerald-800">
          {title}
        </div>
        <div className="text-base font-bold text-ink truncate">{detail}</div>
      </div>
    </a>
  );
}
