# Native component and screen coverage — release gates

**Scope:** native shadcn/ui Base Nova + Base UI reference in X1pheR/hypershell-brand, in the existing Family UI workbench. **Status:** INVENTORY OPEN / THEMING BLOCKED. Established 2026-11-07 by explicit operator direction. Canonical decision and product applicability remain in Hypershell Vault project 'projects/hypershell-application-ui-harmonization.md' and ADR-HYP-003.

## Non-negotiable sequencing

1. **NATIVE / NEUTRAL / FUNCTION-FIRST ONLY:** extract needed user capabilities and behavior from Hypershell-owned products, then evaluate how current official shadcn/Base UI components and blocks would best deliver them. Existing vanilla CSS, screen geometry, DOM structures, bespoke widgets and implementation idioms are **NOT** a design specification for the new base. Build or qualify examples with the pinned original neutral native components; do not transplant old layouts, implement mandatory vanilla-equivalent widgets, or patch native source to satisfy a previous presentation choice.
2. **NATIVE COVERAGE ACCEPTANCE:** verify the inventory and representative implementations across the material product families below. Record missing capabilities, consciously excluded needs, upstream limitations, specialist-adapter decisions, and visual/behavior/accessibility evidence. Require an **explicit operator acceptance** of the versioned coverage matrix and neutral reference.
3. **EXPLICIT THEMING AUTHORIZATION (SEPARATE GATE):** even a merged native foundation PR, successful CI or complete catalog does **not** authorize a Hypershell theme, branding, signature colors, token overrides, custom native components, or consumer migration. A separate decision and change must first establish theme token mapping, semantic statuses, design examples, keyboard/focus/contrast constraints, light/dark parity, and product-specific reference acceptance.
4. **PRODUCT MIGRATIONS LATER:** after theming acceptance, each Hypershell-owned consumer still needs its own product-data, interaction, accessibility, recovery and release gates. This source PR does not perform those migrations.

Completeness means **all identified reusable functional needs of current/foreseeable owned products have an assessed native solution or an explicit ownership/defer decision**. It does not mean reimplementing every existing screen or guaranteeing all future UI needs. A missing old custom widget is not automatically a base-UI gap; only an unmet *capability* is. New material functional needs reopen the gate. A few coherent native examples may validate multiple patterns; static Storybook examples alone do not prove working behavior.

## Observed baseline (not coverage acceptance)

- **63 / 63** currently imported upstream native component source files have named Catalog Storybook files. Most stories only exercise Default + Variants/Variations. This measures presence, **not** full behavior/interaction/state or all official shadcn blocks.
- Official source is pinned to Base Nova/Base UI; 63 component docs and 134 examples were reported on the accepted build. Inventory must compare against current official component **and block** catalogs; shadcn 'add --all' only proves what that CLI version imported. Blocks, specialist primitives, and product compositions are a separate admission decision.
- **5** neutral, synthetic application pages today: Overview dashboard, Members directory, Activity, Components and Settings. They do not exhaust complete operational screens.
- **20** manually reviewed/committed visual golden images (5 pages × desktop/mobile × light/dark); CI currently green. These are baseline regression proofs **only for those five pages**.
- Existing Playwright functional coverage is representative; selected Combobox, Resizable, Dialog/Escape, Slider interactions were browser-verified. This does not mean every component has full keyboard/touch/accessibility coverage.
- **12** narrowly documented upstream native contrast exceptions remain; must have individually reviewed disposition by **2026-12-06**. Do not equate green CI with full WCAG AA.

## Function-to-native mapping: never treat legacy UI as a reference implementation

**Discovery input:** HomeSight, Reach, SDM and other existing vanilla UIs describe *what the user must achieve*, data and workflow constraints, and safety/accessibility invariants. They do **not** prescribe *where* or *how* the new UI displays those functions. No legacy sidebar/inspector/menu/grid/colour/geometry parity is required in the shared native base. At future *product* migration, preserve accepted outcomes and data contracts but permit a different, explicitly accepted native UX.

**For every requirement, use this decision sequence:** (1) state the capability and measurable success outcome without naming an existing widget; (2) inspect official Base UI shadcn primitives and blocks; (3) compare two or more appropriate native compositions/interaction patterns when the choice is meaningful; (4) prefer the simplest accessible/responsive native solution; (5) qualify a proven specialist library if native primitives do not cover required domain-specific behavior; (6) add a shared wrapper/pattern **only** when recurring multi-product evidence justifies it; otherwise leave composition in the product. Explicitly record rejected legacy-parity assumptions and test *outcomes*, not screenshots copied from vanilla apps.

| Observed legacy behavior (input, NOT target UI) | Functional contract | Plausible native alternatives to evaluate | Shared base decision |
| --- | --- | --- | --- |
| HomeSight custom side inspector | Inspect selected record details without losing user context; support appropriate return/dismiss/focus and selection behavior | `Sheet` (edge panel), `Dialog` (focused details), `Drawer` (including mobile interaction), inline `Card`/`Tabs` in a detail route, `ResizablePanelGroup` for persistent split views | **Open.** Compare user tasks, modal/nonmodal, focus, small screens, density, accessibility. No mandatory `SideInspector` wrapper or copy of lock/maximize rules. A product may still need selection persistence; qualify it separately. |
| HomeSight custom inventory table / Reach task grids | Browse/search/sort/filter/select records with truthful states and safe actions | shadcn `Table` + TanStack Table's fit-for-purpose headless features, or qualified specialist grid where justified | **Open.** Table schemas/column density and product data bindings remain product-owned; no universal vanilla-style DataGrid required. |
| HomeSight topology visualization | Explore relationships and inspect/select nodes/edges | Official native UI for shell, controls, panels; retain a qualified graph engine as a product adapter where requirements demand it | **Product-specialist likely.** Do not re-create Cytoscape or force a graph engine into the shared base. |
| SDM configuration/review screens | Safely inspect, validate, compare, confirm or cancel configuration changes | Native `Field`/`Input`/`Tabs`/`AlertDialog`/`Sheet`/forms and fit-for-purpose composition | **Open.** Product owns authorization, state persistence, diff/apply semantics; a global approval wizard is not automatically justified. |

**Official upstream references (evaluate version compatibility with our pinned Base UI source before adoption):** https://ui.shadcn.com/docs/components/base/sheet ; https://ui.shadcn.com/docs/components/base/drawer ; https://ui.shadcn.com/docs/components/base/resizable ; https://ui.shadcn.com/docs/components/base/data-table ; https://ui.shadcn.com/blocks . The official Data Table guide explicitly favors composing task-specific tables over enforcing a single universal data-table component. These are candidates, **not decided UI designs**.

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
| S04 | View record detail and related context (layout NOT prescribed) | Three native Card/Sheet/Dialog comparison stories (not full app pages) | Function comparison built; route and responsive acceptance open | P0 |
| S05 | Inspect a selected item without losing context; dismiss/return/focus; optional persistent comparison | Three neutral Card/Sheet/Dialog stories plus play assertions; not product integration | **Pattern decision open:** evaluate Drawer, Resizable, route, mobile/zoom; legacy lock/maximize not mandated | P0 |
| S06 | Select and safely act on multiple records where products require it | None as integrated workflow | Evaluate native checkbox + headless table selection and confirmation; product controls scope | P0 |
| S07 | Task/run list, status, progress, detail, retry/cancel boundaries | Activity is non-operational | Gap | P0 |
| S08 | History/event timeline, audit/change log and compare/diff | Basic Activity view | Partial: actual timeline/detail/diff | P0 |
| S09 | Settings editor with field-level validation and dependencies | Settings with local form/tabs | Partial: dirty/validating/denied/error | P0 |
| S10 | Preview and safely confirm/cancel pending changes | No integrated page | Evaluate native Field/Dialog/Tabs/AlertDialog patterns; real apply semantics stay product-owned | P0 |
| S11 | Complex dialogs, sheet, drawer, popover, nested overlays | Component stories + invitation dialog | Partial: focus, unsaved, stacking/touch | P0 |
| S12 | Search/command palette and keyboard-oriented navigation | Command component story | Gap: integrated use | P0 |
| S13 | Contextual Help, deep TOC, code/example, active-section binding | Storybook Docs exists, not product Help | Gap | P0 |
| S14 | State matrix: loading, empty, first-run, error, offline, stale, degraded, forbidden | Individual component variants only | Gap: integrated truthful states | P0 |
| S15 | Monitoring/health, time-series, alerts, active incidents | Chart and Activity samples | Partial: production-shaped semantics only | P0 |
| S16 | Understand and explore relationships/topology where products require it | Native app has no graph workflow | Qualified graph engine and native surrounding controls; **product-owned**, no shared legacy graph UI | P0 |
| S17 | Logs/traces, long streaming output, filters, copy/search | Trace/code component stories | Gap: operational workflow | P0 |
| S18 | Files/artifacts/attachments, upload progress, preview, recovery | Attachment native source/story | Gap: integrated state | P1 |
| S19 | Scheduling/calendar and recurring job operations | Calendar primitive only | Gap | P1 |
| S20 | Guided setup/onboarding and multi-step wizard | No integrated page | Gap | P1 |
| S21 | Authorization/RBAC, denied/not-found, session and permission-aware controls | Pocket ID external sign-in, no local auth UI needed | Gap: authorization states, avoid duplicate login | P0 |
| S22 | Notifications center, alert severity, acknowledge/escalate | Bell demo only | Gap | P1 |
| S23 | Interactive technical API/JSON viewer, source/diff, docs examples | Code-block component | Gap: specialist evaluation | P1 |
| S24 | Work queue/backlog, grouped/filterable work items, dependency view | No integrated page | Gap | P1 |
| S25 | Mobile/zoom/touch variants of dense tables, drawers, inspectors | 20 visual baseline images | Partial: accessibility/reflow/400% zoom | P0 |

P0 = high-priority *functional requirement to evaluate*, **NOT** an instruction to build the existing app's widget or create a mandatory new shared screen. P1 = plausible future capability, explicitly assess/admit/defer. Each need can be satisfied by native primitives, official blocks, native composition, or a justified **product-owned** specialist adapter; N/A/rejected legacy-parity demands are recorded. Only demonstrably reusable capabilities belong in shared UI. 'Gap' refers to capability evidence, not missing a matching old layout. No actual domain mutations, account administration or external sends in synthetic examples.

## Cross-cutting state and behavior matrix required for each applicable archetype

Evidence must cover light/dark, desktop/mobile/400% zoom, screen reader labels where material, keyboard/touch/focus, empty/first-run, loading/pending, success, validation error, service error, unavailable/offline, partial/stale/degraded, authorization denied, no-results, long/overflowing data, and unsaved change recovery. Inapplicable states need an explicit N/A rationale. Use synthetic data that is internally consistent and truthful; no fake operational success.

## Functional research checkpoint — 2026-11-07 (NOT accepted)

**Products supply capabilities, not UI implementations.** HomeSight users need to inspect a selected item and its relationships; Reach provides read-only Task/Run details; SDM operators inspect configuration. Their existing custom vanilla inspectors and layout choices are NOT a blueprint for Family UI.

**Initial native exploration:** `src/stories/patterns/record-inspection.stories.tsx` compares three solutions to the same synthetic record-inspection task: (a) persistent inline Card detail; (b) native Sheet with modal context; (c) native Dialog for focused details. Three Storybook play assertions exercise selection and dismissal. No native shadcn source/colors, existing five app pages, or 20 visual goldens changed; static Storybook build and original 63 catalog families/63 Docs/134 stories passed. This is a prototype, not a selected reusable component or a new product inspector.

**Outstanding evaluation:** same-task Sheet vs Dialog vs Card plus native Drawer/Resizable/deep route; context retention, focus restoration, keyboard, touch, long details, mobile and 400% zoom, light/dark a11y. Avoid a universal `SideInspector`; accept only justified reusable capabilities. The following patterns are still hypotheses:

| Native candidate | Potential fit | Open concern |
| --- | --- | --- |
| Card + inline detail | Nonmodal, simultaneous context/details | Narrow viewport reflow, long content |
| Sheet | Contextual overlay, short to medium details | Underlying list inaccessible while modal; focus |
| Dialog | Short focused inspection, deliberate interaction | Repeated inspection, density |
| Drawer / Resizable / route | Touch / simultaneous workspaces / deep links | Need same-task integrated comparison before any shared decision |

**Gate N remains OPEN. Gate T theming remains BLOCKED.**

## Native admission checklist — gate N (BLOCKED)

- [ ] N1: Confirm scope against current official shadcn/Base UI components **and blocks**, maintained owned-product workflows and existing contract owners; pin provenance, version and licenses. Reconcile every identified required family and record excluded candidates.
- [ ] N2: Maintain function-to-native mapping and source/variants/states evidence for adopted or genuinely needed components/blocks; evaluate all imported sources for applicability, but do not build unused wrappers or harden product-inapplicable variants merely for a count.
- [ ] N3: For every P0 functional capability, evaluate native alternatives and explicitly accept the best approach or a product-owned specialist reference; build *representative reusable* integrated neutral examples with responsive/states evidence. A P0 candidate is not a compulsory shared screen or a requirement to reproduce any vanilla UI.
- [ ] N4: Exercise interaction/focus/keyboard/touch and truthful partial/error/empty states. Build source-backed automated assertions plus human visual review for representative integrated flows. Maintain visual goldens for every admitted screen, not only the original five.
- [ ] N5: Classify the 12 native contrast exceptions by exact upstream provenance, severity and disposition; review upstream status by 2026-12-06. No unexplained regressions, no upstream patches to conceal gaps.
- [ ] N6: Formal acceptance of complete known-scope inventory and neutral native reference by Ronald, recorded in canonical Vault and Reach. Keep Brand PR #1 Draft until its exact planned native acceptance is fulfilled or an explicitly narrower native-only delivery boundary is authorized.

## Hypershell theme admission — gate T (HARD BLOCK)

**Not authorized by completion or merging of Brand PR #1 or any intermediate native release.** Requires a separate explicit operator go/no-go **after N1–N6**, using a separately reviewed design decision and implementation PR. Before implementation: compare the accepted native reference against canonical Hypershell semantic tokens, brand identity, dark/light surfaces, dense operational layouts, table/inspector behavior, status semantics and UI governance; present representative before/after previews for explicit approval. Verify semantic contrast/keyboard/zoom/reduced motion, no native behavioral regressions, source provenance, and reusable-versus-product-specific boundaries. Do not theme native source files directly or silently fork upstream primitives. No consumer UI migrations or branded package promotion before this gate and individual product acceptance.

## Immediate next work

1. Extract outcome-level needs from actual owned-product contracts and map S01–S25 as candidate *capabilities*, not target screen designs. For each, decide native composition versus specialist product-owned behavior, evaluate alternatives (starting with record-detail patterns), and only then schedule gaps that merit reusable neutral examples.
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
