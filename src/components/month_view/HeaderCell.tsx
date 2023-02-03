import React from "react";
import {
  MonthViewHeaderCellDay,
  MonthViewHeaderCellWrapper,
} from "./HeaderCell.styled";

export const MonthViewHeaderCell = ({ date }: { date: string }) => (
  <MonthViewHeaderCellWrapper>
    <MonthViewHeaderCellDay>{date}</MonthViewHeaderCellDay>
  </MonthViewHeaderCellWrapper>
);
