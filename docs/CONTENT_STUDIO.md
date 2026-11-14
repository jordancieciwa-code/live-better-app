# Content & Campaign Studio (prototype)

The /studio route demonstrates a future role-controlled editorial experience. It is intentionally **not an admin-secure system**. There is no authentication or backend. All edits are React state and disappear on refresh. Do not enter real user or employee data.

## Feature boundaries
- Studio UI: src/features/studio/Studio.tsx
- Models and sample data: src/features/studio/types.ts
- Input and YouTube URL validation: src/features/studio/validation.ts
- Route: src/app/studio/page.tsx

## Production work required
1. Authentication and server-enforced roles before any real content management.
2. Database tables with organization-scoped permissions and audit history.
3. Media storage with upload authorization, scanning, limits and captions; current prototype supports YouTube URL preview only.
4. Draft-review-publish workflow with approver permissions and revision history.
5. Scheduled jobs, notification consent, opt-outs, quiet hours and delivery provider integration.
6. Server-side content sanitization and strict URL allowlisting.
7. Automated tests for permissions, tenant isolation, scheduling and notifications.

Never treat a client-side role toggle or hidden button as an authorization control.
