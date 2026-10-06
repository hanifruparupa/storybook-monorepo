import * as React from "react";
import type { CSSProperties } from "react";
import type { RatingProps } from "@repo/primitives";
import { resolveRatingTheme } from "@repo/primitives";

export interface WebRatingProps extends RatingProps {
  style?: CSSProperties;
  className?: string;
}

export function Rating({
  value,
  reviewCount,
  max,
  testID,
  style,
  className,
}: WebRatingProps): React.JSX.Element {
  const theme = resolveRatingTheme();
  void max;

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4,
    ...style,
  };

  return (
    <div className={className} style={rowStyle} data-testid={testID}>
      <span
        aria-hidden="true"
        style={{ color: theme.starColor, fontSize: theme.fontSize }}
      >
        ★
      </span>
      <strong
        style={{
          color: theme.valueColor,
          fontSize: theme.fontSize,
          fontWeight: 600,
        }}
      >
        {value}
      </strong>
      {reviewCount !== undefined ? (
        <span style={{ color: theme.textColor, fontSize: theme.fontSize }}>
          {`${reviewCount} Ulasan`}
        </span>
      ) : null}
    </div>
  );
}
