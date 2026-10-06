import type { ButtonProps } from "@repo/primitives";
import { resolveButtonTheme } from "@repo/primitives";
import { Pressable, Text, StyleSheet, type StyleProp, type ViewStyle } from "react-native";

export interface NativeButtonProps extends ButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  onPress,
  testID,
  style,
}: NativeButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      testID={testID}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => {
        const t = resolveButtonTheme(variant, size, disabled, pressed);
        return [
          styles.base,
          {
            backgroundColor: t.backgroundColor,
            borderColor: t.borderColor,
            borderWidth: t.borderWidth,
            minHeight: t.minHeight,
            paddingHorizontal: t.paddingHorizontal,
            borderRadius: t.radius,
            opacity: t.opacity,
            alignSelf: fullWidth ? "stretch" : "flex-start",
            width: fullWidth ? "100%" : undefined,
          },
          style,
        ];
      }}
    >
      {({ pressed }) => {
        const t = resolveButtonTheme(variant, size, disabled, pressed);
        return (
          <Text
            style={[
              styles.label,
              {
                color: t.textColor,
                fontSize: t.fontSize,
                fontWeight: t.fontWeight,
              },
            ]}
          >
            {label}
          </Text>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    textAlign: "center",
  },
});
