# Architecture

> **Status: locked.** The rules in this document are normative. Changes require a
> pull request that (a) states the reason, (b) walks the "Change control" section
> in `DESIGN.md`, and (c) is approved by both the web and mobile owners.
> Keywords **MUST**, **MUST NOT**, **SHOULD**, **MAY** are used deliberately.

---

## 1. Scope

This monorepo contains one **Next.js website** and one **React Native app**, plus
the packages they share. The architecture exists to answer one question:

> How do two platforms share a consistent product without one of them giving up
> its own tooling and idioms?

The answer is **shared tokens + shared contracts + per-platform implementations**.
Neither app imports the other platform's rendering code.

---

## 2. Core principle

- **Web and mobile MUST NOT share rendering code by default.** They share *values*
  (tokens) and *contracts/behaviour* (primitives), then implement UI separately.
- The single exception (opt-in, see §5.4): a genuinely identical, simple component
  MAY be written once with React Native primitives and rendered on web through
  `react-native-web`. This is a deliberate choice, never the default.

---

## 3. Repository layout

```
.
├─ apps/
│  ├─ web/                 # Next.js 16 (App Router) — DOM only
│  ├─ mobile/              # React Native 0.87 (bare CLI)
│  └─ storybook/           # aggregate Storybook portal (reads both story sets)
├─ packages/
│  ├─ tokens/              # @repo/tokens      design tokens (framework-agnostic)
│  ├─ primitives/          # @repo/primitives  headless props contract + logic
│  ├─ ui-web/              # @repo/ui-web      React DOM components + Web Storybook
│  └─ ui-native/           # @repo/ui-native   React Native components + RNW Storybook
├─ pnpm-workspace.yaml     # workspaces + catalog pins + onlyBuiltDependencies
├─ tsconfig.base.json
├─ .npmrc                  # node-linker=hoisted (RN requirement)
├─ DESIGN.md               # design-system rules
└─ ARCHITECTURE.md         # this file
```

---

## 4. Package responsibilities

| Package | Owns | Renders? | Must NOT contain |
| --- | --- | --- | --- |
| `@repo/tokens` | Raw design values (color, space, radii, type) | No | Logic, JSX, platform imports |
| `@repo/primitives` | Component prop contracts + pure behaviour/resolvers | No | JSX, `react-dom`, `react-native`, styling output |
| `@repo/ui-web` | DOM/React implementations of shared components | Yes (DOM) | `react-native`, `react-native-web`, RN primitives |
| `@repo/ui-native` | React Native implementations of shared components | Yes (RN) | `react-dom`, DOM APIs, `<div>`/`<button>` |
| `apps/web` | Website, routes, app-level UI composition | Yes (DOM) | `react-native`, `react-native-web`, any RN component |
| `apps/mobile` | Mobile app, native projects, `App.tsx` | Yes (RN) | `react-dom`, DOM APIs |

---

## 5. Dependency rules — **the locked part**

### 5.1 Allowed dependency edges

```
apps/web   ──▶ @repo/ui-web ──▶ @repo/primitives ──▶ @repo/tokens
apps/mobile ─▶ @repo/ui-native ─▶ @repo/primitives ──▶ @repo/tokens

apps/web   ──▶ @repo/tokens            (direct, e.g. CSS variables)
apps/mobile ─▶ @repo/tokens            (direct, e.g. app-level theming)
```

- **MUST**: dependencies point **downward only** (apps → ui → primitives → tokens).
- **MUST NOT**: any package import `apps/*`.
- **MUST NOT**: `apps/*` import another `apps/*`.
- **MUST NOT**: `@repo/tokens` or `@repo/primitives` import any `@repo/ui-*`.
- **MUST NOT**: `@repo/ui-web` import `@repo/ui-native`, or vice versa.

### 5.2 Platform isolation (hard boundaries)

- **MUST NOT**: `apps/web` or `@repo/ui-web` depend on `react-native` or
  `react-native-web` in any form (package.json, imports, config aliases).
- **MUST NOT**: `@repo/ui-native` import DOM globals (`window`, `document`) or
  `react-dom`, except within its Storybook config files.
- **MUST**: a component that genuinely needs different behaviour per platform
  gets **two implementations** (`ui-web` + `ui-native`), not platform `if` branches
  hidden inside one package.

### 5.3 Single source of values

- **MUST**: all colours, spacing, radii, font sizes/weights, and control heights
  come from `@repo/tokens`. No literal hex/px values in `ui-web`/`ui-native`
  components (see `DESIGN.md` §2).
- **MUST**: the props shape of a shared component is declared in
  `@repo/primitives` and imported by both implementations.

### 5.4 Universal-component exception (opt-in)

A component MAY live once in an RN-primitives package rendered via
`react-native-web` **only if** all of the following hold:
1. It must be visually and behaviourally identical on both platforms.
2. It is simple (no DOM-specific or RN-specific capability required).
3. The decision is recorded in the PR description and this file's §5.4 log.

Otherwise the default split in §5.1 applies.

---

## 6. How shared code is consumed

- Workspace packages ship **TypeScript source directly**:
  `"exports": { ".": { "types": "./src/index.ts", "default": "./src/index.ts" } }`.
  There is **no build step** for packages — **MUST NOT** add `dist/` build outputs
  to `tokens`, `primitives`, `ui-web`, or `ui-native`.
- `apps/web` **MUST** list every workspace package it consumes in
  `next.config.mjs` → `transpilePackages`.
- `apps/mobile` Metro **MUST** keep `watchFolders` at the monorepo root and
  `nodeModulesPaths` covering both `apps/mobile/node_modules` and the root
  `node_modules` (see `apps/mobile/metro.config.js`).
- The native condition (`"react-native": "./src/index.ts"`) **MUST** be present in
  `@repo/ui-native`'s `exports` so Metro picks the RN entry.

---

## 7. Storybook architecture

| Package | Storybook framework | Renders |
| --- | --- | --- |
| `@repo/ui-web` | `@storybook/react-vite` | Real DOM in the browser |
| `@repo/ui-native` | `@storybook/react-native-web-vite` | RN component via `react-native-web` |
| `apps/storybook` (aggregate) | `@storybook/react-native-web-vite` | Both story sets in one browser UI |

- **MUST**: Storybook is the **contract surface**. Every shared component exposes
  stories that exercise all variants/sizes/states.
- **MUST**: all `@storybook/*` packages stay on the same major version.
- Storybook is **browser-only**. RN components are previewed via `react-native-web`;
  there is intentionally **no on-device Storybook** (removed by decision D7).
  On-device behaviour is verified with the normal app build.

---

## 8. Tooling constraints

- **Package manager**: pnpm 10 with `node-linker=hoisted` (`.npmrc`). RN tooling
  requires a flat `node_modules`. **MUST NOT** switch to isolated linking without
  re-verifying native builds.
- **React / React Native**: pinned once in `pnpm-workspace.yaml` (`catalog:`) and
  enforced with `pnpm.overrides` in the root `package.json`. **MUST NOT** declare
  a different React/RN version in any workspace.
- **TypeScript**: pinned to one version via the catalog. **MUST NOT** mix TS
  versions across workspaces.
- **Node**: `>= 20` (RN 0.87 templates target 22.11+).

---

## 9. Adding things

### New shared component (both platforms)
1. Add the prop contract + any resolver to `@repo/primitives`.
2. Implement in `@repo/ui-web/src/<Name>/` **and** `@repo/ui-native/src/<Name>/`.
3. Add a story to each implementation; export from each `src/index.ts`.
4. If web needs it, add the package to `apps/web/next.config.mjs` (already covered
   for `ui-web`).

### New package
1. Create under `packages/`, name `@repo/<name>`, `private: true`.
2. Declare `exports`/`main`/`types` → `./src/index.ts` (source-only).
3. Extend the root `tsconfig.base.json`; add a `typecheck` script.
4. Place it correctly in the dependency graph (§5.1) and update this document.

---

## 10. Verification gates

A change is not done until these pass:

```
pnpm typecheck                                  # all workspaces
pnpm --filter @repo/ui-web build-storybook      # DOM Storybook builds
pnpm --filter @repo/ui-native build-storybook   # RNW Storybook builds
pnpm --filter web build                         # Next production build
pnpm --filter mobile test                       # RN unit tests
# native sanity (no simulator needed):
cd apps/mobile && npx react-native bundle \
  --platform ios --dev true --entry-file index.js --bundle-output /tmp/rn-app.jsbundle
```

---

## 11. Enforceable rules summary

| # | Rule |
| --- | --- |
| A1 | Dependencies point downward only; no `apps/*` imported by packages. |
| A2 | `apps/web`/`ui-web` never depend on `react-native`/`react-native-web`. |
| A3 | `ui-native` never imports DOM APIs or `react-dom`. |
| A4 | Shared values come from `@repo/tokens`; shared contracts from `@repo/primitives`. |
| A5 | Workspace packages ship TS source; no `dist/` build step. |
| A6 | One React/RN/TS version repo-wide (catalog + overrides). |
| A7 | Storybook versions aligned on one major. |
| A8 | Storybook is browser-only; no on-device Storybook. |
| A9 | New cross-platform components are implemented per-platform, not branched. |

> A1–A3 SHOULD be enforced with an ESLint `no-restricted-imports` zone config
> (e.g. `eslint-plugin-boundaries`) once implemented; until then they are
> reviewed manually.

---

## 12. Decision log

| ID | Decision | Rationale |
| --- | --- | --- |
| D1 | Bare React Native CLI (not Expo) | User chose full native control; Metro wired manually for the monorepo. |
| D2 | `node-linker=hoisted` | RN tooling + Metro expect a flat `node_modules`. |
| D3 | Shared UI via tokens + primitives, not a universal RN package | Lets the web team own DOM tooling without forking the API. |
| D4 | `ui-native` keeps an RNW Storybook | Preserves a fast browser preview of RN components. |
| D5 | Storybook as the contract | One place to review behaviour/API across both platforms. |
| D6 | `apps/storybook` is an aggregate portal, **not** a package merge | One review URL without breaking platform isolation (§5.2); `ui-web`/`ui-native` remain separate packages. |
| D7 | Removed the on-device (React Native) Storybook | Browser preview (`react-native-web`) + aggregate portal cover review needs; drops heavy on-device deps and keeps the RN app lean. |
