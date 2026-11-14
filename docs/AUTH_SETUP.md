# Authentication foundation — reviewer checklist

Scope: small first step. Supabase email/password login, server-side platform admin gate for /studio,
organizations and memberships schema with RLS. No self-service signup or organization provisioning
yet.

## Setup

1. Create a Supabase project and apply every file in supabase/migrations in order (0001, 0002,
   0003, ...).
2. Copy .env.example to .env.local and use your project URL and public/anon key. Never commit secrets
   or service-role keys.
3. Create a test user in Supabase Authentication.
4. Grant platform admin using a privileged SQL console:
   `insert into public.platform_roles(user_id, role) values ('<test-user-uuid>', 'platform_admin');`
5. Run `npm install && npm run typecheck && npm run build`.
6. Test: /login, /studio while signed out (redirects to /login), /studio as a non-admin ("No studio
   access" page with sign-out), /studio as an admin, and sign-out.

## How sessions work

- `src/middleware.ts` refreshes the Supabase session on /studio and /login and writes updated cookies.
  Without it, admins are logged out when the access token expires (about an hour). Add any new
  protected route to its `matcher`.
- `getStudioAccess()` in src/lib/auth/server.ts uses `getUser()` (validated by Supabase, unlike
  `getSession()`) and looks the role up in the database.

## Boundaries

- No browser-side role grants. Authorization uses getUser() and a database role lookup on the
  server.
- Organization tables are read-only to clients and RLS-protected. Organization-specific admin
  permissions and all writes are deliberately deferred.
- Disable public self-signup in Supabase for the invitation-only admin pilot.
- Before production: add rate limiting, MFA for administrators, audit logs, an
  invitation/provisioning workflow, and RLS integration tests.
