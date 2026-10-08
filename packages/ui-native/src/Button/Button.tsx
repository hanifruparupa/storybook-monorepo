import type { ButtonProps } from "@repo/primitives";
import { resolveButtonSize, resolveButtonTheme } from "@repo/primitives";
import { space } from "@repo/tokens";
import { Pressable, Text, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useBreakpoint } from "../hooks/useBreakpoint";

export interface NativeButtonProps extends ButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  onPress,
  testID,
  style,
}: NativeButtonProps) {
  const breakpoint = useBreakpoint();
  const resolvedSize = resolveButtonSize(size, breakpoint);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      testID={testID}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => {
        const t = resolveButtonTheme(variant, resolvedSize, disabled, pressed);
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
        const t = resolveButtonTheme(variant, resolvedSize, disabled, pressed);
        return (
          <View style={styles.content}>
            {leftIcon}
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
            {rightIcon}
          </View>
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.sm,
  },
  label: {
    textAlign: "center",
  },
});
