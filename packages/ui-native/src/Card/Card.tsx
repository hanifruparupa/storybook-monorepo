import * as React from "react";
import { View, type StyleProp, type ViewStyle } from "react-native";
import type { CardProps } from "@repo/primitives";
import { resolveCardTheme } from "@repo/primitives";
import { CardActions, CardContent, CardFooter, CardHeader, CardImage, CardMedia, CardTitle } from "./CardSections";

export interface NativeCardProps extends CardProps {
  style?: StyleProp<ViewStyle>;
}

export function CardRoot({ children, variant = "plain", testID, style }: NativeCardProps) {
  const t = resolveCardTheme(variant);
  return (
    <View
      testID={testID}
      style={[
        {
          backgroundColor: t.backgroundColor,
          borderColor: t.borderColor,
          borderWidth: t.borderWidth,
          borderRadius: t.radius,
          padding: t.padding,
        },
        t.hasShadow
          ? {
              shadowColor: "#101828",
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 1,
            }
          : null,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export type CardComponent = ((props: NativeCardProps) => React.JSX.Element) & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
  Image: typeof CardImage;
  Title: typeof CardTitle;
  Media: typeof CardMedia;
  Actions: typeof CardActions;
};
export const Card: CardComponent = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Image: CardImage,
  Title: CardTitle,
  Media: CardMedia,
  Actions: CardActions,
});
