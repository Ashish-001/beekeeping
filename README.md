# Amber Hive

A website for a bee-products business (honey, honeycomb, pollen, propolis, beeswax, gift sets). Visitors browse products and send **enquiries**. There's no cart or checkout. An admin panel manages products and reads enquiries.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4 and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Admin panel: http://localhost:3000/admin. The credentials are in `.env.local`:

```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=honey123
SESSION_SECRET=<random string used to sign the login cookie>
```

Change these before you deploy. `.env.example` shows the variables you need.

## Where things live

| What | Where |
| --- | --- |
| Products | `data/products.json` (comes with 11 sample products) |
| Enquiries | `data/enquiries.json` (created on first enquiry) |
| Uploaded product photos | `data/uploads/`, served at `/media/<file>` |
| Business name, email, phone, address | `src/lib/site.ts` |
| Product categories | `src/lib/types.ts` |
| Public pages | `src/app/(site)/` |
| Admin pages | `src/app/admin/` |
| Server actions (enquiry, login, product CRUD) | `src/app/actions.ts`, `src/app/admin/actions.ts` |

Products without a photo show an illustrated honey jar in the product's chosen colour.

## Deploying

The data is stored as JSON files on disk, so the app needs a server with a **persistent filesystem** (a VPS, Railway, Render with a disk, Docker with a volume, etc.). Serverless hosts like Vercel won't keep your writes. To use one of those, swap the functions in `src/lib/data.ts` for a database. Nothing else in the app touches the files directly.
