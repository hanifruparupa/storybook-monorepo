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
  loop = true,
  onIndexChange,
  testID,
  style,
  className,
}: WebBannerProps): React.JSX.Element | null {
  const [index, setIndex] = React.useState(0);
  const [filled, setFilled] = React.useState(false);
  const [entered, setEntered] = React.useState(true);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [vw, setVw] = React.useState(0);
  const [dragging, setDragging] = React.useState(false);
  const [drag, setDrag] = React.useState(0);
  const startX = React.useRef(0);

  React.useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    if (!loop && index >= slides.length - 1) return;
    const next = loop ? (index + 1) % slides.length : index + 1;
    const id = window.setTimeout(() => setIndex(next), duration);
    return () => window.clearTimeout(id);
  }, [index, autoPlay, loop, duration, slides.length]);

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

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.imageUrl;
    });
  }, [slides]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    setVw(el.clientWidth);
    const observer = new ResizeObserver(() => {
      setVw(el.clientWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (slides.length === 0) return null;

  const current = slides[index] ?? slides[0];
  if (current === undefined) return null;

  const goTo = (i: number): void => {
    const n = slides.length;
    if (loop) {
      setIndex(((i % n) + n) % n);
    } else {
      setIndex(Math.min(Math.max(i, 0), n - 1));
    }
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
  ): void => {
    setDragging(true);
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (
    e: React.PointerEvent<HTMLDivElement>,
  ): void => {
    if (!dragging) return;
    setDrag(e.clientX - startX.current);
  };

  const endDrag = (): void => {
    if (dragging) {
      const t = Math.max(40, vw * 0.2);
      if (drag <= -t) {
        goTo(index + 1);
      } else if (drag >= t) {
        goTo(index - 1);
      }
    }
    setDrag(0);
    setDragging(false);
  };

  const fadeStyle: React.CSSProperties = {
    transition: `opacity ${motion.base}ms ease`,
    opacity: entered ? 1 : 0,
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
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        style={{
          overflow: "hidden",
          width: "100%",
          touchAction: "pan-y",
          cursor: "grab",
          userSelect: "none",
        }}
      >
        {transition === "slide" ? (
          <div
            style={{
              display: "flex",
              width: `${slides.length * 100}%`,
              transform: `translateX(${-index * vw + drag}px)`,
              transition: dragging
                ? "none"
                : `transform ${motion.base}ms ease`,
            }}
          >
            {slides.map((s, i) => (
              <div
                key={i}
                style={{ width: `${100 / slides.length}%` }}
                aria-hidden={i !== index}
              >
                <Image
                  source={s.imageUrl}
                  alt={s.alt}
                  aspectRatio={aspectRatio}
                  radius={0}
                />
              </div>
            ))}
          </div>
        ) : transition === "fade" ? (
          <div style={fadeStyle}>
            <Image
              source={current.imageUrl}
              alt={current.alt}
              aspectRatio={aspectRatio}
              radius={0}
            />
          </div>
        ) : (
          <Image
            source={current.imageUrl}
            alt={current.alt}
            aspectRatio={aspectRatio}
            radius={0}
          />
        )}
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
