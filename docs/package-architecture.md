# Package Architecture — Combine vs. Separate (Web & Mobile)

> Action item #1 of the Oct 6 MoM. Research the pros/cons of combining vs.
> separating packages, and — if separated — the **constant data** and **verifiers**
> that act as guardrails.

---

## 1. Context

The monorepo currently **separates** the shared layer from the platform layers:

```
@repo/tokens      (values)      ── framework-agnostic
@repo/primitives  (contracts)   ── headless
@repo/ui-web      (DOM)         ── React DOM
@repo/ui-native   (RN)          ── React Native
apps/web, apps/mobile           ── consumers
```

The open question: should Web and Mobile UI live in **one package** or **separate**
packages?

---

## 2. Options

### Option A — Single shared package (universal)
One package (e.g. `@repo/ui`) where components are written once with React Native
primitives and rendered on web via `react-native-web`.

### Option B — Separate packages (current)
`@repo/ui-web` (DOM) and `@repo/ui-native` (RN) share only `tokens` + `primitives`.

### Option C — Hybrid
Atoms that must be byte-for-byte identical live in one universal package; the rest are
per-platform.

---

## 3. Pros / Cons

| Dimension | A. Single (universal) | B. Separate (current) |
|---|---|---|
| Single source of truth | ✅ Strong | ⚠️ Only values + contract shared |
| Visual parity | ✅ Guaranteed | ✅ By shared tokens/resolvers (verifier needed) |
| Web tooling freedom (Tailwind, semantic HTML, SEO) | ❌ Constrained by RNW | ✅ Full |
| A11y / SSR / SEO on web | ⚠️ Manual mapping | ✅ Native DOM semantics |
| Native fidelity (gestures, native a11y) | ⚠️ Shared subset | ✅ Full RN |
| Team autonomy | ❌ One platform's POV wins | ✅ Each team owns its stack |
| Bundle/deps isolation | ❌ Web carries RN runtime | ✅ Web has no RN |
| Maintenance cost | ✅ One implementation | ⚠️ Two implementations + parity guardrails |
| Onboarding / DX | ⚠️ RN idioms on web | ✅ Idiomatic per platform |

**Finding:** Option A optimizes for *fewer implementations*; Option B optimizes for
*correctness, autonomy, and platform-native quality*. For a product where web and
mobile have dedicated teams, **B** is the better default, **with guardrails** to keep
parity and prevent drift.

---

## 4. Recommendation

- **Adopt Option B (keep separate)** — already implemented and verified.
- **Allow Option C only for simple, must-be-identical atoms**, decided case-by-case and
  recorded (see `ARCHITECTURE.md` §5.4).
- The **shared seam is mandatory**: `@repo/tokens` (values) + `@repo/primitives`
  (contracts + pure logic).

---

## 5. Guardrails (required when separated)

### 5.1 Constant data — one source of truth
- **Values**: all colors/spacing/radii/typography/breakpoints in `@repo/tokens`.
- **Contracts**: every component's props in `@repo/primitives`.
- **Enums/vocab**: `variant`, `size`, states declared once (no per-platform enums).
- **Rule**: no hardcoded literals in `ui-web`/`ui-native` (see `DESIGN.md` §2).

### 5.2 Verifiers — automated parity checks
| Verifier | What it checks | Where |
|---|---|---|
| **Typecheck** | both impls satisfy the same contract | `pnpm typecheck` (CI) |
| **Resolver parity test** | `resolve*Theme()` output identical given same inputs | `@repo/primitives` unit tests |
| **Boundary lint** | no RN in web, no DOM in native, downward deps only | `eslint-plugin-boundaries` (CI) |
| **Story coverage** | every shared component has Web + Native stories | Storybook index check (CI) |
| **Token lint** | no raw hex/px in components | custom ESLint rule (CI) |
| **Visual spot-check** | render geometry (e.g. computed `line-height`) | headless Chrome + CDP (as used for the line-height bug) |
| **Atomic metadata** | every story declares `atomicLevel` + `dependsOn` | Storybook metadata check (CI) |

### 5.3 Enforcement
- All verifiers run in CI (`.github/workflows/ci.yml`).
- A broken verifier **blocks merge**.

---

## 6. Impact & migration

- No migration needed — the repo is already Option B.
- Follow-ups: implement the missing verifiers (boundary lint, token lint, story
  coverage, atomic metadata) and add them to CI.
- Re-evaluate Option C per atom, only with an explicit record in `ARCHITECTURE.md`.
