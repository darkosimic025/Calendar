import { useState, useRef, useEffect, useCallback, RefObject } from "react";

function useLatest<T>(val: T): RefObject<T> {
  const ref = useRef(val);
  ref.current = val;
  return ref;
}

interface State {
  readonly currentBreakpoint: string;
  readonly observedWidth: number | null;
  readonly observedHeight: number | null;
  readonly entry?: ResizeObserverEntry;
}
interface Observe<T> {
  (element?: T | null): void;
}
interface Event<T> extends State {
  readonly entry: ResizeObserverEntry;
  observe: Observe<T>;
  unobserve: () => void;
}
interface OnResize<T> {
  (event: Event<T>): void;
}
interface ShouldUpdate {
  (state: State): boolean;
}
type Breakpoints = Record<string, number>;
export interface Options<T> {
  useBorderBoxSize?: boolean;
  breakpoints?: Breakpoints;
  updateOnBreakpointChange?: boolean;
  shouldUpdate?: ShouldUpdate;
  onResize?: OnResize<T>;
  polyfill?: any;
}
interface Return<T> extends Omit<Event<T>, "entry"> {
  entry?: ResizeObserverEntry;
}

const getCurrentBreakpoint = (bps: Breakpoints, w: number): string => {
  let curBp = "";
  let max = -1;

  Object.keys(bps).forEach((key: string) => {
    const val = bps[key];

    if (w >= val && val > max) {
      curBp = key;
      max = val;
    }
  });

  return curBp;
};

const useDimensions = <T extends HTMLElement | null>({
  useBorderBoxSize,
  breakpoints,
  updateOnBreakpointChange,
  shouldUpdate,
  onResize,
  polyfill,
}: Options<T> = {}): Return<T> => {
  const [state, setState] = useState<State>({
    currentBreakpoint: "",
    observedWidth: null,
    observedHeight: null,
  });
  const prevSizeRef = useRef<{ observedWidth?: number; observedHeight?: number }>({});
  const prevBreakpointRef = useRef<string>();
  const observerRef = useRef<ResizeObserver>();
  const warnedRef = useRef(false);
  const ref = useRef<T>();
  const onResizeRef = useLatest<OnResize<T> | undefined>(onResize);
  const shouldUpdateRef = useLatest<ShouldUpdate | undefined>(shouldUpdate);

  const unobserve = useCallback(() => {
    if (observerRef.current) observerRef.current.disconnect();
  }, []);

  const observe = useCallback<Observe<T>>(
    (element) => {
      if (element && element !== ref.current) {
        unobserve();
        ref.current = element;
        setState({
          currentBreakpoint: "",
          observedWidth: element.clientWidth,
          observedHeight: element.clientHeight,
        });
      }
      if (observerRef.current && ref.current)
        observerRef.current.observe(ref.current as HTMLElement);
    },
    [unobserve],
  );

  useEffect(() => {
    if (
      (!("ResizeObserver" in window) || !("ResizeObserverEntry" in window)) &&
      !polyfill
    ) {
      return () => null;
    }

    let raf: number | null = null;

    observerRef.current = new (polyfill || ResizeObserver)(([entry]: any) => {
      raf = requestAnimationFrame(() => {
        const { contentBoxSize, borderBoxSize, contentRect } = entry;

        let boxSize = contentBoxSize;
        if (useBorderBoxSize)
          if (borderBoxSize) {
            boxSize = borderBoxSize;
          } else if (!warnedRef.current) {
            warnedRef.current = true;
          }
        boxSize = Array.isArray(boxSize) ? boxSize[0] : boxSize;

        const observedWidth = boxSize ? boxSize.inlineSize : contentRect.observedWidth;
        const observedHeight = boxSize ? boxSize.blockSize : contentRect.observedHeight;

        if (
          observedWidth === prevSizeRef.current.observedWidth &&
          observedHeight === prevSizeRef.current.observedHeight
        )
          return;

        prevSizeRef.current = { observedWidth, observedHeight };

        const e = {
          currentBreakpoint: "",
          observedWidth,
          observedHeight,
          entry,
          observe,
          unobserve,
        };

        if (breakpoints) {
          e.currentBreakpoint = getCurrentBreakpoint(breakpoints, observedWidth);

          if (e.currentBreakpoint !== prevBreakpointRef.current) {
            if (onResizeRef.current) onResizeRef.current(e);
            prevBreakpointRef.current = e.currentBreakpoint;
          }
        } else if (onResizeRef.current) {
          onResizeRef.current(e);
        }

        const next = {
          currentBreakpoint: e.currentBreakpoint,
          observedWidth,
          observedHeight,
          entry,
        };

        if (shouldUpdateRef.current && !shouldUpdateRef.current(next)) return;

        if (
          !shouldUpdateRef.current &&
          breakpoints &&
          updateOnBreakpointChange
        ) {
          setState((prev) =>
            prev.currentBreakpoint !== next.currentBreakpoint ? next : prev,
          );
          return;
        }

        setState(next);
      });
    });

    observe();

    return () => {
      unobserve();
      if (raf) cancelAnimationFrame(raf);
    };
 
  }, [
   
    JSON.stringify(breakpoints),
    useBorderBoxSize,
    observe,
    unobserve,
    updateOnBreakpointChange,
  ]);

  return { ...state, observe, unobserve };
};

export default useDimensions;
