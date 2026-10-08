/**
 * @repo/primitives — headless, framework-agnostic UI logic.
 *
 * This package owns the *contract* and the *behaviour* of our components
 * (prop shapes, variant/size resolution, state), but renders nothing. Each
 * platform package (`@ruparupa/ui-native`, `@ruparupa/ui-web`) turns the resolved
 * theme into its own primitives. That is the seam that lets the web team own
 * DOM/Tailwind while mobile owns React Native — without forking the API.
 */

import type { ReactNode } from "react";

import {
  breakpointOrder,
  breakpoints,
  colors,
  controlHeight,
  fontSize,
  fontWeight,
  lineHeight,
  motion,
  radii,
  space,
  type Breakpoint,
  type FontWeight,
} from "@repo/tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/** The single props contract every platform implementation must satisfy. */
export interface ButtonProps {
  /**
   * Visible label. Optional when an icon is provided (icon-only button).
   * When omitted, pass `accessibilityLabel` so the button has an accessible name.
   */
  label?: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  /** Fixed size, or a value per viewport breakpoint (e.g. `{ xs: "sm", lg: "lg" }`). */
  size?: ButtonSize | ResponsiveSize;
  /** Optional icon rendered before the label (or the only content when icon-only). */
  leftIcon?: ReactNode;
  /** Optional icon rendered after the label. */
  rightIcon?: ReactNode;
  /** Accessible name; required when there is no visible `label`. */
  accessibilityLabel?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  testID?: string;
}

/**
 * Platform-neutral description of how a button should look in a given state.
 * `ui-native` maps this onto `StyleSheet`/RN props; `ui-web` maps it onto CSS
 * / inline styles. Colors are shared, so the two stay visually in sync.
 */
export interface ButtonTheme {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  textColor: string;
  minHeight: number;
  paddingHorizontal: number;
  radius: number;
  fontSize: number;
  fontWeight: FontWeight;
  opacity: number;
}

export const buttonVariants: ButtonVariant[] = ["primary", "secondary", "ghost"];
export const buttonSizes: ButtonSize[] = ["sm", "md", "lg"];

export function resolveButtonTheme(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  disabled = false,
  pressed = false,
): ButtonTheme {
  const base = {
    borderWidth: 1,
    minHeight: controlHeight[size],
    paddingHorizontal: space.lg,
    radius: radii.md,
    fontSize: fontSize[size],
    fontWeight: fontWeight.semibold,
    opacity: 1,
  };

  if (disabled) {
    return {
      ...base,
      backgroundColor: colors.disabledBg,
      borderColor: colors.disabledBg,
      textColor: colors.disabledText,
    };
  }

  switch (variant) {
    case "secondary":
      return {
        ...base,
        backgroundColor: pressed ? colors.ghostPressed : colors.surface,
        borderColor: colors.border,
        textColor: colors.primary,
      };
    case "ghost":
      return {
        ...base,
        backgroundColor: pressed ? colors.ghostPressed : "transparent",
        borderColor: "transparent",
        textColor: colors.primary,
      };
    case "primary":
    default:
      return {
        ...base,
        backgroundColor: pressed ? colors.primaryPressed : colors.primary,
        borderColor: pressed ? colors.primaryPressed : colors.primary,
        textColor: colors.onPrimary,
      };
  }
}

// ---------------------------------------------------------------------------
// IconButton (atom) — icon-only button
// ---------------------------------------------------------------------------

export interface IconButtonProps {
  icon: ReactNode;
  /** Required: icon-only buttons must expose an accessible name. */
  accessibilityLabel: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize | ResponsiveSize;
  disabled?: boolean;
  testID?: string;
}

export interface IconButtonTheme extends ButtonTheme {
  /** Square edge length (min width & height). */
  dimension: number;
}

export function resolveIconButtonTheme(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  disabled = false,
  pressed = false,
): IconButtonTheme {
  return {
    ...resolveButtonTheme(variant, size, disabled, pressed),
    paddingHorizontal: 0,
    dimension: controlHeight[size],
  };
}

// ---------------------------------------------------------------------------
// TextInput
// ---------------------------------------------------------------------------

/** Visual state of a text field. `default` covers the blurred (unfocused) state. */
export type TextInputState = "default" | "focused" | "disabled" | "error";

export interface TextInputProps {
  label?: string;
  value: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  /** Rendered inside the field, before the text. */
  leftIcon?: ReactNode;
  /** Rendered inside the field, after the text (e.g. a clear button). */
  rightIcon?: ReactNode;
  onLeftIconPress?: () => void;
  onRightIconPress?: () => void;
  disabled?: boolean;
  /** Error message; also switches the field into the error state. */
  error?: string;
  helperText?: string;
  testID?: string;
}

export interface TextInputTheme {
  borderColor: string;
  backgroundColor: string;
  textColor: string;
  placeholderColor: string;
  labelColor: string;
  helperColor: string;
  borderWidth: number;
  radius: number;
  minHeight: number;
  paddingHorizontal: number;
  fontSize: number;
  gap: number;
}

export function resolveTextInputTheme(
  state: TextInputState = "default",
): TextInputTheme {
  const base: TextInputTheme = {
    borderColor: colors.border,
    backgroundColor: colors.surface,
    textColor: colors.text,
    placeholderColor: colors.textMuted,
    labelColor: colors.text,
    helperColor: colors.textMuted,
    borderWidth: 1,
    radius: radii.md,
    minHeight: controlHeight.md,
    paddingHorizontal: space.md,
    fontSize: fontSize.md,
    gap: space.sm,
  };

  switch (state) {
    case "focused":
      return { ...base, borderColor: colors.primary, borderWidth: 2 };
    case "disabled":
      return {
        ...base,
        backgroundColor: colors.disabledBg,
        borderColor: colors.disabledBg,
        textColor: colors.disabledText,
        placeholderColor: colors.disabledText,
        labelColor: colors.textMuted,
      };
    case "error":
      return { ...base, borderColor: colors.danger, helperColor: colors.danger };
    case "default":
    default:
      return base;
  }
}

// ---------------------------------------------------------------------------
// Text (atom)
// ---------------------------------------------------------------------------

export type TextVariant =
  | "title"
  | "body"
  | "caption"
  | "price"
  | "priceOriginal"
  | "label";

export interface TextProps {
  children: ReactNode;
  variant?: TextVariant;
  /** Max lines before truncation (1 = single line ellipsis). */
  numberOfLines?: number;
  testID?: string;
}

export interface TextTheme {
  fontSize: number;
  fontWeight: FontWeight;
  color: string;
  lineHeight: number;
}

export function resolveTextTheme(variant: TextVariant = "body"): TextTheme {
  switch (variant) {
    case "title":
      return { fontSize: fontSize.lg, fontWeight: fontWeight.semibold, color: colors.text, lineHeight: lineHeight.lg };
    case "label":
      return { fontSize: fontSize.sm, fontWeight: fontWeight.medium, color: colors.text, lineHeight: lineHeight.sm };
    case "caption":
      return { fontSize: fontSize.sm, fontWeight: fontWeight.regular, color: colors.textMuted, lineHeight: lineHeight.sm };
    case "price":
      return { fontSize: fontSize.lg, fontWeight: fontWeight.bold, color: colors.price, lineHeight: lineHeight.lg };
    case "priceOriginal":
      return { fontSize: fontSize.sm, fontWeight: fontWeight.regular, color: colors.textMuted, lineHeight: lineHeight.sm };
    case "body":
    default:
      return { fontSize: fontSize.md, fontWeight: fontWeight.regular, color: colors.text, lineHeight: lineHeight.md };
  }
}

// ---------------------------------------------------------------------------
// Card (atom surface)
// ---------------------------------------------------------------------------

export type CardVariant = "plain" | "outlined" | "elevated";

export interface CardProps {
  children: ReactNode;
  variant?: CardVariant;
  testID?: string;
}

export interface CardTheme {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  radius: number;
  padding: number;
  hasShadow: boolean;
}

export function resolveCardTheme(variant: CardVariant = "outlined"): CardTheme {
  const base = {
    backgroundColor: colors.surface,
    radius: radii.lg,
    padding: space.md,
  };
  switch (variant) {
    case "plain":
      return { ...base, borderColor: "transparent", borderWidth: 0, hasShadow: false };
    case "elevated":
      return { ...base, borderColor: "transparent", borderWidth: 0, hasShadow: true };
    case "outlined":
    default:
      return { ...base, borderColor: colors.border, borderWidth: 1, hasShadow: false };
  }
}

// ---------------------------------------------------------------------------
// Card sections (Card.Header / Card.Content / Card.Footer)
// ---------------------------------------------------------------------------

export type CardSection = "header" | "content" | "footer" | "media" | "actions";

export interface CardSectionProps {
  children: ReactNode;
  /** Remove the default padding (e.g. for flush media). */
  flush?: boolean;
  testID?: string;
}

export interface CardSectionTheme {
  padding: number;
  borderColor: string;
  borderWidth: number;
  /** Edge that carries the divider border. */
  borderEdge: "none" | "top" | "bottom";
}

export function resolveCardSectionTheme(section: CardSection): CardSectionTheme {
  const base = {
    padding: space.md,
    borderColor: colors.border,
    borderWidth: 1,
  };
  switch (section) {
    case "header":
      return { ...base, borderEdge: "bottom" };
    case "footer":
    case "actions":
      return { ...base, borderEdge: "top" };
    case "media":
      return { ...base, padding: 0, borderWidth: 0, borderEdge: "none" };
    case "content":
    default:
      return { ...base, borderWidth: 0, borderEdge: "none" };
  }
}

// ---------------------------------------------------------------------------
// Card parts: Card.Image (media) and Card.Title (typography)
// ---------------------------------------------------------------------------

export interface CardImageProps extends ImageProps {
  /** Overlays rendered on top of the media (e.g. a badge or cashback banner). */
  children?: ReactNode;
}

export interface CardTitleProps {
  children: ReactNode;
  /** Typography variant. Defaults to "title". */
  variant?: TextVariant;
  numberOfLines?: number;
  testID?: string;
}

export interface CardMediaProps {
  /** Arbitrary media content (video, custom media, etc.). */
  children: ReactNode;
  testID?: string;
}

export type CardActionsAlign = "start" | "center" | "end" | "between";

export interface CardActionsProps {
  children: ReactNode;
  /** Horizontal alignment of the actions. Defaults to "end". */
  align?: CardActionsAlign;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Badge (atom)
// ---------------------------------------------------------------------------

export type BadgeVariant = "neutral" | "discount" | "info" | "chip";

export interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  testID?: string;
}

export interface BadgeTheme {
  backgroundColor: string;
  textColor: string;
  radius: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  fontWeight: FontWeight;
}

export function resolveBadgeTheme(variant: BadgeVariant = "neutral"): BadgeTheme {
  const base = {
    radius: radii.sm,
    paddingX: space.sm,
    paddingY: space.xs,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  };
  switch (variant) {
    case "discount":
      return { ...base, backgroundColor: colors.discount, textColor: colors.onPrimary };
    case "info":
      return { ...base, backgroundColor: colors.promoBg, textColor: colors.promoText, fontWeight: fontWeight.medium };
    case "chip":
      return { ...base, backgroundColor: colors.surface, textColor: colors.text, fontWeight: fontWeight.medium };
    case "neutral":
    default:
      return { ...base, backgroundColor: colors.disabledBg, textColor: colors.textMuted };
  }
}

// ---------------------------------------------------------------------------
// Image (atom)
// ---------------------------------------------------------------------------

export interface ImageProps {
  source: string;
  alt?: string;
  /** width / height. Defaults to 1 (square, like the product thumbnails). */
  aspectRatio?: number;
  radius?: number;
  testID?: string;
}

export interface ImageTheme {
  backgroundColor: string;
  radius: number;
}

export function resolveImageTheme(): ImageTheme {
  return { backgroundColor: colors.imageBg, radius: radii.sm };
}

// ---------------------------------------------------------------------------
// Rating (atom)
// ---------------------------------------------------------------------------

export interface RatingProps {
  value: number;
  reviewCount?: number;
  max?: number;
  testID?: string;
}

export interface RatingTheme {
  starColor: string;
  valueColor: string;
  textColor: string;
  fontSize: number;
}

export function resolveRatingTheme(): RatingTheme {
  return { starColor: colors.star, valueColor: colors.text, textColor: colors.textMuted, fontSize: fontSize.sm };
}

// ---------------------------------------------------------------------------
// Price (atom) + currency formatting
// ---------------------------------------------------------------------------

export interface PriceProps {
  price: number;
  originalPrice?: number;
  /** Defaults to Math.round((1 - price / originalPrice) * 100) when omitted. */
  discountPercent?: number;
  /** e.g. 900000 -> "Rp900 ribu". */
  abbreviate?: boolean;
  testID?: string;
}

export interface PriceTheme {
  priceColor: string;
  originalColor: string;
  priceFontSize: number;
  originalFontSize: number;
  fontWeight: FontWeight;
}

export function resolvePriceTheme(): PriceTheme {
  return {
    priceColor: colors.price,
    originalColor: colors.textMuted,
    priceFontSize: fontSize.lg,
    originalFontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  };
}

/** Places Indonesian "." thousand separators: 2699000 -> "2.699.000". */
function groupThousands(value: number): string {
  return Math.round(Math.abs(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function abbreviateValue(value: number): string {
  const trim = (n: number) => String(Math.round(n * 10) / 10).replace(".", ",");
  if (value >= 1_000_000_000) return `${trim(value / 1_000_000_000)} miliar`;
  if (value >= 1_000_000) return `${trim(value / 1_000_000)} juta`;
  if (value >= 1_000) return `${trim(value / 1_000)} ribu`;
  return groupThousands(value);
}

export function formatCurrency(
  amount: number,
  options: { abbreviate?: boolean; currency?: string } = {},
): string {
  const currency = options.currency ?? "Rp";
  const body = options.abbreviate ? abbreviateValue(amount) : groupThousands(amount);
  return `${currency}${body}`;
}

export function resolveDiscountPercent(price: number, originalPrice?: number): number | undefined {
  if (!originalPrice || originalPrice <= price) return undefined;
  return Math.round((1 - price / originalPrice) * 100);
}

// ---------------------------------------------------------------------------
// ProductCard (molecule) — composes the atoms above.
// ---------------------------------------------------------------------------

export interface ProductCardCashback {
  amount: number;
  /** Leading label. Defaults to "Cashback". */
  label?: string;
  /** Small word before the amount. Defaults to "hingga". */
  prefix?: string;
  /** Show the "GRATIS ONGKIR" shipping badge. Defaults to false. */
  freeShipping?: boolean;
}

export interface CashbackTheme {
  backgroundColor: string;
  textColor: string;
  labelColor: string;
  shippingBackgroundColor: string;
  shippingTextColor: string;
  fontSize: number;
  amountFontSize: number;
}

export function resolveCashbackTheme(): CashbackTheme {
  return {
    backgroundColor: colors.cashbackBg,
    textColor: colors.cashbackText,
    labelColor: colors.cashbackLabel,
    shippingBackgroundColor: colors.discount,
    shippingTextColor: colors.onPrimary,
    fontSize: fontSize.sm,
    amountFontSize: fontSize.md,
  };
}

export interface ProductCardProps {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  /** Corner chip over the image, e.g. "2 Pilihan Isi Set". */
  badgeLabel?: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  /** Promo strip text, e.g. "Harga spesial ruparupa rewar…". */
  promoText?: string;
  /** Optional cashback banner over the bottom of the image. */
  cashback?: ProductCardCashback;
  rating?: number;
  reviewCount?: number;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Responsive sizing (platform-agnostic)
//
// These helpers hold the *mapping rules* (breakpoint -> value). Measuring the
// viewport is platform-specific and lives in each app/component (web:
// matchMedia / innerWidth; native: useWindowDimensions).
// ---------------------------------------------------------------------------

/** A value that may vary per viewport breakpoint, e.g. `{ xs: "sm", lg: "lg" }`. */
export type Responsive<T> = Partial<Record<Breakpoint, T>>;

/** Button size that is either fixed or per-breakpoint. */
export type ResponsiveSize = Responsive<ButtonSize>;

/** Largest breakpoint whose min-width is <= `width` (base `xs` = 0). */
export function resolveBreakpoint(width: number): Breakpoint {
  let current: Breakpoint = "xs";
  for (const bp of breakpointOrder) {
    if (width >= breakpoints[bp]) current = bp;
  }
  return current;
}

/**
 * Resolve a responsive value for the active breakpoint. A breakpoint without an
 * explicit value inherits the nearest smaller breakpoint that defines one;
 * otherwise `fallback` is returned.
 */
export function resolveResponsiveValue<T>(
  value: Responsive<T> | undefined,
  breakpoint: Breakpoint,
  fallback: T,
): T {
  if (!value) return fallback;
  const start = breakpointOrder.indexOf(breakpoint);
  for (let i = start; i >= 0; i--) {
    const bp = breakpointOrder[i];
    if (bp === undefined) continue;
    const candidate = value[bp];
    if (candidate !== undefined) return candidate;
  }
  return fallback;
}

/** Convenience wrapper for Button sizes (default fallback `md`). */
export function resolveResponsiveSize(
  size: ResponsiveSize | undefined,
  breakpoint: Breakpoint,
  fallback: ButtonSize = "md",
): ButtonSize {
  return resolveResponsiveValue(size, breakpoint, fallback);
}

/**
 * Resolve a Button `size` that may be fixed (`"md"`) or per-breakpoint
 * (`{ xs: "sm", lg: "lg" }`) into a single size for the active breakpoint.
 */
export function resolveButtonSize(
  size: ButtonSize | ResponsiveSize | undefined,
  breakpoint: Breakpoint,
  fallback: ButtonSize = "md",
): ButtonSize {
  if (typeof size === "string") return size;
  return resolveResponsiveValue(size, breakpoint, fallback);
}

// ---------------------------------------------------------------------------
// Modal (organism)
// ---------------------------------------------------------------------------

export type ModalPlacement = "center" | "bottom-sheet";

export interface ModalProps {
  visible: boolean;
  onRequestClose?: () => void;
  title?: string;
  children: ReactNode;
  placement?: ModalPlacement;
  /** Defaults to true. */
  dismissOnBackdropPress?: boolean;
  testID?: string;
}

export interface ModalTheme {
  backdropColor: string;
  surfaceColor: string;
  radius: number;
  padding: number;
  maxWidth: number;
  /** Enter/exit duration in ms (from the `motion` tokens). */
  duration: number;
}

export function resolveModalTheme(placement: ModalPlacement = "center"): ModalTheme {
  return {
    backdropColor: colors.overlay,
    surfaceColor: colors.surface,
    radius: radii.lg,
    padding: space.lg,
    maxWidth: 480,
    duration: motion.base,
  };
}

// ---------------------------------------------------------------------------
// Banner (molecule) — image carousel with a timed dot indicator
// ---------------------------------------------------------------------------

export interface BannerSlide {
  imageUrl: string;
  alt?: string;
}

export type BannerTransition = "slide" | "fade" | "none";

export interface BannerProps {
  slides: BannerSlide[];
  /** How long each slide is shown, in ms. Defaults to `motion.slide`. */
  duration?: number;
  /** Auto-advance slides. Defaults to true. */
  autoPlay?: boolean;
  /** Wrap from the last slide to the first (and vice versa). Defaults to true. */
  loop?: boolean;
  /** Media aspect ratio (width / height). Defaults to 16 / 9. */
  aspectRatio?: number;
  /** How the incoming slide appears. Defaults to "slide". */
  transition?: BannerTransition;
  /** Called when the active slide changes. */
  onIndexChange?: (index: number) => void;
  testID?: string;
}
