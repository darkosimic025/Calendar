import React, { useState, useRef, useEffect, ReactNode } from "react";
import styled from "styled-components";

const ResizableDiv = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  overflow: auto;
  position: relative;
`;

const ResizeHandle = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: #ddd;
  cursor: se-resize;
`;

interface Props {
  children: ReactNode;
}

const ResizeHOC = (WrappedComponent: React.ComponentType<any>) => {
  const WithResize: React.FC<any> = ({ children, ...args }) => {
    const [height, setHeight] = useState(200);
    const resizableRef = useRef<HTMLDivElement>(null);
    const resizeHandleRef = useRef<HTMLDivElement>(null);
    const resizeRef = useRef<any>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [initialY, setInitialY] = useState(0);
    const [initialHeight, setInitialHeight] = useState(0);

    useEffect(() => {
      console.log(resizeRef.current);
      const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing) return;
        e.preventDefault();
        const diffY = e.clientY - initialY;
        const newHeight = initialHeight + diffY;
        setHeight(newHeight);
      };

      const handleMouseUp = (e: MouseEvent) => {
        setIsResizing(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isResizing, initialY, initialHeight]);

    const handleResizeStart = (e: React.MouseEvent) => {
      setIsResizing(true);
      setInitialY(e.clientY);
      setInitialHeight(resizableRef.current?.offsetHeight || 0);
    };

    return (
      <ResizableDiv height={height} ref={resizableRef}>
        <WrappedComponent ref={resizeRef} {...args}>
          {children}
        </WrappedComponent>
        <ResizeHandle ref={resizeHandleRef} onMouseDown={handleResizeStart} />
      </ResizableDiv>
    );
  };

  return WithResize;
};

export default ResizeHOC;
