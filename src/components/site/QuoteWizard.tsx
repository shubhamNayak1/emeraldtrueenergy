"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Loader2, Download } from "lucide-react";

const QuoteSchema = z.object({
  kW: z.coerce.number().min(1, "Must be at least 1 kW").max(1000, "Max 1000 kW"),
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  type: z.enum(["residential", "commercial", "industrial"]),
});

type QuoteFormInput = z.input<typeof QuoteSchema>;
type QuoteForm = z.output<typeof QuoteSchema>;

type Props = { open: boolean; onClose: () => void };

export function QuoteWizard({ open, onClose }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormInput, unknown, QuoteForm>({
    resolver: zodResolver(QuoteSchema),
    defaultValues: { type: "residential" },
  });

  if (!open) return null;

  const onSubmit = async (data: QuoteForm) => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: res.statusText }));
        throw new Error(err.error ?? "Could not generate quotation");
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `EmeraldTrueEnergy-Quotation-${data.kW}kW.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      reset();
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate quotation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 px-4"
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
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1 text-ink/40 hover:bg-emerald-50 hover:text-ink">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Field label="System size (kW)" error={errors.kW?.message}>
            <input
              type="number"
              step="0.1"
              min="1"
              max="1000"
              {...register("kW")}
              className="input"
              placeholder="e.g. 5"
            />
          </Field>

          <Field label="Installation type" error={errors.type?.message}>
            <select {...register("type")} className="input">
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="industrial">Industrial</option>
            </select>
          </Field>

          <Field label="Your name" error={errors.name?.message}>
            <input type="text" {...register("name")} className="input" placeholder="Full name" />
          </Field>

          <Field label="Phone (WhatsApp)" error={errors.phone?.message}>
            <input type="tel" {...register("phone")} className="input" placeholder="+91 9XXXX XXXXX" />
          </Field>

          <Field label="Email (optional)" error={errors.email?.message}>
            <input type="email" {...register("email")} className="input" placeholder="you@example.com" />
          </Field>

          {error && (
            <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
          )}

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
            We'll save your details so our team can follow up with project guidance.
          </p>
        </form>
      </div>

      <style jsx>{`
        :global(.input) {
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
        :global(.input:focus) {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink/80">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}
