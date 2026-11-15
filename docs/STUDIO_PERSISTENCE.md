# Studio persistence — reviewer guide

Scope: Supabase persistence for the content and campaign editor. No file uploads, delivery jobs or
tenant-facing content APIs.

1. Apply migrations 0001_identity.sql, 0002_studio.sql and 0003_review_fixes.sql, in order, to a test
   Supabase project.
2. Configure .env.local, create a test auth user, grant platform_admin as described in
   docs/AUTH_SETUP.md.
3. Run npm install, npm run typecheck, npm run build.
4. Log in, create a video and a campaign, refresh /studio, verify both persist.
5. Edit each, refresh, and verify the change persisted and the edited record moved to the top.
6. Click Edit, then "Cancel edit", and confirm the form returns to "Add" / "Create".
7. Sign out and confirm /studio redirects to /login.
8. Sign in as an ordinary user and confirm /studio shows "No studio access".
9. Using a non-admin Supabase authenticated session, verify select/insert/update on studio tables
   are rejected by RLS.

Notes: Dates are stored as DATE values (YYYY-MM-DD). Campaign "scheduled" is a planning state only; it
does not send notifications. The organization audience selector is a placeholder, not actual tenant
targeting. Published content is not yet exposed publicly. Avoid storing real participant data.

Schema changes go in a new numbered migration. Do not edit a migration that may already have been
applied to a shared project.
