import { Pressable, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { ProductCardProps } from "@repo/primitives";
import { formatCurrency, resolveCashbackTheme } from "@repo/primitives";
import { colors, space, radii } from "@repo/tokens";
import { Text } from "../Text/Text";
import { Image } from "../Image/Image";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Rating } from "../Rating/Rating";
import { Price } from "../Price/Price";

export interface NativeProductCardProps extends ProductCardProps {
  style?: StyleProp<ViewStyle>;
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
  rating,
  reviewCount,
  cashback,
  testID,
  style,
  onPress,
}: NativeProductCardProps) {
  const cashbackTheme = resolveCashbackTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole="button"
      testID={testID}
      style={style}
    >
      <Card variant="plain" style={{ padding: 0, overflow: "hidden", width: "100%" }}>
        <View style={styles.media}>
          <Image source={imageUrl} alt={imageAlt} aspectRatio={1} radius={0} />
          {badgeLabel ? (
            <View style={cashback ? styles.badgeOverlayTop : styles.badgeOverlay}>
              <Badge variant="chip" label={badgeLabel} />
            </View>
          ) : null}
          {cashback ? (
            <View style={[styles.cashbackBanner, { backgroundColor: cashbackTheme.backgroundColor }]}>
              <Text variant="label" style={{ color: cashbackTheme.labelColor, fontWeight: "600" }}>
                {cashback.label ?? "Cashback"}
              </Text>
              <Text variant="caption" style={{ color: cashbackTheme.labelColor, fontSize: 11 }}>
                {cashback.prefix ?? "hingga"}
              </Text>
              <Text
                variant="body"
                style={{
                  color: cashbackTheme.textColor,
                  fontWeight: "700",
                  fontSize: cashbackTheme.amountFontSize,
                }}
              >
                {formatCurrency(cashback.amount, { abbreviate: true })}
              </Text>
              {cashback.freeShipping ? (
                <View
                  style={{
                    marginLeft: "auto",
                    backgroundColor: cashbackTheme.shippingBackgroundColor,
                    borderRadius: radii.sm,
                    paddingHorizontal: space.sm,
                    paddingVertical: space.xs,
                  }}
                >
                  <Text
                    variant="caption"
                    numberOfLines={1}
                    style={{
                      color: cashbackTheme.shippingTextColor,
                      fontSize: 11,
                      fontWeight: "700",
                    }}
                  >
                    GRATIS ONGKIR
                  </Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
        <View style={styles.body}>
          <Text variant="body" numberOfLines={2}>
            {title}
          </Text>
          <Price price={price} originalPrice={originalPrice} discountPercent={discountPercent} />
          {promoText ? (
            <View style={styles.promo}>
              <Text variant="label" style={{ color: colors.promoText }}>
                ⓘ
              </Text>
              <Text variant="label" numberOfLines={1} style={{ color: colors.promoText, flexShrink: 1 }}>
                {promoText}
              </Text>
            </View>
          ) : null}
          {typeof rating === "number" ? <Rating value={rating} reviewCount={reviewCount} /> : null}
        </View>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  media: {
    position: "relative",
  },
  badgeOverlay: {
    position: "absolute",
    left: space.sm,
    bottom: space.sm,
  },
  badgeOverlayTop: {
    position: "absolute",
    top: space.sm,
    left: space.sm,
  },
  cashbackBanner: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
  },
  body: {
    padding: space.md,
    gap: space.sm,
  },
  promo: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.xs,
    backgroundColor: colors.promoBg,
    paddingHorizontal: space.sm,
    paddingVertical: space.xs,
    borderRadius: radii.sm,
  },
});
