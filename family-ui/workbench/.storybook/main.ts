import type { StorybookConfig } from "@storybook/react-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)", "../src/**/*.mdx"],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y", "@storybook/addon-vitest", "@storybook/addon-mcp"],
  features: { componentsManifest: true },
  framework: { name: "@storybook/react-vite", options: {} },
  viteFinal: async (config) => ({ ...config, base: "./" }),
}

export default config
