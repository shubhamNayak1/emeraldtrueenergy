export type InstallType = "residential" | "commercial" | "industrial";
export type PanelTech = "Bifacial" | "TopCon";

export type QuoteRates = {
  residentialPerKW: number;
  commercialPerKW: number;
  bifacialWattage: number;
  topConWattage: number;
  contactThresholdKW: number;
};

export type QuoteBreakdown = {
  panelTech: PanelTech;
  panelWattage: number;
  panelQuantity: number;
  perKWRate: number;
  total: number;
  rates: QuoteRates;
};

export function wattageFor(tech: PanelTech, rates: QuoteRates): number {
  return tech === "Bifacial" ? rates.bifacialWattage : rates.topConWattage;
}

export function perKWRateFor(type: InstallType, rates: QuoteRates): number {
  return type === "residential" ? rates.residentialPerKW : rates.commercialPerKW;
}

export function calculateQuote(
  kW: number,
  panelTech: PanelTech,
  installType: InstallType,
  rates: QuoteRates,
): QuoteBreakdown {
  const panelWattage = wattageFor(panelTech, rates);
  // Panel count is purely informational on the PDF — round up so the
  // array never comes out under-sized.
  const panelQuantity = Math.ceil((kW * 1000) / panelWattage);
  const perKWRate = perKWRateFor(installType, rates);
  const total = kW * perKWRate;

  return {
    panelTech,
    panelWattage,
    panelQuantity,
    perKWRate,
    total,
    rates,
  };
}

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
