import * as React from "react";
import type { CSSProperties } from "react";
import type { PriceProps } from "@repo/primitives";
import {
  formatCurrency,
  resolveDiscountPercent,
  resolvePriceTheme,
} from "@repo/primitives";
import { Badge } from "../Badge/Badge";

export interface WebPriceProps extends PriceProps {
  style?: CSSProperties;
  className?: string;
}

export function Price({
  price,
  originalPrice,
  discountPercent,
  abbreviate,
  testID,
  style,
  className,
}: WebPriceProps): React.JSX.Element {
  const theme = resolvePriceTheme();
  const discount = discountPercent ?? resolveDiscountPercent(price, originalPrice);

  const rowStyle: CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    gap: 8,
    flexWrap: "wrap",
    ...style,
  };

  return (
    <div className={className} style={rowStyle} data-testid={testID}>
      {originalPrice !== undefined ? (
        <span
          style={{
            textDecoration: "line-through",
            color: theme.originalColor,
            fontSize: theme.originalFontSize,
          }}
        >
          {formatCurrency(originalPrice)}
        </span>
      ) : null}
      {discount !== undefined ? <Badge variant="discount" label={`${discount}%`} /> : null}
      <span
        style={{
          color: theme.priceColor,
          fontSize: theme.priceFontSize,
          fontWeight: theme.fontWeight,
        }}
      >
        {formatCurrency(price, { abbreviate })}
      </span>
    </div>
  );
}
