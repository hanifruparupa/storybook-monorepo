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

export const fontWeight = {
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

export type ColorToken = keyof typeof colors;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radii;
