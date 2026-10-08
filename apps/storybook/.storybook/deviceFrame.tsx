import * as React from "react";

export const deviceViewports = {
  iphone15: { name: "iPhone 15", type: "mobile", styles: { width: "393px", height: "852px" } },
  laptop: { name: "Laptop", type: "desktop", styles: { width: "1280px", height: "800px" } },
} as const;

export function IPhoneFrame({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div
      style={{
        background: "#0B0B0F",
        borderRadius: 44,
        padding: 12,
        width: 417,
        maxWidth: "100%",
        margin: "0 auto",
        boxSizing: "border-box",
        boxShadow: "0 20px 50px rgba(0,0,0,.35)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 120,
          height: 26,
          background: "#0B0B0F",
          borderBottomLeftRadius: 14,
          borderBottomRightRadius: 14,
          zIndex: 2,
        }}
      />
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: 32,
          width: 393,
          maxWidth: "100%",
          boxSizing: "border-box",
          minHeight: 812,
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>{children}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 8,
            paddingTop: 8,
          }}
        >
          <div
            style={{
              width: 120,
              height: 5,
              borderRadius: 999,
              background: "#D1D5DB",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export function LaptopFrame({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        boxSizing: "border-box",
        // Definite width from the viewport (not `100%`, which collapses under
        // Storybook's shrink-to-fit centered layout).
        width: "min(1000px, 92vw)",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "#111827",
          borderRadius: 16,
          padding: 12,
          width: "100%",
          boxSizing: "border-box",
          boxShadow: "0 18px 40px rgba(0,0,0,.25)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: 8,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: "#374151",
            }}
          />
        </div>
        <div
          tabIndex={0}
          style={{
            background: "#FFFFFF",
            borderRadius: 8,
            height: 600,
            width: "100%",
            boxSizing: "border-box",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
      <div
        style={{
          width: "112%",
          height: 14,
          alignSelf: "center",
          background: "linear-gradient(#d1d5db, #9ca3af)",
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          marginTop: 0,
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

export function deviceFrameDecorator(
  Story: () => React.ReactElement,
  context: { title?: string },
): React.ReactElement {
  const title = context?.title ?? "";
  if (title.startsWith("Native")) {
    return (
      <IPhoneFrame>
        <Story />
      </IPhoneFrame>
    );
  }
  if (title.startsWith("Web")) {
    return (
      <LaptopFrame>
        <Story />
      </LaptopFrame>
    );
  }
  return <Story />;
}
