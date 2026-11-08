// Isolated, read-only Gate N S25 reflow regression: actual Chromium tab zoom,
// not CSS zoom, DPR inflation, or a 320px-only viewport simulation.
// Loads the built static Storybook from loopback. No product data or network APIs.
import assert from "node:assert/strict"
import { createServer } from "node:http"
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises"
import { tmpdir } from "node:os"
import { dirname, extname, join, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
import { chromium, expect } from "@playwright/test"

const staticRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../storybook-static")
const mediaTypes = {
  ".html": "text/html", ".js": "application/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml",
  ".png": "image/png", ".woff2": "font/woff2",
}
const cases = [
  ["navigation", "patterns-native-application-shell-and-navigation--collapsed-navigation"],
  ["records", "patterns-native-record-list-and-review--search-sort-and-page"],
  ["help", "patterns-native-help-and-documentation-navigation--search-and-open"],
  ["long-logs", "patterns-native-technical-logs-and-diagnostics--long-scrollable-output"],
  ["markdown", "patterns-native-markdown-reading-and-editing--source-and-preview"],
  ["record-sheet", "patterns-record-inspection-alternatives--sheet-details"],
]

async function main() {
  const scratch = await mkdtemp(join(tmpdir(), "hypershell-s25-zoom-"))
  const server = createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, "http://127.0.0.1").pathname)
      if (!pathname.startsWith("/storybook/")) { res.writeHead(404).end(); return }
      const file = resolve(staticRoot, "." + pathname.slice("/storybook".length))
      if (!file.startsWith(staticRoot + sep)) { res.writeHead(403).end(); return }
      const bytes = await readFile(file)
      res.setHeader("content-type", mediaTypes[extname(file)] ?? "application/octet-stream")
      res.end(bytes)
    } catch { res.writeHead(404).end() }
  })
  let context
  try {
    const extension = join(scratch, "zoom-extension")
    await mkdir(extension)
    await writeFile(join(extension, "manifest.json"), JSON.stringify({
      manifest_version: 3, name: "Local 400% Zoom Verifier", version: "1.0",
      permissions: ["tabs"], background: { service_worker: "background.js" },
    }))
    await writeFile(join(extension, "background.js"),
      "chrome.runtime.onInstalled.addListener(() => {});")
    await new Promise(resolve => server.listen(0, "127.0.0.1", resolve))
    const origin = `http://127.0.0.1:${server.address().port}`
    const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    context = await chromium.launchPersistentContext(join(scratch, "profile"), {
      channel: executablePath ? undefined : "chromium",
      executablePath: executablePath || undefined,
      headless: true, hasTouch: true, viewport: { width: 1280, height: 900 },
      args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`],
    })
    await context.route("**/*", route =>
      route.request().url().startsWith(origin + "/") ? route.continue() : route.abort())
    const page = await context.newPage()
    const pageErrors = []
    page.on("pageerror", error => pageErrors.push(error.message))
    const storyUrl = id => `${origin}/storybook/iframe.html?id=${id}&viewMode=story`

    await page.goto(storyUrl(cases[0][1]))
    const worker = context.serviceWorkers()[0] ??
      await context.waitForEvent("serviceworker", { timeout: 15000 })
    const zoom = await worker.evaluate(async port => {
      const tab = (await chrome.tabs.query({})).find(t => t.url?.includes(port))
      if (!tab) throw new Error("Cannot identify local Storybook tab")
      await chrome.tabs.setZoom(tab.id, 4)
      return chrome.tabs.getZoom(tab.id)
    }, `127.0.0.1:${server.address().port}`)
    assert.ok(Math.abs(zoom - 4) < 0.001, `Chrome reported tab zoom ${zoom}, not 4`)

    const results = []
    for (const [name, id] of cases) {
      await page.goto(storyUrl(id))
      if (name === "navigation") {
        await expect(page.getByRole("status")).toContainText("mobile closed")
        const trigger = page.getByRole("button", { name: "Toggle navigation" })
        await expect(trigger).toBeFocused()
        await trigger.tap() // Real touch API with Chromium emulation, not physical hardware.
        const sidebar = page.getByRole("dialog", { name: "Sidebar" })
        await expect(sidebar).toBeVisible()
        // Touch-open is tested at real zoom; Escape dismissal is independently
        // covered by the 320/390px mobile Storybook and browser CI checks.
        // Modal makes background roles inert; inspect the existing live status by CSS.
        await expect(page.locator('[role="status"]')).toContainText("mobile open")
      } else if (name === "records") {
        await expect(page.getByRole("table")).toBeVisible()
        await expect(page.getByText(/8 matching example record/)).toBeVisible()
        const dimensions = await page.locator('[data-slot="table-container"]').evaluate(el => ({
          visible: el.clientWidth, content: el.scrollWidth,
        }))
        assert.ok(dimensions.content >= dimensions.visible, "Table lost scrollable structure")
      } else if (name === "help") {
        await expect(page.getByRole("heading", { name: "API operations" })).toBeVisible()
        await expect(page.getByRole("table")).toContainText("403")
      } else if (name === "long-logs") {
        // The pre is a keyboard-focusable scroll region, not a textbox.
        await expect(page.getByText("80 matching example line(s)")).toBeVisible()
        const log = page.locator('pre[aria-label="Scrollable fictional log text"]')
        await log.focus()
        await page.keyboard.press("End")
        await expect.poll(() => log.evaluate(el => el.scrollTop)).toBeGreaterThan(0)
      } else if (name === "markdown") {
        await expect(page.getByRole("heading", { name: "Fictional operations handbook" })).toBeVisible()
        await expect(page.getByRole("status")).toContainText("Example unchanged")
      } else if (name === "record-sheet") {
        const record = page.getByRole("button", { name: /Service lifecycle check/ })
        await record.tap()
        await expect(page.getByRole("dialog", { name: "Service lifecycle check" })).toBeVisible()
        await page.getByRole("button", { name: "Return to records" }).tap()
        await expect(page.getByRole("dialog", { name: "Service lifecycle check" })).toHaveCount(0)
      }
      const dimensions = await page.evaluate(() => ({
        viewport: innerWidth,
        pixelRatio: devicePixelRatio,
        pageOverflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        touchPoints: navigator.maxTouchPoints,
      }))
      assert.equal(dimensions.viewport, 320, `${name}: 400% Chrome zoom did not reflow to 320px`)
      assert.ok(Math.abs(dimensions.pixelRatio - 4) < 0.01,
        `${name}: unexpected device pixel ratio ${dimensions.pixelRatio}`)
      assert.ok(dimensions.pageOverflow <= 1,
        `${name}: ${dimensions.pageOverflow}px page-level horizontal overflow`)
      assert.ok(dimensions.touchPoints > 0, `${name}: touch emulation unavailable`)
      results.push({ case: name, ...dimensions })
    }
    assert.deepEqual(pageErrors, [], "Unhandled errors in zoomed native stories")
    console.log(JSON.stringify({ verdict: "PASS", browserTabZoom: zoom, cases: results,
      touch: "Chromium-emulated, not physical hardware", pageErrors }))
  } finally {
    if (context) await context.close()
    if (server.listening) await new Promise(resolve => server.close(resolve))
    await rm(scratch, { recursive: true, force: true })
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })
