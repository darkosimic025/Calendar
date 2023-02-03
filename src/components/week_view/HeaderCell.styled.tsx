import styled from "styled-components";

export const WeekViewHeaderCellDay = styled.span`
  display: inline-block;
  font-size: 15px;
`;
export const WeekViewHeaderCellDate = styled.span<{ isToday: boolean }>`
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

export const WeekViewHeaderCellWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px;
  align-items: center;
  height: 40px;
  transition: 2s linear;
  &:hover {
    cursor: pointer;
    .expand {
      visibility: visible;
    }
  }
  .expand {
    visibility: hidden;
  }
`;
