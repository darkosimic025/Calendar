import React, { Children, ReactNode } from "react";
import styled from "styled-components";
import { StyledBadge } from "./Badge.styled";

export interface BadgeProps {
  color?: "primary" | "secondary";
  onClick?: () => void;
  children: ReactNode;
}

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
