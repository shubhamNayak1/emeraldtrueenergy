"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { CheckCircle2, Loader2 } from "lucide-react";
import { db } from "@/lib/firebase";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  message: z.string().min(5, "Please tell us a little more"),
});

type ContactInput = z.infer<typeof ContactSchema>;

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setSubmitting(true);
    setError(null);
    try {
      await addDoc(collection(db, "leads"), {
        type: "contact",
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        message: data.message,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setSent(true);
      reset();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="rounded-xl bg-emerald-50 p-6 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
        <h3 className="mt-3 text-lg font-semibold text-emerald-800">Message sent</h3>
        <p className="mt-1 text-sm text-ink/65">Thank you! Our team will reach out to you shortly.</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-4 text-sm font-semibold text-emerald-700 hover:text-emerald-900"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Field label="Your name" error={errors.name?.message}>
        <input type="text" {...register("name")} className="contact-input" placeholder="Full name" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input type="tel" {...register("phone")} className="contact-input" placeholder="+91 9XXXX XXXXX" />
        </Field>
        <Field label="Email (optional)" error={errors.email?.message}>
          <input type="email" {...register("email")} className="contact-input" placeholder="you@example.com" />
        </Field>
      </div>
      <Field label="How can we help?" error={errors.message?.message}>
        <textarea
          rows={4}
          {...register("message")}
          className="contact-input"
          placeholder="Tell us about your roof, monthly bill, or any questions."
        />
      </Field>

      {error && <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {submitting ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) : "Send message"}
      </button>

      <style jsx>{`
        :global(.contact-input) {
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
        :global(.contact-input:focus) {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </form>
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
