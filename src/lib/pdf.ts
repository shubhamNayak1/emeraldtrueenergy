import PDFDocument from "pdfkit";
import type { QuoteBreakdown } from "./types";

type Customer = { name: string; phone: string; email?: string; type: string; kW: number };
type Branding = { companyName: string; phone: string; email: string; address: string };

const EMERALD = "#047857";
const EMERALD_DARK = "#064e3b";
const SUN = "#f59e0b";
const INK = "#0f1f1a";
const SOFT = "#6b7280";

function inr(n: number): string {
  return "Rs. " + Math.round(n).toLocaleString("en-IN");
}

export async function buildQuotePdf(
  customer: Customer,
  breakdown: QuoteBreakdown,
  branding: Branding,
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const chunks: Buffer[] = [];
    doc.on("data", (c) => chunks.push(c));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const today = new Date().toLocaleDateString("en-IN", {
      day: "2-digit", month: "long", year: "numeric",
    });
    const quoteRef = `ETE-${Date.now().toString().slice(-8)}`;

    // ── HEADER BAND ──
    doc.rect(0, 0, doc.page.width, 110).fill(EMERALD);
    doc.fillColor("white").font("Helvetica-Bold").fontSize(22).text(branding.companyName, 50, 36);
    doc.font("Helvetica").fontSize(10).fillColor("#d1fae5")
      .text("Premium Solar Solutions · Madhya Pradesh", 50, 64);

    doc.fillColor("white").font("Helvetica-Bold").fontSize(13)
      .text("QUOTATION", 0, 38, { align: "right", width: doc.page.width - 50 });
    doc.font("Helvetica").fontSize(9).fillColor("#d1fae5")
      .text(`Ref: ${quoteRef}`, 0, 60, { align: "right", width: doc.page.width - 50 })
      .text(`Date: ${today}`, 0, 74, { align: "right", width: doc.page.width - 50 });

    // ── CUSTOMER ──
    let y = 140;
    doc.fillColor(EMERALD_DARK).font("Helvetica-Bold").fontSize(11).text("Prepared for", 50, y);
    y += 16;
    doc.fillColor(INK).font("Helvetica-Bold").fontSize(13).text(customer.name, 50, y);
    y += 18;
    doc.font("Helvetica").fontSize(10).fillColor(SOFT)
      .text(`Phone: ${customer.phone}`, 50, y);
    y += 14;
    if (customer.email) {
      doc.text(`Email: ${customer.email}`, 50, y);
      y += 14;
    }
    doc.text(`Installation type: ${customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}`, 50, y);
    y += 14;
    doc.text(`System size: ${customer.kW} kW`, 50, y);
    y += 30;

    // ── BREAKDOWN TABLE ──
    doc.fillColor(EMERALD_DARK).font("Helvetica-Bold").fontSize(12).text("System estimate", 50, y);
    y += 18;

    const colItem = 50;
    const colDetail = 290;
    const colAmount = doc.page.width - 50;
    const rowH = 24;

    doc.rect(45, y, doc.page.width - 90, rowH).fill("#ecfdf5");
    doc.fillColor(EMERALD_DARK).font("Helvetica-Bold").fontSize(10)
      .text("Item", colItem + 5, y + 7)
      .text("Detail", colDetail, y + 7)
      .text("Amount", colAmount - 80, y + 7, { width: 75, align: "right" });
    y += rowH;

    const r = breakdown.rates;
    const rows: Array<[string, string, number]> = [
      ["Net meter installation", customer.kW <= 5 ? "Up to 5 kW slab" : "Above 5 kW slab", breakdown.netMeter],
      ["Labour & licensing", `${customer.kW} kW × ${inr(r.labourPerKW)}`, breakdown.labour],
      ["Mounting & material", `${customer.kW} kW × ${inr(r.materialPerKW)}`, breakdown.material],
      ["Inverter", `${customer.kW} kW × ${inr(r.inverterPerKW)}`, breakdown.inverter],
      ["Solar panels", `${breakdown.panelQuantity} × ${r.panelWattage}W mono-PERC`, breakdown.solarPanel],
      ["Transport", `${customer.kW} kW × ${inr(r.transportPerKW)}${r.includeTransport ? "" : " (not in total)"}`, breakdown.transport],
    ];

    rows.forEach((row, i) => {
      if (i % 2 === 1) doc.rect(45, y, doc.page.width - 90, rowH).fill("#fbfaf6");
      doc.fillColor(INK).font("Helvetica").fontSize(10).text(row[0], colItem + 5, y + 7);
      doc.fillColor(SOFT).fontSize(9).text(row[1], colDetail, y + 7, { width: 200 });
      doc.fillColor(INK).font("Helvetica-Bold").fontSize(10)
        .text(inr(row[2]), colAmount - 80, y + 7, { width: 75, align: "right" });
      y += rowH;
    });

    y += 6;
    doc.rect(45, y, doc.page.width - 90, 38).fill(EMERALD);
    doc.fillColor("white").font("Helvetica-Bold").fontSize(14)
      .text("Estimated total", colItem + 5, y + 12);
    doc.fontSize(16).text(inr(breakdown.total), colAmount - 130, y + 11, { width: 125, align: "right" });
    y += 56;

    doc.rect(45, y, doc.page.width - 90, 3).fill(SUN);
    y += 18;

    doc.fillColor(EMERALD_DARK).font("Helvetica-Bold").fontSize(11).text("What's included", 50, y);
    y += 16;
    const notes = [
      "Site survey and structural design",
      "Tier-1 mono-PERC solar panels",
      "Branded grid-tied inverter with warranty",
      "Galvanized mounting structure",
      "DC/AC cabling, junction boxes & earthing",
      "Net-metering coordination with the local DISCOM",
      "Commissioning, system handover & monitoring setup",
    ];
    doc.fillColor(INK).font("Helvetica").fontSize(10);
    notes.forEach((n) => {
      doc.circle(54, y + 5, 1.6).fill(EMERALD).fillColor(INK);
      doc.text(n, 62, y);
      y += 14;
    });
    y += 10;

    doc.fillColor(SOFT).fontSize(8).font("Helvetica-Oblique")
      .text(
        "This is a budgetary estimate based on the inputs provided. Final pricing may vary based on a site survey, " +
        "DISCOM-specific net-meter requirements, and any roof structural work needed. Quotation valid for 15 days.",
        50, y, { width: doc.page.width - 100 },
      );

    const fy = doc.page.height - 60;
    doc.rect(0, fy, doc.page.width, 60).fill("#ecfdf5");
    doc.fillColor(EMERALD_DARK).font("Helvetica-Bold").fontSize(10).text(branding.companyName, 50, fy + 14);
    doc.fillColor(SOFT).font("Helvetica").fontSize(9)
      .text(`${branding.phone}  ·  ${branding.email}  ·  ${branding.address}`, 50, fy + 30);

    doc.end();
  });
}
