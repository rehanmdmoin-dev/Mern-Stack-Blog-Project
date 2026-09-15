# The Ledger — Blog Management System frontend

A Next.js frontend covering all three roles in your backend: public readers,
authors, and admins.

## Setup

```bash
npm install
cp .env.example .env   # then edit NEXT_PUBLIC_API_URL if your backend isn't on :5000
npm run dev
```

Requires your backend (`blog-management-system-restyled`) running and
reachable at `NEXT_PUBLIC_API_URL`.

## What's built, by role

**Public (no login required)**
- Home page — hero, category chips, latest blogs
- `/blogs` — full explorer: search, filter by category/tag, sort (latest,
  oldest, most viewed/liked/commented), pagination
- `/blog/[slug]` — full blog view, like button, comments (read-only until
  signed in)
- `/author/[id]` — public author profile with stats and recent blogs
- Register (reader, author, or admin), email OTP verification, sign in, forgot/reset password

**Reader (any logged-in user)**
- `/profile` — edit name/bio/profile image
- `/profile/liked-blogs`, `/profile/commented-blogs`, `/profile/reading-history`
- Commenting and liking on any published blog

**Author** (`/dashboard/*`, role-gated)
- Overview — blog counts by status, total views/likes/comments, most
  popular blog, recent comments on their own blogs
- My blogs — filterable by status, submit-for-review / delete actions
- Write / edit — shared form (title, description, content, category, tags,
  featured image URL), save as draft or submit for review

**Admin** (`/admin/*`, role-gated)
- Overview — site-wide KPIs, pending-review queue, top authors/categories,
  most-viewed blogs, newest users
- Blogs — every blog regardless of status; publish / reject (with a reason)
  / unpublish
- Users — search/filter by role, activate/deactivate, delete (can't act on
  your own account)
- Categories & Tags — full CRUD, category activate/deactivate
- Analytics — publishing trend chart, blogs-per-category and
  blogs-per-tag charts (recharts), average views/likes/comments per blog,
  top authors, most active readers, top commenters

Admin registration is enabled for this assignment. In production, restrict
admin creation to an existing administrator or an invite flow.

## Route protection

- `proxy.ts` (Next.js 16's `middleware.ts` equivalent) blocks `/dashboard/*`,
  `/admin/*`, and `/profile/*` at the edge if there's no `token` cookie, and
  additionally checks the `role` cookie for `/dashboard` (must be `author`)
  and `/admin` (must be `admin`).
- Each dashboard layout (`DashboardShell`) double-checks on the client and
  redirects if the role cookie doesn't match, so a stale/tampered cookie
  can't render the wrong shell even for a moment.

## Notes on backend limitations reflected in the UI

- There's no backend endpoint to list comments across all blogs, so admin
  comment moderation (`moderateComment` / `PUT /comments/:id/status`) is
  wired up in `redux/slice/commentSlice.ts` but not surfaced as its own
  admin page — there's nowhere to fetch a global comment queue from. If you
  add a `GET /api/comments` (admin, all statuses) endpoint, I can build that
  page in about the time it'd take to wire up the fetch.
- `PUT /blogs/:id` (update) doesn't accept `saveAsDraft` the way `POST
  /blogs` (create) does, so the edit page has a single "Save changes"
  action, with a separate "Submit for review" link for draft/rejected
  blogs that calls the dedicated `PUT /:id/submit` endpoint instead.
- Featured images and profile images are plain URL fields (matching your
  Blog/User schemas, which store `featuredImage`/`profileImage` as strings,
  not file uploads) — so these are URL inputs, not file pickers.

## Design

A distinct "editorial desk" theme from your other project: warm paper
background, near-black ink text, a single rust/burnt-orange accent, and
Source Serif 4 for headlines paired with Work Sans for UI text — meant to
read like a magazine/publishing platform rather than an admin tool.

## Validated

Every import across all 58 source files was cross-checked against the
actual exports of its target module (redux slices, components, lib
helpers) — no missing or mismatched imports. I don't have network access
in this sandbox, so I couldn't run `npm install` + `next build` to catch
TypeScript errors the compiler would catch; worth running a build on your
end before deploying.
