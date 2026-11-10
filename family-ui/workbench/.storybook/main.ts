import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    // The public/private reference exposes component knowledge, never agent mutations or test execution.
    { name: "@storybook/addon-mcp", options: { toolsets: { docs: true, dev: false, test: false } } },
  ],
  features: { componentsManifest: true },
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: async (config) => ({ ...config, base: "./" }),
}

export default config
