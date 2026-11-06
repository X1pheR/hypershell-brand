import { test, expect } from "@playwright/test"

test("navigation opens all five application screens", async ({ page }) => {
  await page.goto("/#/")
  await expect(page.getByRole("heading", { name: "Good morning, Olivia" })).toBeVisible()

  for (const [link, heading] of [
    ["Team members", "Team members"],
    ["Activity", "Activity timeline"],
    ["Components", "Native components"],
    ["Settings", "Settings"],
    ["Overview", "Good morning, Olivia"],
  ]) {
    const mobileToggle = page.getByRole("button", { name: "Open navigation" })
    if (await mobileToggle.isVisible()) await mobileToggle.click()
    await page.getByRole("navigation", { name: "Application pages" }).getByRole("link", { name: link }).last().click()
    await expect(page.getByRole("heading", { name: heading, exact: true })).toBeVisible()
  }
})

test("members can be filtered and restored", async ({ page }) => {
  await page.goto("/#/members")
  await expect(page.getByText("Showing 8 of 8 fictional users.")).toBeVisible()
  const search = page.getByRole("textbox", { name: "Search members" })
  await search.fill("Olivia")
  await expect(page.getByText("Showing 1 of 8 fictional users.")).toBeVisible()
  await search.clear()
  await expect(page.getByText("Showing 8 of 8 fictional users.")).toBeVisible()
})

test("native invitation dialog handles add and Escape", async ({ page }) => {
  await page.goto("/#/members")
  await page.getByRole("button", { name: "Invite member" }).click()
  await expect(page.getByRole("dialog")).toBeVisible()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toBeHidden()

  await page.getByRole("button", { name: "Invite member" }).click()
  await page.getByRole("textbox", { name: "Email address" }).fill("example.person@example.test")
  await page.getByRole("button", { name: "Add to demo" }).click()
  await expect(page.getByRole("dialog")).toBeHidden()
  await expect(page.getByRole("status").filter({ hasText: "Invitation prepared for example.person@example.test" })).toBeVisible()
  await expect(page.getByText("Showing 9 of 9 fictional users.")).toBeVisible()
})

test("light and dark mode persist across reloads", async ({ page }) => {
  await page.goto("/#/components")
  await expect(page.locator("html")).not.toHaveClass(/dark/)
  await page.getByRole("button", { name: "Use dark theme" }).click()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await page.reload()
  await expect(page.locator("html")).toHaveClass(/dark/)
  await expect(page.getByRole("heading", { name: "Native components" })).toBeVisible()
  await page.getByRole("button", { name: "Use light theme" }).click()
  await expect(page.locator("html")).not.toHaveClass(/dark/)
})

test("settings tabs and local form save work without backend", async ({ page }) => {
  await page.goto("/#/settings")
  await page.getByRole("tab", { name: "Notifications" }).click()
  await expect(page.getByText("Interactive local toggles, no delivery systems attached.")).toBeVisible()
  await page.getByRole("tab", { name: "Security" }).click()
  await expect(page.getByText("No real account, identity or credential operations.")).toBeVisible()
  await page.getByRole("tab", { name: "General" }).click()
  await page.getByRole("button", { name: "Save changes" }).click()
  await expect(page.getByRole("status").filter({ hasText: "Saved locally (demo only)" })).toBeVisible()
})
