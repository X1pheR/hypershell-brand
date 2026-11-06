import type { Preview } from "@storybook/react-vite"
import "../src/index.css"
import "./storybook-docs.css"

const preview: Preview = {
  initialGlobals: { theme: "light" },
  globalTypes: {
    theme: {
      description: "Native shadcn neutral light/dark theme",
      toolbar: {
        dynamicTitle: true,
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      document.documentElement.classList.toggle("dark", context.globals.theme === "dark")
      return Story()
    },
  ],
  parameters: {
    layout: "centered",
    controls: { expanded: true },
    a11y: { test: "error" },
  },
}
export default preview
