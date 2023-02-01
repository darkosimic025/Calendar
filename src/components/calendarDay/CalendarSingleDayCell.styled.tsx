import styled from "styled-components";
import { StyledBadge } from "../UI/badge/Badge.styled";

export const CalendarSingleDayCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
  background-image: ${({ theme }) =>
    theme.calendar.day.cell.backgroundWithLines};
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
  border-radius: 4px;
`;
