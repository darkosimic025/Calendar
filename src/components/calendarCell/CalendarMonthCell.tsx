import { FC, forwardRef, Ref, useRef, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Event } from "../calendar/Calendar.types";
import Badge from "../UI/badge/Badge";
import { EmptyButton } from "../UI/button/EmptyButon";
import Modal, { TableDimensions } from "../UI/modal/Modal";
import { ButtonIcon, CloseIcon } from "../UI/button/IconButton";

interface CalendarMonthCellProps {
  date: number | string;
  events: Event.EventProps[];
  isCurrentMonth: boolean;
  time: string;
  tableDimensions?: TableDimensions;
  ref: any;
}

const StyledCellWrapper = styled.div<
  Pick<CalendarMonthCellProps, "isCurrentMonth">
>`
position: relative;
  display: flex;
  height: 85px;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  background-color: ${(props) =>
    props.isCurrentMonth ? "white" : "#f3efef70"};
  &:hover {
    background-color: #f5f5f5;
  }
`;
const StyledDayIndex = styled.span<{ isToday: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: default;
  background-color: ${(props) => (props.isToday ? "#98d4ffbb" : "transparent")};
  border-radius: 50%;
  padding: 3px;
  margin: 3px;
`;

const StyledDayIndexModal = styled.span<{ isToday: boolean }>`
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: default;
  background-color: ${(props) => (props.isToday ? "#98d4ffbb" : "transparent")};
  border-radius: 50%;
  padding: 10px;
  margin-bottom: 14px;
`;

const StyledCloseIcon = styled(ButtonIcon)`
  position: absolute;
  top: 2px;
  right: 3px;
`;

const StyledMoreButton = styled(EmptyButton)`
  position: absolute;
  bottom: 2px;
  left: 3px;
`;

const CalendarMonthCell: FC<CalendarMonthCellProps> = forwardRef(
  (
    { date, events, isCurrentMonth, time, tableDimensions },
    ref: Ref<HTMLTableElement>
  ) => {
    const isToday = dayjs(time).isSame(dayjs(), "day");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const handleButtonClick = () => {
      setIsModalOpen(true);
    };

    return (
      <StyledCellWrapper isCurrentMonth={isCurrentMonth}>
        <StyledDayIndex isToday={isToday}>{date}</StyledDayIndex>
        {events.slice(0, 2).map((event, index) => (
          <>
            <Badge>
              {event.positionDay == Event.DayPosition.First
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
                  {date}
                </StyledDayIndexModal>
                {events.map((event, index) => (
                  <Badge>
                    {event.positionDay == Event.DayPosition.First
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
  }
);

export default CalendarMonthCell;
