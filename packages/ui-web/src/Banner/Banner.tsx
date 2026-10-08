import * as React from "react";
import type { BannerProps } from "@repo/primitives";
import { colors, motion, radii, space } from "@repo/tokens";
import { Image } from "../Image/Image";

export interface WebBannerProps extends BannerProps {
  style?: React.CSSProperties;
  className?: string;
}

export function Banner({
  slides,
  duration = motion.slide,
  autoPlay = true,
  aspectRatio = 16 / 9,
  transition = "slide",
  onIndexChange,
  testID,
  style,
  className,
}: WebBannerProps): React.JSX.Element | null {
  const [index, setIndex] = React.useState(0);
  const [filled, setFilled] = React.useState(false);
  const [entered, setEntered] = React.useState(true);

  React.useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, duration);
    return () => window.clearTimeout(id);
  }, [index, autoPlay, duration, slides.length]);

  React.useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  React.useEffect(() => {
    setFilled(false);
    const frame = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(frame);
  }, [index]);

  React.useEffect(() => {
    setEntered(false);
    const frame = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(frame);
  }, [index]);

  if (slides.length === 0) return null;

  const current = slides[index] ?? slides[0];
  if (current === undefined) return null;

  const innerStyle: React.CSSProperties = {
    transition:
      transition === "none"
        ? undefined
        : `transform ${motion.base}ms ease, opacity ${motion.base}ms ease`,
    ...(transition === "slide"
      ? { transform: entered ? "none" : "translateX(100%)" }
      : null),
    ...(transition === "fade" ? { opacity: entered ? 1 : 0 } : null),
  };

  return (
    <div
      data-testid={testID}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={innerStyle}>
        <Image
          source={current.imageUrl}
          alt={current.alt}
          aspectRatio={aspectRatio}
          radius={0}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: space.sm,
          display: "flex",
          justifyContent: "center",
          gap: space.xs,
          boxShadow: "0 1px 3px rgba(0,0,0,.3)",
        }}
      >
        {slides.map((_, i) =>
          i === index ? (
            <span
              key={i}
              data-testid={`banner-dot-${i}`}
              aria-hidden="true"
              style={{
                width: 24,
                height: 8,
                borderRadius: radii.pill,
                backgroundColor: colors.surface,
                opacity: 0.6,
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  display: "block",
                  height: "100%",
                  width: filled ? "100%" : "0%",
                  backgroundColor: colors.primary,
                  transition: `width ${duration}ms linear`,
                }}
              />
            </span>
          ) : (
            <span
              key={i}
              data-testid={`banner-dot-${i}`}
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: radii.pill,
                backgroundColor: colors.surface,
                opacity: 0.6,
              }}
            />
          ),
        )}
      </div>
    </div>
  );
}
