# Live Better

Modular corporate wellness platform. This repository is in early development.

## Team workflow

All feature work should use branches and pull requests. Keep authentication, tenant isolation, and reward verification in protected shared modules. Do not commit credentials or real employee wellness data.

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # add your Supabase URL and anon key
npm run dev
```

The homepage works without Supabase. The admin studio at /studio needs a Supabase project with the
migrations applied; see docs/AUTH_SETUP.md.

Before pushing: `npm run format && npm run typecheck && npm run build`.

## Planned features

MOVE fitness, NOURISH nutrition, THRIVE mindset, goals, campaigns, XP/badges, trainer verification, and employer reporting.
