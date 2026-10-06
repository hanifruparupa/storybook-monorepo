import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Storybook Test (Vitest addon): turns every story into a Vitest test and runs
 * it in a real browser (Playwright Chromium). Run with `pnpm test-storybook`.
 */
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            // Location of the Storybook config (main.ts).
            configDir: path.join(dirname, ".storybook"),
            // Must match the package.json script that runs Storybook.
            storybookScript: "pnpm storybook",
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
