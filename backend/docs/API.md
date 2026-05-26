# Kubiyogen Backend API

Swagger UI runs at `/api-docs`; the raw OpenAPI JSON is available at `/api/openapi.json`.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` and `JWT_SECRET`.
2. Run `npm install`.
3. Run `npm run prisma:generate`.
4. Run `npm run prisma:migrate -- --name init`.
5. Run `npm run prisma:seed`.
6. Start the API with `npm run dev`.

## Main groups

- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/events`, `GET /api/events/upcoming`, `GET /api/events/recent`, `GET /api/events/:slug`
- `GET /api/courses`, `GET /api/courses/:slug`
- `GET /api/products`, `GET /api/products/:slug`
- `GET /api/categories`
- `GET/POST /api/cart`, `DELETE /api/cart/:id`
- `GET/POST /api/orders`, `PATCH /api/orders/:id/status`
- `POST /api/payment/paytr/token`, `POST /api/payment/paytr/webhook`
- `POST /api/access-codes/generate`, `POST /api/access-codes/validate`
- `GET/PATCH /api/users/profile`, `GET /api/users/orders`, `GET /api/users/courses`, `DELETE /api/users/account`
- `POST/PUT/DELETE /api/admin/events`, `/api/admin/courses`, `/api/admin/products`
- `GET /api/admin/orders`, `PATCH /api/admin/orders/:id`, `GET /api/admin/users`, `POST /api/admin/access-codes/generate`
- `POST /api/contact`

Protected routes require `Authorization: Bearer <token>`.
