import { useEffect, useRef } from "react";
import { Animated, type StyleProp, type ViewStyle } from "react-native";
import type { SkeletonProps } from "@repo/primitives";
import { resolveSkeletonTheme } from "@repo/primitives";

export interface NativeSkeletonProps extends SkeletonProps {
  style?: StyleProp<ViewStyle>;
}

export function Skeleton({
  variant = "text",
  width,
  height,
  animate = true,
  testID,
  style,
}: NativeSkeletonProps) {
  const theme = resolveSkeletonTheme(variant);
  const defaultWidth = variant === "circle" ? 40 : "100%";
  const defaultHeight = variant === "circle" ? 40 : variant === "rect" ? 80 : 14;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (animate === false) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: theme.duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: theme.duration / 2,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [animate, opacity, theme.duration]);

  return (
    <Animated.View
      testID={testID}
      accessible={false}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          backgroundColor: theme.baseColor,
          borderRadius: theme.radius,
          width: (width ?? defaultWidth) as ViewStyle["width"],
          height: height ?? defaultHeight,
          opacity,
        },
        style,
      ]}
    />
  );
}
