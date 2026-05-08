import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { calculateQuote, DEFAULT_QUOTE_RATES } from "@/lib/quote";
import { DEFAULT_SETTINGS } from "@/lib/data";
import type { QuoteRates, SiteSettings } from "@/lib/types";
import { buildQuotePdf } from "@/lib/pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const Body = z.object({
  kW: z.coerce.number().min(1).max(1000),
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal("")),
  type: z.enum(["residential", "commercial", "industrial"]),
});

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = Body.parse(await req.json());
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid input" },
      { status: 400 },
    );
  }

  const [ratesSnap, settingsSnap] = await Promise.all([
    getDoc(doc(db, "quoteRates", "default")).catch(() => null),
    getDoc(doc(db, "siteSettings", "default")).catch(() => null),
  ]);

  const rates: QuoteRates = ratesSnap?.exists()
    ? { ...DEFAULT_QUOTE_RATES, ...(ratesSnap.data() as Partial<QuoteRates>) }
    : DEFAULT_QUOTE_RATES;

  const settings: SiteSettings = settingsSnap?.exists()
    ? { ...DEFAULT_SETTINGS, ...(settingsSnap.data() as Partial<SiteSettings>) }
    : DEFAULT_SETTINGS;

  const breakdown = calculateQuote(parsed.kW, rates);

  // Save the quote download as a lead so the owner can follow up.
  // Failure here shouldn't block the PDF — fire and continue.
  addDoc(collection(db, "leads"), {
    type: "quote",
    name: parsed.name.trim(),
    phone: parsed.phone.trim(),
    email: parsed.email?.trim() || null,
    kW: parsed.kW,
    installationType: parsed.type,
    totalQuoted: Math.round(breakdown.total),
    status: "new",
    createdAt: serverTimestamp(),
  }).catch((err) => console.error("Failed to save quote lead:", err));

  const pdf = await buildQuotePdf(
    { ...parsed, email: parsed.email || undefined },
    breakdown,
    {
      companyName: "Emerald True Energy",
      phone: settings.companyPhone,
      email: settings.ownerEmail,
      address: settings.companyAddress,
    },
  );

  return new NextResponse(new Uint8Array(pdf), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="EmeraldTrueEnergy-Quotation-${parsed.kW}kW.pdf"`,
      "Content-Length": String(pdf.length),
    },
  });
}
