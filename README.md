# Classroom Tanzania — Next.js frontend

A learning app for Tanzanian students (Standard 1 through university), covering the
NECTA and ZEC syllabi, past papers, mock exams, and progress analytics.

The app is the client half of:

```
Next.js frontend  →  Laravel REST API  →  MySQL
```

The API lives in `../classroom-tanzania-api`. Everything that used to hit
Supabase goes through the service layer in `src/services`, which now calls that
API. No database credentials exist in this project.

## Requirements

- Node.js 18.18+ (developed on Node 24)
- npm
- The API running — see `../classroom-tanzania-api/README.md`

## Running it locally

```bash
npm install
cp .env.example .env.local        # points at http://localhost:8000/api
npm run dev
```

Then open <http://localhost:3000>, with the API on <http://localhost:8000>.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the Laravel API, including `/api`. |

The API's `FRONTEND_URLS` must list this app's origin, or the browser will block
every call: CORS runs with credentials enabled and therefore no wildcard.

| Command | What it does |
|---|---|
| `npm run dev` | Development server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `npm run build` first) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | Next's linter |

## Project structure

```
src/
  app/                 App Router routes (one folder per screen)
  components/
    ui/                Icon, PasswordField, ShareActions, ShareButton, BookmarkButton
    layout/            AppShell, BottomNav, ScreenHeader, SessionProvider, RequireAuth
    auth/              Login, register, forgot password, terms, level cascade
    dashboard/         Home, notifications, trending, bookmarks, performance
    learning/          Subject detail, topic reader
    quizzes/           Quiz flow, past-paper flow, papers list, downloads
    guardian/          Guardian dashboard, student detail, invite-code manager
    profile/           Account screen and its sub-views
    video/             Lesson screen, video player, subject lessons section
  content/             Fetches the content catalogue and hydrates src/data
  data/                Educational content: seed literals + the hydrated values
  services/            The backend seam — every call to the Laravel API
  lib/                 Pure helpers (formatting, search index, deep links, levels)
  types/               Shared domain types
public/                PWA manifest, service worker, icons, past-paper PDFs
```

## How it talks to the API

Every network operation lives in `src/services`, and only
`src/services/api-client.ts` calls `fetch`. Components call services; they never
know where data comes from. Each exported function carries a comment naming the
endpoint behind it, e.g.:

```ts
/** GET /api/attempts — quiz and paper attempts merged, oldest first. */
export async function loadAttemptHistory(): Promise<AttemptRecord[]>
```

`src/services/api-client.ts` holds the bearer token, unwraps the API's
`{ success, data, message }` envelope, and turns failures into the `{ message }`
shape the screens render.

### Content

The screens read subjects, topics, tests and papers **synchronously** from
module scope — the search index is built at import, the subject grid and quiz
screen index straight into the maps. So rather than a request per screen,
`src/content/store.ts` fetches the whole published catalogue once at boot from
`GET /api/content/catalog` and writes it into `src/data`, which those screens
read. `<ContentProvider>` holds the first render until that is done.

The literals still in `src/data` (exported as `SEED_*`) are the offline
fallback: if the API can't be reached, the app runs on the content it shipped
with instead of showing an empty shell. MySQL is the source of truth; those
literals are a safety net.

A signed-out catalogue is served **without the answer keys**, so the store
refetches after signing in — the quiz screen marks an answer the instant it is
tapped and genuinely needs the key client-side.

### What is still in localStorage

Two keys, both cache rather than state:

- `classroom-tz:token` — the Sanctum bearer token, so a reload doesn't sign you
  out. The API is on another origin, so a same-site cookie isn't available to it.
- `classroom-tz:catalog` — the cached content catalogue, for offline use. It is
  cleared on logout, because it can contain answer keys.

Accounts, attempts, progress, bookmarks, notifications and guardian links are
all server-side. Nothing the student owns lives in the browser any more.

## Styling

`src/app/globals.css` is the original stylesheet, carried over verbatim. Tailwind
is installed and its utilities are available, but **Preflight is deliberately not
imported** — it would reset default margins the existing design depends on. See
the comment at the top of that file before changing it.

## Video lessons

Courses and lessons sit alongside the existing Subject → Topic → Quiz structure
rather than replacing it: a course optionally belongs to a subject.

- A subject screen grows a **Video lessons** section, which renders nothing at
  all when that subject has no published course.
- `/lessons/[lessonId]` plays a lesson and reports position every 10 seconds, on
  pause, and when the tab is hidden — so a student resumes where they stopped.
- The API returns a resolved playback URL per video: a file/CDN URL for uploads
  and external links, or an embed URL for YouTube/Vimeo. Video bytes never pass
  through the API server, so playback scales with storage rather than with PHP.
# CLASSROOM-TANZANIA
