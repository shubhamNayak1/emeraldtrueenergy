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
import type { Project } from "@/lib/types";
import { MediaUploader } from "@/components/admin/MediaUploader";

type Draft = { title: string; location: string; kW: string; description: string; photoUrl: string };
const EMPTY: Draft = { title: "", location: "", kW: "", description: "", photoUrl: "" };

export default function AdminProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    return onSnapshot(q, (snap) => {
      setProjects(snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) })));
    });
  }, []);

  const add = async () => {
    if (!draft.title.trim() || !draft.photoUrl) return;
    setAdding(true);
    try {
      await addDoc(collection(db, "projects"), {
        title: draft.title.trim(),
        location: draft.location.trim(),
        kW: draft.kW ? Number(draft.kW) : null,
        description: draft.description.trim() || null,
        photoUrl: draft.photoUrl,
        order: projects.length,
        active: true,
      });
      setDraft(EMPTY);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-emerald-900">Projects</h1>
      <p className="mt-1 text-sm text-ink/60">Showcase completed installations on the public site.</p>

      <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-emerald-800">Add a new project</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            placeholder="Title (e.g. 5 kW On-Grid System)"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="form-input"
          />
          <input
            placeholder="Location (e.g. Khurai, MP)"
            value={draft.location}
            onChange={(e) => setDraft({ ...draft, location: e.target.value })}
            className="form-input"
          />
          <input
            type="number"
            placeholder="kW (optional)"
            value={draft.kW}
            onChange={(e) => setDraft({ ...draft, kW: e.target.value })}
            className="form-input"
          />
          <input
            placeholder="Short description (optional)"
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            className="form-input"
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <MediaUploader folder="projects" onUploaded={(url) => setDraft({ ...draft, photoUrl: url })} label="Upload project photo" />
          {draft.photoUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={draft.photoUrl} alt="preview" className="h-16 w-24 rounded-lg object-cover ring-1 ring-emerald-200" />
          )}
          <button
            onClick={add}
            disabled={adding || !draft.title.trim() || !draft.photoUrl}
            className="ml-auto inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
          >
            {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Add project
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
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
        :global(.form-input:focus) {
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }
      `}</style>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [edit, setEdit] = useState({
    title: project.title,
    location: project.location,
    kW: project.kW?.toString() ?? "",
    description: project.description ?? "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setEdit({
      title: project.title,
      location: project.location,
      kW: project.kW?.toString() ?? "",
      description: project.description ?? "",
    });
  }, [project]);

  const save = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "projects", project.id), {
        title: edit.title.trim(),
        location: edit.location.trim(),
        kW: edit.kW ? Number(edit.kW) : null,
        description: edit.description.trim() || null,
      });
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete "${project.title}"?`)) return;
    await deleteDoc(doc(db, "projects", project.id));
  };

  const toggleActive = () => updateDoc(doc(db, "projects", project.id), { active: !project.active });

  return (
    <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.photoUrl} alt={project.title} className="aspect-[4/3] w-full object-cover" />
      <div className="space-y-2 p-4">
        <input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} className="form-input" />
        <div className="grid grid-cols-2 gap-2">
          <input value={edit.location} placeholder="Location" onChange={(e) => setEdit({ ...edit, location: e.target.value })} className="form-input" />
          <input type="number" value={edit.kW} placeholder="kW" onChange={(e) => setEdit({ ...edit, kW: e.target.value })} className="form-input" />
        </div>
        <input value={edit.description} placeholder="Description" onChange={(e) => setEdit({ ...edit, description: e.target.value })} className="form-input" />
        <div className="flex justify-end gap-1 pt-1">
          <button onClick={toggleActive} className="icon-btn" title={project.active ? "Hide" : "Show"}>
            {project.active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
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
