import React from "react";
import styled from "styled-components";

export const ArrowLeft = () => (
<svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  d="M11.0179 14.0425C11.3175 13.7565 11.3285 13.2818 11.0425 12.9821L6.45161 8.17262C6.35939 8.07601 6.35939 7.92399 6.45161 7.82738L11.0425 3.01786C11.3285 2.71823 11.3175 2.24349 11.0179 1.95748C10.7182 1.67148 10.2435 1.68252 9.95748 1.98214L5.36657 6.79167C4.72107 7.46791 4.72107 8.53209 5.36657 9.20833L9.95748 14.0179C10.2435 14.3175 10.7182 14.3285 11.0179 14.0425Z" />
</svg>
);

export const ArrowRight = () => (
<svg  viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path  d="M4.98214 14.0425C4.68252 13.7565 4.67148 13.2818 4.95748 12.9821L9.54839 8.17262C9.64061 8.07601 9.64061 7.92399 9.54839 7.82738L4.95748 3.01786C4.67148 2.71823 4.68252 2.24349 4.98214 1.95748C5.28177 1.67148 5.75651 1.68252 6.04252 1.98214L10.6334 6.79167C11.2789 7.46791 11.2789 8.53209 10.6334 9.20833L6.04252 14.0179C5.75651 14.3175 5.28177 14.3285 4.98214 14.0425Z" />
</svg>
);

export const ArrowDown = () => (
<svg width="16" height="16" viewBox="0 0 16 16" color="black" xmlns="http://www.w3.org/2000/svg">
<path  d="M1.95748 4.98214C2.24349 4.68252 2.71823 4.67148 3.01786 4.95748L7.82738 9.54839C7.92399 9.64061 8.07601 9.64061 8.17262 9.54839L12.9821 4.95748C13.2818 4.67148 13.7565 4.68252 14.0425 4.98214C14.3285 5.28177 14.3175 5.75651 14.0179 6.04252L9.20833 10.6334C8.53209 11.2789 7.46791 11.2789 6.79167 10.6334L1.98214 6.04252C1.68252 5.75651 1.67148 5.28177 1.95748 4.98214Z" />
</svg>
    );

export const CloseIcon = () => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
  </svg>
);

interface IconType {
  arrowLeft: () => JSX.Element;
  arrowRight: () => JSX.Element;
  closeIcon: () => JSX.Element;
}

const icons: IconType = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  closeIcon: CloseIcon,
};

enum IconSize {
    SMALL = "24px",
    MEDIUM = "32px",
    LARGE = "48px"
}

enum IconColor {
    PRIMARY = "#0055FF",
    SECONDARY = "#2E2E2E",
    TERTIARY = "#B3B3B3"
}

interface Props {
  onClick: () => void;
  icon: keyof IconType;
  className?: string;
  size?: string;
  color?: string;
}

const StyledButtonIcon = styled.button<any>`
  background-color: transparent;
  border: none;
  padding: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: ${(props) => (props.color === "secondary" ? "#333" : "#0061a6")};
    width: ${(props) => {
      switch (props.size) {
        case "small":
          return "16px";
        case "large":
          return "32px";
        default:
          return "24px";
      }
    }};
    height: ${(props) => {
      switch (props.size) {
        case "small":
          return "16px";
        case "large":
          return "32px";
        default:
          return "24px";
      }
    }};
  }
  &:hover {
    background-color: #cce4f5ae;
    border-radius: 6px;
  }
`;

export const ButtonIcon: React.FC<Props> = ({
  icon,
  onClick,
  className,
  color = "primary",
  size = "medium",
}) => {
  return (
    <StyledButtonIcon
      onClick={onClick}
      className={className}
      color={color}
      size={size}
    >
      {icons[icon]()}
    </StyledButtonIcon>
  );
};
