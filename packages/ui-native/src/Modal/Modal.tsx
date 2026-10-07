import { Modal as RNModal, Pressable, View, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import type { ModalProps } from "@repo/primitives";
import { resolveModalTheme } from "@repo/primitives";
import { space } from "@repo/tokens";
import { Text } from "../Text/Text";

export interface NativeModalProps extends ModalProps {
  style?: StyleProp<ViewStyle>;
}

export function Modal({
  visible,
  onRequestClose,
  title,
  children,
  placement = "center",
  dismissOnBackdropPress = true,
  testID,
  style,
}: NativeModalProps) {
  const theme = resolveModalTheme(placement);

  return (
    <RNModal
      visible={visible}
      transparent
      statusBarTranslucent
      animationType={placement === "bottom-sheet" ? "slide" : "fade"}
      onRequestClose={onRequestClose}
    >
      <Pressable
        testID="modal-backdrop"
        onPress={() => {
          if (dismissOnBackdropPress) onRequestClose?.();
        }}
        style={[
          styles.backdrop,
          {
            backgroundColor: theme.backdropColor,
            justifyContent: placement === "center" ? "center" : "flex-end",
            padding: space.lg,
          },
        ]}
      >
        <Pressable
          testID={testID ?? "modal-content"}
          accessibilityRole="dialog"
          accessibilityLabel={title ?? "Dialog"}
          onPress={() => {}}
          style={[
            styles.surface,
            {
              backgroundColor: theme.surfaceColor,
              borderRadius: theme.radius,
              padding: theme.padding,
              maxWidth: theme.maxWidth,
            },
            style,
          ]}
        >
          {title ? (
            <View style={styles.header}>
              <Text variant="title">{title}</Text>
              {onRequestClose ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Close"
                  onPress={onRequestClose}
                  hitSlop={8}
                  style={styles.close}
                >
                  <Text style={{ fontSize: 18 }}>✕</Text>
                </Pressable>
              ) : null}
            </View>
          ) : null}
          <View style={{ marginTop: title ? space.md : 0 }}>
            {typeof children === "string" ? <Text>{children}</Text> : children}
          </View>
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
  },
  surface: {
    width: "100%",
    shadowColor: "#101828",
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  close: {
    padding: 4,
  },
});
