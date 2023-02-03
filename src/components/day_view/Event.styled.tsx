import styled from "styled-components";
import { StyledBadge } from "../UI/badge/Badge.styled";

export const BadgeDayStyled = styled(StyledBadge)<any>`
  border: 1px solid #ffffff;
  resize: vertical;
  transform: scaleX(0.95);
  width: ${({ width }) => `${width}%`};
  position: absolute;
  float: left;
  left: ${({ position }) => `${position}%`};
  top: ${({ start }) => `${start}px`};
  height: ${({ duration }) => `${duration}px`};
  border-radius: 4px;
  background-color: ${({ color, theme }) => {
    switch (color) {
      case "primary":
        return theme.badge.colors.primary;
      case "secondary":
        return theme.badge.colors.secondary;
      case "teritary":
        return theme.badge.colors.teritary;
    }
  }};
  color: ${({ theme }) => theme.badge.textColor};
`;
