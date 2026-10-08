import { useEffect, useRef, useState } from "react";
import { Animated, Easing, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { BannerProps } from "@repo/primitives";
import { colors, motion, space, radii } from "@repo/tokens";
import { Image } from "../Image/Image";

export interface NativeBannerProps extends BannerProps {
  style?: StyleProp<ViewStyle>;
}

export function Banner({
  slides,
  duration = motion.slide,
  autoPlay = true,
  aspectRatio = 16 / 9,
  transition = "slide",
  onIndexChange,
  testID,
  style,
}: NativeBannerProps) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const enter = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % slides.length), duration);
    return () => clearTimeout(id);
  }, [index, autoPlay, duration, slides.length]);

  useEffect(() => {
    if (!autoPlay || slides.length <= 1) return;
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    });
    anim.start();
    return () => anim.stop();
  }, [index, autoPlay, duration, slides.length, progress]);

  useEffect(() => {
    if (transition === "none" || slides.length <= 1) return;
    enter.setValue(0);
    const anim = Animated.timing(enter, {
      toValue: 1,
      duration: motion.base,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    });
    anim.start();
    return () => anim.stop();
  }, [index, transition, slides.length, enter]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  if (slides.length === 0) return null;

  const slide = slides[index];
  if (!slide) return null;

  return (
    <View
      style={[{ position: "relative", width: "100%" }, style]}
      testID={testID}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      <Animated.View
        style={[
          { overflow: "hidden" },
          transition === "slide"
            ? {
                transform: [
                  {
                    translateX: enter.interpolate({
                      inputRange: [0, 1],
                      outputRange: [width || 1, 0],
                    }),
                  },
                ],
              }
            : transition === "fade"
              ? { opacity: enter }
              : null,
        ]}
      >
        <Image source={slide.imageUrl} alt={slide.alt} aspectRatio={aspectRatio} radius={0} />
      </Animated.View>
      <View style={styles.dots}>
        {slides.map((_, i) =>
          i === index ? (
            <View key={i} testID={`banner-dot-${i}`} style={styles.activeDot}>
              <Animated.View
                style={{
                  height: "100%",
                  backgroundColor: colors.primary,
                  width: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0%", "100%"],
                  }),
                }}
              />
            </View>
          ) : (
            <View key={i} testID={`banner-dot-${i}`} style={styles.dot} />
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dots: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: space.sm,
    flexDirection: "row",
    justifyContent: "center",
    gap: space.xs,
  },
  activeDot: {
    width: 24,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    opacity: 0.6,
    overflow: "hidden",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    opacity: 0.6,
  },
});
