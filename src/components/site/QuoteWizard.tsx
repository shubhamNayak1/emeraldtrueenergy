"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Download, ArrowRight, Users } from "lucide-react";
import { calculateQuote, formatINR, type PanelTech } from "@/lib/quote";
import { EMAILJS, QUOTE_RATES, SETTINGS } from "@/content/settings";

type QuoteForm = {
  kW: string;
  type: "residential" | "commercial" | "industrial";
  panel: PanelTech;
  name: string;
  phone: string;
  email: string;
};

const EMPTY: QuoteForm = {
  kW: "",
  type: "residential",
  panel: "Bifacial",
  name: "",
  phone: "",
  email: "",
};

const PANEL_OPTIONS: PanelTech[] = ["Bifacial", "TopCon"];

type Props = {
  open: boolean;
  onClose: () => void;
  /** Pre-fill the kW field (e.g. from the hero rooftop builder slider). */
  initialKW?: number;
};

export function QuoteWizard({ open, onClose, initialKW }: Props) {
  const [form, setForm] = useState<QuoteForm>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (open && initialKW !== undefined) {
      setForm((f) => ({ ...f, kW: String(initialKW) }));
    }
  }, [open, initialKW]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || !mounted) return null;

  // Systems above a threshold need a human consultation rather than an
  // auto-generated PDF. The form shows a "Contact us" redirect card in
  // place of the PDF button in that case.
  const kWNum = Number(form.kW);
  const kWValid = form.kW !== "" && !Number.isNaN(kWNum);
  const needsContact = kWValid && kWNum >= QUOTE_RATES.contactThresholdKW;

  const validate = (): string | null => {
    if (!form.kW || Number.isNaN(kWNum) || kWNum < 1 || kWNum > 1000) {
      return "System size must be between 1 and 1000 kW.";
    }
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email looks invalid.";
    return null;
  };

  const goToContact = () => {
    onClose();
    // Give the dialog unmount a frame before scrolling so the sticky
    // header's own offset lines up correctly.
    requestAnimationFrame(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      else window.location.hash = "#contact";
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }

    if (needsContact) {
      goToContact();
      return;
    }

    setSubmitting(true);
    try {
      const { buildQuotePdf } = await import("@/lib/pdf-browser");

      const breakdown = calculateQuote(
        kWNum,
        form.panel,
        form.type,
        QUOTE_RATES,
      );

      const customer = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        type: form.type,
        kW: kWNum,
      };

      buildQuotePdf(customer, breakdown, {
        companyName: SETTINGS.companyName,
        phone: SETTINGS.publicPhone,
        email: SETTINGS.publicEmail,
        address: SETTINGS.address,
      });

      void notifyOwner(customer, breakdown);

      setForm(EMPTY);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not generate quotation.");
    } finally {
      setSubmitting(false);
    }
  };

  const set = <K extends keyof QuoteForm>(k: K, v: QuoteForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  return createPortal(
    <div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-ink/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-emerald-800">Get your solar quotation</h3>
            <p className="mt-1 text-sm text-ink/60">A detailed PDF estimate, ready in seconds.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1 text-ink/40 hover:bg-emerald-50 hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="System size (kW)">
            <input type="number" step="0.1" min="1" max="1000"
              value={form.kW} onChange={(e) => set("kW", e.target.value)}
              className="qw-input" placeholder="e.g. 5" />
          </Field>

          <Field label="Installation type">
            <select value={form.type} onChange={(e) => set("type", e.target.value as QuoteForm["type"])} className="qw-input">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </Field>

          <Field label="Panel">
            <select value={form.panel} onChange={(e) => set("panel", e.target.value as PanelTech)} className="qw-input">
              {PANEL_OPTIONS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </Field>

          <Field label="Your name">
            <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)}
              className="qw-input" placeholder="Full name" />
          </Field>

          <Field label="Phone (WhatsApp)">
            <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)}
              className="qw-input" placeholder="+91 9XXXX XXXXX" />
          </Field>

          <Field label="Email (optional)">
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)}
              className="qw-input" placeholder="you@example.com" />
          </Field>

          {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

          {needsContact ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                  <Users className="h-4 w-4" />
                </div>
                <div className="flex-1 text-sm text-ink/80">
                  <div className="font-semibold text-emerald-900">
                    Systems of {QUOTE_RATES.contactThresholdKW} kW and above
                  </div>
                  <p className="mt-0.5 text-ink/65">
                    For a project this size we tailor the design, panel mix, and timeline to your site — please reach out so we can build the right proposal.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={goToContact}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
              >
                {submitting ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Generating PDF…</>
                ) : (
                  <><Download className="h-4 w-4" /> Download Quotation PDF</>
                )}
              </button>
              <p className="text-center text-xs text-ink/50">
                Your details are shared with our team so we can follow up — the PDF downloads instantly.
              </p>
            </>
          )}
        </form>
      </div>

      <style jsx>{`
        :global(.qw-input) {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid #d1fae5;
          background: #fbfaf6;
          padding: 0.625rem 0.875rem;
          font-size: 0.95rem;
          color: #0f1f1a;
          outline: none;
          transition: border-color 120ms, box-shadow 120ms;
        }
        :global(.qw-input:focus) {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>,
    document.body,
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink/80">{label}</span>
      {children}
    </label>
  );
}

type Customer = {
  name: string;
  phone: string;
  email?: string;
  type: "residential" | "commercial" | "industrial";
  kW: number;
};

async function notifyOwner(
  customer: Customer,
  breakdown: ReturnType<typeof calculateQuote>,
): Promise<void> {
  if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) return;

  try {
    const emailjs = (await import("@emailjs/browser")).default;
    await emailjs.send(
      EMAILJS.serviceId,
      EMAILJS.templateId,
      {
        name: customer.name,
        type: customer.type,
        size: String(customer.kW),
        number: customer.phone,
        mail: customer.email || "(not provided)",

        total: formatINR(breakdown.total),
        panel_quantity: String(breakdown.panelQuantity),
        panel_wattage: `${breakdown.panelWattage} Wp`,
        panel_tech: breakdown.panelTech,
        per_kw_rate: formatINR(breakdown.perKWRate),
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }),
      },
      { publicKey: EMAILJS.publicKey },
    );
  } catch (err) {
    console.warn("EmailJS notification failed:", err);
  }
}
