import { useState, useEffect, RefObject, Ref } from "react";

interface Position {
  left: number;
  top: number;
}

interface UseModalPositionProps {
  containerRef: RefObject<HTMLElement>;
  anchorRef: RefObject<HTMLElement>;
  modalRef: RefObject<HTMLElement>;
}

export const useModalPosition = ({
  containerRef,
  anchorRef,
  modalRef,
}: UseModalPositionProps): Position => {
  const [modalStyle, setModalStyle] = useState<Position>({ left: 0, top: 0 });

  useEffect(() => {
    if (anchorRef.current && modalRef.current && containerRef.current) {
      const buttonPosition = anchorRef.current.getBoundingClientRect();
      const modalPosition = modalRef.current.getBoundingClientRect();
      const tableDimensions = containerRef!.current.getBoundingClientRect();
      const isLeft = buttonPosition.x < tableDimensions.width / 2;
      const isTop = buttonPosition.y < tableDimensions.height / 2;
      setModalStyle({
        left: isLeft
          ? buttonPosition.x + buttonPosition.width
          : buttonPosition.x - modalPosition.width,
        top: isTop
          ? buttonPosition.y + buttonPosition.height - buttonPosition.height
          : buttonPosition.y - modalPosition.height + buttonPosition.height,
      });
    }
  }, [anchorRef, modalRef, containerRef]);

  return modalStyle;
};
