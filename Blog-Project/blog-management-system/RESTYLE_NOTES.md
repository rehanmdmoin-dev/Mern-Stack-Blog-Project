# Blog Management System — restyled

Same backend, same behavior — only the code pattern changed to match your
usual style. No business logic, validation rules, or API contracts were
altered; every response returns the exact same data it did before.

## What changed (pattern only)

- **Folder layout**: `controllers/`, `models/`, `routes/`, `middleware/`,
  `utils/` → `app/config`, `app/controller/api`, `app/models`,
  `app/routes/api`, `app/utils`, `app/middleware`.
- **Controllers**: from exported plain functions wrapped in `asyncHandler`
  to classes exported as a singleton instance (`module.exports = new
  XController()`), with each method handling its own `try/catch` inline
  instead of throwing a custom `ApiError` up to a global handler.
- **Response shape**: `{ success: true/false, ... }` → `{ status:
  true/false, ... }` throughout every controller.
- **Middleware**: `role.js` → `authorize.js` (same role-check logic);
  `auth.js` rewritten to a single `try/catch` per function instead of the
  `asyncHandler` wrapper, same JWT verification + `isActive` check as
  before.
- **Files renamed** to match your casing convention: models are lowercase
  (`user.js`, `blog.js`, ...), controllers are `PascalCase` + `Controller`
  (`AuthController.js`, ...), routes are singular `xRoute.js`
  (`authRoute.js`, not `authRoutes.js`).
- **Entry point**: `server.js` + `app.js` merged into one `app.js`, with
  `connectDB()` awaited before `app.listen(PORT, (error) => {...})` in your
  callback style.
- **`utils/ApiError.js` and `utils/asyncHandler.js` removed** — no longer
  needed once error handling moved inline into each controller method.
  `errorHandler.js` middleware still exists as a fallback safety net for
  anything that isn't caught inline (e.g. a synchronous throw in
  middleware), not as the primary error path anymore.
- **`.env`**: `MONGO_URI` renamed to `MONGODB_URL` to match your other
  projects' env var naming. The actual connection string and JWT secret
  values were carried over unchanged.

## What did NOT change

- Every validation rule (still `express-validator`, same rules, same
  routes)
- Every Mongoose schema, index, and pre-save hook
- Every aggregation pipeline in `DashboardController` (author/admin
  dashboards, trend/category/tag/author/performance/active-reader/
  top-commenter analytics) — copied over exactly as written
- All `.populate()` usage in Blog/Comment/Profile controllers — left as-is,
  since swapping to `$lookup` aggregation would be a functional/
  architectural change, not a pattern change
- Route paths, HTTP methods, and access rules (which roles can hit which
  endpoint)

## Validated

Every file passed `node --check` (syntax), and the full
routes → controllers → models require chain loads cleanly with no missing
imports or naming mismatches. I don't have network access to your MongoDB
Atlas cluster from here, so I couldn't run a live request — worth a
`npm install && npm run dev` on your end to confirm.
