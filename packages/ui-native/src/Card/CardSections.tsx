import { View, type StyleProp, type ViewStyle } from "react-native";
import type { CardSectionProps } from "@repo/primitives";
import { resolveCardSectionTheme } from "@repo/primitives";

export interface NativeCardSectionProps extends CardSectionProps {
  style?: StyleProp<ViewStyle>;
}

export function CardHeader({ children, flush = false, testID, style }: NativeCardSectionProps) {
  const t = resolveCardSectionTheme("header");
  return (
    <View
      testID={testID}
      style={[
        {
          padding: flush ? 0 : t.padding,
          ...(t.borderEdge === "bottom"
            ? { borderBottomWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
          ...(t.borderEdge === "top"
            ? { borderTopWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardContent({ children, flush = false, testID, style }: NativeCardSectionProps) {
  const t = resolveCardSectionTheme("content");
  return (
    <View
      testID={testID}
      style={[
        {
          padding: flush ? 0 : t.padding,
          ...(t.borderEdge === "bottom"
            ? { borderBottomWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
          ...(t.borderEdge === "top"
            ? { borderTopWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardFooter({ children, flush = false, testID, style }: NativeCardSectionProps) {
  const t = resolveCardSectionTheme("footer");
  return (
    <View
      testID={testID}
      style={[
        {
          padding: flush ? 0 : t.padding,
          ...(t.borderEdge === "bottom"
            ? { borderBottomWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
          ...(t.borderEdge === "top"
            ? { borderTopWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
