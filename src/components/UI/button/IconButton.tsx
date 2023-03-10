import React from "react";
import styled from "styled-components";

export const ArrowLeft = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.0179 14.0425C11.3175 13.7565 11.3285 13.2818 11.0425 12.9821L6.45161 8.17262C6.35939 8.07601 6.35939 7.92399 6.45161 7.82738L11.0425 3.01786C11.3285 2.71823 11.3175 2.24349 11.0179 1.95748C10.7182 1.67148 10.2435 1.68252 9.95748 1.98214L5.36657 6.79167C4.72107 7.46791 4.72107 8.53209 5.36657 9.20833L9.95748 14.0179C10.2435 14.3175 10.7182 14.3285 11.0179 14.0425Z" />
  </svg>
);

export const ArrowRight = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.98214 14.0425C4.68252 13.7565 4.67148 13.2818 4.95748 12.9821L9.54839 8.17262C9.64061 8.07601 9.64061 7.92399 9.54839 7.82738L4.95748 3.01786C4.67148 2.71823 4.68252 2.24349 4.98214 1.95748C5.28177 1.67148 5.75651 1.68252 6.04252 1.98214L10.6334 6.79167C11.2789 7.46791 11.2789 8.53209 10.6334 9.20833L6.04252 14.0179C5.75651 14.3175 5.28177 14.3285 4.98214 14.0425Z" />
  </svg>
);

export const ArrowDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    color="black"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.95748 4.98214C2.24349 4.68252 2.71823 4.67148 3.01786 4.95748L7.82738 9.54839C7.92399 9.64061 8.07601 9.64061 8.17262 9.54839L12.9821 4.95748C13.2818 4.67148 13.7565 4.68252 14.0425 4.98214C14.3285 5.28177 14.3175 5.75651 14.0179 6.04252L9.20833 10.6334C8.53209 11.2789 7.46791 11.2789 6.79167 10.6334L1.98214 6.04252C1.68252 5.75651 1.67148 5.28177 1.95748 4.98214Z" />
  </svg>
);

export const CloseIcon = () => (
  <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
  </svg>
);

export const ExpandIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M4.35355339,12.3535534 L12.3535534,4.35355339 C12.5488155,4.15829124 12.5488155,3.84170876 12.3535534,3.64644661 C12.1582912,3.45118446 11.8417088,3.45118446 11.6464466,3.64644661 L3.64644661,11.6464466 C3.45118446,11.8417088 3.45118446,12.1582912 3.64644661,12.3535534 C3.84170876,12.5488155 4.15829124,12.5488155 4.35355339,12.3535534 Z M1,10.5 C1,10.2238576 1.22385763,10 1.5,10 C1.77614237,10 2,10.2238576 2,10.5 L2,13.5 C2,13.7761424 2.22385763,14 2.5,14 L5.5,14 C5.77614237,14 6,14.2238576 6,14.5 C6,14.7761424 5.77614237,15 5.5,15 L2.5,15 C1.67157288,15 1,14.3284271 1,13.5 L1,10.5 Z M15,5.5 C15,5.77614237 14.7761424,6 14.5,6 C14.2238576,6 14,5.77614237 14,5.5 L14,2.5 C14,2.22385763 13.7761424,2 13.5,2 L10.5,2 C10.2238576,2 10,1.77614237 10,1.5 C10,1.22385763 10.2238576,1 10.5,1 L13.5,1 C14.3284271,1 15,1.67157288 15,2.5 L15,5.5 Z"
    />
  </svg>
);

export const MinimazeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path d="M1.14644661,14.1464466 L5.14644661,10.1464466 C5.34170876,9.95118446 5.65829124,9.95118446 5.85355339,10.1464466 C6.02711974,10.320013 6.04640489,10.5894374 5.91140884,10.7843055 L5.85355339,10.8535534 L1.85355339,14.8535534 C1.65829124,15.0488155 1.34170876,15.0488155 1.14644661,14.8535534 C0.972880258,14.679987 0.953595107,14.4105626 1.08859116,14.2156945 L1.14644661,14.1464466 L5.14644661,10.1464466 L1.14644661,14.1464466 Z M6.5,8 C7.32842712,8 8,8.67157288 8,9.5 L8,12.5 C8,12.7761424 7.77614237,13 7.5,13 C7.22385763,13 7,12.7761424 7,12.5 L7,9.5 C7,9.22385763 6.77614237,9 6.5,9 L3.5,9 C3.22385763,9 3,8.77614237 3,8.5 C3,8.22385763 3.22385763,8 3.5,8 L6.5,8 Z M8.5,3 C8.77614237,3 9,3.22385763 9,3.5 L9,6.5 C9,6.77614237 9.22385763,7 9.5,7 L12.5,7 C12.7761424,7 13,7.22385763 13,7.5 C13,7.77614237 12.7761424,8 12.5,8 L9.5,8 C8.67157288,8 8,7.32842712 8,6.5 L8,3.5 C8,3.22385763 8.22385763,3 8.5,3 Z M10.1514466,5.14644661 L14.1514466,1.14644661 C14.3467088,0.951184464 14.6632912,0.951184464 14.8585534,1.14644661 C15.0321197,1.32001296 15.0514049,1.58943736 14.9164088,1.7843055 L14.8585534,1.85355339 L10.8585534,5.85355339 C10.6632912,6.04881554 10.3467088,6.04881554 10.1514466,5.85355339 C9.97788026,5.67998704 9.95859511,5.41056264 10.0935912,5.2156945 L10.1514466,5.14644661 L14.1514466,1.14644661 L10.1514466,5.14644661 Z" />
  </svg>
);

interface IconType {
  arrowLeft: () => JSX.Element;
  arrowRight: () => JSX.Element;
  closeIcon: () => JSX.Element;
  minimaze: () => JSX.Element;
  expand: () => JSX.Element;
}

const icons: IconType = {
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  closeIcon: CloseIcon,
  minimaze: MinimazeIcon,
  expand: ExpandIcon,
};

interface Props {
  onClick: () => void;
  icon: keyof IconType;
  className?: string;
  size?: string;
  color?: string;
  id?: string;
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
    fill: ${({ color, theme }) => {
      switch (color) {
        case "primary":
          return theme.iconButton.colors.primary.textColor;
        case "secondary":
          return theme.iconButton.colors.primary.textColor;
      }
    }};
    width: ${({ size, theme }) => {
      switch (size) {
        case "small":
          return theme.iconButton.size.height.small;
        case "large":
          return theme.iconButton.size.height.large;
        case "medium":
          return theme.iconButton.size.height.medium;
      }
    }};
    height: ${({ size, theme }) => {
      switch (size) {
        case "small":
          return theme.iconButton.size.height.small;
        case "large":
          return theme.iconButton.size.height.large;
        case "medium":
          return theme.iconButton.size.height.medium;
      }
    }};
  }
  &:hover {
    background-color: ${({ color, theme }) => {
      switch (color) {
        case "primary":
          return theme.iconButton.colors.primary.hoverBackground;
        case "secondary":
          return theme.iconButton.colors.primary.hoverBackground;
      }
    }};
    border-radius: 6px;
  }
`;

export const ButtonIcon: React.FC<Props> = ({
  icon,
  onClick,
  className,
  color = "primary",
  size = "medium",
}) => (
  <StyledButtonIcon
    onClick={onClick}
    className={className}
    color={color}
    size={size}
  >
    {icons[icon]()}
  </StyledButtonIcon>
);
