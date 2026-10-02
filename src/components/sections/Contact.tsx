"use client";

import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import { SETTINGS } from "@/content/settings";

function whatsAppLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function Contact() {
  const waConfigured = SETTINGS.ownerWhatsApp && !SETTINGS.ownerWhatsApp.includes("XXXX");

  return (
    <section id="contact" className="scroll-mt-20 pt-6 pb-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Get in touch
            </span>
            <h2 className="mt-3 text-3xl font-bold text-emerald-900 sm:text-4xl md:text-5xl">
              Let's power your rooftop
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink/65 sm:mt-4 sm:text-base">
              The fastest way to reach us is WhatsApp — we typically reply within an hour.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-4">
          <Reveal>
            {waConfigured ? (
              <motion.a
                href={whatsAppLink(SETTINGS.ownerWhatsApp, "Hi! I'd like to discuss a solar installation.")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group flex items-center gap-5 rounded-3xl bg-gradient-to-br from-[#25D366] to-[#128C7E] p-6 text-white shadow-lg shadow-[#128C7E]/25 transition-shadow hover:shadow-2xl hover:shadow-[#128C7E]/40 sm:p-7"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 transition-transform group-hover:scale-110">
                  <MessageCircle className="h-7 w-7" fill="currentColor" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-semibold uppercase tracking-[0.15em] opacity-90">
                    Chat on WhatsApp
                  </div>
                  <div className="mt-1 text-lg font-bold sm:text-xl">{SETTINGS.ownerWhatsApp}</div>
                  <div className="mt-0.5 text-xs opacity-80 sm:text-sm">Tap to open WhatsApp</div>
                </div>
                <svg className="hidden h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1 sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </motion.a>
            ) : (
              <div className="rounded-3xl border border-dashed border-emerald-200 bg-white/60 p-6 text-center text-sm text-ink/55">
                Owner WhatsApp number not set yet.
              </div>
            )}
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            <Reveal delay={0.08}>
              <ContactCard
                href={`tel:${SETTINGS.publicPhone.replace(/\s+/g, "")}`}
                icon={<Phone className="h-5 w-5" />}
                label="Call us"
                detail={SETTINGS.publicPhone}
              />
            </Reveal>
            <Reveal delay={0.16}>
              <ContactCard
                href={`mailto:${SETTINGS.publicEmail}?subject=${encodeURIComponent("Solar enquiry")}`}
                icon={<Mail className="h-5 w-5" />}
                label="Email us"
                detail={SETTINGS.publicEmail}
              />
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="flex items-start gap-4 rounded-3xl border border-emerald-100 bg-white p-6">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  Where we are
                </div>
                <div className="mt-0.5 text-sm font-bold text-ink sm:text-base">{SETTINGS.address}</div>
                <p className="mt-1 text-xs text-ink/60 sm:text-sm">
                  Site visits across Madhya Pradesh — get in touch and we'll set one up.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactCard({
  href, icon, label, detail,
}: {
  href: string; icon: React.ReactNode; label: string; detail: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 transition-all hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-800">{label}</div>
        <div className="break-all text-sm font-bold text-ink sm:text-base">{detail}</div>
      </div>
    </motion.a>
  );
}
