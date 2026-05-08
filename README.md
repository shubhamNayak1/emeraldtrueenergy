# Emerald True Energy

Premium solar solutions website + admin panel.

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS — deployed to Vercel
- **Backend services**: Firebase **Spark plan** (free) — Firestore + Storage + Auth
- **PDF generation**: Next.js API route (`/api/quote`) running on Vercel — keeps everything on free tiers
- **Region**: `asia-south1` (Mumbai) for Firestore + Storage

> **Why no Cloud Functions?** Firebase Functions require the paid Blaze plan. This setup keeps everything on free tiers (₹0/month).

## Project layout

```
emeraldtrueenergy/
├── src/
│   ├── app/
│   │   ├── (public)              # Home / Services / Projects / Contact
│   │   ├── admin/                # Owner panel (gated by Firebase Auth admin claim)
│   │   └── api/quote/route.ts    # POST → returns PDF + saves quote-lead to Firestore
│   ├── components/site/          # public-site UI
│   ├── components/admin/         # admin UI
│   └── lib/
│       ├── firebase.ts           # lazy SDK init
│       ├── pdf.ts                # pdfkit branded quotation
│       ├── quote.ts              # rate × kW math
│       ├── data.ts               # Firestore reads
│       ├── auth.ts               # admin-claim hook
│       └── types.ts
├── firebase.json                 # Firestore + Storage rules deploy config
├── firestore.rules               # public read, admin-only write
├── storage.rules                 # public read for project/review images
└── scripts/
    ├── seed.mjs                  # initial services / rates / settings
    └── grant-admin.mjs           # gives a Firebase Auth user the admin claim
```

## Setup (one-time)

### 1 · Create a Firebase project (Spark / free plan)
- [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → name it → disable Analytics → **Create**.
- **Stay on the Spark plan.** No credit card required.

### 2 · Enable services
| Service | Where | Region |
|---|---|---|
| Firestore | Build → Firestore Database → Create | `asia-south1` |
| Storage | Build → Storage → Get started | `asia-south1` |
| Authentication | Build → Authentication → Email/Password → Enable | — |

### 3 · Get the web SDK config
- Project settings → "Your apps" → click `</>` web icon → register `Emerald True Energy Web` (skip hosting).
- Copy the 6 `firebaseConfig` values.

### 4 · Wire frontend env vars
```bash
cp .env.example .env.local
```
Paste the 6 values into `.env.local`.

### 5 · Install + run dev
```bash
npm install
npm run dev          # → http://localhost:3000
```

### 6 · Deploy security rules to Firebase
```bash
npm install -g firebase-tools
firebase login
firebase use --add        # pick your project
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### 7 · Download a service-account key (for seeding + admin grant only)
- Project settings → **Service accounts** → **Generate new private key** → save as `serviceAccountKey.json` in repo root (gitignored).

### 8 · Seed initial data (services, rates, settings)
```bash
GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json node scripts/seed.mjs
```

### 9 · Create the owner's admin account
- Firebase console → Authentication → Users → **Add user** (email + password).
- Grant the admin claim:
  ```bash
  GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json node scripts/grant-admin.mjs owner@emeraldtrueenergy.in
  ```

## Deployment

### Frontend → Vercel
1. [vercel.com](https://vercel.com) → Add Project → import the GitHub repo.
2. Add the **same 6 `NEXT_PUBLIC_FIREBASE_*` env vars** (Production + Preview + Development).
3. Click **Deploy**. ~2 min.
4. Authorize the Vercel domain in Firebase: **Auth → Settings → Authorized domains** → add `<project>.vercel.app` (and your custom domain if any).

### After deploy
- Frontend changes → push to `main` → Vercel auto-redeploys.
- Rule changes → `firebase deploy --only firestore:rules`.
- Content changes (services / projects / rates / WhatsApp number / hero copy) → done from `/admin`. No redeploy needed.

## Day-to-day admin (`/admin`)
- **Dashboard** – live counts of leads, quotes, services, projects, reviews
- **Inbox** – contact-form messages and quote-download leads, with one-click WhatsApp follow-up
- **Services / Projects / Reviews** – full CRUD with image upload
- **Settings** – edit every quotation rate (live 5 kW preview) + owner WhatsApp/email/address/hero copy

## Quotation math (for reference)
```
netMeter   = kW <= 5 ? 5000 : 25000
labour     = kW × 2000
material   = kW × 8000
inverter   = kW × 7000
panelRate  = 15.25 × 545 × 1.05      (per panel)
panelQty   = floor(kW × 1000 / 545)
solarPanel = panelRate × panelQty
transport  = kW × 1000
total      = netMeter + labour + material + inverter + solarPanel + transport
```
All factors live in `quoteRates/default` and are editable from `/admin/settings` — changes take effect on the very next quote download.
