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
  padding: ${({ size, theme }) => {
    switch (size) {
      case "small":
        return theme.button.padding.small;
      case "large":
        return theme.button.padding.large;
      case "medium":
        return theme.button.padding.medium;
    }
  }};
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  ${({ selected, color, theme }) => {
    switch (color) {
      case "primary":
        return (
          selected &&
          css`
            background-color: ${theme.button.colors.primary.selectedBackground};
            color: ${theme.button.colors.primary.selectedTextColor};
          `
        );
      case "secondary":
        return (
          selected &&
          css`
            background-color: ${theme.button.colors.secondary
              .selectedBackground};
            color: ${theme.button.colors.secondary.selectedTextColor};
          `
        );
    }
  }}

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
          key={i}
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
