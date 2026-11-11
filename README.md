# TT Global IT Website

Company website for TT Global IT. The public pages are static HTML served from `public/`, wrapped in a Next.js 14 app that adds a small admin CMS. Editable text, links and images on the static pages are stored in MongoDB and applied in the browser at load time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How the CMS Works](#how-the-cms-works)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- Static marketing site: home, about, team, careers, contact, industries (banking, communications, education, energy, healthcare, public services), products (eSahakara, eChits, eVyavahaar, Pinnacle, RiBill), internship, and legal pages (privacy, terms, refund policy).
- Admin dashboard at `/admin` to edit page content without touching HTML.
- Signed-cookie session authentication (HMAC-SHA256, 7-day expiry) enforced by Next.js middleware.
- Public content API consumed by `public/cms-hydrate.js` to hydrate pages client-side.
- Global (shared) content for the header, navigation and footer, applied to every page.
- Chatbot widget (`public/chatbot.js`) and scroll-reveal animations.

## Tech Stack

- **Framework:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS 3, PostCSS, `class-variance-authority`, `tailwind-merge`
- **UI:** Radix UI (accordion), `lucide-react`, `motion`
- **Database:** MongoDB (official `mongodb` driver)
- **Tooling:** `cheerio` and `dotenv` for the seed scripts
- **Hosting:** Vercel (see `vercel.json`)

## Project Structure

```
.
├── app/
│   ├── admin/
│   │   ├── login/            # Admin login page
│   │   └── (dashboard)/      # Protected dashboard: page list and per-page editor
│   ├── api/
│   │   ├── admin/            # Protected: login, logout, pages, content/[page]
│   │   └── content/[page]/   # Public read-only content endpoint
│   ├── demo/                 # Component demo page
│   ├── globals.css
│   └── layout.tsx
├── components/               # React components (components/ui for shared UI)
├── lib/
│   ├── auth.ts               # Signed-cookie session + credential check
│   ├── mongodb.ts            # MongoDB client and content get/save helpers
│   ├── pages-manifest.ts     # List of CMS-editable pages
│   └── utils.ts
├── public/                   # Static site: *.html pages, assets/, images/, JS/CSS helpers
│   ├── cms-hydrate.js        # Applies CMS content to [data-cms] elements
│   ├── chatbot.js
│   └── scroll-reveal.{js,css}
├── scripts/
│   ├── seed-content.mjs          # Seeds MongoDB from [data-cms] elements in public/*.html
│   └── tag-global-remaining.mjs  # One-off helper to tag shared nav/footer with global.* keys
├── middleware.ts             # Protects /admin/* and /api/admin/*
├── next.config.js            # Rewrites / to /index.html
├── tailwind.config.ts
└── vercel.json
```

## Getting Started

### Prerequisites

- Node.js 18.17 or later (required by Next.js 14) and npm
- A MongoDB instance (local, Docker, or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/Harsh9934-debug/ttglobalit_site.git
cd ttglobalit_site
npm install
```

Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables)), then seed the database and start the dev server:

```bash
npm run seed
npm run dev
```

- Site: <http://localhost:3000>
- Admin: <http://localhost:3000/admin>

## Environment Variables

Set these in `.env.local` for local development, and in your hosting provider's settings for production. Never commit `.env*` files (they are git-ignored).

| Variable         | Required | Description                                                      |
| ---------------- | -------- | ---------------------------------------------------------------- |
| `MONGODB_URI`    | Yes (prod) | MongoDB connection string. Defaults to `mongodb://localhost:27017`. |
| `MONGODB_DB`     | No       | Database name. Defaults to `ttglobalit`.                         |
| `ADMIN_EMAIL`    | Yes      | Admin login email.                                               |
| `ADMIN_PASSWORD` | Yes      | Admin login password.                                            |
| `SESSION_SECRET` | Yes      | Long random string used to sign session cookies.                 |

Example:

```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DB=ttglobalit
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=change-me
SESSION_SECRET=replace-with-a-long-random-string
```

Generate a secret with `openssl rand -base64 32`.

## Available Scripts

| Command         | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `npm run dev`   | Start the Next.js development server                               |
| `npm run build` | Create a production build                                          |
| `npm start`     | Run the production build                                           |
| `npm run seed`  | Seed MongoDB with content found in `public/*.html` (non-destructive) |

## How the CMS Works

1. Editable elements in `public/*.html` carry a `data-cms="<key>"` attribute and optionally `data-cms-field` (`text` by default, or `html`, `src`, `href`, `alt`). Each page's `<body>` has a `data-page-id`.
2. `npm run seed` parses these elements and inserts their current values into the `content` collection. Existing fields are never overwritten, so re-running it is safe after admin edits.
3. Admins sign in at `/admin/login` and edit values per page. Changes are saved through `/api/admin/content/[page]`.
4. On page load, `public/cms-hydrate.js` fetches `/api/content/[page]` (plus the `global` content) and applies the values to matching elements.

To add a new editable page: add the HTML file to `public/`, tag elements with `data-cms`, add an entry to `lib/pages-manifest.ts`, and re-run `npm run seed`.

Note: content keys are dot-path strings (for example `hero.heading`). See the comment in `lib/mongodb.ts` for why content is merged in application code rather than with dotted `$set` paths.

## Deployment

The project is configured for [Vercel](https://vercel.com) (`vercel.json` sets the `nextjs` framework).

1. Import the repository into Vercel.
2. Add the environment variables listed above in **Project Settings → Environment Variables**. Use a hosted MongoDB such as MongoDB Atlas, and allow Vercel's IPs to connect.
3. Seed the production database once, from your machine, with `MONGODB_URI` pointing at the production database: `npm run seed`.
4. Deploy. Pushes to `main` trigger production deployments; other branches get preview deployments.

To self-host instead: `npm run build && npm start` with the environment variables set, behind a reverse proxy such as nginx.

## Contributing

1. Create a branch from `main` (for example `feature/short-description` or `fix/short-description`).
2. Make focused changes and keep the existing code style (TypeScript, Tailwind utility classes, no semicolons).
3. Run `npm run build` and confirm it succeeds before opening a pull request.
4. If you edit static HTML, keep the `data-cms` attributes intact so the admin editor keeps working; re-run `npm run seed` if you add new ones.
5. Open a pull request against `main` with a clear description of what changed and why. Link related issues.
6. Never commit secrets or `.env*` files.
