import { FC, forwardRef, useRef, useState } from "react";

import dayjs from "dayjs";
import { Calendar, Event } from "../calendar/Calendar.types";
import Badge from "../UI/badge/Badge";

import Modal from "../UI/modal/Modal";

import {
  StyledCellWrapper,
  StyledCloseIcon,
  StyledDayIndex,
  StyledDayIndexModal,
  StyledMoreButton,
} from "./CalendarMonthCell.styled";

const CalendarMonthCell = forwardRef<
  HTMLTableElement,
  Calendar.DayProps & { onEventClick: (event: Event.CalendarEventProps) => void }
>(({ date, events, isCurrentMonth, indexDay, onEventClick }, ref) => {
  const isToday = dayjs(date).isSame(dayjs(), "day");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledCellWrapper isCurrentMonth={isCurrentMonth}>
      <StyledDayIndex isToday={isToday}>{indexDay}</StyledDayIndex>
      {events.slice(0, 2).map((event, index) => (
        <>
          <Badge color="primary" onClick={() => onEventClick(event)}>
            {event.indexDay == 1
              ? event.name
              : `${event.name} - Day ${event.indexDay}`}
          </Badge>

          {isModalOpen && (
            <Modal
              ref={ref}
              modalRef={modalRef}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              buttonRef={buttonRef}
            >
              <StyledCloseIcon
                size="small"
                icon="closeIcon"
                onClick={() => setIsModalOpen(false)}
              />
              <StyledDayIndexModal isToday={isToday}>
                {indexDay}
              </StyledDayIndexModal>
              {events.map((event, index) => (
                <Badge onClick={() => onEventClick(event)}>
                  {event.indexDay == 1
                    ? event.name
                    : `${event.name} - Day ${event.indexDay}`}
                </Badge>
              ))}
            </Modal>
          )}
        </>
      ))}
      <div>
        {events && events.length > 2 && (
          <StyledMoreButton ref={buttonRef} onClick={handleButtonClick}>
            + {events.length - 2}
          </StyledMoreButton>
        )}
      </div>
    </StyledCellWrapper>
  );
});

export default CalendarMonthCell;
