import { Text, View, type StyleProp, type ViewStyle } from "react-native";
import type { RatingProps } from "@repo/primitives";
import { resolveRatingTheme } from "@repo/primitives";

export interface NativeRatingProps extends RatingProps {
  style?: StyleProp<ViewStyle>;
}

export function Rating({ value, reviewCount, testID, style }: NativeRatingProps) {
  const t = resolveRatingTheme();
  return (
    <View testID={testID} style={[{ flexDirection: "row", alignItems: "center", gap: 4 }, style]}>
      <Text style={{ color: t.starColor, fontSize: t.fontSize }}>★</Text>
      <Text style={{ color: t.valueColor, fontSize: t.fontSize, fontWeight: "700" }}>{value}</Text>
      {typeof reviewCount === "number" ? (
        <Text style={{ color: t.textColor, fontSize: t.fontSize }}>{`${reviewCount} Ulasan`}</Text>
      ) : null}
    </View>
  );
}
