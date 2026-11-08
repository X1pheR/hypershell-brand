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
| Specialist visualization and formatted content | No complete native graph topology/Markdown parser/advanced editor/large grid engine implied by shadcn primitives | assess vetted graph, Markdown read/preview vs authoring, data-grid, diff/JSON/code, log/terminal, file tree adapters **without** silently building homemade substitutes |

The complete **63-name snapshot must be regenerated from actual workbench source** on each scope review. Each 'catalog story exists' is evidence of component presence, not a passed interaction test.

## Neutral screen/workflow archetype inventory — INITIAL CANDIDATES, NOT APPROVED COMPLETENESS

Coverage is assessed by **behavioral archetype**, not just by separate route count. Columns reflect only presently observed workbench evidence; candidates and P0/P1 priority must be reconciled against HomeSight, Reach, monitoring, Command Center and other current owned-product contracts before acceptance.

| ID | Screen / workflow archetype | Current evidence | Initial state | Priority |
| --- | --- | --- | --- | --- |
| S01 | Application shell, responsive navigation, contextual page/title/actions | Five-page shell, drawer, light/dark | Partial: deep nav/help/context | P0 |
| S02 | Dense overview, metrics, cards and linked operational drill-down | Overview dashboard | Partial: actual drill-down and truthful stale state | P0 |
| S03 | Search/sort/filter directory and table | Members + native fictional searchable/sortable/paged Table research stories; pending CI | Partial: product server data/filter URLs, density/virtualization and accessibility | P0 |
| S04 | View record detail and related context (layout NOT prescribed) | Six neutral native Card/Sheet/Dialog/Drawer/Resizable/MemoryRouter research stories, two-theme axe/play CI passed; not application pages | Functional comparison source prepared; external deep links and product context remain unverified | P0 |
| S05 | Inspect a selected item without losing context; dismiss/return/focus; optional persistent comparison | Six neutral native composition stories with one fictional fixture, both verify CI jobs passed; no selected global pattern | **Pattern decision open:** compare all alternatives in browser, mobile/400%-zoom/touch/long content; legacy lock/maximize not mandated | P0 |
| S06 | Select and safely act on multiple records where products require it | Native checkbox page selection + local review/cancel/confirm candidate, pending CI | Product authorization, concurrency, scope across pages, real mutations remain product-owned | P0 |
| S07 | Task/run list, status, progress, detail, retry/cancel boundaries | Activity is non-operational | Gap | P0 |
| S08 | History/event timeline, audit/change log and compare/diff | Basic Activity view | Partial: actual timeline/detail/diff | P0 |
| S09 | Settings editor with field-level validation and dependencies | Settings + native validated local draft candidate, pending CI | Partial: field validation/dirty/pending/denied; product server validation/dependencies open | P0 |
| S10 | Preview and safely confirm/cancel pending changes | Native local draft review/confirm/discard and synthetic bulk review/cancel candidates, pending CI | Acceptance of actual product apply semantics and server safety is separate | P0 |
| S11 | Complex dialogs, sheet, drawer, popover, nested overlays | Component stories + invitation dialog | Partial: focus, unsaved, stacking/touch | P0 |
| S12 | Search/command palette and keyboard-oriented navigation | Command component story | Gap: integrated use | P0 |
| S13 | Contextual Help, deep TOC, code/example, active-section binding | Storybook Docs exists, not product Help | Gap | P0 |
| S14 | State matrix: loading, empty, first-run, error, offline, stale, degraded, forbidden | Native table loading/empty/retry/denied + form pending/denied + Markdown no document, pending CI | Partial: offline/stale/degraded/first-run/long data remain open | P0 |
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
| S26 | Safely read, preview, navigate and search Markdown documentation and reports, with headings/tables/code and accessible source fallback | Native shadcn composition + pinned react-markdown/GFM safe render and hostile/empty stories; pending CI | Secure parsing negative tests, strict CSP, heading TOC, highlighting/search and a11y still open | P0 |
| S27 | Author/edit Markdown source and preview when product workflows demand it | Native Textarea + GFM live preview/local-unsaved draft example, pending CI | P1: source integrity, accessibility/shortcut, product save ownership and rich editor demand remain open | P1 |

P0 = high-priority *functional requirement to evaluate*, **NOT** an instruction to build the existing app's widget or create a mandatory new shared screen. P1 = plausible future capability, explicitly assess/admit/defer. Each need can be satisfied by native primitives, official blocks, native composition, or a justified **product-owned** specialist adapter; N/A/rejected legacy-parity demands are recorded. Only demonstrably reusable capabilities belong in shared UI. 'Gap' refers to capability evidence, not missing a matching old layout. No actual domain mutations, account administration or external sends in synthetic examples.

## Cross-cutting state and behavior matrix required for each applicable archetype

Evidence must cover light/dark, desktop/mobile/400% zoom, screen reader labels where material, keyboard/touch/focus, empty/first-run, loading/pending, success, validation error, service error, unavailable/offline, partial/stale/degraded, authorization denied, no-results, long/overflowing data, and unsaved change recovery. Inapplicable states need an explicit N/A rationale. Use synthetic data that is internally consistent and truthful; no fake operational success.

## Official shadcn Base UI scope audit — 2026-11-07

Read-only official navigation audit: current Base UI documentation lists 66 component-category links. The current pinned Workbench has 63 native component source files and all 63 names are in that official index. The three entries absent as individual source modules are Data Table, Date Picker and Typography; these are composite guides/recipes, not evidence of three missing mandatory vanilla-style components. This audit proves navigation-category/source coverage only, not behavior, blocks or product completeness.

- Data Table: official guide builds task-specific tables from native Table and TanStack Table. Product data, columns, sorting/paging and action semantics are product-owned; do not force one universal DataGrid into the shared base.
- Date Picker: assess native Calendar, Popover and input composition against actual date/time/timezone requirements first.
- Typography: a neutral presentation guide, not a license for Hypershell theme/token adoption during Gate N.
- Official shadcn blocks such as dashboard and sidebar are functional design references, not mandatory layouts to transplant; login/signup blocks are not automatically necessary when Pocket ID owns authentication.
- AI Elements form an additional site category, separate from these 66 Base UI navigation entries; admit only justified agent/chat functional needs, not as blanket source modules.

Official references: https://ui.shadcn.com/docs/components/base/empty ; https://ui.shadcn.com/docs/components/base/data-table ; https://ui.shadcn.com/blocks . Pinned source audit via local src/components/ui enumeration. Recheck after upstream version changes. No additional vendor files installed.

## Native functional study wave — 2026-11-08 (implementation candidates; not Gate N acceptance)

**S26/S27 secure Markdown:** `src/stories/patterns/native-markdown-documents.stories.tsx` uses pinned MIT `react-markdown@10.1.0` and `remark-gfm@4.0.1` for four synthetic examples: GFM document with table/task list/fenced code and safe local/HTTPS links; native Textarea live source+preview with unsaved status and reset; hostile HTML/JS protocol and remote image test; honest no-content state. Security policy: `skipHtml`, explicit semantic element allowlist, HTTPS and safe local paths only, no img/iframe/script/MDX, no auto-Mermaid, no raw HTML plugin, no actual persistence or network media fetch. This is a **Storybook-local composition**, not a newly promoted shared Markdown renderer/editor; exact CSP and browser negative-path verification remains required. Syntax highlight/TOC/link fragments and real long document editing remain open.

**S03/S06/S10/S14 record workflows:** `src/stories/patterns/native-record-workflows.stories.tsx` compares native Table+Input+Checkbox+Dialog with deterministic 8-row fictional search/sort/4-row pagination, page-scoped select-all and indeterminate checkbox, cancel/confirm local-only bulk review. Additional stories distinguish no-results, loading, recoverable failure and authorization denied without fabricated backend status. Selection across pages and server-side authorization/versioning belong to each product, not shared UI. No generic DataGrid or operator mutation created.

**S09/S10 form draft safety:** `src/stories/patterns/native-form-draft-review.stories.tsx` demonstrates native fields, HTTPS and name validation, unsaved changes, discard, review-before-local-confirmation, pending and denied states. Actions only mutate synthetic in-browser state, never an SDM config or Reach Task. No global wizard or save transport exists.

**Admission checks:** TypeScript and zero-warning lint pass in isolated pinned Node 24 (run-20261108T011606625541Z-656898929da0). Initial source CI at `3b3fd23` passed existing 20 visual goldens and most Storybook interactions, but reported two new story assertion failures: sort-direction test targeted the wrong initial label; local form dialog test required bounded transition visibility wait. These were corrected for exact rerun; **do not call new wave accepted before new-head verify succeeds**. Negative Markdown security probes remain required. For URL security, the story's HTTPS/safe-relative link allowlist is applied *after* `react-markdown`'s own `defaultUrlTransform`, never replacing its built-in protection. New parser supply chain scope: `react-markdown 10.1.0` (MIT) and `remark-gfm 4.0.1` (MIT), exact pnpm lock. Corepack used the existing pinned `/work/.pnpm-store`; first store-location mismatch was non-mutating and corrected without reinstallation. Legacy peer warnings for `@storybook/test` 8 vs Storybook 10 were already present and are not proof of Markdown incompatibility. Production dependency audit (2026-11-08) found 0 high/critical, one moderate `minimatch` 10.2.6 and one low `deepmerge` 4.3.1; `pnpm why --prod` ties **both exclusively to the existing `shadcn@4.23.0` CLI** rather than newly added Markdown packages. Record and review these separately during pinned dependency maintenance; do not silently waive future high severity findings.

**Remaining gates:** rendering security at runtime/CSP, real 400%-zoom, touch, screen-reader usage, larger datasets, unsaved-change/navigation behavior, endpoint validation at *server* (product-owned), performance/DoS for untrusted large Markdown, and human review. No native source, theme, 5 existing application screens, external service data or diagram library was changed. Gate N still open; Theme Gate T remains blocked.
\n## Gate N — Markdown as a separate functional capability (operator addition 2026-11-08)

**Explicit scope addition:** assess Markdown for the shared neutral UI reference alongside charts and diagrams, **without** assuming a custom vanilla Markdown editor, a mandatory rich editor, or an all-in-one `MarkdownViewer` wrapper. Existing help, release notes, run reports, engineering documentation, code examples and editable descriptions are sources of user needs, **not** visual implementations to port.

| User capability | Native composition / specialist options to investigate | Admission and ownership questions |
| --- | --- | --- |
| **Read and preview Markdown** (P0 evaluation, likely useful across products) | Native shadcn typography, `Card`, `ScrollArea`, `Table`, `CodeBlock` and links around a qualified Markdown parser/rendering library; consider CommonMark and GitHub Flavored Markdown (GFM) | Headings/TOC, deep links, lists, tables, checkboxes, fenced code and syntax highlighting, safe link handling, empty/loading/error/long documents, search/copy, responsive/400%-zoom, keyboard/screen readers; plain-text and safe-source fallback |
| **Author or edit Markdown** (P1 pending real cross-product demand) | Compare plain `Textarea` with side-by-side preview, source editor (e.g. CodeMirror), and qualified Markdown-aware/rich-text editor options | Preserve round-trip Markdown, undo/redo, selection/focus, toolbar/shortcuts, validation, unsaved changes, paste/file handling, large documents; editor/preview complexity belongs to a product unless evidenced for reuse |
| **Markdown-embedded diagrams** (separate conditional capability) | Treat fenced Mermaid source as **untrusted input**; render using a security-reviewed diagram adapter only after Mermaid's own Gate N decision; otherwise display fenced source | Prevent arbitrary HTML/script execution and unsafe SVG/link behavior; strict CSP and sanitization, accessible text fallback, diagram source retention, permission boundaries; **do not** automatically enable MDX/JSX or Mermaid rendering |
| **Rich extensions and interoperability** (defer until demanded) | GFM task lists/tables, frontmatter, footnotes, code highlighting, math, embedded media; extension compatibility review | Explicit source format/version, deterministic output, XSS/sanitization, allowed URLs and images, license/maintenance, output parity and product ownership |

**Hard boundary:** Markdown itself is a format/capability, not an original shadcn component. Evaluate the simplest safe Markdown renderer before any editing framework; do **not** admit unrestricted HTML, MDX or user-controlled JavaScript merely because they can appear in Markdown. Decide render vs editor separately with light/dark, mobile, keyboard, focus, link security, text-equivalent and copy/paste acceptance. Record source provenance, supported syntax and exact dependency/license/security evidence when this reaches implementation. No dependency, shared adapter, native-source change or Hypershell theming is authorized by this inventory addition.

## Gate N — quantitative visualization and diagram capability study (2026-11-07)

**Functional requirement, not legacy UI cloning:** current Hypershell products can need trustworthy time series, categorical totals, proportions, comparisons, correlations, no-data states, static service dependency diagrams and interactive resource relationships. The old HomeSight/Reach/SDM chart styling, graph engines or screen geometry are discovery evidence only, not a mandated design for our shared base.

### Neutral charts — pinned native implementation candidate

`src/stories/patterns/native-data-visualizations.stories.tsx` contains **ten Storybook research states** built strictly on existing official `src/components/ui/chart.tsx` plus pinned `recharts@3.8.0`: line trend, area, stacked bars, horizontal categories, donut part-to-whole, radar, radial share, scatter relationships, a metric-switching interactive line and an explicit no-measurements state. These use a single internally consistent synthetic 7-day dataset and derived totals (Accepted = 164, Pending = 34, total 198); the radar is separately labelled illustrative. Every plotted numeric example has an expandable accessible data table with exact values. The interactive selector uses native `Button` with `aria-pressed`, and charts use the official Recharts accessibility layer where offered. Live private-preview inspection found that a Pie-specific `ChartLegendContent` composition did not render readable category labels, despite visible colored sectors; the story now provides an always-visible non-color text breakdown, derives totals from its source data and tests the output plus expandable numeric table. This is a composition-level improvement, not a patch to shadcn or Recharts. No app source, dashboard CSS, native chart module, chart palette or Hypershell theme has been altered. **Story presence does not establish WCAG or production chart readiness.**

| Requirement | Native fit to assess | Evidence/acceptance still required | Ownership hypothesis |
| --- | --- | --- | --- |
| Ordered time series / event volume | `ChartContainer` + `LineChart`/`AreaChart`/`BarChart` | genuine point keyboard navigation, responsive labels, gaps/stale, time zones | shared primitive, product-owned data/semantics |
| Category comparison and stacked totals | `BarChart` horizontal/stacked + `ChartLegend`/`ChartTooltip` | sum and legend integrity, contrast, large cardinality, ordering | native compositions per product |
| Part-to-whole and radial share | `PieChart` donut / `RadialBarChart` | proportion truth, exact text equivalent, tiny slices, noncolor cues | limited task-specific use; bar may be better |
| Multi-axis scoring radar | `RadarChart` | common comparable scale, intentional rating semantics and data table | not a default monitoring widget |
| Correlation | `ScatterChart` | sampling, axis units, tooltips and exact point access | product-owned analysis |
| Interactive filtering and no-data states | native button state + line / explicit status | keyboard/axe, filter data correctness, no false zero, error/stale variants | shared native pattern only if repeated |

Native shadcn official source: https://ui.shadcn.com/docs/components/base/chart ; official examples https://ui.shadcn.com/charts/area , https://ui.shadcn.com/charts/line , https://ui.shadcn.com/charts/bar , https://ui.shadcn.com/charts/pie , https://ui.shadcn.com/charts/radar , https://ui.shadcn.com/charts/radial . **Do not** claim implementing every official chart variant or every needed visualization. The existing example Dashboard still has a synthetic CSS bar illustration; decide separately whether to replace it with an actually reusable native Chart after representative chart acceptance and visual-baseline review.

### Diagrams and graphs — separate capability-admission decision; NO new dependency yet

| Need | Candidate | Evidence / decision boundary |
| --- | --- | --- |
| Static technical architecture, sequences and flowcharts from text | Mermaid (official `securityLevel: strict` for untrusted content) | rendered text+SVG, safe markup/CSP, reduced motion, accessible text/alternate view, source version and export; no click/HTML from loose mode |
| Interactive workflow/node editor | React Flow (`@xyflow/react`, MIT core) | native keyboard/focus selection/drag, layout/sizing, touch, edge navigation, React lifecycle, graph size, product ownership; Pro features not assumed open source |
| High-density dependency/network graph | Cytoscape.js (MIT core) and possibly existing product graph engine | large graph performance, stable layouts, zoom/selection, text equivalent, filtering and data semantics; do not port HomeSight vanilla implementation |
| Shared native UI shell surrounding any graph | shadcn `Card`, `Tabs`, `Button`, `Sheet`, `Tooltip`, `Resizable` etc. | no global Diagram abstraction until actual cross-product reuse; graph engine remains specialist/product-owned by default |

Authoritative references: https://reactflow.dev/index , https://reactflow.dev/learn/advanced-use/accessibility , https://reactflow.dev/learn/advanced-use/performance , https://mermaid.js.org/intro/syntax-reference.html , https://mermaid.js.org/config/usage , https://js.cytoscape.org/ . This is a **candidate-fit study, not an adoption approval**. Any new library must pass exact version/license/security/CSP/performance/keyboard review, owner and release gate. No unauthorised broad dependency additions.

**Gate N status:** chart source gallery is a *candidate* pending exact light/dark Storybook axe/play, published private preview, mobile and actual 400% zoom, numeric consistency and appropriate noncolor alternatives. Diagrams remain research-only. **Gate T Hypershell theming HARD BLOCKED.**

## Native comparison #2 — 2026-11-07 (source candidate, NOT Gate N acceptance)

Added three more compositions for **the identical synthetic record-inspection task** as the original Card/Sheet/Dialog study: native touch-oriented Drawer, native Resizable simultaneous panels with a stacked Card fallback on narrow screens, and a React Router MemoryRouter-driven detail-view navigation example. The six stories share precisely one fictional data fixture in `record-inspection-data.ts`; `RecordDetails` is just a story-local field renderer, **not a promoted Family UI shared component**. All primitive source files and the original five app screenshots are unchanged.

**Meaningful differences to assess:** Drawer uses native swipe/modal semantics; Resizable allows both list and detail visible on wide screens and deliberately stacks native Cards on narrow screens; MemoryRouter demonstrates in-app selection/return without a legacy side inspector, but **does not prove external deep linking, browser history, production routes or product navigation contracts**. None is chosen as universal behavior. The responsive split and semantic focus/keyboard controls require exact-browser verification rather than assumptions from markup.

**Verified on exact source:** PR #1 `796b46a` had both `verify` jobs (128513450962/128513436380) SUCCESS, including two-theme Storybook interaction and axe checks; both 20-original-golden jobs (128513450702/128513436579) SUCCESS. TypeScript and lint 0 errors/warnings (`run-20261107T200225442663Z-ebf67c5e89dd`). The OCI protected Storybook was staged and CSP-externalized (`run-20261107T200611782712Z-c9717b477e0d`), then privately published only to the Storybook directory (`run-20261107T200651741329Z-ff929a2618cc`) with rollback at `/srv/hypershell/tmp/storybook-native-inspection-six-options-recovery-20261107`. Existing Caddy and Storybook MCP container IDs stayed unchanged/healthy. Authenticated live browser: at 390px the Drawer showed EX-102 with focus contained, Escape returned focus to source, no horizontal overflow; MemoryRouter detail view returned to list without overflow. At 1280px the Resizable separator was keyboard focusable and ArrowRight changed list width 475 to 524px; at 320px native stacked Cards were visible, split separator hidden, no overflow. **Still unverified:** real browser 400%-zoom (320px CSS viewport is only a proxy), physical touch/swipe, long-content scroll, repeated rapid selection, production deep-link/browser history, and operator preference. No component or shared inspector has been adopted. Gate N stays OPEN and Gate T HARD BLOCKED.

## Functional research checkpoint — 2026-11-07 (NOT accepted)

**Products supply capabilities, not UI implementations.** HomeSight users need to inspect a selected item and its relationships; Reach provides read-only Task/Run details; SDM operators inspect configuration. Their existing custom vanilla inspectors and layout choices are NOT a blueprint for Family UI.

**Initial native exploration:** `src/stories/patterns/record-inspection.stories.tsx` compares three solutions to the same synthetic record-inspection task: (a) persistent inline Card detail; (b) native Sheet with modal context; (c) native Dialog for focused details. Three Storybook play assertions exercise selection and dismissal. A native visible-button-name issue and two overlay timing assertions were corrected **without exceptions or native patches**; latest GitHub `verify` plus 20-golden jobs both passed on source `a5d97b4` (light/dark a11y and interaction runs). No native shadcn source/colors, existing five app pages, or 20 visual goldens changed; static Storybook build and original 63 catalog families/63 Docs/134 stories passed. The accepted private OCI Storybook preview was selectively updated from that exact source with strict CSP externalization, no gateway/sidecar restart, and private rollback copy at `/srv/hypershell/tmp/storybook-native-inspection-preview-recovery-20261107`. On the live 390px Sheet example, selection EX-102 displayed inside the dialog, focus stayed within it, Escape returned focus to the selected record button, and document scrollWidth matched viewport width. The only observed console error was the existing missing favicon request. This is a prototype, not a selected reusable component or a new product inspector.

**Outstanding evaluation:** same-task Sheet vs Dialog vs Card plus native Drawer/Resizable/deep route; long details, repeated rapid record selection, real touch and actual browser 400% zoom. Light/dark Storybook axe/play and one authenticated mobile Sheet focus/overflow flow passed, but these do **not** establish complete screen accessibility or select a single global solution. Avoid a universal `SideInspector`; accept only justified reusable capabilities. The following patterns are still hypotheses:

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

1. Extract outcome-level needs from actual owned-product contracts and map S01–S27 (initial S01–S25 plus Markdown S26–S27, added by operator 2026-11-08) as candidate *capabilities*, not target screen designs. For each, decide native composition versus specialist product-owned behavior, evaluate alternatives (starting with record-detail patterns), and only then schedule gaps that merit reusable neutral examples.
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
