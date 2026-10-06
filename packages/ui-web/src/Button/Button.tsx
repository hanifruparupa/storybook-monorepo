import * as React from "react";
import type { ButtonProps } from "@repo/primitives";
import { resolveButtonTheme } from "@repo/primitives";

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

  const theme = resolveButtonTheme(variant, size, disabled, pressed);

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
    opacity: hovered && !disabled && !pressed ? 0.92 : theme.opacity,
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
