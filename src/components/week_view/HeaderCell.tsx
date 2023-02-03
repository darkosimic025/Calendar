import React from "react";
import dayjs from "dayjs";
import { ButtonIcon } from "../UI/button/IconButton";
import {
  CalendarWeekHeaderCellDate,
  CalendarWeekHeaderCellDay,
  CalendarWeekHeaderCellWrapper,
} from "./HeaderCell.styled";

export const CalendarWeekHeaderCell = ({
  handleExpand,
  index,
  date,
  expandedIndex,
}: any) => {
  const isToday = dayjs().isSame(dayjs(date), "day");
  return (
    <CalendarWeekHeaderCellWrapper>
      <CalendarWeekHeaderCellDate isToday={isToday}>
        {dayjs(date).format("DD")}
      </CalendarWeekHeaderCellDate>
      <CalendarWeekHeaderCellDay>
        {dayjs(date).format("ddd")}
      </CalendarWeekHeaderCellDay>
      {index === expandedIndex ? (
        <ButtonIcon
          className="minimaze"
          size="small"
          onClick={() => handleExpand(index)}
          icon="minimaze"
        />
      ) : (
        <ButtonIcon
          className="expand"
          size="small"
          onClick={() => handleExpand(index)}
          icon="expand"
        />
      )}
    </CalendarWeekHeaderCellWrapper>
  );
};
