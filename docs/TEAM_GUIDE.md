# Team contribution guide

## Ownership boundaries

- `src/features/wellness`: pillar catalog and learning content
- `src/features/challenges`: campaign definitions and missions
- `src/features/goals`: personal goals (future)
- `src/features/corporate`: employer reporting (future)
- `src/features/trainers`: trainer validation (future)
- `src/app`: routing, global styling and application shell; review required

## Workflow

1. Create a branch named `feat/<short-description>`.
2. Change only the relevant feature folder whenever possible.
3. Open a pull request explaining the user-facing change.
4. Require CI and human review before merging.
5. Never put credentials, employee health records, or private user data in git.

## Security boundaries

Real XP and badges must be issued by a trusted server, not browser state. Verify user roles and employer tenancy on the server for every sensitive read/write. Corporate reporting must be aggregated and privacy-preserving. Social sharing is opt-in.

## Editing content

Today, sample content lives in typed data files. A role-controlled content editor is planned; do not treat code edits as a production content management system.
