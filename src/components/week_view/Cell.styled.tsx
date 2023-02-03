import styled from "styled-components";
import { StyledBadge } from "../UI/badge/Badge.styled";

export const CalendarWeekDayCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
  background-image: ${({ theme }) =>
    theme.calendar.day.cell.backgroundWithLines};
  background-position: 0 0;
`;
