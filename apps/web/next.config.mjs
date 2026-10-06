import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, "../..");

/**
 * This app is a pure DOM/React app now. It consumes the web team's own
 * `@repo/ui-web` (React DOM) — no react-native / react-native-web here.
 * The shared, cross-platform layer lives in `@repo/tokens` + `@repo/primitives`.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  // Workspace packages ship TypeScript source, so Next must transpile them.
  transpilePackages: ["@repo/ui-web", "@repo/primitives", "@repo/tokens"],
  outputFileTracingRoot: repoRoot,
};

export default nextConfig;
