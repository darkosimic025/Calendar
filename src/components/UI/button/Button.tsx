import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  type?: "submit" | "button";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
}

export const StyledButton = styled.button<Props>`
  background-color: ${({ color, theme }) => {
    switch (color) {
      case "primary":
        return theme.button.colors.primary.background;
      case "secondary":
        return theme.button.colors.secondary;
    }
  }};
  color: ${({ color, theme }) => {
    switch (color) {
      case "primary":
        return theme.button.colors.primary.textColor;
      case "secondary":
        return theme.button.colors.primary.textColor;
    }
  }};
  font-size: ${({ size, theme }) => {
    switch (size) {
      case "small":
        return theme.button.fontSize.small;
      case "large":
        return theme.button.fontSize.large;
      case "medium":
        return theme.button.fontSize.medium;
    }
  }};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export const Button: React.FC<Props> = ({
  children,
  onClick,
  type = "button",
  size = "medium",
  color = "primary",
}) => {
  return (
    <StyledButton type={type} onClick={onClick} size={size} color={color}>
      {children}
    </StyledButton>
  );
};
