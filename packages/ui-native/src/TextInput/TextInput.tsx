import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { TextInputProps, TextInputState } from "@repo/primitives";
import { resolveTextInputTheme } from "@repo/primitives";

export interface NativeTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
}

export function TextInput({
  label,
  value,
  onChangeText,
  placeholder,
  leftIcon,
  rightIcon,
  onLeftIconPress,
  onRightIconPress,
  disabled,
  error,
  helperText,
  testID,
  style,
}: NativeTextInputProps) {
  const [focused, setFocused] = useState(false);

  const state: TextInputState = disabled
    ? "disabled"
    : error
      ? "error"
      : focused
        ? "focused"
        : "default";
  const t = resolveTextInputTheme(state);

  const message = error ?? helperText;

  const renderLeft = () => {
    if (!leftIcon) return null;
    if (onLeftIconPress) {
      return (
        <Pressable
          accessibilityRole="button"
          onPress={onLeftIconPress}
          disabled={disabled}
        >
          {leftIcon}
        </Pressable>
      );
    }
    return <View>{leftIcon}</View>;
  };

  const renderRight = () => {
    if (!rightIcon) return null;
    if (onRightIconPress) {
      return (
        <Pressable
          accessibilityRole="button"
          onPress={onRightIconPress}
          disabled={disabled}
        >
          {rightIcon}
        </Pressable>
      );
    }
    return <View>{rightIcon}</View>;
  };

  return (
    <View style={style}>
      {label ? (
        <Text style={[styles.label, { color: t.labelColor, fontSize: t.fontSize }]}>
          {label}
        </Text>
      ) : null}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: t.gap,
          minHeight: t.minHeight,
          borderWidth: t.borderWidth,
          borderColor: t.borderColor,
          borderRadius: t.radius,
          backgroundColor: t.backgroundColor,
          paddingHorizontal: t.paddingHorizontal,
        }}
      >
        {renderLeft()}
        <RNTextInput
          style={{ flex: 1, color: t.textColor, fontSize: t.fontSize, paddingVertical: 0 }}
          placeholder={placeholder}
          placeholderTextColor={t.placeholderColor}
          value={value}
          onChangeText={onChangeText}
          editable={!disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          testID={testID}
          accessibilityLabel={label ?? placeholder}
        />
        {renderRight()}
      </View>

      {message ? (
        <Text style={[styles.message, { color: t.helperColor }]}>{message}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
  },
  message: {
    fontSize: 12,
    marginTop: 6,
  },
});
