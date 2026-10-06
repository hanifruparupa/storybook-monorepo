import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";
import { deviceFrameDecorator, deviceViewports } from "./deviceFrame";

const preview: Preview = {
  decorators: [deviceFrameDecorator],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    // Fail Storybook tests on accessibility violations (run via the Vitest addon).
    a11y: { test: "error" },
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...deviceViewports },
    },
  },
  tags: ["autodocs"],
};

export default preview;
