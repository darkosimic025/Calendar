import React from "react";
import {
  CalendarMonthHeaderCellDay,
  CalendarMonthHeaderCellWrapper,
} from "./HeaderCell.styled";

export const CalendarMonthHeaderCell = ({ date }: { date: string }) => (
  <CalendarMonthHeaderCellWrapper>
    <CalendarMonthHeaderCellDay>{date}</CalendarMonthHeaderCellDay>
  </CalendarMonthHeaderCellWrapper>
);
