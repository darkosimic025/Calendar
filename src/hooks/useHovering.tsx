import React, { EventHandler, RefObject } from "react";
import { Node } from "typescript";

export const useHovering = (ref: RefObject<HTMLElement>): boolean => {
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const node = ref.current;
    const on = () => {
      setHovering(true);
    };
    const off = () => {
      setHovering(false);
    };
    const outsideOff = React.useCallback(
      (e: any) => {
        if (node && !node.contains(e.target)) {
          setHovering(false);
        }
      },
      [node],
    );
    node.addEventListener("mouseenter", on);
    node.addEventListener("mouseleave", off);
    node.addEventListener("mousemove", on);
    node.addEventListener("focus", on);
    node.addEventListener("blur", off);
    document.addEventListener("mousemove", outsideOff);
    return () => {
      node.removeEventListener("mouseenter", on);
      node.removeEventListener("mouseleave", off);
      node.removeEventListener("mousemove", on);
      node.removeEventListener("focus", on);
      node.removeEventListener("blur", off);
      document.removeEventListener("mousemove", outsideOff);
    };
  }, [setHovering]);

  return hovering;
};
