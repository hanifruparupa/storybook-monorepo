/**
 * @repo/primitives — headless, framework-agnostic UI logic.
 *
 * This package owns the *contract* and the *behaviour* of our components
 * (prop shapes, variant/size resolution, state), but renders nothing. Each
 * platform package (`@repo/ui-native`, `@repo/ui-web`) turns the resolved
 * theme into its own primitives. That is the seam that lets the web team own
 * DOM/Tailwind while mobile owns React Native — without forking the API.
 */

import type { ReactNode } from "react";

import {
  colors,
  controlHeight,
  fontSize,
  fontWeight,
  radii,
  space,
  type FontWeight,
} from "@repo/tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/** The single props contract every platform implementation must satisfy. */
export interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
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
