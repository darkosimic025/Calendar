import { motion, AnimatePresence } from "framer-motion";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { useClickOutside } from "../../../hooks/useClickOutsideClose";
import { usePopoverPosition } from "../../../hooks/useModalPosition";
import type { Ref } from "react";

const PopoverContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopoverContent = styled(motion.div)`
  background: ${({ theme }) => theme.popover.colors.background};
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export interface TableDimensions {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  buttonRef: React.RefObject<HTMLButtonElement>;
  popoverRef: React.RefObject<HTMLDivElement>;
  ref: Ref<HTMLTableElement>;
  tableDimensions?: TableDimensions;
}

const Popover: React.FC<Props> = forwardRef(
  ({ isOpen, onClose, children, buttonRef, popoverRef }: Props, ref: any) => {
    const popoverStyle = usePopoverPosition({
      containerRef: ref,
      anchorRef: buttonRef,
      popoverRef,
    });
    useClickOutside(popoverRef, onClose, isOpen);

    const popover = (
      <AnimatePresence>
        <PopoverContainer
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={() => {
            onClose();
          }}
        >
          <PopoverContent
            ref={popoverRef}
            style={{
              borderRadius: "5px",
              boxShadow:
                "0px 4px 4px 0px rgba(60,64,67,0.3),0px 8px 12px 6px rgba(60,64,67,0.15)",

              width: "300px",
              position: "absolute",
              ...popoverStyle,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </PopoverContent>
        </PopoverContainer>
      </AnimatePresence>
    );
    return isOpen
      ? ReactDOM.createPortal(
          popover,
          document.getElementById("popover-root") as HTMLDivElement,
        )
      : null;
  },
);

Popover.displayName = "Popover";

export default Popover;
