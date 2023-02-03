import styled from "styled-components";

export const DayViewHeaderCellDay = styled.span`
  display: inline-block;
  font-size: 15px;
  margin: 5px;
`;
export const DayViewHeaderCellDate = styled.span<{ isToday: boolean }>`
  display: inline-block;
  margin-bottom: 2px;
  font-size: 17px;
  border-radius: 50%;
  background-color: ${({ isToday, theme }) =>
    isToday
      ? theme.calendar.common.colors.isToday
      : theme.calendar.common.colors.notToday};
  padding: 6px;
`;

export const DayViewHeaderCellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 2px;
  align-items: center;
  height: 40px;
`;
