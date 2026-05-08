// Seeds the Firestore database with starter services + default quote rates +
// default site settings. Run once after firebase project init.
//
//   node scripts/seed.mjs
//
// Requires GOOGLE_APPLICATION_CREDENTIALS pointing at a service-account key,
// OR run via `firebase emulators:exec --only firestore "node scripts/seed.mjs"`.

import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

const services = [
  {
    title: "Residential Rooftop Solar (On-Grid)",
    description:
      "Grid-tied solar systems for homes, sized to slash your monthly bill and reduce reliance on the grid.",
  },
  {
    title: "Off-Grid Solar with Battery Backup",
    description:
      "Independent solar setups with battery storage — ideal for areas with frequent power cuts.",
  },
  {
    title: "Commercial & Industrial Solar",
    description:
      "Larger rooftop and ground-mount systems engineered for shops, factories, and farms.",
  },
  {
    title: "Solar Water Pump Systems",
    description:
      "DC and AC solar pumps for irrigation and water lifting — diesel-free and low maintenance.",
  },
  {
    title: "AMC, Cleaning & Maintenance",
    description:
      "Annual maintenance, panel cleaning, and remote monitoring to keep generation at peak.",
  },
  {
    title: "Net-Meter Application Assistance",
    description:
      "End-to-end help with DISCOM net-metering paperwork, inspections, and approvals.",
  },
];

const quoteRates = {
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

const siteSettings = {
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

async function seed() {
  console.log("Seeding services…");
  let i = 0;
  for (const s of services) {
    await db.collection("services").add({ ...s, order: i++, active: true });
  }

  console.log("Seeding quote rates…");
  await db.doc("quoteRates/default").set(quoteRates, { merge: true });

  console.log("Seeding site settings…");
  await db.doc("siteSettings/default").set(siteSettings, { merge: true });

  console.log(`Done. Seeded ${services.length} services + rates + settings.`);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
