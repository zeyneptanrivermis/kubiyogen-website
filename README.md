# Kubiyogen Web Platform

Kubiyogen is a full-stack education and commerce platform built as a monorepo. It includes a Next.js frontend, an Express/Prisma backend, PostgreSQL persistence, PayTR payment integration, access-code protected digital content, admin management screens, and a browser-based visual studio for diagram projects.

## Repository Structure

```text
kubiyogen-website/
+-- backend/                 # Express API, Prisma schema, migrations, seed data
+-- frontend/                # Next.js App Router frontend
+-- docs/                    # Delivery notes and project documentation
+-- docker-compose.yml       # Local PostgreSQL setup
+-- package.json             # Root tooling and Git hooks
```

## Tech Stack

### Frontend

- Next.js 14 with the App Router
- React 18 and TypeScript
- Tailwind CSS
- Zustand for cart state
- Embla Carousel for sliders

### Backend

- Node.js, Express, and TypeScript
- Prisma ORM with PostgreSQL
- JWT authentication and bcrypt password hashing
- Zod request validation
- PayTR payment token and webhook flow
- Swagger/OpenAPI documentation

## Features

- Public pages for courses, events, products, contact, and company information
- User registration, login, profile, orders, and purchased course views
- Cart and checkout flow connected to backend orders
- PayTR iframe payment integration and webhook handling
- Access-code validation for restricted content and games
- Admin area for users, orders, courses, events, products, access codes, and visual studio data
- Visual studio project editor with export-credit logic
- Prisma migrations and seed data for local development

## Prerequisites

- Node.js 22 recommended
- npm
- pnpm 9 for the frontend CI workflow
- PostgreSQL, either local or hosted

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

The backend runs on `http://localhost:5000` by default. API documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Frontend Setup

```bash
cd frontend
pnpm install
pnpm dev
```

The frontend runs on `http://localhost:3000` by default.

Create `frontend/.env.local` when you need to override the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Environment Variables

Backend variables are defined in `backend/.env.example`.

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Express server port |
| `JWT_SECRET` | Secret used to sign JWT tokens |
| `PAYTR_MERCHANT_ID` | PayTR merchant identifier |
| `PAYTR_MERCHANT_KEY` | PayTR merchant key |
| `PAYTR_MERCHANT_SALT` | PayTR merchant salt |
| `PAYTR_TEST_MODE` | Enables PayTR test mode when set to `1` |
| `SMTP_HOST` | Email server host |
| `SMTP_PORT` | Email server port |
| `SMTP_USER` | Email username |
| `SMTP_PASS` | Email password |

## Useful Commands

### Backend

```bash
cd backend
npm run dev
npm run build
npm run test
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
```

### Frontend

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm build
pnpm dev
```

## CI

GitHub Actions runs separate backend and frontend jobs:

- Backend: `npm ci`, `npm run prisma:generate`, `npm run build`
- Frontend: `pnpm install --frozen-lockfile`, `pnpm build`

Keep `frontend/pnpm-lock.yaml` in sync with `frontend/package.json` whenever frontend dependencies change.

## License

This project is licensed under ISC.
