import { mergeConfig, defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import viteConfig from "./vite.config"

const here = dirname(fileURLToPath(import.meta.url))
const storybook = (mode: "light" | "dark", viewport?: { width: number; height: number }) => ({
  extends: true,
  plugins: [storybookTest({ configDir: resolve(here, ".storybook"), initialGlobals: { theme: mode } })],
  test: {
    name: viewport ? `storybook-mobile-${mode}-${viewport.width}` : `storybook-${mode}`,
    // Storybook documents reduced isolation/concurrency for large browser suites.
    // Keep every story tested, but avoid a cold Vite optimizer overwhelming CI.
    isolate: false,
    browser: {
      enabled: true,
      provider: playwright({}),
      headless: true,
      ...(viewport ? { viewport } : {}),
      instances: [{ browser: "chromium" }],
      fileParallelism: false,
      connectTimeout: 180_000,
    },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
})
export default mergeConfig(viteConfig, defineConfig({
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["src/**/*.test.ts"], environment: "node" } },
      storybook("light"),
      storybook("dark"),
      storybook("light", { width: 320, height: 844 }),
      storybook("dark", { width: 390, height: 844 }),
    ],
  },
}))
