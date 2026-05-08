"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2, Download } from "lucide-react";
import { calculateQuote } from "@/lib/quote";
import { QUOTE_RATES, SETTINGS } from "@/content/settings";

type QuoteForm = {
  kW: string;
  type: "residential" | "commercial" | "industrial";
  name: string;
  phone: string;
  email: string;
};

const EMPTY: QuoteForm = { kW: "", type: "residential", name: "", phone: "", email: "" };

type Props = { open: boolean; onClose: () => void };

export function QuoteWizard({ open, onClose }: Props) {
  const [form, setForm] = useState<QuoteForm>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Lock background scroll while the dialog is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open || !mounted) return null;

  const validate = (): string | null => {
    const kW = Number(form.kW);
    if (!form.kW || isNaN(kW) || kW < 1 || kW > 1000) return "System size must be between 1 and 1000 kW.";
    if (form.name.trim().length < 2) return "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) return "Please enter a valid phone number.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Email looks invalid.";
    return null;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) { setError(v); return; }

    setSubmitting(true);
    try {
      // Lazy-load the PDF builder so the ~80 KB jsPDF bundle isn't shipped on
      // initial page load.
      const { buildQuotePdf } = await import("@/lib/pdf-browser");

      const breakdown = calculateQuote(Number(form.kW), QUOTE_RATES);

      buildQuotePdf(
        {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim() || undefined,
          type: form.type,
          kW: Number(form.kW),
        },
        breakdown,
        {
          companyName: SETTINGS.companyName,
          phone: SETTINGS.publicPhone,
          email: SETTINGS.publicEmail,
          address: SETTINGS.address,
        },
      );

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
            The PDF generates in your browser — no data is sent anywhere.
          </p>
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
