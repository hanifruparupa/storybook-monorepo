import { Pressable, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { IconButtonProps } from "@repo/primitives";
import { resolveButtonSize, resolveIconButtonTheme } from "@repo/primitives";
import { useBreakpoint } from "../hooks/useBreakpoint";

export interface NativeIconButtonProps extends IconButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function IconButton({
  icon,
  accessibilityLabel,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  testID,
  style,
}: NativeIconButtonProps) {
  const breakpoint = useBreakpoint();
  const resolvedSize = resolveButtonSize(size, breakpoint);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      onPress={disabled ? undefined : onPress}
      testID={testID}
      style={({ pressed }) => {
        const t = resolveIconButtonTheme(variant, resolvedSize, disabled, pressed);
        return [
          {
            width: t.dimension,
            height: t.dimension,
            padding: 0,
            borderRadius: t.radius,
            borderWidth: t.borderWidth,
            borderColor: t.borderColor,
            backgroundColor: t.backgroundColor,
            alignItems: "center",
            justifyContent: "center",
          },
          style,
        ];
      }}
    >
      <View style={styles.content}>{icon}</View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
});
