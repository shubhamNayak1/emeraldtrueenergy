"use client";

import { useEffect, useState } from "react";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { Inbox, Hammer, ImagePlus, Star, FileDown } from "lucide-react";
import { db } from "@/lib/firebase";

type Stats = {
  newLeads: number;
  totalLeads: number;
  quoteLeads: number;
  services: number;
  projects: number;
  reviews: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const counts = await Promise.all([
          getCountFromServer(query(collection(db, "leads"), where("status", "==", "new"))).then(s => s.data().count),
          getCountFromServer(collection(db, "leads")).then(s => s.data().count),
          getCountFromServer(query(collection(db, "leads"), where("type", "==", "quote"))).then(s => s.data().count),
          getCountFromServer(collection(db, "services")).then(s => s.data().count),
          getCountFromServer(collection(db, "projects")).then(s => s.data().count),
          getCountFromServer(collection(db, "reviews")).then(s => s.data().count),
        ]);
        if (cancelled) return;
        setStats({
          newLeads: counts[0],
          totalLeads: counts[1],
          quoteLeads: counts[2],
          services: counts[3],
          projects: counts[4],
          reviews: counts[5],
        });
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load stats");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-emerald-900">Dashboard</h1>
      <p className="mt-1 text-sm text-ink/60">An overview of activity across your site.</p>

      {error && <div className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="New enquiries" value={stats?.newLeads} accent="emerald" icon={<Inbox className="h-5 w-5" />} />
        <Stat label="Total leads" value={stats?.totalLeads} accent="emerald" icon={<Inbox className="h-5 w-5" />} />
        <Stat label="Quotes downloaded" value={stats?.quoteLeads} accent="sun" icon={<FileDown className="h-5 w-5" />} />
        <Stat label="Services" value={stats?.services} icon={<Hammer className="h-5 w-5" />} />
        <Stat label="Projects" value={stats?.projects} icon={<ImagePlus className="h-5 w-5" />} />
        <Stat label="Reviews" value={stats?.reviews} icon={<Star className="h-5 w-5" />} />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
  accent = "emerald",
}: {
  label: string;
  value?: number;
  icon: React.ReactNode;
  accent?: "emerald" | "sun";
}) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink/60">{label}</span>
        <span className={accent === "emerald" ? "text-emerald-600" : "text-sun-500"}>{icon}</span>
      </div>
      <div className="mt-3 text-3xl font-bold text-emerald-900">
        {value === undefined ? "—" : value.toLocaleString("en-IN")}
      </div>
    </div>
  );
}
