"use client";

import { useEffect, useState } from "react";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Phone, Mail, FileDown, MessageCircle, Check, ArchiveRestore } from "lucide-react";
import clsx from "clsx";
import { db } from "@/lib/firebase";
import type { Lead, LeadStatus } from "@/lib/types";
import { formatINR } from "@/lib/quote";
import { whatsAppLink } from "@/lib/data";

export default function AdminInbox() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState<LeadStatus | "all">("new");

  useEffect(() => {
    const q = query(collection(db, "leads"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setLeads(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Lead, "id">) })));
    });
  }, []);

  const filtered = leads.filter((l) => filter === "all" ? true : l.status === filter);

  const setStatus = async (id: string, status: LeadStatus) => {
    await updateDoc(doc(db, "leads", id), { status });
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold text-emerald-900">Inbox</h1>
          <p className="mt-1 text-sm text-ink/60">Contact form messages and quote requests.</p>
        </div>
        <div className="flex gap-1 rounded-full bg-white p-1 ring-1 ring-emerald-100">
          {(["new", "read", "closed", "all"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={clsx(
                "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition",
                filter === s ? "bg-emerald-600 text-white" : "text-ink/60 hover:text-emerald-700",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-emerald-200 bg-white/60 p-10 text-center text-sm text-ink/55">
            No leads in this view.
          </div>
        )}
        {filtered.map((lead) => (
          <article key={lead.id} className="rounded-2xl border border-emerald-100 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold",
                    lead.type === "quote" ? "bg-sun-100 text-sun-600" : "bg-emerald-100 text-emerald-700",
                  )}>
                    {lead.type === "quote" ? <FileDown className="h-3 w-3" /> : <MessageCircle className="h-3 w-3" />}
                    {lead.type}
                  </span>
                  <span className={clsx(
                    "rounded-full px-2.5 py-0.5 text-xs font-medium",
                    lead.status === "new" && "bg-blue-100 text-blue-700",
                    lead.status === "read" && "bg-zinc-100 text-zinc-600",
                    lead.status === "closed" && "bg-emerald-50 text-emerald-700",
                  )}>
                    {lead.status}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-emerald-900">{lead.name}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink/65">
                  <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1 hover:text-emerald-700">
                    <Phone className="h-3.5 w-3.5" /> {lead.phone}
                  </a>
                  {lead.email && (
                    <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1 hover:text-emerald-700">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </a>
                  )}
                  <a
                    href={whatsAppLink(lead.phone, `Hi ${lead.name}, this is Emerald True Energy following up on your enquiry.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
              <span className="text-xs text-ink/45">
                {lead.createdAt && typeof lead.createdAt.toDate === "function"
                  ? lead.createdAt.toDate().toLocaleString("en-IN")
                  : ""}
              </span>
            </div>

            {lead.type === "quote" && (
              <div className="mt-3 grid gap-2 rounded-xl bg-sun-50 px-4 py-3 text-sm sm:grid-cols-2">
                <div><span className="text-ink/55">System size: </span><b className="text-sun-600">{lead.kW} kW</b></div>
                {lead.totalQuoted !== undefined && (
                  <div><span className="text-ink/55">Quoted total: </span><b className="text-sun-600">{formatINR(lead.totalQuoted)}</b></div>
                )}
              </div>
            )}

            {lead.message && (
              <p className="mt-3 whitespace-pre-wrap rounded-xl bg-cream px-4 py-3 text-sm text-ink/75">
                {lead.message}
              </p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              {lead.status !== "read" && (
                <button onClick={() => setStatus(lead.id, "read")} className="action-btn">
                  <Check className="h-3.5 w-3.5" /> Mark read
                </button>
              )}
              {lead.status !== "closed" && (
                <button onClick={() => setStatus(lead.id, "closed")} className="action-btn">
                  <Check className="h-3.5 w-3.5" /> Close
                </button>
              )}
              {lead.status !== "new" && (
                <button onClick={() => setStatus(lead.id, "new")} className="action-btn">
                  <ArchiveRestore className="h-3.5 w-3.5" /> Reopen
                </button>
              )}
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        :global(.action-btn) {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          border-radius: 9999px;
          background: #ecfdf5;
          color: #047857;
          padding: 0.375rem 0.875rem;
          font-size: 0.75rem;
          font-weight: 600;
          transition: background-color 120ms;
        }
        :global(.action-btn:hover) { background: #d1fae5; }
      `}</style>
    </div>
  );
}
