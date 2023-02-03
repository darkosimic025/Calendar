import React from "react";
import dayjs from "dayjs";
import { ButtonIcon } from "../UI/button/IconButton";
import {
  WeekViewHeaderCellDate,
  WeekViewHeaderCellDay,
  WeekViewHeaderCellWrapper,
} from "./HeaderCell.styled";

export const WeekViewHeaderCell = ({
  handleExpand,
  index,
  date,
  expandedIndex,
}: any) => {
  const isToday = dayjs().isSame(dayjs(date), "day");
  return (
    <WeekViewHeaderCellWrapper>
      <WeekViewHeaderCellDate isToday={isToday}>
        {dayjs(date).format("DD")}
      </WeekViewHeaderCellDate>
      <WeekViewHeaderCellDay>
        {dayjs(date).format("ddd")}
      </WeekViewHeaderCellDay>
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
    </WeekViewHeaderCellWrapper>
  );
};
