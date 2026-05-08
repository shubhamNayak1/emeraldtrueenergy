import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type {
  Project,
  QuoteRates,
  Review,
  Service,
  SiteSettings,
} from "./types";
import { DEFAULT_QUOTE_RATES } from "./quote";

export const DEFAULT_SETTINGS: SiteSettings = {
  ownerWhatsApp: "+91XXXXXXXXXX",
  ownerEmail: "info@emeraldtrueenergy.in",
  companyAddress: "Madhya Pradesh, India",
  companyPhone: "+91 XXXXX XXXXX",
  heroTitle: "Clean energy. Real savings. Built to last.",
  heroSubtitle:
    "Rooftop solar installations across Madhya Pradesh — engineered with premium components and backed by full-service support.",
  aboutText:
    "Emerald True Energy designs and installs grid-tied and off-grid solar systems for homes, farms, and businesses. Every install is led by our own team — no subcontractors, no shortcuts.",
};

export async function getServices(): Promise<Service[]> {
  const q = query(
    collection(db, "services"),
    where("active", "==", true),
    orderBy("order", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Service, "id">) }));
}

export async function getProjects(): Promise<Project[]> {
  const q = query(
    collection(db, "projects"),
    where("active", "==", true),
    orderBy("order", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Project, "id">) }));
}

export async function getReviews(): Promise<Review[]> {
  const q = query(
    collection(db, "reviews"),
    where("active", "==", true),
    orderBy("order", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Review, "id">) }));
}

export async function getQuoteRates(): Promise<QuoteRates> {
  const ref = doc(db, "quoteRates", "default");
  const snap = await getDoc(ref);
  if (!snap.exists()) return DEFAULT_QUOTE_RATES;
  return { ...DEFAULT_QUOTE_RATES, ...(snap.data() as Partial<QuoteRates>) };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const ref = doc(db, "siteSettings", "default");
  const snap = await getDoc(ref);
  if (!snap.exists()) return DEFAULT_SETTINGS;
  return { ...DEFAULT_SETTINGS, ...(snap.data() as Partial<SiteSettings>) };
}

export function whatsAppLink(phone: string, message?: string): string {
  const clean = phone.replace(/[^\d]/g, "");
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${clean}${text}`;
}
