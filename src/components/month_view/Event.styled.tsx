import styled from "styled-components";
import { StyledBadge } from "../UI/badge/Badge.styled";

export const BadgeMonthStyled = styled(StyledBadge)<any>`
  border: 1px solid #ffffff;
  transform: scaleX(0.95);
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
