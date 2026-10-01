# Verification — 29 September 2026

The edited source was built and checked in a local Chromium browser before packaging.

## Passed

- TypeScript: `npx tsc --noEmit`.
- Production build: `npm run build` (original Lovable / Cloudflare build configuration).
- Homepage renders with its existing H1 and page title; no browser console errors, runtime errors or Vite error overlay during the completed run.
- All images loaded, including both new photos and restored original images.
- Image reveal state, desktop hover scale (1 → 1.025), and scroll drift verified in the browser.
- Reduced-motion mode displays images immediately with no transform; hero uses a still poster.
- Mobile menu opens/closes and the Who We Help link navigates to `#clients`.
- FAQ opens correctly.
- Empty form fails native required-field validation. No real enquiry was sent.

| Viewport width | Document width | Horizontal page overflow | Broken images |
|---:|---:|---|---:|
| 1440px | 1440px | None | 0 |
| 1280px | 1280px | None | 0 |
| 768px | 768px | None | 0 |
| 390px | 390px | None | 0 |
| 375px | 375px | None | 0 |

## Preservation checks

Compared directly with the uploaded ZIP:

- Existing visible JSX copy unchanged outside replacement of the reconstructed logo with the original image file.
- All service/client/article/FAQ data unchanged.
- Contact form source and all existing link destinations unchanged.
- All six original public assets (three MP4 videos, two JPG posters and robots.txt) remain byte-for-byte identical.
- No new animation library added.

The screenshots in `preview/` show the actual edited application. `preview/browser-report.json` contains the recorded checks. These are local source changes, not a Lovable deployment.

## Existing issues not resolved by this image update

The supplied ZIP includes only the homepage. The following existing destinations still return 404 locally:

- `/services/cross-border-accounting`
- `/services/international-tax-compliance`
- `/services/founder-advisory`
- `/services/virtual-cfo`

The form's external Hostinger delivery endpoint was preserved but not tested with a live enquiry. The source lacks a local success/error UI. Root metadata still includes the source Lovable author/Twitter defaults, and named fonts are not bundled/loaded. These source limitations are described in README.md; no replacement copy or new backend was invented.

No Lighthouse score or real-device 60fps claim is made. Testing was at the listed viewport sizes in Chromium.
