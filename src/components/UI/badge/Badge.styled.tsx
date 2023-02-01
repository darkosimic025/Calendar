import styled from "styled-components";
import type { BadgeProps } from "./Badge";

export const StyledBadge = styled.span<BadgeProps>`
  inline-size: 100%;
  display: block;
  margin-bottom: 3px;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  text-align: left;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
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
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
