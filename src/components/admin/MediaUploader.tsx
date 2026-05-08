"use client";

import { useState } from "react";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { Loader2, Upload } from "lucide-react";
import { storage } from "@/lib/firebase";

type Props = {
  folder: "projects" | "reviews" | "branding";
  onUploaded: (url: string) => void;
  accept?: string;
  label?: string;
};

export function MediaUploader({ folder, onUploaded, accept = "image/*", label = "Upload image" }: Props) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const r = storageRef(storage, `${folder}/${filename}`);
      await uploadBytes(r, file);
      const url = await getDownloadURL(r);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-100">
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        {uploading ? "Uploading…" : label}
        <input type="file" accept={accept} onChange={handle} className="hidden" disabled={uploading} />
      </label>
      {error && <div className="mt-2 text-xs text-red-600">{error}</div>}
    </div>
  );
}
