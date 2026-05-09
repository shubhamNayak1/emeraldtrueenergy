/**
 * Site-wide content. Edit these values, commit, push — GitHub Pages redeploys.
 */

export const SETTINGS = {
  companyName: "Emerald True Energy",

  // Owner WhatsApp number — full international format, no spaces.
  // E.g. "+919876543210". Used by the floating WhatsApp button + Contact page.
  ownerWhatsApp: "+918878643294",

  // Public-facing contact (display + tel: / mailto: links).
  publicPhone: "07732796147",
  publicEmail: "knsenterprisespanna@gmail.com",
  address: "Madhya Pradesh, India",

  // Hero section copy (Home page)
  heroEyebrow: "Powering Madhya Pradesh, one rooftop at a time",
  heroTitle1: "Clean energy.",
  heroTitle2: "Real savings.",
  heroTitle3: "Built to last.",
  heroSubtitle:
    "Premium rooftop solar installations across Madhya Pradesh — engineered with top-tier panels, inverters, and full-service support for homes and businesses.",
} as const;

/**
 * Quotation pricing. Edit and redeploy whenever rates change.
 *
 * Solar panel cost = panelUnitPrice × (panelsPerKW × kW)
 *   e.g. for 5 kW: 20,000 × (2 × 5) = 200,000
 */
export const QUOTE_RATES = {
  netMeterUnder5kW: 5000,
  netMeterFiveKWPlus: 25000,
  labourPerKW: 2000,
  materialPerKW: 8000,
  inverterPerKW: 7000,
  panelWattage: 545,
  panelsPerKW: 2,
  panelUnitPrice: 20000,
  transportPerKW: 1000,
  includeTransport: true,
};
