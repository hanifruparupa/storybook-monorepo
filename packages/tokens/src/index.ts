/**
 * @repo/tokens — framework-agnostic design tokens.
 *
 * These are plain JS values, so BOTH the React Native implementation
 * (`@repo/ui-native`) and the DOM implementation (`@repo/ui-web`) can consume
 * the exact same source of truth. Swap this file for a generated export from
 * Figma/Tokens Studio later without touching any consumer.
 */

export const colors = {
  primary: "#1D64F2",
  primaryPressed: "#1753CC",
  onPrimary: "#FFFFFF",
  surface: "#FFFFFF",
  border: "#D4DBE7",
  text: "#0B1220",
  textMuted: "#5B6472",
  disabledBg: "#E7EAF0",
  disabledText: "#9AA3B2",
  ghostPressed: "#EEF3FF",
  danger: "#D92D20",
  dangerBorder: "#F97066",
  /** Product price (orange-red). */
  price: "#E8590C",
  /** Discount badge (red). */
  discount: "#E11D48",
  /** Rating star (amber). */
  star: "#F5A623",
  /** Promo strip background / text. */
  promoBg: "#E8F0FE",
  promoText: "#1A56DB",
  /** Media placeholder background. */
  imageBg: "#F3F4F6",
  /** Cashback banner (yellow). */
  cashbackBg: "#FFD400",
  cashbackText: "#161616",
  cashbackLabel: "#5B6472",
} as const;

export const radii = {
  sm: 8,
  md: 10,
  lg: 14,
  pill: 999,
} as const;

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const fontSize = {
  sm: 14,
  md: 16,
  lg: 18,
} as const;

export const lineHeight = {
  sm: 18,
  md: 22,
  lg: 24,
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

/** Narrow union so RN's `fontWeight` style type accepts it directly. */
export type FontWeight = (typeof fontWeight)[keyof typeof fontWeight];

/** Minimum control heights per size (also satisfies 44px touch targets at md+). */
export const controlHeight = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

/**
 * Viewport breakpoints (px) — a shared scale for responsive sizing.
 * `xs` is the base (0). Order is significant; see `breakpointOrder`.
 */
export const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Ascending breakpoint order (base → largest). */
export const breakpointOrder = ["xs", "sm", "md", "lg", "xl", "xxl"] as const;

export type ColorToken = keyof typeof colors;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radii;
