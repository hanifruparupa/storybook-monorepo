import { createContext, useContext, type ReactNode } from "react";
import { useWindowDimensions } from "react-native";
import { resolveBreakpoint } from "@repo/primitives";
import type { Breakpoint } from "@repo/tokens";

const BreakpointContext = createContext<Breakpoint | null>(null);

export function BreakpointProvider({ value, children }: { value: Breakpoint; children: ReactNode }) {
  return <BreakpointContext.Provider value={value}>{children}</BreakpointContext.Provider>;
}

export function useBreakpoint(): Breakpoint {
  const provided = useContext(BreakpointContext);
  const { width } = useWindowDimensions();
  return provided ?? resolveBreakpoint(width);
}
