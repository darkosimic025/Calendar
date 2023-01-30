import styled from "styled-components";
import { StyledBadge } from "../UI/badge/Badge.styled";

export const CalendarWeekCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 59px,
    rgb(218, 220, 224) 60px,
    rgb(218, 220, 224) 60px
  );
  background-position: 0 0;
`;

export const BadgeWeekStyled = styled(StyledBadge)<any>`
  border: 1px solid #ffffff;
  transform: scaleX(0.95);
  width: ${({ width }) => `${width}%`};
  position: absolute;
  float: left;
  left: ${({ position }) => `${position}%`};
  top: ${({ start }) => `${start}px`};
  height: ${({ duration }) => `${duration}px`};
  z-index: ${({ index }) => index};
  border-radius: 4px;
`;
