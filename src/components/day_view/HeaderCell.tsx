import React from "react";
import dayjs from "dayjs";
import {
  CalendarDayHeaderCellDate,
  CalendarDayHeaderCellDay,
  CalendarDayHeaderCellWrapper,
} from "./HeaderCell.styled";
import type { Dayjs } from "dayjs";

export const CalendarDayHeaderCell = ({ date }: { date: string | Dayjs }) => {
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
