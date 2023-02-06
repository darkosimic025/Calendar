import { useDroppable } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { CalendarSingleDayCellStyled } from "./Cell.styled";
import { DayBadgeEvent } from "./Event";

export const CalendarSingleDayCell = ({
  date,
  events,
  onEventClick,
  id,
}: any) => {
  const [allEvents, setAllEvents] = useState(null);
  useEffect(() => {
    setAllEvents(events.events);
  }, [events.events]);

  const { setNodeRef, active, over } = useDroppable({
    id,
    data: date,
  });

  if (allEvents === null) return null;

  return (
    <CalendarSingleDayCellStyled id={id} ref={setNodeRef}>
      {events.events.map((event: any, index: any) => (
        <DayBadgeEvent
          onEventClick={onEventClick}
          key={index}
          id={`${event.id}_day${event.indexDay}`}
          event={event}
          allEvents={allEvents}
        />
      ))}
    </CalendarSingleDayCellStyled>
  );
};
