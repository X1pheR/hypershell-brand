# Isolated S16 graph rendering experiment (2026-11-09)

**Research only. No installed Family UI dependency, no HomeSight replacement, no Gate N/T acceptance.**

Exact source and evidence for `NATIVE_GRAPH_RENDERER_REASSESSMENT.md`. Uses **synthetic** deterministic 100/500/1500 node, 3× directed edges data. Engine versions are pinned in this directory's `package-lock.json`; MIT dependencies are React Flow 12.12.1, Cytoscape 3.34.4, AntV G6 5.1.1 and Dagre 1.1.8 (layout library held for follow-up; layout ops in current app are **preset position updates**, not Dagre/fCoSE/ELK comparisons).

The experiment was executed only in `/srv/hypershell/tmp/graph-bakeoff-s16-20261109` on OCI ARM64 using an isolated Node 24 container for install/build, and `mcr.microsoft.com/playwright/mcp:v0.0.83` with pinned headless Chromium arm64 for browser tests. Every browser run was `--network none` and exposed only an ephemeral loopback static HTTP listener. No user data, HomeSight endpoint or auth token is involved.

## Reproduce on the established OCI host

Clone or use this **separate research directory** as `/work` (never run `npm install` at the Family UI package root for this experiment):

```sh
# With RESEARCH pointing to this folder and BRAND to repository root:
docker run --rm -v "$RESEARCH:/work" -w /work node:24-bookworm npm ci --ignore-scripts --no-audit --no-fund
docker run --rm --network none -v "$RESEARCH:/work" -w /work node:24-bookworm npm run build
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-run.cjs smoke
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-run.cjs full
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-run.cjs acceptance
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-zoom.cjs
```

The test runner deliberately reuses `/src/family-ui/workbench/node_modules/@playwright/test` and the known OCI browser executable path. If run on a different host, update these explicit **test-only** paths rather than silently swapping browser builds. No external URL is loaded during browser tests. Build outputs, `node_modules` and temporary Chrome profiles are intentionally **not versioned**.

## 2026-11-10 recovery and optimized/rich functional extension

The ChatGPT UI interrupted before the previous research was reported, but the original [Reach Run](https://reach.hypershell.eu/runs/run-20261109T073951668790Z-a7858522db96) finished with `succeeded / exit 0`. The original exact `reports/optimized.json` was recovered and verified, **not reconstructed or rerun**. The user-reported ChatGPT stall is tracked as CS-027 in the private Vault, not as a graph-engine failure.

Additional **research-only** source: `src/reactopt.jsx` (memoized typed nodes), `src/rich.jsx` (eight-node compound/zone/inspector proof), `src/richscale.jsx` (memoized 100/300 and 500/1500 nodes with two true containment groups and three decorative site zones), and `bench-rich.cjs`, `bench-rich-zoom.cjs`, `bench-richscale.cjs`. Their test output is in `reports/optimized.json`, `reports/richscale-smoke.json` and `reports/richscale.json` (raw samples retained). These experimental dependencies are **not** added to the main workbench's `package.json`.

Under 4× CPU throttle, 20 Mbit/s and 40ms latency, with one warmup plus five measured runs:

| Case / measured median | Simple React Flow | Memoized React Flow |
| --- | ---: | ---: |
| 100 nodes initial ready | 1,344 ms | 1,015 ms |
| 100 nodes 50-node status update | 481 ms | **73.5 ms** |
| 500 nodes initial ready | 3,027 ms | **1,664 ms** |
| 500 nodes 50-node status update | 2,049 ms | **104.4 ms** |

Optimized comparison: **24/24 browser runs passed**, [Reach Run](https://reach.hypershell.eu/runs/run-20261109T073951668790Z-a7858522db96). The performance delta is **adapter-specific**, not a universal promise: stable custom node components, `memo` and unchanged props reduce unnecessary React rerendering; the simple baseline intentionally remapped every node when selecting and changing status.

The more demanding **richscale** proof adds two true nested groups, a separate Home/OCI/Internet visual-zone overlay, semantic directed edges, selected Item/Relationship, browser-local per-projection pins, six Map projection selectors, a filtered keyboard-accessible inspector and 320px reflow. A small unthrottled functional smoke passed; the full one-warmup + five-measurement 4× CPU suite completed **12/12 browser runs**, [Reach Run](https://reach.hypershell.eu/runs/run-20261110T060410334940Z-4a5038897fed). Median results:

| Richer React Flow, 4× CPU | 100 nodes / 300 relationships | 500 nodes / 1,500 relationships |
| --- | ---: | ---: |
| First ready | 1,105 ms | 2,187 ms |
| Inspector selection (includes browser automation) | 238 ms | 382 ms |
| 50 status updates (includes browser automation) | 123 ms | 397 ms |
| JS heap | 7.9 MiB | 28.7 MiB |

**Not product-accepted:** true historical HomeSight fCoSE/Dagre/ELK/edge-routing behavior was **not** executed in these React Flow fixtures; arrangement is preset with pinned position replacements. The original HomeSight product's 200ms selection budget is **not shown as met** by the richscale inspector click path; that timing includes Playwright automation and is not directly comparable to internal ReactFlow event-processing. Only the original small rich fixture was verified with **actual** Chrome 400% tab zoom and synthetic touch; the richer 100/500 fixture was tested at a resized 320px CSS viewport, **not independently at actual 400% zoom**. Neither physical touch, canonical data integration, staged density, full accessibility nor a HomeSight cutover is accepted by these research runs.

To rerun only the relevant bounded proof after a local production build (using the same isolated Docker/Playwright path described above):

```sh
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-run.cjs optimized
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-richscale.cjs full
```

## Automatic layout follow-up — 2026-11-10

**Objective:** Compare *real automatic layouts*, rather than the preceding preset-position substitutions, using the same synthetic relationship model and the **historical HomeSight profile sizes** (current: 22 Items / 29 Relationships; dense: 60 Items / 77 Relationships). The graph content is deterministic and synthetic, **not** the actual HomeSight topology. Each candidate receives two nested true parent containers, two anchored simple nodes (`n10` and `n20`), then **two new Items and three Relationships**. One warmup isn't separated; three repeated isolated Node 24 executions per engine/profile provide the reproducible sample set.

**Source:** `bench-layout.mjs`; **raw report:** `reports/layout-accepted.json`. The source can be run in the isolated benchmark directory after `npm ci --ignore-scripts`:

```sh
docker run --rm --network none -v "$RESEARCH:/work" -w /work node:24-bookworm node bench-layout.mjs accepted
```

The run outputs an explicit per-candidate fixture shape, first and incremental layout cost, relative median movement of unchanged unpinned nodes, raw layout movement of pins, **postprocessed** pin displacement, simple-node rectangle overlaps, and geometric containment violations. The measured 100/300 stress shape was executed separately during exploration, but is not the HomeSight historical comparison. Avoid running `bench-layout.mjs stress` on a shared/production-constrained target without an explicit execution bound: Dagre on highly cyclic compound graphs can become expensive.

| HomeSight-size synthetic profile, median of 3 | Dagre (compound) | ELK Layered (nested, interactive second pass) | Cytoscape fCoSE (compound, incremental native constraints) |
| --- | ---: | ---: | ---: |
| 22/29: first automatic layout | 215 ms | 76 ms | **31 ms** |
| 22/29: incremental automatic layout | 187 ms | 63 ms | **12 ms** |
| 22/29: unpinned node displacement | 1,695 px | 129 px | **0 px** |
| 22/29: **raw** maximum pinned-node movement | 1,255 px | 461 px | **0 px** |
| 60/77: first automatic layout | 773 ms | 119 ms | **41 ms** |
| 60/77: incremental automatic layout | 616 ms | 116 ms | **28 ms** |
| 60/77: unpinned node displacement | 2,885 px | 496 px | **0 px** |
| 60/77: **raw** maximum pinned-node movement | 2,759 px | 767 px | **0 px** |

**18/18 runs passed basic completion/integrity checks; each returned all nodes and two nested groups and retained expected parent group geometry.** After the experiment forcibly restores pinned `x,y` coordinates in Dagre and ELK, all final pinned movement values are **0 px** — but this is an **adapter postprocess**, **not a native pin constraint**. Such an override may invalidate the computed edge routing or collide with other nodes, and must not be portrayed as equivalent to fCoSE's `fixedNodeConstraint`. fCoSE natively preserves pins in this limited test.

**Critical limitations:** The 22/29 and 60/77 sizes and change *shape* mirror the historical HomeSight contract, but edges and nested memberships are not the same actual accepted input; the older published renderer outcomes therefore cannot be numerically compared. Dagre optimizes directional/acyclic layouts and the synthetic cyclic/multi-edge graph is adverse to that use case. ELK's interactive second pass changes the initial-layout strategy and may amplify reflow; this particular configuration does **not** prove every ELK layout has poor mental-map stability. fCoSE's low/zero displacement is observed for one random synthetic generator and an incremental proof-quality configuration; some dense 100/300 experiments reported geometry overlap and require separate product styling/packing work. These are layout-computation times **not** 4×-CPU browser mounting/interaction or production HomeSight performance measurements. No full 500/1500 automatic layout or end-to-end keyboard/physical-touch acceptance was performed in this slice.

**Licenses checked from pinned package manifests:** `@dagrejs/dagre@1.1.8`, `cytoscape@3.34.4`, `cytoscape-fcose@2.2.0` and `@xyflow/react@12.12.1` are MIT; `elkjs@0.12.1` is **EPL-2.0 OR GPL-3.0-or-later**. A decision to distribute ELK must pass the repository's normal third-party licensing checks. No library has been added to the workbench's runtime dependencies or HomeSight.

**Interpretation:** The highest-confidence result for HomeSight's dynamic, pinned topology is the **native pin constraints in Cytoscape fCoSE**, not an automatic commitment to Cytoscape as the *renderer*. React Flow (MIT) can be evaluated as a view layer separately, but combining two runtimes or replacing the active HomeSight Map needs a demonstrated end-user benefit and SDLC approval.

## Rich topology: actual Chrome 400% zoom and event-to-inspector timing (2026-11-10)

**Source:** `bench-richscale-zoom.cjs`; **raw report:** `reports/richscale-zoom.json`; [Reach Run](https://reach.hypershell.eu/runs/run-20261110T085644391927Z-4ada619b5498) passed. This executes the existing rich React Flow fixture at **100 nodes / 300 directed relationships** and **500 / 1,500**, with real isolated Chrome `chrome.tabs.setZoom(4)`, observed `innerWidth=320`, `devicePixelRatio=4`, fourfold CDP CPU slowdown and Chromium touch emulation. An event-capture listener records the timestamp of the DOM `click`; a MutationObserver records when the inspector output actually changes. Thus, **Playwright command setup/dispatch is excluded** from the measured event-to-inspector durations.

Both graph sizes passed: **zero horizontal document overflow**, graph and inspector 320px wide, Home/OCI/Internet zones present, node selection and pinning via synthetic `tap`, and **no uncaught page errors**.

| Browser outcome, five recorded selections per size | 100/300 rich | 500/1500 dense |
| --- | ---: | ---: |
| Median event-to-inspector update | **38.7 ms** | **157.3 ms** |
| Slowest observed selection | 53.3 ms | **212.8 ms** |
| Genuine Chrome tab zoom, CSS viewport | 4.0× / 320px | 4.0× / 320px |
| Horizontal page overflow | 0px | 0px |

**Interpretation:** At 100 nodes the isolated selection path appears comfortably below the existing 200ms UX target; at 500 nodes **one of five sampled events exceeds 200ms**, so do not declare whole-product acceptance. The previous richscale Playwright-timed 238ms/382ms figures were end-to-end automation measurements and **cannot** be directly compared with event-to-DOM timing. We still lack real HomeSight business data, canonical Map inspector integration, exact-product browser/CSP/a11y acceptance and a physical touchscreen. The original 100/500 richscale layout still uses **preset position replacement**, not the fCoSE/Dagre/ELK solver from the separate automatic layout benchmark.

The initial isolated Zoom test script rejected a floating-point return value `3.9999999999999996` when testing strict equality with `4`; the only test correction was a small numerical tolerance `abs(zoom - 4) < 0.0001`, after which the complete test passed. No app component change was made.

To rerun in the isolated research environment after build:

```sh
docker run --rm --network none -v "$RESEARCH:/work" -v "$BRAND:/src:ro" -w /work \
  --entrypoint /usr/local/bin/node mcr.microsoft.com/playwright/mcp:v0.0.83 bench-richscale-zoom.cjs
```

## Interpretation

- `bench-run.cjs full`: 3 repetitions per engine at 100/500/1500 nodes, no CPU throttle; **stress runs beyond 1,000 nodes are prohibited in HomeSight's automatic product path** (TRB-H19) and are diagnostic only.
- `bench-run.cjs acceptance`: 1 warmup + 5 measured repetitions per engine at HomeSight 100/300 rich and 500/1500 dense boundaries, Chromium CDP CPU×4, 40ms latency, 20-Mbit/s throughput and cold browser context. Results are **comparative**, not release acceptance: local static assets are served uncompressed and the adapters omit most HomeSight graph behaviors. This does not prove the full product route under the published 900-KiB gzip budget.
- `bench-zoom.cjs`: actual Chrome per-tab zoom factor 4.0 using ephemeral isolated MV3 extension, 320 CSS pixel viewport / DPR4, emulated touch `tap` on a shared control and measured focusable DOM elements. This **does not** test tapping a node on graph canvas, physical touch hardware or full keyboard graph traversal.
- All operations are intentionally **minimal**, with preset positions, no fCoSE/Dagre/ELK layout execution, no true containment/combo, no pinned-position state, no multi-projection filters, no canonical inspector synchronization. **Do not choose a renderer solely from these results.** More detailed historical HomeSight functional evidence already exists for Cytoscape/G6/Sigma in `projects/homesight-canonical-inventory-model/homesight-docs/topology-renderer-bakeoff-evidence.md`.

**Pinned hashes:** `package-lock.json` SHA256 `f4740993247efc2913d2376ee720bcc62ee2038e6fa72aa629e059a0aee598bf`, `bench-run.cjs` `737068ab03811f0594c208554a28d878f80012cf4170a59ac2a2643d3536ab5b`, `bench-zoom.cjs` `c2654111c7c469486e4a625c5c043f35549f2959ed0565a44359d3f51f6c3894` (after the final screenshot-less, overflow-diagnostic changes).
