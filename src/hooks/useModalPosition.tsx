import { useState, useEffect } from "react";
import type { RefObject } from "react";

interface Position {
  left: number;
  top: number;
}

interface UsePopoverPositionProps {
  containerRef: RefObject<HTMLElement>;
  anchorRef: RefObject<HTMLElement>;
  popoverRef: RefObject<HTMLElement>;
}

export const usePopoverPosition = ({
  containerRef,
  anchorRef,
  popoverRef,
}: UsePopoverPositionProps): Position => {
  const [popoverStyle, setPopoverStyle] = useState<Position>({
    left: 0,
    top: 0,
  });

  useEffect(() => {
    if (
      anchorRef.current != null &&
      popoverRef.current != null &&
      containerRef.current != null
    ) {
      const buttonPosition = anchorRef.current.getBoundingClientRect();
      const popoverPosition = popoverRef.current.getBoundingClientRect();
      const tableDimensions = containerRef.current.getBoundingClientRect();
      const isLeft = buttonPosition.x < tableDimensions.width / 2;
      const isTop = buttonPosition.y < tableDimensions.height / 2;
      setPopoverStyle({
        left: isLeft
          ? buttonPosition.x + buttonPosition.width
          : buttonPosition.x - popoverPosition.width,
        top: isTop
          ? buttonPosition.y + buttonPosition.height - buttonPosition.height
          : buttonPosition.y - popoverPosition.height + buttonPosition.height,
      });
    }
  }, [anchorRef, popoverRef, containerRef]);

  return popoverStyle;
};
