# PoC — Product Card (presentational) & Modal (motion)

> Action item #3 of the Oct 6 MoM. Product Card is the primary standard example;
> Modal is the optional example for handling platform animation.

---

## Part A — Product Card (presentational)

### A.1 Goal
Refactor `ProductCard` into a **strictly presentational** molecule: it renders only
what it receives via props. All business logic (pricing rules, promo eligibility,
formatting) is removed from the component and lives in an adapter/selector.

### A.2 Data flow

```
product (domain) ──▶ toProductCardView(product) ──▶ ProductCardProps ──▶ ProductCard
        (adapter / selector in the app or @repo/<domain>)          (pure render)
```

- **Adapter** example (app-level, not in the molecule):
  ```ts
  function toProductCardView(p: Product): ProductCardProps {
    return {
      imageUrl: p.media[0]?.url ?? "",
      title: p.name,
      badgeLabel: p.variantCount > 1 ? `${p.variantCount} Tipe` : undefined,
      price: p.finalPrice,
      originalPrice: p.listPrice,
      promoText: p.promos[0]?.label,
      rating: p.rating?.average,
      reviewCount: p.rating?.count,
      cashback: p.cashback ? { amount: p.cashback.amount, freeShipping: p.cashback.freeShipping } : undefined,
    };
  }
  ```

### A.3 Component contract (unchanged shape)
`ProductCardProps` in `@repo/primitives`: `imageUrl, imageAlt?, title, badgeLabel?,
price, originalPrice?, discountPercent?, promoText?, cashback?, rating?, reviewCount?,
testID?`. The component computes **nothing** beyond visual state.

### A.4 Atomic composition
`ProductCard` (molecule) → `Text`, `Image`, `Card`, `Badge`, `Rating`, `Price` (atoms);
`Price` → `Badge`.

### A.5 Acceptance criteria
- [ ] No fetching, no pricing/promo rules, no string formatting decisions inside the molecule.
- [ ] Pure formatting helpers (`formatCurrency`, `resolveDiscountPercent`) live in `@repo/primitives` and are invoked by the adapter (or remain pure presentation utilities — no domain rules).
- [ ] Storybook title `Web/Molecules/ProductCard` / `Native/Molecules/ProductCard`, with `atomicLevel` + `dependsOn` metadata.
- [ ] Stories cover all states (default, no promo, no rating, no discount, cashback, cashback+shipping).
- [ ] Web + Native implement the same contract.

---

## Part B — Modal (motion / platform behavior)

### B.1 Goal
Define one `Modal` contract, implemented per platform, to demonstrate **platform
motion differences** (web CSS/transition vs. native Animated/Reanimated).

### B.2 Contract (`@repo/primitives`)
```ts
interface ModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  title?: string;
  children: ReactNode;
  /** "center" | "bottom-sheet" */
  placement?: "center" | "bottom-sheet";
  dismissOnBackdropPress?: boolean;
  testID?: string;
}
```

### B.3 Platform behavior

| Concern | Web (`@ruparupa/ui-web`) | Native (`@ruparupa/ui-native`) |
|---|---|---|
| Container | fixed overlay `<div>` + focus trap | RN `Modal` / absolute overlay |
| Enter/exit | CSS `transition`/`opacity` + `transform` | `Animated` / Reanimated timing |
| Backdrop press | `onClick` on backdrop | `Pressable` backdrop |
| Scroll lock | `overflow: hidden` on body | `Modal` handles it |
| A11y | `role="dialog"`, `aria-modal`, focus trap, `Esc` | `accessibilityViewIsModal`, `onRequestClose` (Android back) |

### B.4 Shared motion tokens
Add to `@repo/tokens`: `motion = { fast: 150, base: 250, slow: 400 }` (ms) and
`easing` descriptors; both platforms consume the same durations.

### B.5 Acceptance criteria
- [ ] Same `ModalProps` on both platforms.
- [ ] Durations/easing come from `@repo/tokens` (no magic numbers).
- [ ] Web: focus trap + `Esc` + backdrop click; Native: Android back + `accessibilityViewIsModal`.
- [ ] Stories: `Default`, `BottomSheet`, `NonDismissible` (both platforms).
- [ ] Reduced-motion respected where the platform supports it.

---

## Verification (both PoCs)

- `pnpm typecheck`; Storybook builds (web + native + aggregate); RN tests.
- Boundary lint: `ui-web` has no RN, `ui-native` has no DOM.
- Storybook metadata: `atomicLevel` + `dependsOn` present.
- Visual geometry check (headless Chrome + CDP) for layout regressions.
