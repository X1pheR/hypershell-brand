# Accessibility baseline — native shadcn/Base UI reference

**Established:** 2026-11-06 · **Review by:** 2026-12-06 · **Status:** temporary exceptions only.

The workbench intentionally reproduces the official native **base-nova** shadcn UI styling. It is a fidelity reference, **not** a declaration that every native variant is WCAG AA compliant and **not** an accepted production token palette. None of the original `src/components/ui/*.tsx` files, Tailwind design tokens or shared packages may be silently patched to make CI green.

Storybook's default remains `a11y.test = "error"`. The 12 **specific existing stories** listed in `scripts/a11y-baseline.json` have a native-source text-contrast failure proven in GitHub's axe-core CI check. Their individual stories are marked `a11y.test = "todo"` according to the [official Storybook accessibility workflow](https://storybook.js.org/docs/writing-tests/accessibility-testing). **Important limitation:** this shows a warning when tests run in Storybook UI, but does not emit a failing result **or warning in CI** for those individual stories. It may also mask a newly introduced defect within that story until explicitly reviewed. The exception is therefore guarded by `scripts/check_a11y_baseline.py`: exact story allowlist, 4.5:1 violation evidence, global strictness, no `off`, and a mandatory review date. The checker prints every exception on every CI run.

### Source evidence

- [shadcn/ui issue #12518](https://github.com/shadcn-ui/ui/issues/12518) and [proposed upstream PR #12544](https://github.com/shadcn-ui/ui/pull/12544) explicitly reproduce the destructive Nova button: ~4.0:1 on a pale tinted background in light mode, below WCAG AA ordinary text minimum of 4.5:1. The issue/PR were open when this baseline was established.
- Other native variants measured via Storybook axe CI: muted foreground `#737373` on muted `#f5f5f5` ~4.34:1 (e.g., Avatar/Kbd), alert destructive text ~4.49:1, Trace faded pending ~2.29:1. These are reproducible native reference measurements, **not** claims that every category has a corresponding accepted upstream bug report.
- Evidence: [PR #1](https://github.com/X1pheR/hypershell-brand/pull/1), GitHub Actions jobs 128140663405 and 128176839861. Review affected IDs, exact ratios and rationale in the JSON manifest.
- All new stories and unaffected variants remain in the strict `error` path. Calendar, Resizable and other noncontrast failures must be resolved or classified separately, **never added to this contrast baseline without evidence and review**.

### Retirement

At or before 2026-12-06, first inspect the current *official* shadcn registry and upstream issue/PR status. Refreshing from a verified official registry release is acceptable when preserving source provenance; **hand-edited vendor patches are not**. Run strict Storybook tests without each `todo`, verify both light and dark and all states, and remove each exception once passing. Do not extend `review_by` without a recorded re-audit. If downstream Hypershell UI tokens intentionally diverge, validate that separately after the native reference is accepted.

## Individually reviewed exceptions — 2026-11-08

**Observed upstream:** [issue #12518](https://github.com/shadcn-ui/ui/issues/12518) remains open; [PR #12544](https://github.com/shadcn-ui/ui/pull/12544) remains open/unmerged. That PR proposes the *destructive Button style*, not a verified remedy for every Badge, Alert, Toast, Avatar, Kbd or Trace appearance. No upstream release or current native fix is established for any of these twelve stories. The recorded ratios below are the existing pinned-source CI findings, **not new measurements on a different release**. None of the twelve is approved as production-conformant or permanently waived.

| # | Exact Storybook exception | Observed ratio / min | Review disposition and specific exit evidence |
| --- | --- | --- | --- |
| 01 | `Buttons.stories.tsx / AllVariants` | 4.00 / 4.50 | **OPEN**: Button destructive awaits #12518/#12544; the Badge shown in the same story needs independent verification after any upstream refresh. |
| 02 | `Data.stories.tsx / Examples` | 4.00 / 4.50 | **OPEN**: destructive Badge/Alert text; Button-only PR does not establish a fix; retest these native variants separately. |
| 03 | `catalog/alert-dialog.stories.tsx / Default` | 4.00 / 4.50 | **OPEN**: destructive dialog action; verify the actual pinned AlertDialog composition after an official Button fix, including hover/dark mode. |
| 04 | `catalog/alert.stories.tsx / Variations` | 4.49 / 4.50 | **OPEN**: Alert destructive icon/text; assess native foreground/background tokens separately, not implicitly solved by #12544. |
| 05 | `catalog/avatar.stories.tsx / Default` | 4.34 / 4.50 | **OPEN**: muted fallback text; requires an upstream-native contrast improvement and separate axe retest. |
| 06 | `catalog/avatar.stories.tsx / Variants` | 4.34 / 4.50 | **OPEN**: same native Avatar family but distinct variant story; retest and remove this exact exception independently. |
| 07 | `catalog/badge.stories.tsx / Variants` | 4.00 / 4.50 | **OPEN**: destructive tinted Badge; #12544's Button change is insufficient evidence; retest Badge styling. |
| 08 | `catalog/button.stories.tsx / Variants` | 4.00 / 4.50 | **OPEN**: destructive Button native style; follow #12518/#12544 to a published suitable registry release, then retest light/dark rest/hover. |
| 09 | `catalog/kbd.stories.tsx / Default` | 4.34 / 4.50 | **OPEN**: muted keyboard text on muted background; distinct native Kbd issue, not covered by Button PR. |
| 10 | `catalog/toast.stories.tsx / Variants` | 4.00 / 4.50 | **OPEN**: destructive tinted Toast; evaluate Toast's own native style and all themes after official updates. |
| 11 | `catalog/trace.stories.tsx / Default` | 2.71 / 4.50 | **OPEN — higher-severity contrast deficiency**: faded Trace status. Explicit usability review and official-source correction needed before production admission. |
| 12 | `catalog/trace.stories.tsx / Variants` | 2.29 / 4.50 | **OPEN — higher-severity contrast deficiency**: pending Trace at opacity 60%. Must have independent effective foreground/background verification and retest. |

**Decision:** Retain the narrowly controlled temporary `todo` list **only in the neutral upstream fidelity research reference** while tracking every exception with the existing 2026-12-06 review deadline. Strict accessibility testing remains enabled for all non-baselined stories; a green PR does not prove AA compliance for these twelve. Do not silently apply brand tokens, vendor patches, permanent suppressions, or package/consumer promotion. For Gate N, explicitly distinguish native-reference completeness from unresolved upstream accessibility risk; operator acceptance must include a disposition of this risk.
