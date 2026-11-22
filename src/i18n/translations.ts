/**
 * Site-wide translations. Add a new language by extending `Lang` and adding
 * the dictionary. Every key MUST exist in every language — TypeScript
 * enforces that via the `Dictionary` type below.
 */

export type Lang = "en" | "hi";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  hi: "हिन्दी",
};

const en = {
  // Header
  "nav.services":       "Services",
  "nav.projects":       "Projects",
  "nav.contact":        "Contact",
  "nav.getQuote":       "Get Quotation",

  // Hero
  "hero.eyebrow":       "Powering Madhya Pradesh, one rooftop at a time",
  "hero.title1":        "Clean energy.",
  "hero.title2":        "Real savings.",
  "hero.title3":        "Built to last.",
  "hero.subtitle":
    "Premium rooftop solar installations across Madhya Pradesh — engineered with top-tier panels, inverters, and full-service support for homes and businesses.",
  "hero.cta.primary":   "Talk to us",
  "hero.cta.secondary": "See our work",
  "hero.trust.installs":   "100+ installations",
  "hero.trust.cities":     "6 cities in MP",
  "hero.trust.components": "Tier-1 components",

  // Stats
  "stats.projects":  "Projects completed",
  "stats.capacity":  "Installed capacity",
  "stats.cities":    "Cities covered",
  "stats.team":      "In-house team",

  // Services
  "services.eyebrow": "What we do",
  "services.title":   "Solar solutions for every roof",
  "services.sub":     "From small homes to commercial sites, we design and install systems sized to your bill — with full end-to-end support.",

  "services.1.title":  "Residential Rooftop Solar (On-Grid)",
  "services.1.body":   "Grid-tied solar systems for homes — sized to slash your monthly bill and reduce reliance on the grid.",
  "services.2.title":  "Off-Grid Solar with Battery Backup",
  "services.2.body":   "Independent solar setups with battery storage — ideal for areas with frequent power cuts.",
  "services.3.title":  "Commercial & Industrial Solar",
  "services.3.body":   "Larger rooftop and ground-mount systems engineered for shops, factories, and farms.",
  "services.4.title":  "Solar Water Pump Systems",
  "services.4.body":   "DC and AC solar pumps for irrigation and water lifting — diesel-free and low maintenance.",
  "services.5.title":  "AMC, Cleaning & Maintenance",
  "services.5.body":   "Annual maintenance, panel cleaning, and remote monitoring to keep generation at peak.",
  "services.6.title":  "Net-Meter Application Assistance",
  "services.6.body":   "End-to-end help with DISCOM net-metering paperwork, inspections, and approvals.",

  // Projects
  "projects.eyebrow":  "Recent projects",
  "projects.title":    "Installations across Madhya Pradesh",
  "projects.sub":      "A glimpse of real rooftops we've energized — tap a city to filter.",
  "projects.all":      "All",
  "projects.rooftop":  "Rooftop",
  "projects.showAll":  "Show all {n} projects",
  "projects.showLess": "Show less",

  // WhyUs
  "why.eyebrow":   "Why Emerald True Energy",
  "why.title":     "Built on four promises",
  "why.1.title":   "Tier-1 components only",
  "why.1.body":    "Mono-PERC and TopCon panels, branded inverters, and galvanized hot-dip mounting — every part is specified for 25+ years of outdoor service.",
  "why.2.title":   "Our team end-to-end",
  "why.2.body":    "No subcontractors shuffling your project. The same engineers survey, design, install, and commission — one point of accountability.",
  "why.3.title":   "After-install support",
  "why.3.body":    "Net-meter paperwork with DISCOM, annual cleaning, monitoring, and AMC — all handled in-house so your system keeps generating peak.",
  "why.4.title":   "Honest numbers",
  "why.4.body":    "The quotation you download is the quotation we honor — itemized, with no hidden add-ons after installation starts.",

  // CTA
  "cta.title": "Ready to switch to solar?",
  "cta.sub":   "Get a personalized quotation in under a minute — designed around your roof, your bill, and your goals.",
  "cta.btn":   "Talk to us",

  // Contact
  "contact.eyebrow":   "Get in touch",
  "contact.title":     "Let's power your rooftop",
  "contact.sub":       "The fastest way to reach us is WhatsApp — we typically reply within an hour.",
  "contact.wa.label":  "Chat on WhatsApp",
  "contact.wa.hint":   "Tap to open WhatsApp",
  "contact.wa.msg":    "Hi! I'd like to discuss a solar installation.",
  "contact.call":      "Call us",
  "contact.email":     "Email us",
  "contact.where":     "Where we are",
  "contact.area":      "Site visits across Madhya Pradesh — get in touch and we'll set one up.",
  "contact.wa.missing": "Owner WhatsApp number not set yet.",

  // Footer
  "footer.tagline":  "Premium rooftop solar installations across Madhya Pradesh. Designed, installed and supported by our own engineers.",
  "footer.explore":  "Explore",
  "footer.reach":    "Reach us",
  "footer.rights":   "All rights reserved.",

  // Language toggle
  "lang.toggleAria": "Switch language",

  // Common
  "common.address": "Madhya Pradesh, India",
} as const;

export type TKey = keyof typeof en;
type Dictionary = Record<TKey, string>;

const hi: Dictionary = {
  // Header
  "nav.services":       "सेवाएँ",
  "nav.projects":       "परियोजनाएँ",
  "nav.contact":        "संपर्क",
  "nav.getQuote":       "कोटेशन लें",

  // Hero
  "hero.eyebrow":       "मध्य प्रदेश को ऊर्जावान बनाते हुए, एक छत एक समय में",
  "hero.title1":        "स्वच्छ ऊर्जा।",
  "hero.title2":        "असली बचत।",
  "hero.title3":        "लंबे समय तक चले।",
  "hero.subtitle":
    "मध्य प्रदेश भर में प्रीमियम रूफटॉप सोलर इंस्टॉलेशन — घरों और व्यवसायों के लिए टॉप-टियर पैनल, इनवर्टर और संपूर्ण सेवा सहायता के साथ तैयार।",
  "hero.cta.primary":   "हमसे बात करें",
  "hero.cta.secondary": "हमारे काम देखें",
  "hero.trust.installs":   "100+ इंस्टॉलेशन",
  "hero.trust.cities":     "म.प्र. के 6 शहर",
  "hero.trust.components": "टियर-1 उपकरण",

  // Stats
  "stats.projects":  "पूर्ण परियोजनाएँ",
  "stats.capacity":  "स्थापित क्षमता",
  "stats.cities":    "शहर कवर",
  "stats.team":      "इन-हाउस टीम",

  // Services
  "services.eyebrow": "हम क्या करते हैं",
  "services.title":   "हर छत के लिए सोलर समाधान",
  "services.sub":     "छोटे घरों से लेकर कमर्शियल साइटों तक — हम आपके बिल के अनुसार सिस्टम डिज़ाइन और इंस्टॉल करते हैं, पूरी एंड-टू-एंड सहायता के साथ।",

  "services.1.title":  "घरेलू रूफटॉप सोलर (ऑन-ग्रिड)",
  "services.1.body":   "घरों के लिए ग्रिड-कनेक्टेड सोलर सिस्टम — आपके मासिक बिल को काफी कम करने के लिए डिज़ाइन किया गया।",
  "services.2.title":  "बैटरी बैकअप के साथ ऑफ-ग्रिड सोलर",
  "services.2.body":   "बैटरी स्टोरेज के साथ स्वतंत्र सोलर सेटअप — बार-बार बिजली कटौती वाले क्षेत्रों के लिए आदर्श।",
  "services.3.title":  "कमर्शियल और औद्योगिक सोलर",
  "services.3.body":   "दुकानों, फैक्ट्रियों और खेतों के लिए बड़े रूफटॉप और ग्राउंड-माउंट सिस्टम।",
  "services.4.title":  "सोलर वॉटर पंप सिस्टम",
  "services.4.body":   "सिंचाई और पानी उठाने के लिए डीसी और एसी सोलर पंप — डीज़ल-फ्री और कम देखभाल।",
  "services.5.title":  "AMC, सफाई और रखरखाव",
  "services.5.body":   "वार्षिक रखरखाव, पैनल सफाई और रिमोट मॉनिटरिंग — ताकि उत्पादन हमेशा सर्वोत्तम रहे।",
  "services.6.title":  "नेट-मीटर आवेदन सहायता",
  "services.6.body":   "DISCOM नेट-मीटरिंग कागज़ात, निरीक्षण और मंज़ूरी में पूरी एंड-टू-एंड सहायता।",

  // Projects
  "projects.eyebrow":  "हालिया परियोजनाएँ",
  "projects.title":    "मध्य प्रदेश भर में इंस्टॉलेशन",
  "projects.sub":      "असली छतें जिन्हें हमने ऊर्जावान बनाया — फ़िल्टर करने के लिए शहर पर टैप करें।",
  "projects.all":      "सभी",
  "projects.rooftop":  "रूफटॉप",
  "projects.showAll":  "सभी {n} परियोजनाएँ देखें",
  "projects.showLess": "कम दिखाएँ",

  // WhyUs
  "why.eyebrow":   "एमेराल्ड ट्रू एनर्जी क्यों",
  "why.title":     "चार वादों पर आधारित",
  "why.1.title":   "सिर्फ़ टियर-1 उपकरण",
  "why.1.body":    "मोनो-PERC और TopCon पैनल, ब्रांडेड इनवर्टर और गैल्वनाइज़्ड हॉट-डिप माउंटिंग — हर हिस्सा 25+ साल बाहरी सेवा के लिए तय।",
  "why.2.title":   "हमारी ही टीम शुरू से अंत तक",
  "why.2.body":    "आपके प्रोजेक्ट में कोई सब-कॉन्ट्रैक्टर नहीं। वही इंजीनियर सर्वे, डिज़ाइन, इंस्टॉल और कमीशन करते हैं — एक ही ज़िम्मेदारी।",
  "why.3.title":   "इंस्टॉलेशन के बाद सहायता",
  "why.3.body":    "DISCOM नेट-मीटर कागज़ात, वार्षिक सफाई, मॉनिटरिंग और AMC — सब इन-हाउस, ताकि आपका सिस्टम पूरी क्षमता पर चलता रहे।",
  "why.4.title":   "ईमानदार आँकड़े",
  "why.4.body":    "जो कोटेशन आप डाउनलोड करते हैं वही हम मानते हैं — आइटम-वार, इंस्टॉलेशन शुरू होने के बाद कोई छुपा खर्च नहीं।",

  // CTA
  "cta.title": "सोलर पर जाने के लिए तैयार?",
  "cta.sub":   "एक मिनट से भी कम में अपना व्यक्तिगत कोटेशन पाएँ — आपकी छत, आपके बिल और आपके लक्ष्यों के अनुसार।",
  "cta.btn":   "हमसे बात करें",

  // Contact
  "contact.eyebrow":   "संपर्क करें",
  "contact.title":     "आइए आपकी छत को ऊर्जावान बनाएँ",
  "contact.sub":       "हम तक पहुँचने का सबसे तेज़ तरीका WhatsApp है — आमतौर पर एक घंटे के भीतर जवाब मिलता है।",
  "contact.wa.label":  "WhatsApp पर चैट करें",
  "contact.wa.hint":   "WhatsApp खोलने के लिए टैप करें",
  "contact.wa.msg":    "नमस्ते! मैं सोलर इंस्टॉलेशन के बारे में बात करना चाहता/चाहती हूँ।",
  "contact.call":      "फ़ोन करें",
  "contact.email":     "ईमेल करें",
  "contact.where":     "हम कहाँ हैं",
  "contact.area":      "मध्य प्रदेश भर में साइट विज़िट — संपर्क करें, हम तय कर देंगे।",
  "contact.wa.missing": "मालिक का WhatsApp नंबर अभी सेट नहीं है।",

  // Footer
  "footer.tagline":  "मध्य प्रदेश भर में प्रीमियम रूफटॉप सोलर इंस्टॉलेशन। हमारी ही इंजीनियरिंग टीम द्वारा डिज़ाइन, इंस्टॉल और समर्थित।",
  "footer.explore":  "एक्सप्लोर करें",
  "footer.reach":    "हम तक पहुँचें",
  "footer.rights":   "सर्वाधिकार सुरक्षित।",

  // Language toggle
  "lang.toggleAria": "भाषा बदलें",

  // Common
  "common.address": "मध्य प्रदेश, भारत",
};

export const TRANSLATIONS: Record<Lang, Dictionary> = { en, hi };
