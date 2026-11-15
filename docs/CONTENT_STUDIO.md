# Content & Campaign Studio

The /studio route is an admin workspace for wellness content and campaign plans. Access requires a
signed-in Supabase user with the `platform_admin` role, checked on the server for every page load
and every save. Records are stored in Supabase (see docs/STUDIO_PERSISTENCE.md). Do not enter real
user or employee data.

## Feature boundaries

- Route and access check: src/app/studio/page.tsx (error screen: src/app/studio/error.tsx)
- Tabs and status message: src/features/studio/Studio.tsx
- Editors: src/features/studio/ContentEditor.tsx, src/features/studio/CampaignEditor.tsx
- Shared save flow: src/features/studio/useSave.ts
- Server actions (writes): src/features/studio/actions.ts
- Server reads: src/features/studio/repository.ts
- Types and empty records: src/features/studio/types.ts
- Validation and YouTube embed parsing: src/features/studio/validation.ts

Validation runs twice: in the browser for quick feedback and again in the server action. Length
limits in `LIMITS` (validation.ts) must match the checks in supabase/migrations.

## Not built yet

1. Organization-scoped permissions and audit history.
2. Media storage with upload authorization, scanning, limits and captions (YouTube links only today).
3. Draft-review-publish workflow with approver permissions and revision history.
4. Scheduled jobs, notification consent, opt-outs, quiet hours and delivery provider integration.
5. Automated tests for permissions, tenant isolation, scheduling and notifications.

Never treat a client-side role toggle or hidden button as an authorization control.
