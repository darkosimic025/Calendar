import React, { useState } from "react";
import styled, { css } from "styled-components";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

interface ButtonGroupProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "secondary";
  buttons: ButtonProps[];
  selectedIndex: number;
}

const ButtonGroupContainer = styled.div`
  display: flex;
`;

const StyledButton = styled.button<{
  selected: boolean;
  first: boolean;
  last: boolean;
  size: string;
  color: string;
}>`
  background-color: ${(props) =>
    props.color === "secondary" ? "#ccc" : "#cce4f5"};
  color: ${(props) => (props.color === "secondary" ? "#333" : "#0061a6")};
  border: none;
  padding: ${(props) => {
    switch (props.size) {
      case "small":
        return "6px 16px";
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
  ${(props) =>
    props.selected &&
    css`
      background-color: #0061a6;
      color: white;
    `}

  ${(props) =>
    props.first &&
    css`
      border-radius: 8px 0 0 8px;
    `}

  ${(props) =>
    props.last &&
    css`
      border-radius: 0 8px 8px 0;
    `}

  ${(props) =>
    !props.first &&
    !props.last &&
    css`
      border-radius: 0;
      border-left: 1px solid #ccc;
      border-right: 1px solid #ccc;
    `}
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size = "medium",
  color = "primary",
  buttons,
  selectedIndex,
}) => {
  const [index, setIndex] = useState(selectedIndex);

  const handleClick = (index: number) => {
    setIndex(index);
  };

  return (
    <ButtonGroupContainer>
      {buttons.map((button, i) => (
        <StyledButton
          size={size}
          color={color}
          selected={index === i}
          first={i === 0}
          last={i === buttons.length - 1}
          onClick={() => {
            button.onClick();
            handleClick(i);
          }}
        >
          {button.label}
        </StyledButton>
      ))}
    </ButtonGroupContainer>
  );
};
