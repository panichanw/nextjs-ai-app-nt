<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Development Guildlines
For TypeScript code style and best practices: @docs/typescript-guidelines.md

# Repo: nextjs-ai-app-starter

## Stack

- **Next.js 16**, React 19, TypeScript, Tailwind CSS v4
- **Prisma v7** with MariaDB via `@prisma/adapter-mariadb` (driver adapter, not standard client)
- **better-auth** (email/password), **Zustand** (cart with localStorage), **shadcn/ui** (Radix Luma style, RemixIcon)
- No test framework, no CI, no pre-commit hooks

## Key commands

```bash
npm run dev       # dev server
npm run build     # production build
npm run start     # start prod server
npm run lint      # ESLint
npx prisma generate  # regenerate Prisma client after schema changes
```

## Prisma v7 quirks

- Config lives in `prisma.config.ts` (not `schema.prisma`); uses `dotenv` for env loading
- Schema at `prisma/schema.prisma` — provider is `prisma-client` (NOT `prisma-client-js`)
- Output dir: `generated/prisma/` (gitignored via `/generated/prisma` in `.gitignore`)
- Import from `../../generated/prisma/client` (not `@prisma/client`)
- Uses `@prisma/adapter-mariadb` — pass `DATABASE_URL` directly to adapter constructor (`src/lib/prisma.ts`)
- Run `npx prisma generate` before build (already in Dockerfile, not in `npm run build`)

## Architecture

- Two **root-level layouts** via route groups — each renders its own `<html>` tag:
  - `(auth)/` — login/signup pages (Prompt Thai font)
  - `(front)/` — main app (Navbar, Geist font via next/font)
- `@/*` alias → `./src/*`
- shadcn aliases: `@/components`, `@/lib`, `@/components/ui`, `@/hooks`
- better-auth route: `/api/auth/[...all]`
- Auth config in `src/lib/auth.ts` (server), `src/lib/auth-client.ts` (client)
- Cart state: `src/lib/cart-store.ts` — zustand + persist to `localStorage` under key `skill-cart`
- Docker: multi-stage build with `output: standalone` — copy `server.js` from `.next/standalone/`

## Dev setup

- MariaDB via Docker (port **3307**, not 3306): see `docs/install_mariadb_with_docker.txt`
- `.env` has `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL` — copy from `.env` template if missing
- SQL schema in `docs/create_table_ecommerce.sql` for manual DB init if not using Prisma migrations

## Style conventions

- `clsx` + `tailwind-merge` via `cn()` utility in `src/lib/utils.ts`
- class-variance-authority for component variants
- shadcn components in `src/components/ui/`
- ESLint uses `eslint-config-next` core-web-vitals + typescript presets
