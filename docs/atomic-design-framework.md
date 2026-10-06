# Atomic Design & Reusability Framework

> Action item #2 of the Oct 6 MoM. Defines atomic levels, the granularity
> boundary, reusability rules, and the Storybook standard for atomic level +
> relationship/impact mapping.

---

## 1. Atomic levels

| Level | Definition | Renders data? | Examples (current repo) |
|---|---|---|---|
| **Token** | Raw design value, no component | — | `@repo/tokens` (colors, space, radii, breakpoints) |
| **Primitive (headless)** | Contract + pure logic, renders nothing | — | `@repo/primitives` (`resolveButtonTheme`, `formatCurrency`) |
| **Atom** | Smallest renderable unit; one responsibility | Yes | `Text`, `Image`, `Card`, `Badge`, `Rating`, `Price`, `Button`, `TextInput` |
| **Molecule** | A small group of atoms with a single purpose | Yes | `ProductCard` |
| **Organism** | A section composed of molecules/atoms | Yes | *(planned)* `ProductGrid`, `Header` |
| **Template** | Layout/skeleton placing organisms | — | app-level |
| **Page** | Template + real data/business logic | — | `apps/*` screens |

---

## 2. Granularity boundary (the "stop at molecule?" question)

**Rule:** stop at **Molecule** unless the component (a) has its own data-fetching
concern, (b) is reused as a *section* across pages, or (c) composes multiple
molecules. Only then promote to **Organism**.

Concrete criteria to promote atom → molecule → organism:

| Question | If **yes** |
|---|---|
| Does it compose ≥2 atoms into one purposeful unit? | → Molecule |
| Does it compose ≥2 molecules, or represent a page section? | → Organism |
| Does it fetch/derive business data? | → **not** a component; move to adapter/selector (see §4) |

**MUST NOT**: put business logic (fetching, pricing rules, promo eligibility) inside a
molecule. Molecules are **presentational** (see `poc-product-card-and-modal.md`).

---

## 3. Reusability rules

- **Props-driven**: render only what is received via props; no hidden globals.
- **Composable**: prefer children/slots over many boolean flags.
- **Contract-first**: props interface lives in `@repo/primitives`.
- **Token-driven**: all values come from `@repo/tokens` (no literals).
- **Cross-platform**: an atom/molecule is implemented once per platform
  (`@repo/ui-web` DOM, `@repo/ui-native` RN) against the same contract.
- **No side effects** in render; handlers via props (`onPress`).

---

## 4. Where business logic lives (decision #1)

```
data source ──▶ adapter / selector (app or @repo/<domain>) ──▶ *View props ──▶ component
```

- **Components** (`atoms`, `molecules`): pure, presentational.
- **Adapters/selectors**: map domain data → component props (e.g.
  `toProductCardView(product): ProductCardProps`). Formatting/derivation
  (`formatCurrency`, `resolveDiscountPercent`, promo eligibility) happens here or in
  `@repo/primitives` as pure helpers — never inside the molecule.

---

## 5. Storybook standard (decisions #2 and #3)

### 5.1 Atomic level in the title (MUST)
Group stories by platform **and** atomic level:

```
Web/Atoms/Text
Web/Atoms/Badge
Web/Molecules/ProductCard
Native/Atoms/Button
Native/Molecules/ProductCard
```

### 5.2 Declare level + dependencies as metadata (MUST)
Each story file declares its atomic level and its direct dependencies so tooling can
build an impact map:

```ts
const meta = {
  title: "Web/Molecules/ProductCard",
  component: ProductCard,
  parameters: {
    atomicLevel: "molecule",
    dependsOn: ["Text", "Image", "Card", "Badge", "Rating", "Price"],
    usedBy: [], // filled in as organisms/pages adopt it
  },
} satisfies Meta<typeof ProductCard>;
```

### 5.3 Relationship & impact mapping (decision #3)
- **Depends on** (downstream): atoms/molecules this component renders.
- **Impacted by** (upstream): components/pages that consume it.
- Publish a generated **dependency graph** page in Storybook (Docs) plus a table in
  `docs/component-map.md`, kept in sync by a verifier (see `package-architecture.md` §5).

Current dependency map (as of this doc):

```
ProductCard (molecule)
├─ Text (atom)
├─ Image (atom)
├─ Card (atom)
├─ Badge (atom)
├─ Rating (atom)
└─ Price (atom) ──▶ Badge (atom)

TextInput (atom)  Button (atom)  (independent)
```

---

## 6. Definition of Done — new component

- [ ] Atomic level assigned and reflected in the Storybook title.
- [ ] Props contract in `@repo/primitives`; no business logic inside the component.
- [ ] Web + Native implementations against the same contract.
- [ ] Stories cover all variants/sizes/states, with `atomicLevel` + `dependsOn` metadata.
- [ ] Dependency/impact map updated.
- [ ] All values from `@repo/tokens`.
- [ ] Verification gates pass (`ARCHITECTURE.md` §10).
