import { Image as RNImage, type ImageStyle, type StyleProp } from "react-native";
import type { ImageProps } from "@repo/primitives";
import { resolveImageTheme } from "@repo/primitives";

export interface WebImageProps extends ImageProps {
  style?: StyleProp<ImageStyle>;
}

/**
 * Web implementation of the shared `Image` atom.
 *
 * Bundlers that target the web (Next.js, the aggregate Storybook via
 * `@storybook/react-native-web-vite`) resolve this `.web` file first, so the
 * native `react-native-fast-image` implementation is never pulled into a web
 * bundle.
 */
export function Image({ source, alt, aspectRatio, radius, testID, style }: WebImageProps) {
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
