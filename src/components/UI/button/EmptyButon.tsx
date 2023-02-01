import { AnyTxtRecord } from "dns";
import React, { forwardRef } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  ref?: any;
}

const StyledEmptyButton = styled.button<Props>`
  background-color: transparent;
  border: none;
  display: inline;
  cursor: pointer;
  border-radius: 4px;
  font-weight: bold;
  color: ${({ color, theme }) => {
    switch (color) {
      case "primary":
        return theme.emptyButton.colors.primary.textColor;
      case "secondary":
        return theme.emptyButton.colors.primary.textColor;
    }
  }};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case "small":
        return theme.emptyButton.fontSize.small;
      case "large":
        return theme.emptyButton.fontSize.large;
      case "medium":
        return theme.emptyButton.fontSize.medium;
    }
  }};
  padding: ${({ size, theme }) => {
    switch (size) {
      case "small":
        return theme.emptyButton.padding.small;
      case "large":
        return theme.emptyButton.padding.large;
      case "medium":
        return theme.emptyButton.padding.medium;
    }
  }};
  &:hover {
    text-decoration: underline;
  }
`;

export const EmptyButton: React.FC<Props> = forwardRef(
  (
    { children, onClick,  size = "medium", color = "primary" },
    ref: any
  ) => {
    return (
      <StyledEmptyButton
        color={color}
        ref={ref}
        size={size}
        onClick={onClick}
      >
        {children}
      </StyledEmptyButton>
    );
  }
);
