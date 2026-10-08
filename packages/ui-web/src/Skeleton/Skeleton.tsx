import * as React from "react";
import type { SkeletonProps } from "@repo/primitives";
import { resolveSkeletonTheme } from "@repo/primitives";

export interface WebSkeletonProps extends SkeletonProps {
  style?: React.CSSProperties;
  className?: string;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  animate = true,
  testID,
  style,
  className,
}: WebSkeletonProps): React.JSX.Element {
  const theme = resolveSkeletonTheme(variant);

  const defaultWidth: number | string =
    variant === "circle" ? 40 : "100%";
  const defaultHeight: number =
    variant === "text" ? 14 : variant === "circle" ? 40 : 80;

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (animate === false) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const el = ref.current;
    if (!el) return;
    const animation = el.animate(
      [{ backgroundPosition: "100% 0" }, { backgroundPosition: "0 0" }],
      {
        duration: theme.duration,
        iterations: Infinity,
        easing: "linear",
      },
    );
    return () => animation.cancel();
  }, [animate, theme.duration, theme.baseColor, theme.highlightColor]);

  const baseStyle: React.CSSProperties = {
    backgroundColor: theme.baseColor,
    backgroundImage: `linear-gradient(90deg, ${theme.baseColor} 25%, ${theme.highlightColor} 37%, ${theme.baseColor} 63%)`,
    backgroundSize: "400% 100%",
    backgroundPosition: "100% 0",
    borderRadius: theme.radius,
    width: width ?? defaultWidth,
    height: height ?? defaultHeight,
    flexShrink: 0,
    ...style,
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-testid={testID}
      className={className}
      style={baseStyle}
    />
  );
}
