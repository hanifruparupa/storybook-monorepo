# Publishing `@ruparupa/ui-web` & `@ruparupa/ui-native`

> How the two UI packages are built and published to npm. `@repo/tokens` and
> `@repo/primitives` stay **internal** and are bundled into each package.

---

## 1. Model

| | Published? | Notes |
|---|---|---|
| `@ruparupa/ui-web` | ✅ npm (public) | React DOM components |
| `@ruparupa/ui-native` | ✅ npm (public) | React Native components |
| `@repo/tokens` | ❌ internal | inlined into `dist` at build (`noExternal`) |
| `@repo/primitives` | ❌ internal | inlined into `dist` at build (`noExternal`) |

Each UI package **bundles** the internal packages, so consumers only install the UI
package + its peers (`react`/`react-dom`, or `react`/`react-native`).

---

## 2. Dev vs publish

- **Local dev**: `exports` points at **TypeScript source** (`./src/index.ts`), so Next,
  Metro and Storybook consume source with no build step (Next uses `transpilePackages`).
- **Publish**: `publishConfig` rewrites `main`/`module`/`types`/`exports` to **`dist`**
  at pack time, and `files: ["dist"]` limits the tarball. `prepublishOnly` runs the build.

```
src/ (TS, used in dev)  ──tsup──▶  dist/ (ESM + CJS + d.ts, published)
```

---

## 3. Build (tsup)

`packages/ui-*/tsup.config.ts`:

```ts
export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: { resolve: ["@repo/primitives", "@repo/tokens"] }, // inline internal types
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ["react", "react-dom", "react-native"],       // peers are never bundled
  noExternal: ["@repo/tokens", "@repo/primitives"],       // internal packages are inlined
});
```

- Internal deps live in `devDependencies` (build-time only) so they are **not** published.
- `tsconfig.base.json` sets `"ignoreDeprecations": "6.0"` (tsup's dts uses `baseUrl`).

Verify the tarball without publishing:

```bash
pnpm --filter @ruparupa/ui-web build
cd packages/ui-web && pnpm pack --pack-destination /tmp/pk
tar -xzf /tmp/pk/*.tgz -C /tmp/pk/x && cat /tmp/pk/x/package/package.json
# expect: main/module/types → ./dist/*, no @repo/* dependencies, files = dist
```

---

## 4. Versioning & release (changesets)

```bash
pnpm changeset          # describe the change (choose packages + bump)
# commit & push → the Release workflow opens/updates a "Version Packages" PR
# merge that PR → `changeset publish` runs (prepublishOnly builds, then npm publish)
```

Config: `.changeset/config.json` (access public; internal packages ignored).

---

## 5. CI credentials (required once)

Publishing needs npm auth for the `@ruparupa` scope:

1. Own the **`@ruparupa`** scope on npm.
2. Create an npm **Automation/Granular token** with publish access.
3. Add it as the repo secret **`NPM_TOKEN`** (Settings → Secrets → Actions).
4. Re-enable the `push` trigger in `.github/workflows/release.yml` (currently manual-only),
   or run the workflow via **workflow_dispatch**.

Alternative: configure **npm Trusted Publishing** (OIDC) for these packages — the
workflow already has `id-token: write`, so no token is needed once trusted publishing is set.

Local publish (if you are `npm login`-ed):

```bash
pnpm --filter @ruparupa/ui-web publish
pnpm --filter @ruparupa/ui-native publish
```

---

## 6. Checklist for a release

- [ ] `pnpm typecheck` green; Storybook tests green (CI enforces).
- [ ] `pnpm changeset` written and merged.
- [ ] `NPM_TOKEN` (or trusted publishing) configured.
- [ ] Version Packages PR merged → publish succeeds.
