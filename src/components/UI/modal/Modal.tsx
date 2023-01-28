import React, { useState, useRef, forwardRef, useEffect, Ref } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useModalPosition } from "../../../hooks/useModalPosition";
import ReactDOM from "react-dom";
import { useClickOutside } from "../../../hooks/useClickOutsideClose";

const ModalContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled(motion.div)`
  background: white;
  padding: 20px;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export type TableDimensions = {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: any;
  buttonRef: React.RefObject<HTMLButtonElement>;
  modalRef: React.RefObject<HTMLDivElement>;
  ref: Ref<HTMLTableElement>;
  tableDimensions?: TableDimensions;
}

const Modal: React.FC<Props> = forwardRef(
  ({ isOpen, onClose, children, buttonRef, modalRef }: Props, ref: any) => {
    const modalStyle = useModalPosition({
      containerRef: ref,
      anchorRef: buttonRef,
      modalRef,
    });
    useClickOutside(modalRef, onClose, isOpen);

    const modal = (
      <AnimatePresence>
        <ModalContainer
          style={{
            width: "100%",
            height: "100%",
          }}
          onClick={() => onClose()}
        >
          <ModalContent
            ref={modalRef}
            style={{
              borderRadius: "5px",
              boxShadow:
                "0px 4px 4px 0px rgba(60,64,67,0.3),0px 8px 12px 6px rgba(60,64,67,0.15)",

              width: "300px",
              position: "absolute",
              ...modalStyle,
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
          </ModalContent>
        </ModalContainer>
      </AnimatePresence>
    );
    return isOpen
      ? ReactDOM.createPortal(
          modal,
          document.getElementById("modal-root") as HTMLDivElement
        )
      : null;
  }
);

export default Modal;
