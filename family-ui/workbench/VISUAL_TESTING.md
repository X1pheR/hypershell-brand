# Native UI visual regression — review protocol

This is a native shadcn/Base UI **reference** only, not a Hypershell-branded theme. Do not modify `src/components/ui/*.tsx` or the official token palette to make screenshot tests pass.

The standalone Playwright suite captures **20 reference views**: 5 complete application screens × 2 themes × desktop/Pixel 7 mobile. Browser parameters, locale, timezone and reduced-motion mode are fixed in `playwright.visual.config.ts`.

## Initial baseline (manual acceptance)

1. Use the pinned Node 24 / pnpm 10.20 lockfile and Playwright Chromium revision from `@playwright/test` in a consistent Linux x86 test image. Do **not** mix host fonts or browser revisions between golden capture and CI.
2. Run `pnpm run test:visual --update-snapshots`. The goldens appear under `tests/visual/__screenshots__/<project>/`.
3. Review all 20 screenshots interactively in light and dark mode and compare them with the authenticated reference. Reject clipping, missing data, unstyled controls, misaligned responsive layouts or unreadable contrast.
4. Only after review: commit the *approved* PNG references (not Playwright traces) on the canonical feature branch; add the visual suite to required CI in a separately validated change. Snapshot changes require an explicit visual review, not an automatic build side effect.
5. For future diffs, inspect Playwright's actual/expected/diff artifacts. Never auto-approve changes, increase pixel tolerances to hide a defect, or rely solely on a hash.

**Review checkpoint (2026-11-07):** All 20 original Home x86 PNGs (5 screens × 2 themes × desktop/mobile) were examined in an authenticated private browser contact-sheet review, including table geometry and theme fidelity. Mobile Members and Activity tables intentionally use contained `overflow-x-auto` and were independently verified to scroll to the final columns with no document-level overflow. The captured source at `5b13f31` differs from approved source `cd0d527` only in MCP-only files and CI wiring, not rendered app/styles; the existing 20/20 no-update capture comparison passed. Golden files were committed as `fd66025` using the existing Home SSH identity. The visual CI comparison uses a separate Debian Bookworm Node 24 image pinned by digest, the project's locked Playwright Chromium and all 20 reviewed PNGs. **CI acceptance remains conditional on the new GitHub visual job passing on that exact checked-in revision**; CI must never auto-update golden files. Functional E2E and Storybook/a11y gates remain separate.

**Native accessibility debt:** the 12 documented upstream contrast TODOs in `ACCESSIBILITY_BASELINE.md` remain separately tracked; screenshot comparison does not demonstrate WCAG compliance.
