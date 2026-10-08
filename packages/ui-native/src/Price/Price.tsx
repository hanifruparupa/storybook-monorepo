import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import type { PriceProps } from "@repo/primitives";
import { formatCurrency, resolveDiscountPercent, resolvePriceTheme } from "@repo/primitives";
import { Badge } from "../Badge/Badge";

export interface NativePriceProps extends PriceProps {
  style?: StyleProp<ViewStyle>;
}

export function Price({
  price,
  originalPrice,
  discountPercent,
  abbreviate,
  testID,
  style,
}: NativePriceProps) {
  const t = resolvePriceTheme();
  const discount = discountPercent ?? resolveDiscountPercent(price, originalPrice);

  return (
    <View
      testID={testID}
      style={[{
        flexDirection: 'column',
        alignItems: 'stretch',
        gap: 8
      }, style]}
    >
      <View
        style={[{ flexDirection: "row", alignItems: "center", columnGap: 4 }, style]}
      >
        {typeof originalPrice === "number" ? (
          <Text
            style={{
              color: t.originalColor,
              fontSize: t.originalFontSize,
              textDecorationLine: "line-through",
            }}
          >
            {formatCurrency(originalPrice)}
          </Text>
        ) : null}
        {typeof discount === "number" && discount > 0 ? <Badge variant="discount" label={`${discount}%`} /> : null}
      </View>
      <Text
        style={{
          color: t.priceColor,
          fontSize: t.priceFontSize,
          fontWeight: t.fontWeight as TextStyle["fontWeight"],
        }}
      >
        {formatCurrency(price, { abbreviate })}
      </Text>
    </View>


  );
}
