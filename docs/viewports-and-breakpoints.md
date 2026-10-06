# Viewports & Breakpoints

> Preparation for the Oct 8 meeting: viewport standards and breakpoint logic across
> Website and Mobile Apps.

---

## 1. Principle

Separate **"how the viewport is measured"** (platform-specific) from
**"breakpoint → value" mapping** (shared, pure). This keeps web and mobile visually
consistent without forcing one platform's idioms on the other.

```
breakpoints (tokens) → resolveBreakpoint(width) → resolveResponsiveValue(...)
                              ▲
        measurement: web matchMedia/innerWidth | native useWindowDimensions
```

---

## 2. Breakpoint scale (shared — `@repo/tokens`)

| Breakpoint | Min width (px) | Typical device |
|---|---|---|
| `xs` | 0 | small phone |
| `sm` | 480 | large phone |
| `md` | 768 | tablet portrait |
| `lg` | 1024 | tablet landscape / small laptop |
| `xl` | 1280 | desktop |
| `xxl` | 1536 | large desktop |

`resolveBreakpoint(width)` returns the **largest** breakpoint whose min-width ≤ width.

---

## 3. Website behavior

- **Source of width**: `window.matchMedia` (listener per breakpoint) — not `innerWidth`
  on every render.
- **SSR/hydration**: default to a stable value (`md`) and update after mount to avoid
  hydration mismatch.
- **Provider**: a `BreakpointProvider` at the app root lets one listener serve all
  components.
- **Web-only extras** (not cross-platform):
  - **CSS media queries** — no JS, but moves size logic into CSS (diverges from native).
  - **Container queries** (`@container`) — component responds to its *container*;
    better for reusable components, but **no RN equivalent**.
  - **`clamp()`** — fluid scaling instead of discrete breakpoints.

---

## 4. Mobile behavior

- **Source of width**: `useWindowDimensions()` (DP); re-renders on rotation/fold.
- **"Responsive" on mobile** mostly means **device class** (phone/tablet) and
  orientation — not continuous resizing.
- **Provider**: same `BreakpointProvider` API for parity (can pin a class, e.g. tablet).
- **Touch targets**: never below 44px at `md`+; `xs`/`sm` only for non-primary controls.

---

## 5. Usage

```ts
// contract (@repo/primitives)
size?: ButtonSize | ResponsiveSize;      // "md"  OR  { xs: "sm", lg: "lg" }
resolveButtonSize(size, breakpoint);      // -> ButtonSize
```

```tsx
// component (web + native, identical)
const bp = useBreakpoint();
const resolvedSize = resolveButtonSize(size, bp);
```

Storybook demonstrates this with a `Responsive` story (`{ xs: "sm", md: "md", lg: "lg" }`).

---

## 6. Rules (locked)

- **MUST**: breakpoint values from `@repo/tokens`; mapping via `@repo/primitives`.
- **MUST NOT**: re-implement breakpoint logic per platform.
- **MUST**: measurement stays platform-specific; primitives never read the viewport.
- **MUST NOT**: shrink interactive controls below 44px on touch at `md`+.

---

## 7. Verification

- **Unit**: `resolveBreakpoint` / `resolveResponsiveValue` tested at boundaries
  (479/480, 767/768, …).
- **Visual**: Storybook `Responsive` story resized across breakpoints.
- **Web geometry**: headless Chrome + CDP can assert computed sizes per viewport.
