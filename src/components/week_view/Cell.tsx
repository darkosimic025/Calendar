import { useDroppable } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { WeekViewDayCellStyled } from "./Cell.styled";
import { WeekBadgeEvent } from "./Event";

export const WeekViewDayCell = ({
  date,
  events,
  onEventClick,
  id,
}: any) => {
  const [allEvents, setAllEvents] = useState(null);
  useEffect(() => {
    setAllEvents(events);
  }, [events]);

  const { setNodeRef, active, over } = useDroppable({
    id: id,
    data: date,
  });

  if (allEvents === null) return null;

  return (
    <WeekViewDayCellStyled id={id} ref={setNodeRef}>
      {events.map((event: any, index: any) => (
        <WeekBadgeEvent
          onEventClick={onEventClick}
          key={index}
          id={`${event.id}_day${event.indexDay}`}
          event={event}
          allEvents={allEvents}
        />
      ))}
    </WeekViewDayCellStyled>
  );
};
