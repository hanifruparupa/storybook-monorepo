import type { ButtonProps } from "@repo/primitives";
import { resolveButtonSize, resolveButtonTheme, resolveIconButtonTheme } from "@repo/primitives";
import { space } from "@repo/tokens";
import { Pressable, Text, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import { useBreakpoint } from "../hooks/useBreakpoint";

export interface NativeButtonProps extends ButtonProps {
  style?: StyleProp<ViewStyle>;
}

export function Button({
  label,
  accessibilityLabel,
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
  const iconOnly = label === undefined || label === "";
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      testID={testID}
      onPress={disabled ? undefined : onPress}
      style={({ pressed }) => {
        const theme = resolveButtonTheme(variant, resolvedSize, disabled, pressed);
        const iconTheme = resolveIconButtonTheme(variant, resolvedSize, disabled, pressed);
        return [
          styles.base,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
            borderWidth: theme.borderWidth,
            minHeight: theme.minHeight,
            borderRadius: theme.radius,
            opacity: theme.opacity,
            alignSelf: fullWidth ? "stretch" : "flex-start",
            width: fullWidth ? "100%" : undefined,
            ...(iconOnly
              ? {
                  width: iconTheme.dimension,
                  height: iconTheme.dimension,
                  paddingHorizontal: 0,
                }
              : { paddingHorizontal: theme.paddingHorizontal }),
          },
          style,
        ];
      }}
    >
      {({ pressed }) => {
        const t = resolveButtonTheme(variant, resolvedSize, disabled, pressed);
        if (iconOnly) {
          return <View style={styles.content}>{leftIcon ?? rightIcon}</View>;
        }
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
