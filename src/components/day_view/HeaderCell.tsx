import React from "react";
import dayjs from "dayjs";
import {
  DayViewHeaderCellDate,
  DayViewHeaderCellDay,
  DayViewHeaderCellWrapper,
} from "./HeaderCell.styled";
import type { Dayjs } from "dayjs";

export const DayViewHeaderCell = ({ date }: { date: string | Dayjs }) => {
  const isToday = dayjs().isSame(dayjs(date), "day");
  return (
    <DayViewHeaderCellWrapper>
      <DayViewHeaderCellDate isToday={isToday}>
        {dayjs(date).format("DD")}
      </DayViewHeaderCellDate>
      <DayViewHeaderCellDay>
        {dayjs(date).format("dddd")}
      </DayViewHeaderCellDay>
    </DayViewHeaderCellWrapper>
  );
};
