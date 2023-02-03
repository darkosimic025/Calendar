import styled from "styled-components";

export const WeekViewDayCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
  background-image: ${({ theme }) =>
    theme.calendar.day.cell.backgroundWithLines};
  background-position: 0 0;
`;
