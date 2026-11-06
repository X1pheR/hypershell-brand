# Native UI visual regression — review protocol

This is a native shadcn/Base UI **reference** only, not a Hypershell-branded theme. Do not modify `src/components/ui/*.tsx` or the official token palette to make screenshot tests pass.

The standalone Playwright suite captures **20 reference views**: 5 complete application screens × 2 themes × desktop/Pixel 7 mobile. Browser parameters, locale, timezone and reduced-motion mode are fixed in `playwright.visual.config.ts`.

## Initial baseline (manual acceptance)

1. Use the pinned Node 24 / pnpm 10.20 lockfile and Playwright Chromium revision from `@playwright/test` in a consistent Linux x86 test image. Do **not** mix host fonts or browser revisions between golden capture and CI.
2. Run `pnpm run test:visual --update-snapshots`. The goldens appear under `tests/visual/__screenshots__/<project>/`.
3. Review all 20 screenshots interactively in light and dark mode and compare them with the authenticated reference. Reject clipping, missing data, unstyled controls, misaligned responsive layouts or unreadable contrast.
4. Only after review: commit the *approved* PNG references (not Playwright traces) on the canonical feature branch; add the visual suite to required CI in a separately validated change. Snapshot changes require an explicit visual review, not an automatic build side effect.
5. For future diffs, inspect Playwright's actual/expected/diff artifacts. Never auto-approve changes, increase pixel tolerances to hide a defect, or rely solely on a hash.

**Current gate:** The test definitions and 20-case discovery are validated, but golden files are **not accepted** until they are generated and reviewed in a matching runtime. The existing green build, Storybook and functional E2E CI stays independent.

**Native accessibility debt:** the 12 documented upstream contrast TODOs in `ACCESSIBILITY_BASELINE.md` remain separately tracked; screenshot comparison does not demonstrate WCAG compliance.
