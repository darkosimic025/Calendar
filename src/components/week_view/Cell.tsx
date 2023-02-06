import { useDroppable } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { WeekViewDayCellStyled } from "./Cell.styled";
import { WeekBadgeEvent } from "./Event";

export const WeekViewDayCell = ({ date, events, onEventClick, id }: any) => {
  const [allEvents, setAllEvents] = useState(null);
  useEffect(() => {
    setAllEvents(events);
  }, [events]);

  const { setNodeRef, active, over, isOver } = useDroppable({
    id: id,
    data: date,
  });

  if (allEvents === null) return null;

  return (
    <WeekViewDayCellStyled
      style={{ opacity: isOver ? 0.6 : 1 }}
      id={id}
      ref={setNodeRef}
    >
      {events.map((event: any, index: any) => (
        <WeekBadgeEvent
          isOver={isOver}
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
