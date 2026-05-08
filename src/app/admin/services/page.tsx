"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import { Plus, Trash2, Save, Loader2, Eye, EyeOff } from "lucide-react";
import { db } from "@/lib/firebase";
import type { Service } from "@/lib/types";

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [draft, setDraft] = useState({ title: "", description: "" });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("order", "asc"));
    return onSnapshot(q, (snap) => {
      setServices(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Service, "id">) })));
    });
  }, []);

  const add = async () => {
    if (!draft.title.trim()) return;
    setAdding(true);
    try {
      await addDoc(collection(db, "services"), {
        title: draft.title.trim(),
        description: draft.description.trim(),
        order: services.length,
        active: true,
      });
      setDraft({ title: "", description: "" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-emerald-900">Services</h1>
        <p className="mt-1 text-sm text-ink/60">Add, edit, reorder, hide or remove the services shown on your site.</p>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">Add a new service</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-[1fr_2fr_auto]">
          <input
            placeholder="Title (e.g. Residential Rooftop Solar)"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
          />
          <input
            placeholder="Short description"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
          />
          <button
            onClick={add}
            disabled={adding || !draft.title.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {services.map((s) => (
          <ServiceRow key={s.id} service={s} />
        ))}
      </div>
    </div>
  );
}

function ServiceRow({ service }: { service: Service }) {
  const [edit, setEdit] = useState(service);
  const [saving, setSaving] = useState(false);
  const dirty = edit.title !== service.title || edit.description !== service.description || edit.order !== service.order;

  useEffect(() => { setEdit(service); }, [service]);

  const save = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "services", service.id), {
        title: edit.title.trim(),
        description: edit.description.trim(),
        order: edit.order,
      });
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async () => {
    await updateDoc(doc(db, "services", service.id), { active: !service.active });
  };

  const remove = async () => {
    if (!confirm(`Delete "${service.title}"?`)) return;
    await deleteDoc(doc(db, "services", service.id));
  };

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4">
      <div className="grid gap-3 md:grid-cols-[80px_1fr_2fr_auto]">
        <input
          type="number"
          value={edit.order}
          onChange={(e) => setEdit({ ...edit, order: Number(e.target.value) })}
          className="rounded-lg border border-emerald-200 bg-cream px-3 py-2 text-sm outline-none"
          aria-label="Order"
        />
        <input
          value={edit.title}
          onChange={(e) => setEdit({ ...edit, title: e.target.value })}
          className="rounded-lg border border-emerald-200 bg-cream px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <input
          value={edit.description}
          onChange={(e) => setEdit({ ...edit, description: e.target.value })}
          className="rounded-lg border border-emerald-200 bg-cream px-3 py-2 text-sm outline-none focus:border-emerald-500"
        />
        <div className="flex gap-1">
          <button onClick={toggleActive} title={service.active ? "Hide" : "Show"} className="icon-btn">
            {service.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button onClick={save} disabled={!dirty || saving} title="Save" className="icon-btn disabled:opacity-40">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          </button>
          <button onClick={remove} title="Delete" className="icon-btn text-red-600 hover:bg-red-50">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <style jsx>{`
        :global(.icon-btn) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 36px;
          border-radius: 9999px;
          background: #ecfdf5;
          color: #047857;
          transition: background-color 120ms;
        }
        :global(.icon-btn:hover) { background: #d1fae5; }
      `}</style>
    </div>
  );
}
