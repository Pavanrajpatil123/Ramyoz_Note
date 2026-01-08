# Notes Management Web Application

Single Next.js 14 app with built-in API routes (Mongoose + MongoDB). An optional Express backend is included under `backend/` for standalone API usage, but the primary app uses Next.js API routes at `/api/notes`.

## Features

- Create, list, edit, and delete notes
- Clean UI with Tailwind CSS
- Next.js API routes with Mongoose models
- Proper error handling and status codes

## Tech Stack

- Next.js 14 (App Router)
- React 18
- MongoDB with Mongoose 8
- Tailwind CSS 3

## Getting Started

1) Next.js App (with API routes)

```bash
npm install
npm run dev
# App runs on http://localhost:3000
```

Configure [\.env.local](.env.local):

```env
# Required: Mongo connection for API routes
MONGODB_URI=mongodb://127.0.0.1:27017/notes

# Optional: if deploying behind a proxy/non-root URL, set base URL for SSR fetches
# NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

2) Optional Express Backend (standalone API)

```bash
cd backend
npm install
npm run dev
# Server listens on http://localhost:4000
```

Configure [backend/.env](backend/.env):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/notes
PORT=4000
```

## Project Structure

- Next.js App — UI + API routes:
  - [app/page.tsx](app/page.tsx) — List notes (fetches from `/api/notes`)
  - [app/new/page.tsx](app/new/page.tsx) — Create note
  - [app/edit/[id]/page.tsx](app/edit/%5Bid%5D/page.tsx) — Edit note
  - API routes: [app/api/notes/route.ts](app/api/notes/route.ts), [app/api/notes/[id]/route.ts](app/api/notes/%5Bid%5D/route.ts)
  - Shared libs/models: [lib/mongodb.ts](lib/mongodb.ts), [models/Note.ts](models/Note.ts)

- Optional Express Backend — REST API:
  - [backend/src/server.ts](backend/src/server.ts) — Express app + routes
  - [backend/src/lib/mongodb.ts](backend/src/lib/mongodb.ts) — MongoDB connection utility
  - [backend/src/models/Note.ts](backend/src/models/Note.ts) — Mongoose Note model

## API Endpoints

Next.js API (primary):
- `GET /api/notes` — List all notes
- `POST /api/notes` — Create a note `{ title, content }`
- `GET /api/notes/:id` — Fetch a note by ID
- `PUT /api/notes/:id` — Update a note `{ title, content }`
- `DELETE /api/notes/:id` — Delete a note by ID

Express Backend (optional):
- `GET /notes` — List all notes
- `POST /notes` — Create a note `{ title, content }`
- `GET /notes/:id` — Fetch a note by ID
- `PUT /notes/:id` — Update a note `{ title, content }`
- `DELETE /notes/:id` — Delete a note by ID

## Styling

Tailwind CSS is configured in [tailwind.config.ts](tailwind.config.ts) and styles are imported in [app/layout.tsx](app/layout.tsx) via [app/globals.css](app/globals.css).

## Notes

- Ensure `MONGODB_URI` is set in `.env.local` for Next.js API routes.
- If using the optional Express backend, set `MONGODB_URI` and `PORT` in `backend/.env`.
- For Vercel deployments, ensure environment variables are configured on the project.

## License

This project is provided as-is for educational purposes.