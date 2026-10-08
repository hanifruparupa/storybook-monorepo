import * as React from "react";
import type { IconButtonProps } from "@repo/primitives";
import { resolveButtonSize, resolveIconButtonTheme } from "@repo/primitives";
import { useBreakpoint } from "../hooks/useBreakpoint";

export interface WebIconButtonProps extends IconButtonProps {
  style?: React.CSSProperties;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  testID,
  style,
  className,
  type = "button",
}: WebIconButtonProps): React.JSX.Element {
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const breakpoint = useBreakpoint();
  const resolvedSize = resolveButtonSize(size, breakpoint);
  const t = resolveIconButtonTheme(variant, resolvedSize, disabled, pressed);

  const buttonStyle: React.CSSProperties = {
    width: t.dimension,
    height: t.dimension,
    padding: 0,
    borderRadius: t.radius,
    border: `${t.borderWidth}px solid ${t.borderColor}`,
    backgroundColor: t.backgroundColor,
    color: t.textColor,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: t.opacity,
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
      aria-label={accessibilityLabel}
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
      <span aria-hidden="true" style={{ display: "inline-flex" }}>
        {icon}
      </span>
    </button>
  );
}
