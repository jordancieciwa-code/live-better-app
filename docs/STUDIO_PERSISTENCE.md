# Studio persistence — reviewer guide

Scope: Supabase persistence for the existing content and campaign editor. No file uploads, delivery jobs or tenant-facing content APIs.

1. Apply migration 0001_identity.sql then 0002_studio.sql to a test Supabase project.
2. Configure .env.local, create a test auth user, grant platform_admin as described in docs/AUTH_SETUP.md.
3. Run npm install, npm run typecheck, npm run build.
4. Log in, create a video and campaign, refresh /studio, verify both persist.
5. Edit each and verify updates persist after refresh.
6. Sign out and confirm /studio redirects to /login.
7. Sign in as an ordinary user and confirm /studio cannot be opened.
8. Using a non-admin Supabase authenticated session, verify select/insert/update on studio tables are rejected by RLS.

Notes: Dates are stored as DATE strings, not timestamps. Campaign 'scheduled' is a planning state only; it does not send notifications. The organization audience selector is a placeholder, not actual tenant targeting. Published content is not yet exposed publicly. Avoid storing real participant data.

Human review required before merging. The Supabase project is not provisioned automatically by this PR.
