# Notes Management Web Application

A full-stack Notes app built with Next.js (App Router), MongoDB (Mongoose), and Tailwind CSS.

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

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file from `.env.example` and set your MongoDB connection string:

```bash
copy .env.example .env.local  # Windows
# Then edit .env.local and set MONGODB_URI
```

3. Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Project Structure

- [app](app) — App Router pages and API routes
  - [app/api/notes/route.ts](app/api/notes/route.ts) — GET all, POST create
  - [app/api/notes/[id]/route.ts](app/api/notes/%5Bid%5D/route.ts) — GET by ID, PUT update, DELETE
  - [app/page.tsx](app/page.tsx) — List notes
  - [app/new/page.tsx](app/new/page.tsx) — Create note
  - [app/edit/[id]/page.tsx](app/edit/%5Bid%5D/page.tsx) — Edit note
- [components](components) — Reusable UI components
  - [components/NoteCard.tsx](components/NoteCard.tsx)
  - [components/NoteForm.tsx](components/NoteForm.tsx)
- [lib/mongodb.ts](lib/mongodb.ts) — MongoDB connection utility
- [models/Note.ts](models/Note.ts) — Mongoose Note model

## API Endpoints

- `GET /api/notes` — List all notes
- `POST /api/notes` — Create a note `{ title, content }`
- `GET /api/notes/:id` — Fetch a note by ID
- `PUT /api/notes/:id` — Update a note `{ title, content }`
- `DELETE /api/notes/:id` — Delete a note by ID

## Styling

Tailwind CSS is configured in [tailwind.config.ts](tailwind.config.ts) and styles are imported in [app/layout.tsx](app/layout.tsx) via [app/globals.css](app/globals.css).

## Notes

- Ensure `MONGODB_URI` is set before interacting with API routes.
- Server components fetch using relative API routes with `cache: 'no-store'` to avoid stale data.

## License

This project is provided as-is for educational purposes.