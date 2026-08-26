# Trekluent

Built with [Next.js](https://nextjs.org) (App Router). Pages are server-rendered/statically
generated so verb conjugations, metadata, and the sitemap are crawlable without JavaScript.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with hot module reloading.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Requires the FastAPI backend (`conjugation-website-api`) running on `http://127.0.0.1:8000`.

### `npm test`

Runs the test suite with Vitest.

### `npm run build`

Type-checks and builds the app for production, statically pre-rendering every verb page it can
reach via `NEXT_PUBLIC_API_BASE_URL` (or the local backend) at build time.

### `npm start`

Serves the production build locally, for a final check before deploying.

## Environment variables

- `NEXT_PUBLIC_API_BASE_URL` — base URL of the FastAPI backend. Defaults to
  `http://127.0.0.1:8000` for local development; set this to the deployed backend's public URL in
  production so builds/metadata/sitemap generation can actually reach it.
- `NEXT_PUBLIC_SITE_URL` — the site's public URL, used for `metadataBase` and the sitemap. Defaults
  to `http://localhost:3000`.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL` — used by the "Comments, questions, or
  concerns" feedback widget (`src/components/FeedbackWidget.tsx`) to email submissions via
  [Resend](https://resend.com). See `.env.local.example` for details; until these are set the
  widget's API route (`src/app/api/feedback/route.ts`) responds with a friendly "not set up yet"
  error instead of sending.
