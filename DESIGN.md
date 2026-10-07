# Design System Rules

> **Status: locked.** These rules define how the shared design system is built and
> consumed. They are normative (**MUST** / **MUST NOT** / **SHOULD** / **MAY**).
> Changing tokens or a shared component contract requires a PR that follows §11.

---

## 1. Principles

1. **Token-first.** Every visual value comes from `@repo/tokens`. No magic numbers.
2. **Contract-first.** Every shared component's API is declared in
   `@repo/primitives` before it is implemented.
3. **Parity by values, freedom by implementation.** Web and mobile must *look*
   consistent (shared tokens) and *behave* consistently (shared contract), while
   each uses its own renderer.
4. **Accessible by default.** A11y is a requirement, not a variant.
5. **Storybook is the source of truth for behaviour.** If it is not in a story,
   it is not part of the contract.

---

## 2. Token-first rule (hard)

- **MUST**: consume colours, spacing, radii, font sizes/weights, and control
  heights from `@repo/tokens` (`packages/tokens/src/index.ts`).
- **MUST NOT**: write raw hex colours, px spacing, radii, or font sizes inside
  `@ruparupa/ui-web` or `@ruparupa/ui-native` components.
- **SHOULD**: when a needed value is missing, add it to `@repo/tokens` — do not
  inline it. Tokens are additive and reviewed.

```ts
// ✅ correct
import { colors, space } from "@repo/tokens";
const style = { backgroundColor: colors.primary, paddingHorizontal: space.lg };

// ❌ forbidden
const style = { backgroundColor: "#1D64F2", paddingHorizontal: 16 };
```

---

## 3. Token reference

Defined in `packages/tokens/src/index.ts`:

| Group | Tokens | Used for |
| --- | --- | --- |
| `colors` | `primary`, `primaryPressed`, `onPrimary`, `surface`, `border`, `text`, `textMuted`, `disabledBg`, `disabledText`, `ghostPressed` | backgrounds, borders, text |
| `space` | `xs 4`, `sm 8`, `md 12`, `lg 16`, `xl 24` | padding, gaps, margins |
| `radii` | `sm 8`, `md 10`, `lg 14`, `pill 999` | corner rounding |
| `fontSize` | `sm 14`, `md 16`, `lg 18` | label/body sizes |
| `fontWeight` | `medium "500"`, `semibold "600"`, `bold "700"` | emphasis |
| `controlHeight` | `sm 36`, `md 44`, `lg 52` | interactive control heights |

- **MUST**: `controlHeight.md` (44px) is the minimum touch target for any
  interactive control; `sm` is allowed only for non-primary/inline controls.
- **MUST NOT**: create platform-specific token sets. There is exactly **one**
  token source for both platforms.

---

## 4. Component contract (primitives)

- **MUST**: every shared component declares its props interface in
  `@repo/primitives` (e.g. `ButtonProps`) and is imported by both implementations.
- **MUST**: state-dependent styling is expressed by a pure resolver in
  `@repo/primitives` (e.g. `resolveButtonTheme(variant, size, disabled, pressed)`)
  returning a platform-neutral descriptor. Implementations map that descriptor to
  their own style system.
- **MUST NOT**: put rendering, JSX, or platform imports in `@repo/primitives`.
- **MUST**: the contract exposes **semantic** props (`variant`, `size`,
  `disabled`), never raw style values from consumers.

---

## 5. Per-platform implementation rules

### 5.1 Web — `@ruparupa/ui-web`
- **MUST**: build on semantic DOM elements (`<button>`, `<input>`, `<label>`…).
- **MUST**: rely on native semantics for a11y instead of faking roles.
- **MAY**: style with CSS Modules / Tailwind / inline styles, **as long as** all
  values trace back to `@repo/tokens`.
- **MUST NOT**: import `react-native` / `react-native-web` / RN primitives.

### 5.2 Native — `@ruparupa/ui-native`
- **MUST**: build on React Native primitives (`View`, `Text`, `Pressable`,
  `TextInput`, `StyleSheet`).
- **MUST**: set `accessibilityRole`, `accessibilityLabel`, and
  `accessibilityState` where relevant.
- **MUST NOT**: touch DOM globals or `react-dom`.

### 5.3 Keeping them in sync
- **MUST**: both implementations consume the same resolver output, so visual state
  (default/pressed/disabled) matches. Divergence in *values* is a design bug;
  divergence in *medium* (DOM vs RN) is expected.

### 5.4 Responsive sizing
- **MUST**: breakpoint values come from `@repo/tokens` (`breakpoints`, `breakpointOrder`,
  `Breakpoint`).
- **MUST**: the breakpoint → value mapping uses the shared pure helpers in
  `@repo/primitives` (`resolveBreakpoint`, `resolveResponsiveValue`, `resolveResponsiveSize`,
  `Responsive<T>`). Do **not** re-implement the mapping per platform.
- Measuring the viewport **MUST** stay platform-specific: web uses `matchMedia` /
  `innerWidth`, native uses `useWindowDimensions()`. Primitives never read the viewport.
- **MUST NOT**: shrink interactive controls below 44px on touch at `md`+; `xs`/`sm` are
  for non-primary/inline controls.

---

## 6. Variants, sizes, and naming

- **MUST**: use the canonical vocabularies:
  - `variant`: `primary` | `secondary` | `ghost` (extend deliberately, in one PR).
  - `size`: `sm` | `md` | `lg`.
- **MUST**: component names are nouns, PascalCase, no platform suffix in the public
  export (both web and native export `Button`). Platform specifics live in the
  props type name only (`WebButtonProps`, `NativeButtonProps`).
- **MUST**: event props use `onPress` in the shared contract; each platform wires
  it to its native event (`onClick` on web).
- **MUST**: expose `testID` in the contract; web maps it to `data-testid`.

---

## 7. Accessibility requirements

- **MUST**: interactive controls are keyboard-operable and focus-visible on web.
- **MUST**: disabled controls are truly disabled (`disabled`/`aria-disabled`, and
  the press handler must not fire).
- **MUST**: every control has an accessible name (label text or `aria-label`).
- **SHOULD**: meet WCAG AA contrast for text/background combinations in tokens.
- **MUST**: stories are reviewed with the a11y addon; new violations block merge.

---

## 8. Storybook conventions

- **MUST**: every shared component ships stories covering **all** variants, sizes,
  and states (default, pressed where visible, disabled, full-width).
- **MUST**: story titles are grouped: `Web/Button` (DOM) and `Native/Button` (RN).
- **MUST**: controls are declared in `argTypes` for `variant`/`size` and any enum.
- **MUST**: use `fn()` from `storybook/test` for event handlers so actions show.
- **MUST NOT**: duplicate stories across packages; the aggregate portal
  (`apps/storybook`) reads each package's stories directly.
- **SHOULD**: use `autodocs` so the props contract renders as documentation.

---

## 9. Do / Don't

| ✅ Do | ❌ Don't |
| --- | --- |
| Import values from `@repo/tokens` | Hardcode `#hex` / px in components |
| Declare props in `@repo/primitives` | Define divergent props per platform |
| Implement once per platform | Branch `Platform.OS` inside one package |
| Use semantic DOM / RN primitives | Fake roles or import the other platform |
| Add a story for every state | Ship a component without stories |
| Add missing tokens to `@repo/tokens` | Inline a "temporary" value |

---

## 10. New component checklist

- [ ] Props interface added to `@repo/primitives` (+ resolver if stateful).
- [ ] Web implementation in `@ruparupa/ui-web/src/<Name>/<Name>.tsx`, DOM + a11y.
- [ ] Native implementation in `@ruparupa/ui-native/src/<Name>/<Name>.tsx`, RN + a11y.
- [ ] Stories for both, covering all variants/sizes/states, with controls.
- [ ] Exported from each package's `src/index.ts`.
- [ ] All values derived from `@repo/tokens`.
- [ ] Verification gates from `ARCHITECTURE.md` §10 pass.

> Reference implementations to copy: atoms (`Text`, `Image`, `Card`, `Badge`, `Rating`,
> `Price`), the `ProductCard` molecule, and `Button`/`TextInput` (contract + resolver in
> `@repo/primitives`; DOM in `@ruparupa/ui-web`; RN in `@ruparupa/ui-native`; stories in both).

---

## 11. Change control

- **Tokens**: additive changes are normal; changing/removing an existing token is a
  breaking change and **MUST** be noted in the PR with a migration note.
- **Contracts** (`@repo/primitives`): a breaking prop change **MUST** update both
  `ui-web` and `ui-native` and both story sets in the same PR.
- **Rules in this file / `ARCHITECTURE.md`**: changes require approval from both the
  web and mobile owners and an entry in the relevant decision log.
