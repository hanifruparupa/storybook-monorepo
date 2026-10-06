import * as React from "react";
import type { ButtonProps } from "@repo/primitives";
import { resolveButtonSize, resolveButtonTheme } from "@repo/primitives";
import { useBreakpoint } from "../hooks/useBreakpoint";

export interface WebButtonProps extends ButtonProps {
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  testID,
  style,
  className,
  type = "button",
}: WebButtonProps): React.JSX.Element {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const breakpoint = useBreakpoint();
  const resolvedSize = resolveButtonSize(size, breakpoint);

  const theme = resolveButtonTheme(variant, resolvedSize, disabled, pressed);

  const buttonStyle: React.CSSProperties = {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.borderColor,
    borderWidth: theme.borderWidth,
    borderStyle: "solid",
    color: theme.textColor,
    minHeight: theme.minHeight,
    paddingInline: theme.paddingHorizontal,
    paddingBlock: 0,
    borderRadius: theme.radius,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    lineHeight: 1.2,
    display: fullWidth ? "block" : "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    width: fullWidth ? "100%" : undefined,
    maxWidth: "100%",
    cursor: disabled ? "not-allowed" : "pointer",
    // Keep full opacity on hover: lowering it lightens the background and
    // breaks WCAG color-contrast for the label. Hover feedback = boxShadow.
    opacity: theme.opacity,
    boxShadow:
      hovered && !disabled ? "0 2px 8px rgba(0, 0, 0, 0.12)" : "none",
    transition:
      "background-color .15s ease, border-color .15s ease, opacity .15s ease",
    outlineOffset: 2,
    ...style,
  };

  return (
    <button
      type={type}
      className={className}
      style={buttonStyle}
      disabled={disabled}
      aria-label={label}
      aria-disabled={disabled || undefined}
      data-testid={testID}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onClick={() => {
        if (!disabled) onPress?.();
      }}
    >
      {label}
    </button>
  );
}
