# Emerald True Energy

Premium solar solutions website for **Emerald True Energy**, Madhya Pradesh.

- 100% **static** site — no backend, no database, no monthly cost
- Hosted on **GitHub Pages**, deployed automatically on push to `main`
- Quote PDF generated **in the browser** with jsPDF (no server required)
- Contact via **WhatsApp / phone / email** action buttons

## Tech

- Next.js 16 (App Router) with `output: "export"`
- TypeScript + Tailwind CSS v4
- jsPDF + jspdf-autotable for client-side PDF generation
- GitHub Actions → GitHub Pages

## Local development

```bash
npm install
npm run dev          # → http://localhost:3000
```

> **Note**: when running locally, the homepage path is `/` (no base path).
> When deployed to GitHub Pages without a custom domain, the site lives at
> `https://shubhamnayak1.github.io/emeraldtrueenergy/` — the build adds a
> `/emeraldtrueenergy` prefix automatically.

## Editing content

Everything the public sees lives in **`src/content/`**. Edit, commit, push — GitHub Actions redeploys in ~2 min.

| File | What it controls |
|---|---|
| `src/content/settings.ts` | Company name, owner WhatsApp, public phone/email/address, hero copy, **all quote rates** |
| `src/content/services.ts` | Service cards (Home + /services) |
| `src/content/projects.ts` | Project gallery (Home + /projects) — references images in `public/projects/` |
| `src/content/reviews.ts` | Client reviews (shown on Home) |

### Adding project photos

1. Drop the JPG/PNG into `public/projects/` (e.g. `public/projects/khurai-rooftop.jpg`)
2. Add an entry to `src/content/projects.ts` with `photo: "/projects/khurai-rooftop.jpg"`
3. Commit and push.

### Changing the WhatsApp number

Edit `ownerWhatsApp` in `src/content/settings.ts` (full international format, e.g. `+919876543210`). The floating WhatsApp button + Contact-page button update automatically.

### Updating quote pricing

Edit `QUOTE_RATES` in `src/content/settings.ts` and push. Every PDF generated after the deploy uses the new rates.

## Deploying to GitHub Pages

### One-time setup (~2 min)

1. **GitHub repo → Settings → Pages**
   - **Source**: GitHub Actions
   - Save.
2. Push to `main` (you've already done this).
3. The workflow at `.github/workflows/nextjs.yml` builds + publishes the site.
4. Site is live at `https://shubhamnayak1.github.io/emeraldtrueenergy/` within ~2 minutes.

### Custom domain (later)

When you buy a domain (e.g. `emeraldtrueenergy.in`):

1. **GitHub repo → Settings → Pages → Custom domain** → enter `emeraldtrueenergy.in` → Save. GitHub creates a `CNAME` file in the repo automatically.
2. At your DNS registrar, point the domain at GitHub Pages:
   - `A` records → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or `CNAME` (for `www`) → `shubhamnayak1.github.io`
3. The workflow's `actions/configure-pages` step detects the custom domain and drops the path prefix automatically — no config edits needed.

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

All factors are in `src/content/settings.ts` → `QUOTE_RATES`.
