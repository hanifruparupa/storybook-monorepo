import * as React from "react";
import type { CSSProperties } from "react";
import type { TextProps } from "@repo/primitives";
import { resolveTextTheme } from "@repo/primitives";

export interface WebTextProps extends TextProps {
  style?: CSSProperties;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Text({
  children,
  variant = "body",
  numberOfLines,
  testID,
  style,
  className,
  as = "span",
}: WebTextProps): React.JSX.Element {
  const theme = resolveTextTheme(variant);

  const truncationStyle: CSSProperties =
    numberOfLines === 1
      ? {
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }
      : numberOfLines !== undefined && numberOfLines > 1
        ? {
            display: "-webkit-box",
            WebkitLineClamp: numberOfLines,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }
        : {};

  const textStyle: CSSProperties = {
    fontSize: theme.fontSize,
    fontWeight: theme.fontWeight,
    color: theme.color,
    lineHeight: theme.lineHeight,
    margin: 0,
    ...truncationStyle,
    ...style,
  };

  return React.createElement(
    as,
    { className, style: textStyle, "data-testid": testID },
    children,
  );
}
