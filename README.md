# Benifacts Alive — images and motion update

This is the uploaded Lovable / TanStack Start project with complementary architectural photography and subtle image motion. Existing page copy, CTA destinations, form fields, article titles and links, and the three hero videos are preserved.

## Run locally

Use Node.js 24 LTS, then:

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open **http://127.0.0.1:4173/** in your browser. For a production build:

```bash
npm run build
```

To publish on Hostinger (or any static host), run `npm run build:static`. It creates `hostinger-upload/` and `benifacts-hostinger.zip`; upload the zip to `public_html` in Hostinger's File Manager and extract it there.

Automatic deployment: `.github/workflows/deploy-hostinger.yml` runs that same build on every push to `main` and publishes the result to the `hostinger` branch. In Hostinger hPanel → Advanced → Git, connect this repository's `hostinger` branch to `public_html` and enable auto-deployment.

To preview the production build locally, run `npm run preview` (it builds with Nitro’s Node preset and serves on http://127.0.0.1:4174). `npm run build` still targets Cloudflare for deployment.

The original Lovable build configuration is retained. It currently targets a Cloudflare Worker through Nitro; `.output/public` alone is not the complete server-rendered application. No deployment to Lovable or your live domain has been performed by this ZIP update.

## Changes

- Added a real Canary Wharf skyline photo inside **Our Expertise**, and an architectural-detail photo inside **Who We Help**. These are illustrative city photographs, not a claim about Benifacts offices or clients.
- Added local 640 / 960 / 1440px WebP variants, responsive `srcset`, lazy loading, explicit dimensions and fixed display ratios.
- Added restrained reveal, hover zoom and up to 14px of scroll-driven desktop parallax. Scroll work stops when an image is off-screen. Reduced-motion preferences disable motion, and mobile disables parallax.
- Restored missing founder/team image files from the previously recovered original assets, retaining existing wording and placeholder disclosures.
- Replaced the reconstructed CSS/text logo with authentic original Benifacts SVG files. Added the original logo favicon and existing logo-based social image, without recoloring or stretching the artwork.
- Included a dependency lockfile for repeatable installation. No animation library was added.

The homepage lives in `src/routes/index.tsx` as twelve sections with an ARIO-inspired structure (hero with the original video and an oversized wordmark, an opening image, filing cards and founder, stacked practice cards, a pinned “who we help” stage, approach timeline, case study, team, testimonial, insight cards, FAQ, contact, and a footer wordmark). All motion — smooth scrolling, entrance reveals, the scroll-driven light/dark section tones, the cursor glow and the approach timeline — is in one hook, `src/components/use-editorial-motion.ts`, and every effect is disabled under `prefers-reduced-motion`. Styles are in `src/styles.css`. Photography sources, license notes, dimensions and hashes are in `IMAGE_CREDITS.md`.

## Hero videos

The playlist remains unchanged:

1. `public/videos/hero-01-bridge-day.mp4`
2. `public/videos/hero-02-bridge-dusk.mp4`
3. `public/videos/hero-03-city-avenue.mp4`

All three original video files and both original poster files remain byte-for-byte identical to the upload.

## Existing limitations in the supplied export

- Only the homepage route was supplied. The four `/services/...` links therefore lead to missing local pages. Their destinations were preserved; no replacement service copy or pages were invented.
- The form submits directly to the existing external Hostinger endpoint. The source has no local success/error handler. Validation can be checked locally, but message delivery has not been tested by sending a real enquiry.
- The founder's identity/credentials, testimonial, illustrative case study and AI team photo are not verified business claims; retain all existing disclosures.
- The CSS names Manrope and IBM Plex Mono without supplying/loading their files; the uploaded font behavior is retained. Root metadata still contains the original Lovable author/Twitter values.

See `VERIFICATION.md` for the actual checks and any remaining issues. `preview/` contains browser screenshots when verification completes.
