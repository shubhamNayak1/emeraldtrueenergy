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
import type { Review } from "@/lib/types";
import { MediaUploader } from "@/components/admin/MediaUploader";

const EMPTY = { clientName: "", location: "", stars: 5, text: "", clientPhotoUrl: "" };

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [draft, setDraft] = useState(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "reviews"), orderBy("order", "asc"));
    return onSnapshot(q, (snap) => {
      setReviews(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) })));
    });
  }, []);

  const add = async () => {
    if (!draft.clientName.trim() || !draft.text.trim()) return;
    setAdding(true);
    try {
      await addDoc(collection(db, "reviews"), {
        clientName: draft.clientName.trim(),
        location: draft.location.trim() || null,
        stars: Math.max(1, Math.min(5, draft.stars)),
        text: draft.text.trim(),
        clientPhotoUrl: draft.clientPhotoUrl || null,
        order: reviews.length,
        active: true,
      });
      setDraft(EMPTY);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-emerald-900">Reviews</h1>
      <p className="mt-1 text-sm text-ink/60">Client testimonials shown on the home page.</p>

      <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">Add a new review</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input placeholder="Client name" value={draft.clientName} onChange={(e) => setDraft({ ...draft, clientName: e.target.value })} className="form-input" />
          <input placeholder="Location (optional)" value={draft.location} onChange={(e) => setDraft({ ...draft, location: e.target.value })} className="form-input" />
        </div>
        <div className="mt-3 flex items-center gap-3">
          <span className="text-sm text-ink/65">Rating:</span>
          <select
            value={draft.stars}
            onChange={(e) => setDraft({ ...draft, stars: Number(e.target.value) as Review["stars"] })}
            className="form-input max-w-[80px]"
          >
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}★</option>)}
          </select>
        </div>
        <textarea
          placeholder="What did they say?"
          rows={3}
          value={draft.text}
          onChange={(e) => setDraft({ ...draft, text: e.target.value })}
          className="form-input mt-3"
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <MediaUploader folder="reviews" onUploaded={(url) => setDraft({ ...draft, clientPhotoUrl: url })} label="Upload client photo (optional)" />
          {draft.clientPhotoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.clientPhotoUrl} alt="preview" className="h-12 w-12 rounded-full object-cover ring-1 ring-emerald-200" />
          )}
          <button onClick={add} disabled={adding} className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add review
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
      </div>

      <style jsx>{`
        :global(.form-input) {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #d1fae5;
          background: #fbfaf6;
          padding: 0.625rem 0.875rem;
          font-size: 0.875rem;
          color: #0f1f1a;
          outline: none;
        }
        :global(.form-input:focus) { border-color: #10b981; box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); }
      `}</style>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [edit, setEdit] = useState({
    clientName: review.clientName,
    location: review.location ?? "",
    stars: review.stars,
    text: review.text,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEdit({
      clientName: review.clientName,
      location: review.location ?? "",
      stars: review.stars,
      text: review.text,
    });
  }, [review]);

  const save = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "reviews", review.id), {
        clientName: edit.clientName.trim(),
        location: edit.location.trim() || null,
        stars: Math.max(1, Math.min(5, edit.stars)),
        text: edit.text.trim(),
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete review by "${review.clientName}"?`)) return;
    await deleteDoc(doc(db, "reviews", review.id));
  };

  const toggleActive = () => updateDoc(doc(db, "reviews", review.id), { active: !review.active });

  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-4">
      <div className="grid gap-2">
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <input value={edit.clientName} onChange={(e) => setEdit({ ...edit, clientName: e.target.value })} className="form-input" />
          <select value={edit.stars} onChange={(e) => setEdit({ ...edit, stars: Number(e.target.value) as Review["stars"] })} className="form-input w-20">
            {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n}★</option>)}
          </select>
        </div>
        <input value={edit.location} placeholder="Location" onChange={(e) => setEdit({ ...edit, location: e.target.value })} className="form-input" />
        <textarea rows={3} value={edit.text} onChange={(e) => setEdit({ ...edit, text: e.target.value })} className="form-input" />
        <div className="flex justify-end gap-1 pt-1">
          <button onClick={toggleActive} className="icon-btn" title={review.active ? "Hide" : "Show"}>
            {review.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button onClick={save} disabled={saving} className="icon-btn disabled:opacity-40" title="Save">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          </button>
          <button onClick={remove} className="icon-btn text-red-600 hover:bg-red-50" title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      <style jsx>{`
        :global(.icon-btn) {
          display: inline-flex; align-items: center; justify-content: center;
          height: 32px; width: 32px; border-radius: 9999px;
          background: #ecfdf5; color: #047857; transition: background-color 120ms;
        }
        :global(.icon-btn:hover) { background: #d1fae5; }
      `}</style>
    </div>
  );
}
