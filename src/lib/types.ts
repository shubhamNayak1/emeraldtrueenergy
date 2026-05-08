import type { Timestamp } from "firebase/firestore";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string;
  order: number;
  active: boolean;
};

export type Project = {
  id: string;
  title: string;
  location: string;
  kW?: number;
  photoUrl: string;
  completedAt?: Timestamp | null;
  description?: string;
  order: number;
  active: boolean;
};

export type Review = {
  id: string;
  clientName: string;
  clientPhotoUrl?: string;
  location?: string;
  stars: 1 | 2 | 3 | 4 | 5;
  text: string;
  order: number;
  active: boolean;
};

export type LeadType = "contact" | "quote";
export type LeadStatus = "new" | "read" | "closed";

export type Lead = {
  id: string;
  type: LeadType;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  kW?: number;
  totalQuoted?: number;
  status: LeadStatus;
  createdAt: Timestamp;
};

export type QuoteRates = {
  netMeterUnder5kW: number;
  netMeterFiveKWPlus: number;
  labourPerKW: number;
  materialPerKW: number;
  inverterPerKW: number;
  panelWattage: number;
  panelRateBase: number;
  panelMargin: number;
  transportPerKW: number;
  includeTransport: boolean;
  currency: string;
};

export type SiteSettings = {
  ownerWhatsApp: string;
  ownerEmail: string;
  companyAddress: string;
  companyPhone: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
};

export type QuoteBreakdown = {
  netMeter: number;
  labour: number;
  material: number;
  inverter: number;
  solarPanel: number;
  panelQuantity: number;
  transport: number;
  total: number;
  rates: QuoteRates;
};
