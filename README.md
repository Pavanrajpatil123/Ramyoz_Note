# Notes Management Web Application

Now split into separate frontend (Next.js) and backend (Express + Mongoose) folders.

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

## Getting Started (Monorepo)

Run backend and frontend separately:

1) Backend (Express API)

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

2) Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# App runs on http://localhost:3000
```

Configure [frontend/.env.local](frontend/.env.local):

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Project Structure

- Frontend — Next.js App Router UI:
  - [frontend/app/page.tsx](frontend/app/page.tsx) — List notes (fetches from backend `/notes`)
  - [frontend/app/new/page.tsx](frontend/app/new/page.tsx) — Create note
  - [frontend/app/edit/[id]/page.tsx](frontend/app/edit/%5Bid%5D/page.tsx) — Edit note
  - [frontend/components/NoteCard.tsx](frontend/components/NoteCard.tsx)
  - [frontend/components/NoteForm.tsx](frontend/components/NoteForm.tsx)
  - [frontend/tailwind.config.ts](frontend/tailwind.config.ts)

- Backend — Express REST API:
  - [backend/src/server.ts](backend/src/server.ts) — Express app + routes
  - [backend/src/lib/mongodb.ts](backend/src/lib/mongodb.ts) — MongoDB connection utility
  - [backend/src/models/Note.ts](backend/src/models/Note.ts) — Mongoose Note model

## API Endpoints (Backend)

- `GET /notes` — List all notes
- `POST /notes` — Create a note `{ title, content }`
- `GET /notes/:id` — Fetch a note by ID
- `PUT /notes/:id` — Update a note `{ title, content }`
- `DELETE /notes/:id` — Delete a note by ID

## Styling

Tailwind CSS is configured in [tailwind.config.ts](tailwind.config.ts) and styles are imported in [app/layout.tsx](app/layout.tsx) via [app/globals.css](app/globals.css).

## Notes

- Ensure `MONGODB_URI` is set in backend before starting the API.
- Frontend uses `NEXT_PUBLIC_API_URL` to call the backend.

## License

This project is provided as-is for educational purposes.