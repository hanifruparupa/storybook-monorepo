import { View, type StyleProp, type TextStyle, type ViewStyle } from "react-native";
import type {
  CardActionsProps,
  CardImageProps,
  CardMediaProps,
  CardSectionProps,
  CardTitleProps,
} from "@repo/primitives";
import { resolveCardSectionTheme } from "@repo/primitives";
import { space } from "@repo/tokens";
import { Image } from "../Image/Image";
import { Text } from "../Text/Text";

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

export interface NativeCardImageProps extends CardImageProps {
  style?: StyleProp<ViewStyle>;
}

export function CardImage({
  source,
  alt,
  aspectRatio,
  radius,
  children,
  testID,
  style,
}: NativeCardImageProps) {
  return (
    <View testID={testID} style={[{ position: "relative", width: "100%" }, style]}>
      <Image source={source} alt={alt} aspectRatio={aspectRatio ?? 1} radius={radius ?? 0} />
      {children}
    </View>
  );
}

export interface NativeCardTitleProps extends CardTitleProps {
  style?: StyleProp<TextStyle>;
}

export function CardTitle({
  children,
  variant,
  numberOfLines,
  testID,
  style,
}: NativeCardTitleProps) {
  return (
    <Text variant={variant ?? "title"} numberOfLines={numberOfLines} testID={testID} style={style}>
      {children}
    </Text>
  );
}

export interface NativeCardMediaProps extends CardMediaProps {
  style?: StyleProp<ViewStyle>;
}

export function CardMedia({ children, testID, style }: NativeCardMediaProps) {
  const t = resolveCardSectionTheme("media");
  return (
    <View
      testID={testID}
      style={[
        {
          padding: t.padding,
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

export interface NativeCardActionsProps extends CardActionsProps {
  style?: StyleProp<ViewStyle>;
}

export function CardActions({ children, align = "end", testID, style }: NativeCardActionsProps) {
  const t = resolveCardSectionTheme("actions");
  const justifyContent =
    align === "start"
      ? "flex-start"
      : align === "center"
        ? "center"
        : align === "between"
          ? "space-between"
          : "flex-end";
  return (
    <View
      testID={testID}
      style={[
        {
          padding: t.padding,
          ...(t.borderEdge === "bottom"
            ? { borderBottomWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
          ...(t.borderEdge === "top"
            ? { borderTopWidth: t.borderWidth, borderColor: t.borderColor }
            : null),
          flexDirection: "row",
          alignItems: "center",
          gap: space.sm,
          justifyContent,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
