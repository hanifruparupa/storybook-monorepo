import * as React from "react";
import type { CardSectionProps } from "@repo/primitives";
import { resolveCardSectionTheme } from "@repo/primitives";

export interface WebCardSectionProps extends CardSectionProps {
  style?: React.CSSProperties;
  className?: string;
}

export function CardHeader({
  children,
  flush = false,
  testID,
  style,
  className,
}: WebCardSectionProps): React.JSX.Element {
  const t = resolveCardSectionTheme("header");

  const sectionStyle: React.CSSProperties = {
    padding: flush ? 0 : t.padding,
    boxSizing: "border-box",
    ...(t.borderEdge === "bottom"
      ? { borderBottom: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...(t.borderEdge === "top"
      ? { borderTop: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...style,
  };

  return (
    <header className={className} style={sectionStyle} data-testid={testID}>
      {children}
    </header>
  );
}

export function CardContent({
  children,
  flush = false,
  testID,
  style,
  className,
}: WebCardSectionProps): React.JSX.Element {
  const t = resolveCardSectionTheme("content");

  const sectionStyle: React.CSSProperties = {
    padding: flush ? 0 : t.padding,
    boxSizing: "border-box",
    ...(t.borderEdge === "bottom"
      ? { borderBottom: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...(t.borderEdge === "top"
      ? { borderTop: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...style,
  };

  return (
    <div className={className} style={sectionStyle} data-testid={testID}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  flush = false,
  testID,
  style,
  className,
}: WebCardSectionProps): React.JSX.Element {
  const t = resolveCardSectionTheme("footer");

  const sectionStyle: React.CSSProperties = {
    padding: flush ? 0 : t.padding,
    boxSizing: "border-box",
    ...(t.borderEdge === "bottom"
      ? { borderBottom: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...(t.borderEdge === "top"
      ? { borderTop: `${t.borderWidth}px solid ${t.borderColor}` }
      : null),
    ...style,
  };

  return (
    <footer className={className} style={sectionStyle} data-testid={testID}>
      {children}
    </footer>
  );
}
