import type { Preview } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "storybook/viewport";

const deviceViewports = {
  iphone15: {
    name: "iPhone 15",
    type: "mobile",
    styles: { width: "393px", height: "852px" },
  },
  laptop: {
    name: "Laptop",
    type: "desktop",
    styles: { width: "1280px", height: "800px" },
  },
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    viewport: {
      options: { ...MINIMAL_VIEWPORTS, ...deviceViewports },
      defaultViewport: "iphone15",
    },
  },
  tags: ["autodocs"],
};

export default preview;
