import styled from "styled-components";
import { EmptyButton } from "../UI/button/EmptyButon";
import { ButtonIcon } from "../UI/button/IconButton";
import type { Calendar } from "../calendar/Calendar.types";

export const StyledCellWrapper = styled.div<
  Pick<Calendar.DayProps, "isCurrentMonth">
>`
  position: relative;
  display: flex;
  height: 85px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${({ isCurrentMonth, theme }) =>
    isCurrentMonth
      ? theme.calendar.month.cell.colors.currentMonth
      : theme.calendar.month.cell.colors.notCurrentMonth};
  &:hover {
    background-color: ${({ theme }) => theme.calendar.month.cell.colors.hover};
  }
`;
export const StyledDayIndex = styled.span<{ isToday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: default;
  background-color: ${({ isToday, theme }) =>
    isToday
      ? theme.calendar.common.colors.isToday
      : theme.calendar.common.colors.notToday};
  border-radius: 50%;
  padding: 4px;
  margin: 3px;
  width: 16px;
  height: 16px;
`;

export const StyledDayIndexPopover = styled.span<{ isToday: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: default;
  background-color: ${({ isToday, theme }) =>
    isToday
      ? theme.calendar.common.colors.isToday
      : theme.calendar.common.colors.notToday};
  border-radius: 50%;
  padding: 10px;
  margin-bottom: 14px;
  height: 30px;
  width: 30px;
`;

export const StyledCloseIcon = styled(ButtonIcon)`
  position: absolute;
  top: 2px;
  right: 3px;
`;

export const StyledMoreButton = styled(EmptyButton)`
  position: absolute;
  bottom: 2px;
  left: 3px;
`;
