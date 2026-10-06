import { Text as RNText, type StyleProp, type TextStyle } from "react-native";
import type { TextProps } from "@repo/primitives";
import { resolveTextTheme } from "@repo/primitives";

export interface NativeTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

export function Text({ children, variant = "body", numberOfLines, testID, style }: NativeTextProps) {
  const t = resolveTextTheme(variant);
  return (
    <RNText
      numberOfLines={numberOfLines}
      testID={testID}
      style={[
        {
          fontSize: t.fontSize,
          fontWeight: t.fontWeight as TextStyle["fontWeight"],
          color: t.color,
          lineHeight: t.lineHeight,
        },
        style,
      ]}
    >
      {children}
    </RNText>
  );
}
