import * as React from "react";
import type { CSSProperties } from "react";
import type { ImageProps } from "@repo/primitives";
import { resolveImageTheme } from "@repo/primitives";

export interface WebImageProps extends ImageProps {
  style?: CSSProperties;
  className?: string;
}

export function Image({
  source,
  alt,
  aspectRatio,
  radius,
  testID,
  style,
  className,
}: WebImageProps): React.JSX.Element {
  const imageTheme = resolveImageTheme();

  const wrapperStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    aspectRatio: aspectRatio ?? 1,
    borderRadius: radius ?? imageTheme.radius,
    backgroundColor: imageTheme.backgroundColor,
    overflow: "hidden",
    ...style,
  };

  return (
    <div className={className} style={wrapperStyle} data-testid={testID}>
      <img
        src={source}
        alt={alt ?? ""}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}
