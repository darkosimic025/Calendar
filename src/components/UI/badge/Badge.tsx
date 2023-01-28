import React, { Children, ReactNode } from "react";
import styled from "styled-components";

interface BadgeProps {
  color?: "primary" | "secondary";
  onClick?: () => void;
  children: ReactNode;
}

export const StyledBadge = styled.span<BadgeProps>`
  inline-size: 100%;
  display: flex;
  margin-bottom: 3px;
  padding: 0.25em 0.4em;
  font-size: 75%;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: ${(props) =>
    props.color === "primary"
      ? "#14b2cab7"
      : props.color === "secondary"
      ? "#6c757d"
      : "#17a2b8"};
  color: white;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Badge: React.FC<BadgeProps> = ({
  onClick,
  color = "primary",
  children,
}) => {
  return (
    <StyledBadge onClick={onClick} color={color}>
      {children}
    </StyledBadge>
  );
};

export default Badge;
