import { AnyTxtRecord } from "dns";
import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  ref?: any;
}

const StyledEmptyButton = styled.button<Props>`
  background-color: transparent;
  border: none;

  display: inline;
  cursor: pointer;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "2px 2px";
      case "large":
        return "8px 8px";
      default:
        return "4px 4px";
    }
  }};
  border-radius: 4px;
  font-weight: bold;
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "12px";
      case "large":
        return "14px";
      default:
        return "10px";
    }
  }};
  color: #0061a6;
  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyButton: React.FC<Props> = forwardRef(({
  children,
  onClick,
  className,
  size= 'medium'
}, ref: any) => {
  return (
    <StyledEmptyButton ref={ref} size={size} onClick={onClick} className={className}>
      {children}
    </StyledEmptyButton>
  );
});
