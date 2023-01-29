import React from "react";
import styled, { css } from "styled-components";

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  type?: "submit" | "button";
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
}

export const StyledButton = styled.button<Props>`
  background-color: ${(props) =>
    props.color === "secondary" ? "#ccc" : "#cce4f5"};
  color: ${(props) => (props.color === "secondary" ? "#333" : "#0061a6")};
  border: none;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "8px 16px";
      case "large":
        return "16px 32px";
      default:
        return "12px 24px";
    }
  }};
  border-radius: 4px;
  font-size: ${(props) => {
    switch (props.size) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  }};
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
