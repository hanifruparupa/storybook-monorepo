import { View, type StyleProp, type ViewStyle } from "react-native";
import type { CardProps } from "@repo/primitives";
import { resolveCardTheme } from "@repo/primitives";

export interface NativeCardProps extends CardProps {
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, variant = "plain", testID, style }: NativeCardProps) {
  const t = resolveCardTheme(variant);
  return (
    <View
      testID={testID}
      style={[
        {
          backgroundColor: t.backgroundColor,
          borderColor: t.borderColor,
          borderWidth: t.borderWidth,
          borderRadius: t.radius,
          padding: t.padding,
        },
        t.hasShadow
          ? {
              shadowColor: "#101828",
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            }
          : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}
