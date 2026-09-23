# RBAC Assignment Management System

Production-style Node.js + Express + MongoDB backend implementing Role-Based
Access Control across three roles (Admin / Manager / Employee)


## Setup

1. `npm install`
2. `cp .env.example .env` and fill in `MONGO_URI`, `JWT_SECRET`,
   `JWT_REFRESH_SECRET`, and your Cloudinary credentials
3. Create the first admin (see below — there's no other way to get one in)
4. `npm run dev`

### Creating the first admin

Public registration **always** creates an `employee` — this is intentional
(see "A security decision" below), so there's no way to get an admin into
the system without seeding one directly:

```bash
node app/utils/seedAdmin.js
```

Uses `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` / `SEED_ADMIN_NAME` from
`.env` (defaults to `admin@example.com` / `Admin@12345` if unset). This also
seeds the `Role` metadata collection with descriptions/permissions for all
three roles.


## Permission matrix implemented

| Action | Admin | Manager | Employee |
|---|---|---|---|
| Create task | ✅ | ✅ | ❌ |
| View tasks | ✅ all | ✅ own team (tasks they assigned) | ✅ own (assigned to them) only |
| Edit task details (title/desc/priority/due date) | ✅ | ❌ | ❌ |
| Change task status | ✅ | ✅ (own team) | ✅ (own task only) |
| Reassign task | ✅ | ✅ (own team) | ❌ |
| Delete task | ✅ | ❌ | ❌ |
| Add comment | ✅ | ✅ (own team) | ✅ (own task) |
| Upload attachment | ✅ | ✅ | ✅ (own task) |
| View task history | ✅ | ✅ | ❌ |
| Create/update/delete users | ✅ | ❌ | ❌ |
| Assign roles | ✅ | ❌ | ❌ |
| View dashboard | ✅ (system-wide) | ✅ (team productivity) | ✅ (own task stats) |


## Project Structure

Follows the spec's structure exactly:
```
app/
├── config/         db.js, cloudinary.js
├── controllers/    authController, userController, taskController, roleController
├── middlewares/    authMiddleware (JWT), roleMiddleware (authorizeRoles), 
│                   errorMiddleware, validationMiddleware, uploadMiddleware
├── models/         User, Role, Task, AssignmentHistory
├── routes/         authRoutes, userRoutes, taskRoutes, roleRoutes
├── services/       authService, taskService (business logic layer)
├── utils/          generateToken, pagination, logger, ApiError, asyncHandler, seedAdmin
├── validations/    authValidation, taskValidation, userValidation (Joi schemas)
├── app.js
└── server.js
```

Request flow: **Route → auth/role/validation middleware → Controller → Service → Model → MongoDB**

## API Reference

### Auth (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Self-register (always as `employee`) |
| POST | `/login` | Public | Returns access + refresh tokens |
| POST | `/refresh-token` | Public (needs valid refresh token) | Rotates both tokens |
| POST | `/logout` | Authenticated | Clears refresh token |
| GET | `/me` | Authenticated | Current user's profile |

### Users (`/api/users`) — Admin-managed
| Method | Endpoint | Access |
|---|---|---|
| POST | `/` | Admin |
| GET | `/` | Admin, Manager |
| GET | `/:id` | Admin, Manager |
| PUT | `/:id` | Admin |
| DELETE | `/:id` (soft delete) | Admin |
| PATCH | `/:id/status` (activate/deactivate) | Admin |

### Tasks (`/api/tasks`)
| Method | Endpoint | Access |
|---|---|---|
| GET | `/dashboard` | Any authenticated (role-scoped response) |
| POST | `/` | Admin, Manager |
| GET | `/?status=&priority=&search=&page=&limit=` | Any (results scoped by role) |
| GET | `/:id` | Any (scoped) |
| GET | `/:id/history` | Admin, Manager |
| PUT | `/:id` | Admin only |
| PATCH | `/:id/reassign` | Admin, Manager (own team) |
| PATCH | `/:id/status` | Any (own task for Employee) |
| POST | `/:id/comments` | Any with access |
| POST | `/:id/attachments` (multipart, field `file`) | Any with access |
| DELETE | `/:id` | Admin only |

### Roles (`/api/roles`) — Admin only
| Method | Endpoint |
|---|---|
| GET | `/` |
| POST | `/` (upsert role metadata) |
| PATCH | `/assign/:userId` (change a user's role) |

