import dayjs from "dayjs";
import React, { forwardRef, useId, useRef, useState } from "react";
import Badge from "../UI/badge/Badge";
import Popover from "../UI/popover/Popover";
import {
  StyledCellWrapper,
  StyledCloseIcon,
  StyledDayIndex,
  StyledDayIndexPopover,
  StyledMoreButton,
} from "./CalendarMonthCell.styled";
import type { Calendar, Event } from "../calendar/Calendar.types";

const CalendarMonthCell = forwardRef<
  HTMLTableElement,
  Calendar.DayProps & {
    onEventClick: (event: Event.CalendarEventProps) => void;
  }
>(({ date, events, isCurrentMonth, indexDay, onEventClick }, ref) => {
  const isToday = dayjs(date).isSame(dayjs(), "day");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const handleButtonClick = () => {
    setIsPopoverOpen(true);
  };

  return (
    <StyledCellWrapper id={useId()} isCurrentMonth={isCurrentMonth}>
      <StyledDayIndex isToday={isToday}>{indexDay}</StyledDayIndex>
      {events.slice(0, 2).map((event, index) => (
        <>
          <Badge
            color="primary"
            onClick={() => {
              onEventClick(event);
            }}
          >
            {event.indexDay === 1
              ? event.name
              : `${event.name} - Day ${event.indexDay}`}
          </Badge>

          {isPopoverOpen && (
            <Popover
              ref={ref}
              popoverRef={popoverRef}
              isOpen={isPopoverOpen}
              onClose={() => {
                setIsPopoverOpen(false);
              }}
              buttonRef={buttonRef}
            >
              <StyledCloseIcon
                size="small"
                icon="closeIcon"
                onClick={() => {
                  setIsPopoverOpen(false);
                }}
              />
              <StyledDayIndexPopover isToday={isToday}>
                {indexDay}
              </StyledDayIndexPopover>
              {events.map((event, index) => (
                <Badge
                  key={index}
                  onClick={() => {
                    onEventClick(event);
                  }}
                >
                  {event.indexDay === 1
                    ? event.name
                    : `${event.name} - Day ${event.indexDay}`}
                </Badge>
              ))}
            </Popover>
          )}
        </>
      ))}
      <div>
        {events.length > 2 && (
          <StyledMoreButton ref={buttonRef} onClick={handleButtonClick}>
            + {events.length - 2}
          </StyledMoreButton>
        )}
      </div>
    </StyledCellWrapper>
  );
});

export default CalendarMonthCell;
