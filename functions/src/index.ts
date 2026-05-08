import * as admin from "firebase-admin";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { calculateQuote, DEFAULT_QUOTE_RATES, type QuoteRates } from "./quote";
import { buildQuotePdf } from "./pdf";

admin.initializeApp();

setGlobalOptions({ region: "asia-south1", maxInstances: 5 });

type GenerateQuoteInput = {
  kW: number;
  name: string;
  phone: string;
  email?: string;
  type: "residential" | "commercial" | "industrial";
};

type GenerateQuoteOutput = {
  pdfBase64: string;
  total: number;
};

export const generateQuote = onCall<GenerateQuoteInput, Promise<GenerateQuoteOutput>>(
  { cors: true, memory: "512MiB", timeoutSeconds: 60 },
  async (req) => {
    const { kW, name, phone, email, type } = req.data ?? ({} as GenerateQuoteInput);

    if (typeof kW !== "number" || kW < 1 || kW > 1000) {
      throw new HttpsError("invalid-argument", "kW must be between 1 and 1000");
    }
    if (!name || name.trim().length < 2) throw new HttpsError("invalid-argument", "name is required");
    if (!phone || phone.replace(/\D/g, "").length < 10) {
      throw new HttpsError("invalid-argument", "valid phone is required");
    }
    if (!["residential", "commercial", "industrial"].includes(type)) {
      throw new HttpsError("invalid-argument", "type must be residential, commercial, or industrial");
    }

    const db = admin.firestore();

    // Pull live rates + site settings (fall back to bundled defaults).
    const [ratesSnap, settingsSnap] = await Promise.all([
      db.doc("quoteRates/default").get(),
      db.doc("siteSettings/default").get(),
    ]);

    const rates: QuoteRates = ratesSnap.exists
      ? { ...DEFAULT_QUOTE_RATES, ...(ratesSnap.data() as Partial<QuoteRates>) }
      : DEFAULT_QUOTE_RATES;

    const settings = settingsSnap.exists ? settingsSnap.data() ?? {} : {};

    const breakdown = calculateQuote(kW, rates);

    // Save the lead so the admin sees every download as a follow-up opportunity.
    await db.collection("leads").add({
      type: "quote",
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim() || null,
      kW,
      installationType: type,
      totalQuoted: Math.round(breakdown.total),
      status: "new",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    const pdf = await buildQuotePdf(
      { name, phone, email, type, kW },
      breakdown,
      {
        companyName: "Emerald True Energy",
        phone: (settings.companyPhone as string) ?? "+91 XXXXX XXXXX",
        email: (settings.ownerEmail as string) ?? "info@emeraldtrueenergy.in",
        address: (settings.companyAddress as string) ?? "Madhya Pradesh, India",
      },
    );

    return {
      pdfBase64: pdf.toString("base64"),
      total: Math.round(breakdown.total),
    };
  },
);
