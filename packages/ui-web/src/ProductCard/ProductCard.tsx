import * as React from "react";
import type { CSSProperties } from "react";
import type { ProductCardProps } from "@repo/primitives";
import { formatCurrency, resolveCashbackTheme } from "@repo/primitives";
import { colors, radii, space } from "@repo/tokens";
import { Text } from "../Text/Text";
import { Image } from "../Image/Image";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Rating } from "../Rating/Rating";
import { Price } from "../Price/Price";

export interface WebProductCardProps extends ProductCardProps {
  style?: CSSProperties;
  className?: string;
  onPress?: () => void;
}

export function ProductCard({
  imageUrl,
  imageAlt,
  title,
  badgeLabel,
  price,
  originalPrice,
  discountPercent,
  promoText,
  cashback,
  rating,
  reviewCount,
  testID,
  style,
  className,
  onPress,
}: WebProductCardProps): React.JSX.Element {
  const cardStyle: CSSProperties = {
    padding: 0,
    overflow: "hidden",
    width: "100%",
    ...style,
  };

  const cashbackTheme = resolveCashbackTheme();
  const hasCashback = cashback !== undefined;

  const content = (
    <>
      <div style={{ position: "relative" }}>
        <Image source={imageUrl} alt={imageAlt} aspectRatio={1} radius={0} />
        {badgeLabel !== undefined && badgeLabel !== "" ? (
          <Badge
            variant="chip"
            label={badgeLabel}
            style={
              hasCashback
                ? {
                    position: "absolute",
                    top: space.sm,
                    left: space.sm,
                    boxShadow: "0 1px 4px rgba(16,24,40,.25)",
                  }
                : {
                    position: "absolute",
                    left: space.sm,
                    bottom: space.sm,
                    boxShadow: "0 1px 4px rgba(16,24,40,.25)",
                  }
            }
          />
        ) : null}
        {cashback !== undefined ? (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: space.xs,
              padding: `${space.xs}px ${space.sm}px`,
              backgroundColor: cashbackTheme.backgroundColor,
            }}
          >
            <Text
              variant="label"
              style={{ color: cashbackTheme.labelColor, fontWeight: 600 }}
            >
              {cashback.label ?? "Cashback"}
            </Text>
            <Text
              variant="caption"
              style={{ color: cashbackTheme.labelColor, fontSize: 11 }}
            >
              {cashback.prefix ?? "hingga"}
            </Text>
            <Text
              variant="body"
              style={{
                color: cashbackTheme.textColor,
                fontWeight: 700,
                fontSize: cashbackTheme.amountFontSize,
              }}
            >
              {formatCurrency(cashback.amount, { abbreviate: true })}
            </Text>
            {cashback.freeShipping === true ? (
              <span
                style={{
                  marginLeft: "auto",
                  backgroundColor: cashbackTheme.shippingBackgroundColor,
                  color: cashbackTheme.shippingTextColor,
                  borderRadius: radii.sm,
                  padding: `${space.xs}px ${space.sm}px`,
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                GRATIS ONGKIR
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <div
        style={{
          padding: space.md,
          display: "flex",
          flexDirection: "column",
          gap: space.sm,
        }}
      >
        <Text variant="body" numberOfLines={2}>
          {title}
        </Text>

        <Price
          price={price}
          originalPrice={originalPrice}
          discountPercent={discountPercent}
        />

        {promoText !== undefined && promoText !== "" ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: space.xs,
              backgroundColor: colors.promoBg,
              color: colors.promoText,
              padding: `${space.xs}px ${space.sm}px`,
              borderRadius: radii.sm,
              overflow: "hidden",
            }}
          >
            <span
              aria-hidden="true"
              style={{ color: colors.promoText, flexShrink: 0 }}
            >
              ⓘ
            </span>
            <Text
              variant="label"
              numberOfLines={1}
              style={{ color: colors.promoText, flex: 1, minWidth: 0 }}
            >
              {promoText}
            </Text>
          </div>
        ) : null}

        {rating !== undefined ? (
          <Rating value={rating} reviewCount={reviewCount} />
        ) : null}
      </div>
    </>
  );

  if (onPress !== undefined) {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onPress();
      }
    };

    return (
      <div
        onClick={onPress}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={className}
        style={{ cursor: "pointer", ...style }}
        data-testid={testID}
      >
        <Card variant="plain" style={{ padding: 0, overflow: "hidden", width: "100%" }}>
          {content}
        </Card>
      </div>
    );
  }

  return (
    <Card variant="plain" style={cardStyle} className={className} testID={testID}>
      {content}
    </Card>
  );
}
