import styled from "styled-components";
import { Calendar } from "../calendar/Calendar.types";
import { EmptyButton } from "../UI/button/EmptyButon";
import { ButtonIcon } from "../UI/button/IconButton";

export const StyledCellWrapper = styled.div<Pick<Calendar.DayProps, "isCurrentMonth">>`
  position: relative;
  display: flex;
  height: 85px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${({ isCurrentMonth }) =>
    isCurrentMonth ? "white" : "#f3efef70"};
  &:hover {
    background-color: #f5f5f5;
  }
`;
export const StyledDayIndex = styled.span<{ isToday: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: default;
  background-color: ${({ isToday }) =>
    isToday ? "rgba(152, 212, 255, 0.733)" : "transparent"};
  border-radius: 50%;
  padding: 3px;
  margin: 3px;
`;

export const StyledDayIndexModal = styled.span<{ isToday: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: default;
  background-color: ${({ isToday }) => (isToday ? "#98d4ffbb" : "transparent")};
  border-radius: 50%;
  padding: 10px;
  margin-bottom: 14px;
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
