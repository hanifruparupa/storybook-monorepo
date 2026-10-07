# monorepo-storybook

[![CI](https://github.com/hanifruparupa/storybook-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/hanifruparupa/storybook-monorepo/actions/workflows/ci.yml)

A pnpm workspace monorepo with a **Next.js website** and a **React Native app** that live in the same repo. The web and mobile teams each own their own UI implementation, while sharing a **framework-agnostic foundation** (design tokens + headless component logic).

## Architecture (shared contract, per-platform implementations)

```
                         ┌────────────────────┐
                         │   @repo/tokens     │  colors, spacing, radii… (plain JS)
                         └─────────┬──────────┘
                                   │
                         ┌─────────▼──────────┐
                         │  @repo/primitives  │  ButtonProps contract +
                         │                    │  resolveButtonTheme() logic (headless)
                         └───┬────────────┬───┘
                             │            │
             ┌───────────────▼──┐      ┌──▼────────────────┐
             │  @ruparupa/ui-web    │      │  @ruparupa/ui-native  │
             │  React DOM (web) │      │  React Native     │
             └────────┬─────────┘      └─────────┬─────────┘
                      │                          │
                 apps/web                   apps/mobile
              (Next.js, DOM)          (bare RN, Metro)
```

- **Web team** writes DOM/React in `@ruparupa/ui-web` (the example uses inline styles; Tailwind/CSS Modules can be adopted freely). They do **not** use React Native.
- **Mobile team** writes React Native in `@ruparupa/ui-native`.
- Both import the **same** props contract and theme resolver from `@repo/primitives`, and the same values from `@repo/tokens`. That is the seam that keeps them visually and behaviorally consistent without forcing one platform's POV on the other.

> Because the seam is `tokens` + `primitives`, `apps/web` carries **no** `react-native`/`react-native-web` at all — see `apps/web/next.config.mjs`.

## Layout

```
packages/
├─ tokens/       # @repo/tokens      — framework-agnostic design tokens
├─ primitives/   # @repo/primitives  — headless props contract + theme logic
├─ ui-web/       # @ruparupa/ui-web      — React DOM components + web Storybook
└─ ui-native/    # @ruparupa/ui-native   — React Native components + RNW Storybook preview
apps/
├─ web/          # Next.js 16 (App Router) — consumes @ruparupa/ui-web
├─ mobile/       # React Native 0.87 (bare CLI) — consumes @ruparupa/ui-native
└─ storybook/    # aggregate Storybook portal (both story sets, one URL)
```

Workspace packages ship **TypeScript source directly** (`exports` → `./src/index.ts`), so there is no build step — Next transpiles via `transpilePackages`, Metro compiles natively.

## Requirements

- Node.js **>= 20** (RN 0.87 templates target 22.11+)
- pnpm **10.x**
- iOS: Xcode + CocoaPods. Android: Android SDK/emulator.

## Setup

```bash
pnpm install
```

## Run the apps

```bash
pnpm web       # Next.js website   → http://localhost:3000
pnpm mobile    # React Native app  (press i / a for a simulator)
```

## Run Storybook

```bash
pnpm storybook:all      # aggregate portal (DOM + RN)   → http://localhost:6008
pnpm storybook:web      # Web Storybook (React DOM)     → http://localhost:6006
pnpm storybook:rn-web   # RN component preview on web   → http://localhost:6007
```

- `@ruparupa/ui-web` → `@storybook/react-vite` (real DOM).
- `@ruparupa/ui-native` → `@storybook/react-native-web-vite` (RN rendered via react-native-web).
- `apps/storybook` → aggregate portal; reads both packages' stories into one URL.
- Storybook is **browser-only** — there is no on-device Storybook.
- The aggregate portal is deployed to GitHub Pages on every push to `main`: <https://hanifruparupa.github.io/storybook-monorepo/>

## Shared components

Both packages implement the same contracts from `@repo/primitives`:

| Component | Web (`@ruparupa/ui-web`) | Native (`@ruparupa/ui-native`) | Features |
|---|---|---|---|
| `Button` | DOM `<button>` | RN `Pressable` | variants `primary\|secondary\|ghost`, sizes `sm\|md\|lg`, disabled, fullWidth |
| `TextInput` | DOM `<input>` | RN `TextInput` | label, placeholder, left/right icon slots, focused/blur/disabled/error states |
| `Text` (atom) | `<span>` | RN `Text` | variants `title\|body\|caption\|price\|priceOriginal\|label`, truncation |
| `Image` (atom) | `<img>` | RN `Image` | aspect-ratio, radius, cover |
| `Card` (atom) | `<div>` | RN `View` | variants `plain\|outlined\|elevated` |
| `Badge` (atom) | `<span>` | RN `View`+`Text` | variants `neutral\|discount\|info\|chip` |
| `Rating` (atom) | row | row | star value + review count |
| `Price` (atom) | row | row | original (strikethrough) + discount `%` + current, `formatCurrency` (Rp, `.` thousands, "ribu/juta") |
| `ProductCard` (molecule) | DOM | RN | image + corner chip + 2-line title + price + promo strip + rating |

Each component ships stories under `Web/*` and `Native/*`, aggregated by `apps/storybook`.

## Adding a component

1. Define its props contract + any shared logic in `@repo/primitives` (e.g. `TextInputProps`, `resolveTextInputTheme`).
2. Implement it for web in `@ruparupa/ui-web/src/<Name>/<Name>.tsx` with a sibling `<Name>.stories.tsx`.
3. Implement it for native in `@ruparupa/ui-native/src/<Name>/<Name>.tsx` with a sibling `<Name>.stories.tsx`.
4. Export from each package's `src/index.ts`.

If a component must be **byte-for-byte identical** across platforms and is simple enough, you can still implement it once with React Native primitives and render it on web through `react-native-web` — but that is opt-in, not the default.

## Useful commands

```bash
pnpm typecheck                                  # tsc --noEmit across all workspaces
pnpm build-storybook:all                        # static aggregate Storybook
pnpm --filter @ruparupa/ui-web build-storybook      # static web Storybook
pnpm --filter web build                         # Next production build
```

## Notes / gotchas

- **pnpm hoisted linker**: `.npmrc` sets `node-linker=hoisted` because React Native tooling expects a flat `node_modules`. Workspace packages still resolve via workspace symlinks.
- **Single React/RN version**: pinned in `pnpm-workspace.yaml` under `catalog:` and enforced with `pnpm.overrides` in the root `package.json`.
- If you add a workspace dependency that ships untranspiled source, add it to `apps/web/next.config.mjs` → `transpilePackages`.
