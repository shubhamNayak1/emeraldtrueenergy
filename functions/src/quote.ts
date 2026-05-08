// Mirror of src/lib/quote.ts — kept here so the function has zero shared-deps.

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

export const DEFAULT_QUOTE_RATES: QuoteRates = {
  netMeterUnder5kW: 5000,
  netMeterFiveKWPlus: 25000,
  labourPerKW: 2000,
  materialPerKW: 8000,
  inverterPerKW: 7000,
  panelWattage: 545,
  panelRateBase: 15.25,
  panelMargin: 1.05,
  transportPerKW: 1000,
  includeTransport: true,
  currency: "INR",
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

export function calculateQuote(kW: number, rates: QuoteRates): QuoteBreakdown {
  const netMeter = kW <= 5 ? rates.netMeterUnder5kW : rates.netMeterFiveKWPlus;
  const labour = kW * rates.labourPerKW;
  const material = kW * rates.materialPerKW;
  const inverter = kW * rates.inverterPerKW;

  const panelUnitRate = rates.panelRateBase * rates.panelWattage * rates.panelMargin;
  const panelQuantity = Math.floor((kW * 1000) / rates.panelWattage);
  const solarPanel = panelUnitRate * panelQuantity;

  const transport = kW * rates.transportPerKW;

  const total =
    netMeter + labour + material + inverter + solarPanel +
    (rates.includeTransport ? transport : 0);

  return { netMeter, labour, material, inverter, solarPanel, panelQuantity, transport, total, rates };
}

export function formatINR(n: number): string {
  return "Rs. " + Math.round(n).toLocaleString("en-IN");
}
