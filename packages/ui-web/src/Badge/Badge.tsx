import * as React from "react";
import type { CSSProperties } from "react";
import type { BadgeProps } from "@repo/primitives";
import { resolveBadgeTheme } from "@repo/primitives";

export interface WebBadgeProps extends BadgeProps {
  style?: CSSProperties;
  className?: string;
}

export function Badge({
  label,
  variant = "neutral",
  testID,
  style,
  className,
}: WebBadgeProps): React.JSX.Element {
  const theme = resolveBadgeTheme(variant);

  const badgeStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    borderRadius: theme.radius,
    paddingInline: theme.paddingX,
    paddingBlock: theme.paddingY,
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    ...style,
  };

  return (
    <span className={className} style={badgeStyle} data-testid={testID}>
      {label}
    </span>
  );
}
