# PR: Admin UI foundation and content management screens

## Summary

This PR adds the first independent frontend/admin work package for Sumeyye's tasks. It introduces reusable UI components, an isolated admin shell, dashboard, and mock-data based admin pages for content, orders, and users.

## Changes

- Added an admin-only app shell so `/admin` pages do not render the public site header, footer, or floating actions.
- Added shared UI components:
  - Button, Input, Textarea, Select, Checkbox, DatePicker
  - Table, Modal, Badge, Alert, ProgressBar
  - FileInput, ImageUpload, RichEditor placeholder
- Added admin layout components:
  - Sidebar
  - TopBar
  - StatCard
  - AdminSection
- Added admin routes:
  - `/admin`
  - `/admin/etkinlikler`
  - `/admin/etkinlikler/yeni`
  - `/admin/kurslar`
  - `/admin/kurslar/yeni`
  - `/admin/urunler`
  - `/admin/urunler/yeni`
  - `/admin/siparisler`
  - `/admin/kullanicilar`
- Added mock admin data for static UI development.
- Updated `.gitignore` to explicitly ignore `venv/`.

## Not Included

The following items are intentionally left out because they depend on backend/API/auth work:

- Real admin authentication and route guard
- Real CRUD API integration
- Real Cloudinary upload
- Real Tiptap integration
- Real order status update actions
- Live user order history

## Verification

- `next build` completed successfully.
- `/admin` and related admin routes were generated as static pages.

## How to Run the Frontend

From the repository root:

```powershell
cd frontend
corepack pnpm install
.\node_modules\.bin\next.cmd dev -p 3000
```

Then open:

```text
http://localhost:3000
http://localhost:3000/admin
```

If PowerShell cannot find `next.cmd`, make sure the terminal is inside the `frontend` directory and dependencies were installed with `corepack pnpm install`.

## Notes

The frontend directory was previously tracked as a gitlink/submodule-style entry. This PR converts it into normal tracked frontend files so the new UI work can be committed directly to the `sumeyye-dev` branch.
