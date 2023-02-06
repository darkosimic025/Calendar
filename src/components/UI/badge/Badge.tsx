import React from "react";
import { StyledBadge } from "./Badge.styled";
import type { ReactNode } from "react";

export interface BadgeProps {
  color?: "primary" | "secondary" | "teritary";
  onClick?: () => void;
  children: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  onClick,
  color = "primary",
  children,
}) => (
  <StyledBadge onMouseDown={() => console.log('mouse')} onClick={onClick} color={color}>
    {children}
  </StyledBadge>
);

export default Badge;
