# Web & Mobile Apps Requirement Consolidation — Minutes of Meeting

| | |
|---|---|
| **Date** | October 6, 2026 |
| **Attendees** | Hanif, Adit, Yudi, Valen |
| **Topic** | Web & Mobile Apps Requirement Consolidation |
| **Status** | Draft — input for the Oct 8 meeting |

---

## 1. Key Discussion Points

- **Component Granularity** — Define the boundaries for reusable components (e.g. whether to stop at the **molecule** level in Atomic Design).
- **Viewport & Breakpoints** — Define explicit viewport standards and breakpoint logic across Website and Mobile Apps.
- **Product Card Logic** — Remove all business logic from inside the component; it should strictly render data received via props.
- **Platform Behavior & Motion** — Clarify interaction and animation differences between Website and Mobile Apps.
- **Storybook Standard** — Atomic-level classification and component dependencies/impacts must be clearly mapped and documented in Storybook.

---

## 2. Key Decisions

1. **Product Card Component Refactor** — Product Card becomes a strictly **presentational** component (props-driven, zero embedded business logic).
2. **Storybook Atomic Definition** — Every component in Storybook must clearly define its **atomic level** (Atom, Molecule, Organism, …).
3. **Component Relationship & Impact Mapping** — Storybook must explain component relationships — specifically how a component impacts or calls other atomic components.

---

## 3. Action Items

| # | Action | Owner | Deadline | Deliverable |
|---|---|---|---|---|
| 1 | Package Architecture Research: pros/cons of combining vs. separating packages for Web & Mobile. If separated, add **constant data + verifiers** as guardrails. | Hanif / Adit | Oct 7, 2026 | [`package-architecture.md`](./package-architecture.md) |
| 2 | Atomic Design & Reusability Framework: guidelines for reusable components, broken down by atomic level. | Hanif / Yudi | Oct 7, 2026 | [`atomic-design-framework.md`](./atomic-design-framework.md) |
| 3 | PoC Components: **Product Card** as the primary standard example; *(optional)* **Modal** as the animation example. | Hanif / Valen | Oct 7, 2026 | [`poc-product-card-and-modal.md`](./poc-product-card-and-modal.md) |
| 4 | Preparation for Oct 8: explanations covering **Viewports**, **Reusable Components**, and **Atomic Relationships/Impacts**. | @Samuel Aditia / @Hanif Abdillah | Oct 7, 2026 | [`viewports-and-breakpoints.md`](./viewports-and-breakpoints.md) |

---

## 4. Deliverables (this doc set)

| Document | Covers |
|---|---|
| [`atomic-design-framework.md`](./atomic-design-framework.md) | Atomic levels, granularity boundaries, reusability rules, Storybook atomic standard + relationship/impact mapping. |
| [`package-architecture.md`](./package-architecture.md) | Combine vs. separate packages: options, pros/cons, recommendation, guardrails (constant data + verifiers). |
| [`viewports-and-breakpoints.md`](./viewports-and-breakpoints.md) | Viewport standards + breakpoint logic for Website and Mobile. |
| [`poc-product-card-and-modal.md`](./poc-product-card-and-modal.md) | PoC spec: presentational Product Card + animated Modal. |

---

## 5. Oct 8 Meeting Agenda (proposed)

1. **Viewports & Breakpoints** — standards, breakpoint scale, web vs. mobile responsibilities.
2. **Reusable Components** — atomic levels, granularity boundary (stop at molecule?), props-driven rule.
3. **Atomic Relationships & Impacts** — dependency map, how Storybook documents it.
4. **Package Architecture** — combine vs. separate; guardrails.
5. **PoC walkthrough** — Product Card (presentational) and Modal (motion).
6. **Decisions & next steps.**

---

## 6. Timeline

| Date | Milestone |
|---|---|
| Oct 6, 2026 | MoM; action items assigned |
| Oct 7, 2026 | Documents prepared (this set) |
| Oct 8, 2026 | Review meeting: viewports, reusable components, atomic relationships |
