import dayjs, { Dayjs } from "dayjs";

import { ButtonIcon } from "../UI/button/IconButton";
import {
  CalendarMonthHeaderCellDay,
  CalendarMonthHeaderCellWrapper,
} from "./CalendarMonthHeaderCell.styled";

export const CalendarMonthHeaderCell = ({ date }: { date: string }) => {
  return (
    <CalendarMonthHeaderCellWrapper>
      <CalendarMonthHeaderCellDay>
        {date}
      </CalendarMonthHeaderCellDay>
    </CalendarMonthHeaderCellWrapper>
  );
};
