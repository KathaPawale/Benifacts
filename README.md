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

The original Lovable build configuration is retained. It currently targets a Cloudflare Worker through Nitro; `.output/public` alone is not the complete server-rendered application. No deployment to Lovable or your live domain has been performed by this ZIP update.

## Changes

- Added a real Canary Wharf skyline photo inside **Our Expertise**, and an architectural-detail photo inside **Who We Help**. These are illustrative city photographs, not a claim about Benifacts offices or clients.
- Added local 640 / 960 / 1440px WebP variants, responsive `srcset`, lazy loading, explicit dimensions and fixed display ratios.
- Added restrained reveal, hover zoom and up to 14px of scroll-driven desktop parallax. Scroll work stops when an image is off-screen. Reduced-motion preferences disable motion, and mobile disables parallax.
- Restored missing founder/team image files from the previously recovered original assets, retaining existing wording and placeholder disclosures.
- Replaced the reconstructed CSS/text logo with authentic original Benifacts SVG files. Added the original logo favicon and existing logo-based social image, without recoloring or stretching the artwork.
- Included a dependency lockfile for repeatable installation. No animation library was added.

The new component is `src/components/animated-image.tsx`. Its two uses are in `src/routes/index.tsx`; photo styles are at the end of `src/styles.css`. Photography sources, license notes, dimensions and hashes are in `IMAGE_CREDITS.md`.

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
