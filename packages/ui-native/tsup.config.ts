import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { resolve: ["@repo/primitives", "@repo/tokens"] },
  clean: true,
  sourcemap: true,
  treeshake: true,
  // Peer dependencies must never be bundled.
  external: ["react", "react-dom", "react-native", "react-native-fast-image"],
  // Internal workspace packages are NOT published — inline them into dist.
  noExternal: ["@repo/tokens", "@repo/primitives"],
});
