import { test, expect } from "@playwright/test"

// Intentional native UI reference: no injected Hypershell theme or altered component sources.
// Goldens must be reviewed before CI gating; update only after visual review.
const screens = [
  { id: "overview", route: "/", heading: "Good morning, Olivia" },
  { id: "members", route: "/members", heading: "Team members" },
  { id: "activity", route: "/activity", heading: "Activity timeline" },
  { id: "components", route: "/components", heading: "Native components" },
  { id: "settings", route: "/settings", heading: "Settings" },
] as const

for (const screen of screens) {
  for (const theme of ["light", "dark"] as const) {
    test(`${screen.id} — ${theme} reference`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        localStorage.setItem("native-workbench-theme", selectedTheme)
      }, theme)
      await page.goto(`/#${screen.route}`)
      await expect(page.getByRole("heading", { name: screen.heading, exact: true })).toBeVisible()
      if (theme === "dark") {
        await expect(page.locator("html")).toHaveClass(/dark/)
      } else {
        await expect(page.locator("html")).not.toHaveClass(/dark/)
      }
      await page.evaluate(async () => { await document.fonts.ready })
      await expect(page).toHaveScreenshot(`${screen.id}-${theme}.png`, {
        fullPage: true,
        animations: "disabled",
        caret: "hide",
        maxDiffPixelRatio: 0.005,
      })
    })
  }
}
