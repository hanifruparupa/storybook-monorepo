import { useId, useState, type CSSProperties } from "react";
import type { TextInputProps, TextInputState } from "@repo/primitives";
import { resolveTextInputTheme } from "@repo/primitives";

export interface WebTextInputProps extends TextInputProps {
  style?: CSSProperties;
  className?: string;
  type?: "text" | "email" | "password" | "search";
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
  className,
  type = "text",
}: WebTextInputProps) {
  const id = useId();
  const [focused, setFocused] = useState(false);

  const state: TextInputState = disabled
    ? "disabled"
    : error
      ? "error"
      : focused
        ? "focused"
        : "default";
  const t = resolveTextInputTheme(state);

  const helperId = `${id}-helper`;
  const message = error ?? helperText;

  const iconSlotStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    color: t.textColor,
  };

  const iconButtonStyle: CSSProperties = {
    ...iconSlotStyle,
    background: "transparent",
    border: "none",
    padding: 0,
    cursor: disabled ? "not-allowed" : "pointer",
  };

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", ...style }}
    >
      {label ? (
        <label
          htmlFor={id}
          style={{
            color: t.labelColor,
            fontSize: t.fontSize,
            marginBottom: 6,
            display: "block",
          }}
        >
          {label}
        </label>
      ) : null}

      <div
        style={{
          minHeight: t.minHeight,
          border: `${t.borderWidth}px solid ${t.borderColor}`,
          borderRadius: t.radius,
          backgroundColor: t.backgroundColor,
          paddingInline: t.paddingHorizontal,
          display: "flex",
          alignItems: "center",
          gap: t.gap,
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.7 : 1,
          ...(focused && !disabled
            ? { boxShadow: "0 0 0 3px rgba(29,100,242,.25)" }
            : null),
        }}
      >
        {leftIcon ? (
          onLeftIconPress ? (
            <button
              type="button"
              onClick={onLeftIconPress}
              disabled={disabled}
              aria-label="left action"
              style={iconButtonStyle}
            >
              {leftIcon}
            </button>
          ) : (
            <span style={iconSlotStyle}>{leftIcon}</span>
          )
        ) : null}

        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          {placeholder && value === "" ? (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                color: t.placeholderColor,
                fontSize: t.fontSize,
                pointerEvents: "none",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {placeholder}
            </span>
          ) : null}
          <input
            id={id}
            type={type}
            value={value}
            onChange={(e) => {
              if (disabled) return;
              onChangeText?.(e.target.value);
            }}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            data-testid={testID}
            aria-label={label ?? placeholder}
            aria-invalid={error ? true : undefined}
            aria-describedby={message ? helperId : undefined}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              minWidth: 0,
              width: "100%",
              color: t.textColor,
              fontSize: t.fontSize,
              padding: 0,
              position: "relative",
              zIndex: 1,
              fontFamily: "inherit",
            }}
          />
        </div>

        {rightIcon ? (
          onRightIconPress ? (
            <button
              type="button"
              onClick={onRightIconPress}
              disabled={disabled}
              aria-label="right action"
              style={iconButtonStyle}
            >
              {rightIcon}
            </button>
          ) : (
            <span style={iconSlotStyle}>{rightIcon}</span>
          )
        ) : null}
      </div>

      {message ? (
        <span
          id={helperId}
          style={{
            color: t.helperColor,
            fontSize: 12,
            marginTop: 6,
            display: "block",
          }}
        >
          {message}
        </span>
      ) : null}
    </div>
  );
}
