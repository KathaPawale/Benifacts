# Benifacts website source

The complete website source and its local images, fonts, and videos are included. The Perspectives section and its navigation links have been removed.

## Run locally

Use Node.js 22.12 or newer with npm. From this folder run:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Production build

```sh
npm run build
npm run preview
```

This project uses React, TanStack Start, Vite and Nitro. It is a source project, not a single static HTML upload; use hosting compatible with its server/worker build.

The contact form retains its existing external submission endpoint. Local preview does not provide a new email backend. No credentials, dependencies folder, build caches or historical review screenshots are included.
