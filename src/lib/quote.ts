export type InstallType = "residential" | "commercial" | "industrial";
export type PanelTech = "Bifacial" | "TopCon";
/** DCR = Domestic Content Requirement (subsidy-eligible); NDCR = non-DCR. */
export type PanelCert = "DCR" | "NDCR";

export type QuoteRates = {
  /** Per-panel price for DCR-certified panels (residential, subsidy path). */
  panelUnitPriceDCR: number;
  /** Per-panel price for non-DCR panels (commercial/industrial, no subsidy). */
  panelUnitPriceNDCR: number;
  /** Inverter cost per kW. */
  inverterPerKW: number;
  /** Mounting structure cost per kW (GI - Hot Dip - Machine cut). */
  mountingPerKW: number;
  /** Flat fee covering net meter, labour, and transport. */
  installationFlat: number;
  /** Default panel wattage when the form doesn't pick one. */
  defaultPanelWattage: number;
};

export type QuoteBreakdown = {
  panelQuantity: number;
  panelWattage: number;
  panelTech: PanelTech;
  panelCert: PanelCert;
  panelUnitPrice: number;
  solarPanel: number;
  inverter: number;
  mounting: number;
  installation: number;
  total: number;
  rates: QuoteRates;
};

/** 500–550 Wp range = Bifacial; 550+ = TopCon (per owner spec). */
export function panelTechFor(wattage: number): PanelTech {
  return wattage < 550 ? "Bifacial" : "TopCon";
}

/** Residential installs are DCR (subsidy-eligible). C/I are NDCR. */
export function panelCertFor(type: InstallType): PanelCert {
  return type === "residential" ? "DCR" : "NDCR";
}

export function calculateQuote(
  kW: number,
  panelWattage: number,
  installType: InstallType,
  rates: QuoteRates,
): QuoteBreakdown {
  // Panels: number of (kW × 1000) / Wp panels, rounded up so we never
  // under-size the array.
  const panelQuantity = Math.ceil((kW * 1000) / panelWattage);
  const panelCert = panelCertFor(installType);
  const panelUnitPrice =
    panelCert === "DCR" ? rates.panelUnitPriceDCR : rates.panelUnitPriceNDCR;
  const solarPanel = panelQuantity * panelUnitPrice;

  const inverter = kW * rates.inverterPerKW;
  const mounting = kW * rates.mountingPerKW;
  const installation = rates.installationFlat;

  const total = solarPanel + inverter + mounting + installation;

  return {
    panelQuantity,
    panelWattage,
    panelTech: panelTechFor(panelWattage),
    panelCert,
    panelUnitPrice,
    solarPanel,
    inverter,
    mounting,
    installation,
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
