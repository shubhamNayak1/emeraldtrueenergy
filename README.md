# Emerald True Energy

Premium solar solutions website + admin panel.

- **Frontend**: Next.js 16 (App Router) + TypeScript + Tailwind CSS — deployed to Vercel
- **Backend**: Firebase (Firestore + Storage + Auth) + 1 Cloud Function for PDF generation
- **Region**: `asia-south1` (Mumbai)

## Project layout

```
emeraldtrueenergy/
├── src/                      # Next.js app
│   ├── app/                  # routes (public + /admin)
│   ├── components/site/      # public-site UI
│   ├── components/admin/     # admin UI
│   └── lib/                  # firebase init, types, data, quote calc
├── functions/                # Cloud Functions (TypeScript) → Firebase
│   └── src/
│       ├── index.ts          # generateQuote callable
│       ├── pdf.ts            # PDF rendering (pdfkit)
│       └── quote.ts          # rate × kW math
├── firebase.json             # Firestore + Storage + Functions config
├── firestore.rules           # security: public read, admin-only write
├── storage.rules             # security: public read for project/review images
├── scripts/
│   ├── seed.mjs              # initial services / rates / settings
│   └── grant-admin.mjs       # gives a Firebase Auth user admin claim
└── .env.example              # frontend Firebase config
```

## Setup (one-time)

1. **Create a Firebase project**
   ```
   npx firebase-tools login
   npx firebase-tools projects:create emeraldtrueenergy
   ```
   In the Firebase console, enable: Firestore, Storage, Authentication (Email/Password), Functions.

2. **Wire frontend env vars**
   Copy `.env.example` to `.env.local` and paste values from
   *Project Settings → General → Your apps → Web app → SDK setup & configuration*.

3. **Install + run dev**
   ```
   npm install
   npm run dev          # http://localhost:3000
   ```

4. **Install + build the Cloud Function**
   ```
   cd functions && npm install && npm run build && cd ..
   ```

5. **Deploy security rules + the function**
   ```
   npx firebase-tools deploy --only firestore:rules,storage,functions
   ```

6. **Seed initial data** (services, default quote rates, site settings)
   - Download a service-account key: *Firebase console → Project settings → Service accounts → Generate new private key*. Save it as `serviceAccountKey.json` (gitignored).
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json node scripts/seed.mjs
   ```

7. **Create the owner's admin account**
   - In Firebase console → Authentication → Users → Add user (email + password).
   - Then grant the admin claim:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json node scripts/grant-admin.mjs owner@emeraldtrueenergy.in
   ```
   - Owner signs in at `/admin/login`.

## Deployment

### Frontend → Vercel
- Connect the GitHub repo on Vercel
- Add the same env vars from `.env.local` to the Vercel project
- Default build settings work (Next.js auto-detected)

### Backend → Firebase
- `npx firebase-tools deploy --only firestore:rules,storage,functions`

## Day-to-day admin

After deploy the owner uses `/admin` to:
- **Dashboard** – see lead counts at a glance
- **Inbox** – contact-form messages + quote-download leads (one-click WhatsApp reply)
- **Services** – add/edit/hide/delete services shown on the site
- **Projects** – upload installation photos with location + kW
- **Reviews** – add/edit client testimonials
- **Settings** – edit quotation pricing (any rate change immediately affects new PDFs) and site contact details

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

All factors are stored in `quoteRates/default` and editable from `/admin/settings`.
