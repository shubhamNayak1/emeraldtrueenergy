"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Loader2, Save } from "lucide-react";
import { db } from "@/lib/firebase";
import type { QuoteRates, SiteSettings } from "@/lib/types";
import { DEFAULT_QUOTE_RATES, calculateQuote, formatINR } from "@/lib/quote";
import { DEFAULT_SETTINGS } from "@/lib/data";

export default function AdminSettings() {
  const [rates, setRates] = useState<QuoteRates>(DEFAULT_QUOTE_RATES);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [savingRates, setSavingRates] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const previewKW = 5;

  useEffect(() => {
    (async () => {
      const [r, s] = await Promise.all([
        getDoc(doc(db, "quoteRates", "default")),
        getDoc(doc(db, "siteSettings", "default")),
      ]);
      if (r.exists()) setRates({ ...DEFAULT_QUOTE_RATES, ...(r.data() as Partial<QuoteRates>) });
      if (s.exists()) setSettings({ ...DEFAULT_SETTINGS, ...(s.data() as Partial<SiteSettings>) });
      setLoaded(true);
    })();
  }, []);

  const saveRates = async () => {
    setSavingRates(true);
    try {
      await setDoc(doc(db, "quoteRates", "default"), rates, { merge: true });
    } finally { setSavingRates(false); }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      await setDoc(doc(db, "siteSettings", "default"), settings, { merge: true });
    } finally { setSavingSettings(false); }
  };

  if (!loaded) {
    return <div className="flex h-60 items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-emerald-600" /></div>;
  }

  const preview = calculateQuote(previewKW, rates);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-emerald-900">Settings</h1>
        <p className="mt-1 text-sm text-ink/60">Edit quotation pricing and site-wide details.</p>
      </header>

      {/* QUOTE RATES */}
      <section className="rounded-2xl border border-emerald-100 bg-white p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-emerald-800">Quotation pricing</h2>
            <p className="mt-1 text-sm text-ink/60">All amounts in ₹ (INR). Used by the Get Quotation flow.</p>
          </div>
          <button onClick={saveRates} disabled={savingRates} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {savingRates ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save rates
          </button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumField label="Net meter — up to 5 kW" value={rates.netMeterUnder5kW} onChange={(v) => setRates({ ...rates, netMeterUnder5kW: v })} />
          <NumField label="Net meter — above 5 kW" value={rates.netMeterFiveKWPlus} onChange={(v) => setRates({ ...rates, netMeterFiveKWPlus: v })} />
          <NumField label="Labour / licensing per kW" value={rates.labourPerKW} onChange={(v) => setRates({ ...rates, labourPerKW: v })} />
          <NumField label="Material per kW" value={rates.materialPerKW} onChange={(v) => setRates({ ...rates, materialPerKW: v })} />
          <NumField label="Inverter per kW" value={rates.inverterPerKW} onChange={(v) => setRates({ ...rates, inverterPerKW: v })} />
          <NumField label="Transport per kW" value={rates.transportPerKW} onChange={(v) => setRates({ ...rates, transportPerKW: v })} />
          <NumField label="Panel wattage (W)" value={rates.panelWattage} onChange={(v) => setRates({ ...rates, panelWattage: v })} />
          <NumField label="Panel rate base (₹/W)" value={rates.panelRateBase} step="0.01" onChange={(v) => setRates({ ...rates, panelRateBase: v })} />
          <NumField label="Panel margin (multiplier)" value={rates.panelMargin} step="0.01" onChange={(v) => setRates({ ...rates, panelMargin: v })} />
          <label className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm">
            <input
              type="checkbox"
              checked={rates.includeTransport}
              onChange={(e) => setRates({ ...rates, includeTransport: e.target.checked })}
              className="h-4 w-4 accent-emerald-600"
            />
            Include transport in final total
          </label>
        </div>

        <div className="mt-6 rounded-xl bg-emerald-50/60 p-4">
          <h3 className="text-sm font-semibold text-emerald-800">Preview ({previewKW} kW)</h3>
          <div className="mt-2 grid gap-1 text-sm text-ink/75 sm:grid-cols-2">
            <div>Net meter: <b>{formatINR(preview.netMeter)}</b></div>
            <div>Labour: <b>{formatINR(preview.labour)}</b></div>
            <div>Material: <b>{formatINR(preview.material)}</b></div>
            <div>Inverter: <b>{formatINR(preview.inverter)}</b></div>
            <div>Solar panel ({preview.panelQuantity}× {rates.panelWattage}W): <b>{formatINR(preview.solarPanel)}</b></div>
            <div>Transport: <b>{formatINR(preview.transport)}</b>{!rates.includeTransport && <span className="text-xs text-ink/45"> (not in total)</span>}</div>
          </div>
          <div className="mt-3 text-lg font-bold text-emerald-800">Total: {formatINR(preview.total)}</div>
        </div>
      </section>

      {/* SITE SETTINGS */}
      <section className="rounded-2xl border border-emerald-100 bg-white p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-emerald-800">Site details</h2>
            <p className="mt-1 text-sm text-ink/60">Owner contact info shown on the public site.</p>
          </div>
          <button onClick={saveSettings} disabled={savingSettings} className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
            {savingSettings ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save details
          </button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <TxtField label="Owner WhatsApp number (with +91)" value={settings.ownerWhatsApp} onChange={(v) => setSettings({ ...settings, ownerWhatsApp: v })} placeholder="+919XXXXXXXXX" />
          <TxtField label="Public phone (display)" value={settings.companyPhone} onChange={(v) => setSettings({ ...settings, companyPhone: v })} />
          <TxtField label="Owner email" value={settings.ownerEmail} onChange={(v) => setSettings({ ...settings, ownerEmail: v })} />
          <TxtField label="Address" value={settings.companyAddress} onChange={(v) => setSettings({ ...settings, companyAddress: v })} />
          <TxtField label="Hero title" value={settings.heroTitle} onChange={(v) => setSettings({ ...settings, heroTitle: v })} />
          <TxtField label="Hero subtitle" value={settings.heroSubtitle} onChange={(v) => setSettings({ ...settings, heroSubtitle: v })} />
        </div>
        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-ink/80">About text</span>
          <textarea
            rows={4}
            value={settings.aboutText}
            onChange={(e) => setSettings({ ...settings, aboutText: e.target.value })}
            className="w-full rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
          />
        </label>
      </section>
    </div>
  );
}

function NumField({ label, value, onChange, step }: { label: string; value: number; onChange: (v: number) => void; step?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink/80">{label}</span>
      <input
        type="number"
        step={step ?? "1"}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
      />
    </label>
  );
}

function TxtField({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-ink/80">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-emerald-200 bg-cream px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-3 focus:ring-emerald-500/15"
      />
    </label>
  );
}
