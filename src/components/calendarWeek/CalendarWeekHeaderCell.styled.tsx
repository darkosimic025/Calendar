import styled from "styled-components";

export const CalendarWeekHeaderCellDay = styled.span`
  display: inline-block;
  font-size: 15px;
`;
export const CalendarWeekHeaderCellDate = styled.span<{ isToday: boolean }>`
  display: inline-block;
  
  margin-bottom: 2px;
  font-size: 17px;
  border-radius: 50%;
  background-color: ${({ isToday }) =>
    isToday ? "rgba(152, 212, 255, 0.733)" : "#fff"};
  padding: 6px;
`;

export const CalendarWeekHeaderCellWrapper = styled.div`
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
