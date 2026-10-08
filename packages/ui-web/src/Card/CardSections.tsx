import * as React from "react";
import type {
  CardImageProps,
  CardSectionProps,
  CardTitleProps,
} from "@repo/primitives";
import { resolveCardSectionTheme } from "@repo/primitives";
import { Image } from "../Image/Image";
import { Text } from "../Text/Text";

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

export interface WebCardImageProps extends CardImageProps {
  style?: React.CSSProperties;
  className?: string;
}

export interface WebCardTitleProps extends CardTitleProps {
  style?: React.CSSProperties;
  className?: string;
}

export function CardImage({
  source,
  alt,
  aspectRatio,
  radius,
  children,
  testID,
  style,
  className,
}: WebCardImageProps): React.JSX.Element {
  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    ...style,
  };

  return (
    <div className={className} style={wrapperStyle} data-testid={testID}>
      <Image
        source={source}
        alt={alt}
        aspectRatio={aspectRatio ?? 1}
        radius={radius ?? 0}
      />
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  variant,
  numberOfLines,
  testID,
  style,
  className,
}: WebCardTitleProps): React.JSX.Element {
  return (
    <Text
      variant={variant ?? "title"}
      numberOfLines={numberOfLines}
      testID={testID}
      className={className}
      style={style}
    >
      {children}
    </Text>
  );
}
