import { Text, View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import type { BadgeProps } from "@repo/primitives";
import { resolveBadgeTheme } from "@repo/primitives";

export interface NativeBadgeProps extends BadgeProps {
  style?: StyleProp<ViewStyle>;
}

export function Badge({ label, variant = "neutral", testID, style }: NativeBadgeProps) {
  const t = resolveBadgeTheme(variant);
  return (
    <View
      testID={testID}
      style={[
        {
          alignSelf: "flex-start",
          backgroundColor: t.backgroundColor,
          borderRadius: t.radius,
          paddingHorizontal: t.paddingX,
          paddingVertical: t.paddingY,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: t.textColor,
          fontSize: t.fontSize,
          fontWeight: t.fontWeight as TextStyle["fontWeight"],
        }}
      >
        {label}
      </Text>
    </View>
  );
}
