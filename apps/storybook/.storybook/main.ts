import type { StorybookConfig } from "@storybook/react-native-web-vite";

/**
 * Aggregate Storybook portal.
 *
 * It owns NO components. It only reads stories from the two platform packages
 * and renders them side by side in one browser UI:
 *   - @repo/ui-web    -> plain DOM components (Web/…)
 *   - @repo/ui-native -> React Native components, rendered via react-native-web
 *
 * The `@storybook/react-native-web-vite` framework aliases `react-native` to
 * `react-native-web`, so the RN stories render in the browser here too. There
 * is no on-device Storybook; this is the single review surface.
 *
 * The packages stay separate; this is a view, not a merge.
 */
const config: StorybookConfig = {
  stories: [
    "../../../packages/ui-web/src/**/*.stories.@(js|jsx|ts|tsx)",
    "../../../packages/ui-native/src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/react-native-web-vite",
    options: {},
  },
  // Relative asset URLs so the static build works when hosted from a subpath
  // (e.g. GitHub Pages at https://<user>.github.io/<repo>/).
  async viteFinal(config) {
    return { ...config, base: "./" };
  },
};

export default config;
