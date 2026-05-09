"use client";

import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import type { QuoteBreakdown } from "./quote";

type Customer = {
  name: string;
  phone: string;
  email?: string;
  type: string;
  kW: number;
};

type Branding = {
  companyName: string;
  phone: string;
  email: string;
  address: string;
};

const EMERALD: [number, number, number] = [4, 120, 87];
const EMERALD_DARK: [number, number, number] = [6, 78, 59];
const SUN: [number, number, number] = [245, 158, 11];
const INK: [number, number, number] = [15, 31, 26];
const SOFT: [number, number, number] = [107, 114, 128];
const CREAM: [number, number, number] = [251, 250, 246];

function inr(n: number): string {
  return "Rs. " + Math.round(n).toLocaleString("en-IN");
}

export function buildQuotePdf(
  customer: Customer,
  breakdown: QuoteBreakdown,
  branding: Branding,
): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const w = doc.internal.pageSize.getWidth();
  const h = doc.internal.pageSize.getHeight();

  const today = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const ref = `ETE-${Date.now().toString().slice(-8)}`;

  // ── HEADER BAND ──
  doc.setFillColor(...EMERALD);
  doc.rect(0, 0, w, 110, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text(branding.companyName, 50, 50);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(209, 250, 229);
  doc.text("Premium Solar Solutions · Madhya Pradesh", 50, 72);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("QUOTATION", w - 50, 50, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(209, 250, 229);
  doc.text(`Ref: ${ref}`, w - 50, 70, { align: "right" });
  doc.text(`Date: ${today}`, w - 50, 84, { align: "right" });

  // ── CUSTOMER ──
  let y = 145;
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("Prepared for", 50, y);

  y += 18;
  doc.setTextColor(...INK);
  doc.setFontSize(13);
  doc.text(customer.name, 50, y);

  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...SOFT);
  doc.text(`Phone: ${customer.phone}`, 50, y);
  y += 14;
  if (customer.email) {
    doc.text(`Email: ${customer.email}`, 50, y);
    y += 14;
  }
  doc.text(
    `Installation type: ${customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}`,
    50,
    y,
  );
  y += 14;
  doc.text(`System size: ${customer.kW} kW`, 50, y);
  y += 26;

  // ── BREAKDOWN TABLE ──
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("System estimate", 50, y);
  y += 6;

  const r = breakdown.rates;
  const rows: Array<[string, string, string]> = [
    [
      "Net meter installation",
      customer.kW <= 5 ? "Up to 5 kW slab" : "Above 5 kW slab",
      inr(breakdown.netMeter),
    ],
    [
      "Labour & licensing",
      `${customer.kW} kW × ${inr(r.labourPerKW)}`,
      inr(breakdown.labour),
    ],
    [
      "Mounting & material",
      `${customer.kW} kW × ${inr(r.materialPerKW)}`,
      inr(breakdown.material),
    ],
    [
      "Inverter",
      `${customer.kW} kW × ${inr(r.inverterPerKW)}`,
      inr(breakdown.inverter),
    ],
    [
      "Solar panels",
      `${breakdown.panelQuantity} × ${r.panelWattage}W mono-PERC or Top Con`,
      inr(breakdown.solarPanel),
    ],
    [
      "Transport",
      `${customer.kW} kW × ${inr(r.transportPerKW)}${r.includeTransport ? "" : " (not in total)"}`,
      inr(breakdown.transport),
    ],
  ];

  autoTable(doc, {
    startY: y + 6,
    head: [["Item", "Detail", "Amount"]],
    body: rows,
    margin: { left: 45, right: 45 },
    headStyles: {
      fillColor: [236, 253, 245],
      textColor: EMERALD_DARK,
      fontStyle: "bold",
      fontSize: 10,
    },
    bodyStyles: { fontSize: 10, textColor: INK, cellPadding: 7 },
    alternateRowStyles: { fillColor: CREAM },
    columnStyles: {
      0: { cellWidth: 160, fontStyle: "bold" },
      1: { textColor: SOFT, fontSize: 9 },
      2: { halign: "right", fontStyle: "bold", cellWidth: 90 },
    },
    theme: "plain",
  });

  // @ts-expect-error: lastAutoTable is added by the plugin at runtime
  let after = doc.lastAutoTable.finalY + 8;

  // ── TOTAL BAND ──
  doc.setFillColor(...EMERALD);
  doc.rect(45, after, w - 90, 38, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Estimated total", 55, after + 24);
  doc.setFontSize(16);
  doc.text(inr(breakdown.total), w - 55, after + 24, { align: "right" });
  after += 50;

  // sun accent bar
  doc.setFillColor(...SUN);
  doc.rect(45, after, w - 90, 3, "F");
  after += 22;

  // ── INCLUSIONS ──
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("What's included", 50, after);
  after += 18;

  const notes = [
    "Site survey and structural design",
    "Tier-1 mono-PERC or Top Con solar panels",
    "Branded grid-tied inverter with warranty",
    "Galvanized mounting structure",
    "DC/AC cabling, junction boxes & earthing",
    "Net-metering coordination with the local DISCOM",
    "Commissioning, system handover & monitoring setup",
  ];
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...INK);
  notes.forEach((n) => {
    doc.setFillColor(...EMERALD);
    doc.circle(54, after - 3, 1.6, "F");
    doc.text(n, 62, after);
    after += 14;
  });
  after += 8;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...SOFT);
  const disclaimer =
    "This is a budgetary estimate based on the inputs provided. Final pricing may vary based on a site survey, " +
    "DISCOM-specific net-meter requirements, and any roof structural work needed. Quotation valid for 15 days.";
  doc.text(disclaimer, 50, after, { maxWidth: w - 100 });

  // ── FOOTER ──
  const fy = h - 60;
  doc.setFillColor(236, 253, 245);
  doc.rect(0, fy, w, 60, "F");
  doc.setTextColor(...EMERALD_DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text(branding.companyName, 50, fy + 22);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...SOFT);
  doc.text(
    `${branding.phone}  ·  ${branding.email}  ·  ${branding.address}`,
    50,
    fy + 40,
  );

  doc.save(`EmeraldTrueEnergy-Quotation-${customer.kW}kW.pdf`);
}
