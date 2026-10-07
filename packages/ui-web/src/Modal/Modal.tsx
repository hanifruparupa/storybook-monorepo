import * as React from "react";
import type { ModalProps } from "@repo/primitives";
import { resolveModalTheme } from "@repo/primitives";
import { space } from "@repo/tokens";
import { Text } from "../Text/Text";

export interface WebModalProps extends ModalProps {
  style?: React.CSSProperties;
  className?: string;
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
  className,
}: WebModalProps): React.JSX.Element | null {
  const theme = resolveModalTheme(placement);
  const duration = theme.duration;
  const [shown, setShown] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!visible) {
      setShown(false);
      return;
    }
    const frame = requestAnimationFrame(() => setShown(true));
    dialogRef.current?.focus();
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  React.useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onRequestClose?.();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, onRequestClose]);

  React.useEffect(() => {
    if (!visible) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [visible]);

  if (!visible) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    inset: 0,
    zIndex: 1000,
    display: "flex",
    alignItems: placement === "center" ? "center" : "flex-end",
    justifyContent: "center",
    padding: space.lg,
    backgroundColor: theme.backdropColor,
    opacity: shown ? 1 : 0,
    transition: `opacity ${duration}ms`,
  };

  const dialogStyle: React.CSSProperties = {
    backgroundColor: theme.surfaceColor,
    borderRadius: theme.radius,
    padding: theme.padding,
    width: "100%",
    maxWidth: theme.maxWidth,
    boxShadow: "0 20px 50px rgba(0,0,0,.3)",
    outline: "none",
    transition: `transform ${duration}ms, opacity ${duration}ms`,
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(12px)",
    ...style,
  };

  return (
    <div
      data-testid="modal-backdrop"
      style={overlayStyle}
      onClick={() => {
        if (dismissOnBackdropPress) onRequestClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "Dialog"}
        tabIndex={-1}
        ref={dialogRef}
        data-testid={testID}
        className={className}
        style={dialogStyle}
        onClick={(e) => e.stopPropagation()}
      >
        {title ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text variant="title">{title}</Text>
            {onRequestClose ? (
              <button
                type="button"
                aria-label="Close"
                onClick={onRequestClose}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: 18,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            ) : null}
          </div>
        ) : null}
        <div style={{ marginTop: title ? space.md : 0 }}>{children}</div>
      </div>
    </div>
  );
}
