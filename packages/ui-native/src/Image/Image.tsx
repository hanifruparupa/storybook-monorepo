import FastImage from "react-native-fast-image";
import { type ImageStyle, type StyleProp } from "react-native";
import type { ImageProps } from "@repo/primitives";
import { resolveImageTheme } from "@repo/primitives";

export interface NativeImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
}

/**
 * Native implementation of the shared `Image` atom, backed by
 * `react-native-fast-image` (caching + priority).
 *
 * Metro resolves this file on iOS/Android. Web bundlers resolve the sibling
 * `Image.web.tsx` instead (see that file), so `react-native-fast-image` never
 * ends up in a web bundle.
 */
export function Image({ source, alt, aspectRatio, radius, testID, style }: NativeImageProps) {
  const t = resolveImageTheme();
  return (
    <FastImage
      source={{ uri: source }}
      resizeMode={FastImage.resizeMode.cover}
      accessibilityLabel={alt}
      testID={testID}
      style={[
        {
          width: "100%",
          aspectRatio: aspectRatio ?? 1,
          borderRadius: radius ?? t.radius,
          backgroundColor: t.backgroundColor,
        },
        style,
      ]}
    />
  );
}
