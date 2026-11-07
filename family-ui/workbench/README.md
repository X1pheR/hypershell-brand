# Native shadcn/Base UI Workbench (OCI)

**Current work phase (2026-11-07):** native component/screen completeness review, **no Hypershell theming**. The explicit acceptance matrix and separate theming gate are in [NATIVE_COVERAGE_AND_THEMING_GATE.md](NATIVE_COVERAGE_AND_THEMING_GATE.md). All 63 imported native sources have Storybook stories, but the five current application screens are not complete coverage; do not infer a native GO or theme GO from green CI, visual goldens, working Storybook MCP, or merging this PR. A separate explicit operator decision is mandatory before any Hypershell brand/theme code.

**State: full native application and Storybook deployed behind Pocket ID/Tinyauth admins authentication; interactive post-login acceptance pending. Not a Family UI release.**

## Published previews

- **Private landing:** https://ui-workbench.oci.hypershell.eu/
- **Application:** https://ui-workbench.oci.hypershell.eu/app/
- **Storybook:** https://ui-workbench.oci.hypershell.eu/storybook/
- Standalone Storybook previews are linked from the landing; all paths require the existing Pocket ID/Tinyauth `admins` admission. The old public `www` review was retired outside the anonymous document root (returns HTTP 404).

## Native-first implementation

- Official `shadcn add --all` completed **manually by the operator** after correcting the ephemeral Node container `PATH` to find pnpm. There are **63** official component source files at `src/components/ui`. This is a *reference catalog*, not 63 accepted/hardened Family UI exports.
- Base UI primitives (`@base-ui/react`), original shadcn neutral `base-nova` classes/tokens, Tailwind CSS 4, Lucide, no Hypershell styling.
- Storybook `Native/Actions`, `Native/Forms`, `Native/Overlays`, `Native/Data` and introduction stories. These are representative multi-component stories, **not one complete story per imported source**.
- Separate React/Vite/React Router application with five real example screens: Overview dashboard, searchable/sortable/filterable members table and invitation dialog, Activity, Components, Settings with tabs and local forms. All records are fabricated and in-memory only, without authentication or outbound sends.
- Application theme toggle switches the unmodified native light/dark styles; Storybook has a corresponding global theme toolbar. No upstream shadcn source file was customized.
- TypeScript 7 requires removing obsolete `baseUrl`. The source-generated `scroll-area.tsx` has an unused React import, so `noUnusedLocals` is disabled **only in the app tsconfig** to preserve upstream components without modification; correctness type checks and oxlint remain available.

## Build / verify

From this source directory with Node 24 and pnpm 10.20.0:

```sh
pnpm run build
pnpm run build:storybook
pnpm run lint
```

The Storybook build runs `scripts/externalize_storybook_inline.py` after compilation. It rewrites only generated `storybook-static` HTML bootstrap code into hashed local assets to avoid **initial** inline CSP errors. The dedicated authenticated OCI hostname now additionally has its own CSP allowing same-origin iframe embedding and the limited runtime inline styles Storybook requires. Main website CSP remains unchanged. Full interactive authenticated acceptance is still pending.

Verified on 2026-11-06: TypeScript pass `run-20261106T102905451980Z-a8f4e09598df`; application build `run-20261106T102932049254Z-d8e6fde3c10f`; Storybook build `run-20261106T102949408335Z-248c52b4e275`; public update `run-20261106T103542422332Z-6296bfd0fa63`; route index restoration `run-20261106T103623359769Z-f1795789b0fa`. Real browser verified Dashboard, Members filtering, synthetic invite dialog submission, persisted dark-mode toggle and a native dialog in standalone Storybook.

## Acceptance and scope

1. Operator signs in at the private workbench subdomain using Pocket ID with the `admins` group and confirms access to the full Storybook manager, embedded stories and the complete application. Anonymous paths were verified HTTP 401 and the old `www` path HTTP 404.
2. Verify the entire Storybook manager plus a representative story and keyboard/focus/zoom/dark/mobile behavior in real browsers.
3. Expand individual component stories toward complete coverage of the 63 imported sources, documenting genuinely unsupported components as needed.
4. Get native reference visual/product GO before applying any Hypershell brand/theme. Family UI package admission remains selective in `hypershell-brand/family-ui`.

No first-release Git or extra shared npm package has been created, and no HomeSight or Nuvio deployment has been altered. Project: `projects/hypershell-application-ui-harmonization.md`; existing Reach Task: `task-20261105T234549220619Z-f5e7d9b6f972`.
