import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { resolveBreakpoint } from "@repo/primitives";
import { breakpointOrder, breakpoints, type Breakpoint } from "@repo/tokens";

const BreakpointContext = createContext<Breakpoint | null>(null);

export function BreakpointProvider({
  value,
  children,
}: {
  value: Breakpoint;
  children: ReactNode;
}): React.JSX.Element {
  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
}

export function useBreakpoint(): Breakpoint {
  const provided = useContext(BreakpointContext);
  // SSR-safe default (hydration-stable)
  const [detected, setDetected] = useState<Breakpoint>("md");

  useEffect(() => {
    if (provided) return;
    const update = (): void => {
      setDetected(resolveBreakpoint(window.innerWidth));
    };
    update();
    const mqls = breakpointOrder.map((bp) =>
      window.matchMedia(`(min-width: ${breakpoints[bp]}px)`),
    );
    mqls.forEach((m) => m.addEventListener("change", update));
    return () => {
      mqls.forEach((m) => m.removeEventListener("change", update));
    };
  }, [provided]);

  return provided ?? detected;
}
