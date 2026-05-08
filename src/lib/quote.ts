import type { QuoteBreakdown, QuoteRates } from "./types";

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

  return {
    netMeter,
    labour,
    material,
    inverter,
    solarPanel,
    panelQuantity,
    transport,
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
