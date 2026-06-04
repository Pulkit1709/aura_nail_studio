# Aura Nail Studio by Tisha

Premium Next.js landing website for Aura Nail Studio by Tisha in Sangrur, Punjab.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn-style owned UI primitives
- Lucide Icons
- React Hook Form
- Zod validation

## Key Features

- Luxury responsive homepage for services, courses, gallery, testimonials, FAQ, and contact
- WhatsApp-first appointment and course registration flows
- Floating WhatsApp CTA, mobile bottom navigation, back-to-top, scroll progress, dark mode, and lead popup
- Local Business schema, OpenGraph/Twitter metadata, sitemap, and robots
- Google Maps embed and directions link
- Lazy-loaded gallery with lightbox

## Project Structure

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    aura-site.tsx
    providers.tsx
    ui/
      badge.tsx
      button.tsx
      card.tsx
      input.tsx
      label.tsx
  lib/
    utils.ts
```

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

On this Windows machine, Application Control blocked the native Next.js SWC binary. The project includes `@next/swc-wasm-nodejs`, and the verified local build command was:

```powershell
$env:NEXT_TEST_WASM_DIR='D:\aura_website\node_modules\@next\swc-wasm-nodejs'; npm.cmd run build
```

Vercel Linux builds should use the normal `npm run build` command.

## Vercel Deployment

1. Push the project to GitHub.
2. Import the repository in Vercel.
3. Framework preset: `Next.js`.
4. Build command: `npm run build`.
5. Output directory: `.next`.
6. Deploy.

Update `metadataBase` in `src/app/layout.tsx`, `src/app/robots.ts`, and `src/app/sitemap.ts` to the final production domain after deployment.
