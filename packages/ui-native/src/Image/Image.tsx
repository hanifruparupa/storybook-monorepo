import { Image as RNImage, type ImageStyle, type StyleProp } from "react-native";
import type { ImageProps } from "@repo/primitives";
import { resolveImageTheme } from "@repo/primitives";

export interface NativeImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
}

export function Image({ source, alt, aspectRatio, radius, testID, style }: NativeImageProps) {
  const t = resolveImageTheme();
  return (
    <RNImage
      source={{ uri: source }}
      resizeMode="cover"
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
