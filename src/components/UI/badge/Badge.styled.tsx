import styled from "styled-components";
import { BadgeProps } from "./Badge";

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
  background-color: ${({ color }) =>
    color === "primary"
      ? "#17a2b8"
      : color === "secondary"
      ? "#6c757d"
      : "#17a2b8"};
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
