# Authentication foundation — reviewer checklist

Scope: small first step. Supabase email/password login, server-side platform admin gate for /studio, organizations and memberships schema with RLS. No self-service signup or organization provisioning yet.

## Setup
1. Create a Supabase project and run supabase/migrations/0001_identity.sql.
2. Copy .env.example to .env.local and use your project URL and public/anon key. Never commit secrets or service-role keys.
3. Create a test user in Supabase Authentication.
4. Grant platform admin using a privileged SQL console: insert into public.platform_roles(user_id,role) values ('<test-user-uuid>','platform_admin');
5. Run npm install && npm run typecheck && npm run build. Test /login, unauthorized /studio, authorized /studio and sign-out.

## Boundaries
- The studio remains a session-only prototype: no persistent content or notification delivery.
- No browser-side role grants. Authorization uses getUser() and database role lookup on the server.
- Organization tables are read-only to clients and RLS-protected. Organization-specific admin permissions and all writes are deliberately deferred.
- Disable public self-signup in Supabase for the invitation-only admin pilot.
- Before production: add rate limiting, MFA for administrators, audit logs, invitation/provisioning workflow, session refresh testing, and RLS integration tests.
