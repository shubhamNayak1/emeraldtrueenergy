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
 * EmailJS — sends a notification email with the quote details every time a
 * customer downloads a quotation PDF. The "to" address is configured inside
 * the EmailJS template, not here.
 *
 * Setup (~5 min — see README "Quote-download notifications via EmailJS"):
 *   1. Sign up at https://www.emailjs.com (free, 200 mails/month)
 *   2. Add an email service (Gmail/Outlook) → copy its Service ID
 *   3. Create a template using the variables listed in the README → copy Template ID
 *   4. Account → API Keys → copy the Public Key
 *   5. Account → Domains → restrict to emeraldtrueenergy.in + your *.github.io subdomain
 *   6. Paste all three below, commit, push.
 *
 * If any of these are empty strings, the email step is skipped silently — the
 * PDF still downloads as normal.
 */
export const EMAILJS = {
  serviceId: "service_rdn8byo",
  templateId: "template_sz574y7",
  publicKey: "7-SoJAxtmRLJf9YtW",
};

/**
 * Quotation pricing. Edit and redeploy whenever rates change.
 *
 * Solar panel count = ceil(kW × 1000 / panelWattage)
 *   e.g. for 5 kW: ceil(5000 / 545) = ceil(9.17) = 10 panels
 *
 * Solar panel cost = panelUnitPrice × panelCount
 *   e.g. for 5 kW: 20,000 × 10 = 200,000
 */
export const QUOTE_RATES = {
  netMeterUnder5kW: 5000,
  netMeterFiveKWPlus: 25000,
  labourPerKW: 2000,
  materialPerKW: 8000,
  inverterPerKW: 7000,
  panelWattage: 545,
  panelsPerKW: 1000 / 545, // 1.834... → kW × 1000 / 545
  panelUnitPrice: 20000,
  transportPerKW: 1000,
  includeTransport: true,
};
