import * as React from "react";
import type { CSSProperties } from "react";
import type { CardProps } from "@repo/primitives";
import { resolveCardTheme } from "@repo/primitives";
import { CardContent, CardFooter, CardHeader } from "./CardSections";

export interface WebCardProps extends CardProps {
  style?: CSSProperties;
  className?: string;
}

export function CardRoot({
  children,
  variant = "outlined",
  testID,
  style,
  className,
}: WebCardProps): React.JSX.Element {
  const theme = resolveCardTheme(variant);

  const cardStyle: CSSProperties = {
    backgroundColor: theme.backgroundColor,
    borderColor: theme.borderColor,
    borderWidth: theme.borderWidth,
    borderStyle: theme.borderWidth > 0 ? "solid" : "none",
    borderRadius: theme.radius,
    padding: theme.padding,
    boxSizing: "border-box",
    ...(theme.hasShadow
      ? { boxShadow: "0 1px 3px rgba(16,24,40,.1)" }
      : null),
    ...style,
  };

  return (
    <div className={className} style={cardStyle} data-testid={testID}>
      {children}
    </div>
  );
}

export type CardComponent = ((props: WebCardProps) => React.JSX.Element) & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};
export const Card: CardComponent = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
});
