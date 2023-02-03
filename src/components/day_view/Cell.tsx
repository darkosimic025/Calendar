import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import React, { useEffect, useId, useState } from "react";
import { CalendarSingleDayCellStyled } from "./Cell.styled";
import { BadgeEvent } from "./Event";
import { selector } from "recoil";
import { eventsAtom } from "../../App";

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
    id: id,
    data: date,
  });

  if (allEvents === null) return null;

  return (
    <CalendarSingleDayCellStyled id={id} ref={setNodeRef}>
      {events.events.map((event: any, index: any) => (
        <BadgeEvent
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
