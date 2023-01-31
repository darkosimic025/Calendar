import dayjs from "dayjs";
import {
  CalendarDayHeaderCellDate,
  CalendarDayHeaderCellDay,
  CalendarDayHeaderCellWrapper,
} from "./CalendarDayHeaderCell.styled";

export const CalendarDayHeaderCell = ({ date }: any) => {
  const isToday = dayjs().isSame(dayjs(date), "day");
  return (
    <CalendarDayHeaderCellWrapper>
      <CalendarDayHeaderCellDate isToday={isToday}>
        {dayjs(date).format("DD")}
      </CalendarDayHeaderCellDate>
      <CalendarDayHeaderCellDay>
        {dayjs(date).format("dddd")}
      </CalendarDayHeaderCellDay>
    </CalendarDayHeaderCellWrapper>
  );
};
