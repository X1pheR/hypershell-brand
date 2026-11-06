import { defineConfig } from "@playwright/test"
import appConfig from "./playwright.config"

// Run separately until human-reviewed golden PNGs are committed.
// Same browsers and local Vite server as Application Showcase E2E.
export default defineConfig({
  ...appConfig,
  testDir: "./tests/visual",
  use: { ...appConfig.use, reducedMotion: "reduce", locale: "en-US", timezoneId: "Europe/Amsterdam" },
  snapshotPathTemplate: "{testDir}/__screenshots__/{projectName}/{arg}{ext}",
})
