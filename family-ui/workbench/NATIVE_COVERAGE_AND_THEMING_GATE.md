# Native component and screen coverage — release gates

**Scope:** native shadcn/ui Base Nova + Base UI reference in X1pheR/hypershell-brand, in the existing Family UI workbench. **Status:** INVENTORY OPEN / THEMING BLOCKED. Established 2026-11-07 by explicit operator direction. Canonical decision and product applicability remain in Hypershell Vault project 'projects/hypershell-application-ui-harmonization.md' and ADR-HYP-003.

## Non-negotiable sequencing

1. **NATIVE / NEUTRAL ONLY:** capture complete known Hypershell-owned product needs, upstream component and official block choices, interaction compositions and state variants. Build or qualify examples in the pinned original shadcn/Base UI neutral styles. Never change original component source just to satisfy a design preference or mask accessibility failures.
2. **NATIVE COVERAGE ACCEPTANCE:** verify the inventory and representative implementations across the material product families below. Record missing capabilities, consciously excluded needs, upstream limitations, specialist-adapter decisions, and visual/behavior/accessibility evidence. Require an **explicit operator acceptance** of the versioned coverage matrix and neutral reference.
3. **EXPLICIT THEMING AUTHORIZATION (SEPARATE GATE):** even a merged native foundation PR, successful CI or complete catalog does **not** authorize a Hypershell theme, branding, signature colors, token overrides, custom native components, or consumer migration. A separate decision and change must first establish theme token mapping, semantic statuses, design examples, keyboard/focus/contrast constraints, light/dark parity, and product-specific reference acceptance.
4. **PRODUCT MIGRATIONS LATER:** after theming acceptance, each Hypershell-owned consumer still needs its own product-data, interaction, accessibility, recovery and release gates. This source PR does not perform those migrations.

Completeness means **all identified needs of current/foreseeable owned products**, with a reviewed disposition per row and coverage evidence; it does not pretend to foresee literally every future UI. Any newly identified material gap reopens the coverage gate before theming. Do not require 30 separate screens when one coherent native reference can validate multiple patterns, but do not mistake a static Storybook illustration for an end-to-end working pattern.

## Observed baseline (not coverage acceptance)

- **63 / 63** currently imported upstream native component source files have named Catalog Storybook files. Most stories only exercise Default + Variants/Variations. This measures presence, **not** full behavior/interaction/state or all official shadcn blocks.
- Official source is pinned to Base Nova/Base UI; 63 component docs and 134 examples were reported on the accepted build. Inventory must compare against current official component **and block** catalogs; shadcn 'add --all' only proves what that CLI version imported. Blocks, specialist primitives, and product compositions are a separate admission decision.
- **5** neutral, synthetic application pages today: Overview dashboard, Members directory, Activity, Components and Settings. They do not exhaust complete operational screens.
- **20** manually reviewed/committed visual golden images (5 pages × desktop/mobile × light/dark); CI currently green. These are baseline regression proofs **only for those five pages**.
- Existing Playwright functional coverage is representative; selected Combobox, Resizable, Dialog/Escape, Slider interactions were browser-verified. This does not mean every component has full keyboard/touch/accessibility coverage.
- **12** narrowly documented upstream native contrast exceptions remain; must have individually reviewed disposition by **2026-12-06**. Do not equate green CI with full WCAG AA.

## Component admission coverage — owner: native catalog

For each of the 63 currently imported source modules, and each additionally needed official upstream block or specialist control, maintain a traceable row with: upstream provenance and exact version, Base UI versus alternative primitive, component category, real product requirement(s), supported variations/states, keyboard/pointer/touch behavior, focus ownership, accessibility/contrast, responsive/RTL where applicable, docs/Storybook demo, automated checks, and decision **adopt / compose / specialist adapter / intentionally excluded / gap**.

**Current initial coverage classification:**

| Family | Current native source | Coverage still to prove |
| --- | --- | --- |
| Actions and feedback | Buttons, button-group, badges, alert, toast, progress, spinner | destructive/disabled/pending/permission-denied, duplicate action prevention, optimistic/error feedback |
| Forms and validation | Input, field, label, textarea, select, combobox, checkbox, radio, slider, switch, OTP, questionnaire, calendar, input-group | async options, complete keyboard navigation, inline/server validation, dirty/unsaved draft and cancel/apply |
| Navigation | Sidebar, menu, breadcrumb, tabs, pagination, accordion, command, navigation-menu, links | deep routes, back/forward, active nested scope, breadcrumbs, mobile navigation, keyboard help |
| Data and dense workspace | Table, chart, card, item, scroll-area, resizable, skeleton, empty, code-block, trace | true pagination, server filter/sort, multi-select and bulk, long data, sticky headers, virtualized grid, inspector lock |
| Overlays and advanced inputs | Dialog, alert-dialog, sheet, drawer, dropdown/context menu, hover-card, tooltip, popover, carousel, attachment | nested/unsaved overlays, portal/focus, touch/outside click, keyboard drag/resizing, drop/upload and recovery |
| Specialist visualization | No complete native graph topology/advanced editor/large grid engine implied by shadcn primitives | assess vetted graph, data-grid, diff/JSON/code, log/terminal, file tree adapters **without** silently building homemade substitutes |

The complete **63-name snapshot must be regenerated from actual workbench source** on each scope review. Each 'catalog story exists' is evidence of component presence, not a passed interaction test.

## Neutral screen/workflow archetype inventory — INITIAL CANDIDATES, NOT APPROVED COMPLETENESS

Coverage is assessed by **behavioral archetype**, not just by separate route count. Columns reflect only presently observed workbench evidence; candidates and P0/P1 priority must be reconciled against HomeSight, Reach, monitoring, Command Center and other current owned-product contracts before acceptance.

| ID | Screen / workflow archetype | Current evidence | Initial state | Priority |
| --- | --- | --- | --- | --- |
| S01 | Application shell, responsive navigation, contextual page/title/actions | Five-page shell, drawer, light/dark | Partial: deep nav/help/context | P0 |
| S02 | Dense overview, metrics, cards and linked operational drill-down | Overview dashboard | Partial: actual drill-down and truthful stale state | P0 |
| S03 | Search/sort/filter directory and table | Members | Partial: paging, column density, filters persisted in URL | P0 |
| S04 | Entity detail screen, structured sections, cross-links, related data | None as integrated page | Gap | P0 |
| S05 | Side inspector, lock/unlock, stacked selection, maximize/restore | None as integrated page | Gap | P0 |
| S06 | Multi-selection, bulk review/actions, select-all, indeterminate | None as integrated workflow | Gap | P0 |
| S07 | Task/run list, status, progress, detail, retry/cancel boundaries | Activity is non-operational | Gap | P0 |
| S08 | History/event timeline, audit/change log and compare/diff | Basic Activity view | Partial: actual timeline/detail/diff | P0 |
| S09 | Settings editor with field-level validation and dependencies | Settings with local form/tabs | Partial: dirty/validating/denied/error | P0 |
| S10 | Draft → review → apply/cancel workflow with safe failure handling | No integrated page | Gap | P0 |
| S11 | Complex dialogs, sheet, drawer, popover, nested overlays | Component stories + invitation dialog | Partial: focus, unsaved, stacking/touch | P0 |
| S12 | Search/command palette and keyboard-oriented navigation | Command component story | Gap: integrated use | P0 |
| S13 | Contextual Help, deep TOC, code/example, active-section binding | Storybook Docs exists, not product Help | Gap | P0 |
| S14 | State matrix: loading, empty, first-run, error, offline, stale, degraded, forbidden | Individual component variants only | Gap: integrated truthful states | P0 |
| S15 | Monitoring/health, time-series, alerts, active incidents | Chart and Activity samples | Partial: production-shaped semantics only | P0 |
| S16 | Topology/network graph, selectable edges/nodes, inspector integration | No app page; specialist engine needed | Gap: preserve current product engine | P0 |
| S17 | Logs/traces, long streaming output, filters, copy/search | Trace/code component stories | Gap: operational workflow | P0 |
| S18 | Files/artifacts/attachments, upload progress, preview, recovery | Attachment native source/story | Gap: integrated state | P1 |
| S19 | Scheduling/calendar and recurring job operations | Calendar primitive only | Gap | P1 |
| S20 | Guided setup/onboarding and multi-step wizard | No integrated page | Gap | P1 |
| S21 | Authorization/RBAC, denied/not-found, session and permission-aware controls | Pocket ID external sign-in, no local auth UI needed | Gap: authorization states, avoid duplicate login | P0 |
| S22 | Notifications center, alert severity, acknowledge/escalate | Bell demo only | Gap | P1 |
| S23 | Interactive technical API/JSON viewer, source/diff, docs examples | Code-block component | Gap: specialist evaluation | P1 |
| S24 | Work queue/backlog, grouped/filterable work items, dependency view | No integrated page | Gap | P1 |
| S25 | Mobile/zoom/touch variants of dense tables, drawers, inspectors | 20 visual baseline images | Partial: accessibility/reflow/400% zoom | P0 |

P0 = needed to approve broad shared-native foundation for current operational products unless explicitly justified as product-owned specialist composition; P1 = forecast need, assess/admit or defer explicitly. 'Gap' does not imply a new shared component is automatically required. No actual domain mutations, account administration, or external sends in synthetic examples.

## Cross-cutting state and behavior matrix required for each applicable archetype

Evidence must cover light/dark, desktop/mobile/400% zoom, screen reader labels where material, keyboard/touch/focus, empty/first-run, loading/pending, success, validation error, service error, unavailable/offline, partial/stale/degraded, authorization denied, no-results, long/overflowing data, and unsaved change recovery. Inapplicable states need an explicit N/A rationale. Use synthetic data that is internally consistent and truthful; no fake operational success.

## Native admission checklist — gate N (BLOCKED)

- [ ] N1: Confirm scope against current official shadcn/Base UI components **and blocks**, maintained owned-product workflows and existing contract owners; pin provenance, version and licenses. Reconcile every identified required family and record excluded candidates.
- [ ] N2: Maintain a per-component and per-composition coverage matrix with source, variants/states, behavior, documentation, actual checks, accessibility and any specialist adapter qualification.
- [ ] N3: For every P0 screen/workflow archetype, demonstrate at least one integrated neutral example or a separately accepted product-owned specialist reference, including meaningful responsive and state variants; traceable evidence required.
- [ ] N4: Exercise interaction/focus/keyboard/touch and truthful partial/error/empty states. Build source-backed automated assertions plus human visual review for representative integrated flows. Maintain visual goldens for every admitted screen, not only the original five.
- [ ] N5: Classify the 12 native contrast exceptions by exact upstream provenance, severity and disposition; review upstream status by 2026-12-06. No unexplained regressions, no upstream patches to conceal gaps.
- [ ] N6: Formal acceptance of complete known-scope inventory and neutral native reference by Ronald, recorded in canonical Vault and Reach. Keep Brand PR #1 Draft until its exact planned native acceptance is fulfilled or an explicitly narrower native-only delivery boundary is authorized.

## Hypershell theme admission — gate T (HARD BLOCK)

**Not authorized by completion or merging of Brand PR #1 or any intermediate native release.** Requires a separate explicit operator go/no-go **after N1–N6**, using a separately reviewed design decision and implementation PR. Before implementation: compare the accepted native reference against canonical Hypershell semantic tokens, brand identity, dark/light surfaces, dense operational layouts, table/inspector behavior, status semantics and UI governance; present representative before/after previews for explicit approval. Verify semantic contrast/keyboard/zoom/reduced motion, no native behavioral regressions, source provenance, and reusable-versus-product-specific boundaries. Do not theme native source files directly or silently fork upstream primitives. No consumer UI migrations or branded package promotion before this gate and individual product acceptance.

## Immediate next work

1. Map S01–S25 to actual canonical owned-product contracts and label each as covered/partial/gap/excluded with owner and required evidence; split P0 into implementable batches.
2. Check official upstream components, blocks and community candidate provenance/version to identify anything shadcn 'add --all' missed, with exact compatibility and license review. Do not install indiscriminately.
3. Expand the neutral workbench with highest-value integrated examples and negative/edge states, updating automated checks and Storybook/visual baselines.
4. Return to the current Brand PR only after the scoped native coverage acceptance; keep a distinct, explicit theming proposal later.

## Current source-to-Storybook evidence (automatically inventoried 2026-11-07)

These rows prove source + example presence only. Full state/behavior/accessibility qualification remains pending per component and applicable screen.

| Pinned native source module | Current Storybook examples | Native behavior acceptance |
| --- | --- | --- |
| accordion | Default, Variations | Pending per N2/N4 |
| alert-dialog | Default, Variations | Pending per N2/N4 |
| alert | Default, Variations | Pending per N2/N4 |
| aspect-ratio | Default, Variations | Pending per N2/N4 |
| attachment | Default, Variations | Pending per N2/N4 |
| avatar | Default, Variants | Pending per N2/N4 |
| badge | Default, Variants, States | Pending per N2/N4 |
| breadcrumb | Default, Variations | Pending per N2/N4 |
| bubble | Default, Variations | Pending per N2/N4 |
| button-group | Default, Variants | Pending per N2/N4 |
| button | Default, Variants, Sizes, States | Pending per N2/N4 |
| calendar | Default, Variants | Pending per N2/N4 |
| card | Default, Variants | Pending per N2/N4 |
| carousel | Default, Variants | Pending per N2/N4 |
| chart | Default, Variants | Pending per N2/N4 |
| checkbox | Default, Variants | Pending per N2/N4 |
| code-block | Default, Variants | Pending per N2/N4 |
| collapsible | Default, Variants | Pending per N2/N4 |
| combobox | Default, Variants | Pending per N2/N4 |
| command | Default, Variants | Pending per N2/N4 |
| context-menu | Default, Variants | Pending per N2/N4 |
| dialog | Default, Variants | Pending per N2/N4 |
| direction | Default, Variants | Pending per N2/N4 |
| drawer | Default, Variants | Pending per N2/N4 |
| dropdown-menu | Default, Variants | Pending per N2/N4 |
| empty | Default, Variants | Pending per N2/N4 |
| field | Default, Variants | Pending per N2/N4 |
| hover-card | Default, Variants | Pending per N2/N4 |
| input-group | Default, Variants | Pending per N2/N4 |
| input-otp | Default, Variants | Pending per N2/N4 |
| input | Default, Variants, States | Pending per N2/N4 |
| item | Default, Variants | Pending per N2/N4 |
| kbd | Default, Variants | Pending per N2/N4 |
| label | Default, Variants | Pending per N2/N4 |
| marker | Default, Variants | Pending per N2/N4 |
| menubar | Default, Variants | Pending per N2/N4 |
| message-scroller | Default, Variants | Pending per N2/N4 |
| message | Default, Variants | Pending per N2/N4 |
| native-select | Default, Variants | Pending per N2/N4 |
| navigation-menu | Default, Variants | Pending per N2/N4 |
| pagination | Default, Variants | Pending per N2/N4 |
| popover | Default, Variants | Pending per N2/N4 |
| progress | Default, Variants | Pending per N2/N4 |
| questionnaire | Default, Variants | Pending per N2/N4 |
| radio-group | Default, Variants | Pending per N2/N4 |
| resizable | Default, Variants | Pending per N2/N4 |
| scroll-area | Default, Variants | Pending per N2/N4 |
| select | Default, Variants | Pending per N2/N4 |
| separator | Default, Variants | Pending per N2/N4 |
| sheet | Default, Variants | Pending per N2/N4 |
| sidebar | Default, Variants | Pending per N2/N4 |
| skeleton | Default, Variants, States | Pending per N2/N4 |
| slider | Default, Variants | Pending per N2/N4 |
| spinner | Default, Variants, States | Pending per N2/N4 |
| switch | Default, Variants, States | Pending per N2/N4 |
| table | Default, Variants | Pending per N2/N4 |
| tabs | Default, Variants | Pending per N2/N4 |
| textarea | Default, Variants, States | Pending per N2/N4 |
| toast | Default, Variants | Pending per N2/N4 |
| toggle-group | Default, Variants | Pending per N2/N4 |
| toggle | Default, Variants | Pending per N2/N4 |
| tooltip | Default, Variants | Pending per N2/N4 |
| trace | Default, Variants | Pending per N2/N4 |
