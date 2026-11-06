import { mergeConfig, defineConfig } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import viteConfig from "./vite.config"

const here = dirname(fileURLToPath(import.meta.url))
const storybook = (mode: "light" | "dark") => ({
  extends: true,
  plugins: [storybookTest({ configDir: resolve(here, ".storybook"), initialGlobals: { theme: mode } })],
  test: {
    name: `storybook-${mode}`,
    browser: { enabled: true, provider: playwright({}), headless: true, instances: [{ browser: "chromium" }] },
    setupFiles: ["./.storybook/vitest.setup.ts"],
  },
})
export default mergeConfig(viteConfig, defineConfig({
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["src/**/*.test.ts"], environment: "node" } },
      storybook("light"),
      storybook("dark"),
    ],
  },
}))
