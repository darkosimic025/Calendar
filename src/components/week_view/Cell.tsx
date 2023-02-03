import {
  DndContext,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  PointerSensor,
  DragOverlay,
} from "@dnd-kit/core";
import React, { useEffect, useId, useState } from "react";
import {
  CalendarWeekDayCellStyled,
} from "./Cell.styled";
import { WeekBadgeEvent } from "./Event";
import { selector } from "recoil";
import { eventsAtom } from "../../App";

export const CalendarWeekDayCell = ({
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
    <CalendarWeekDayCellStyled id={id} ref={setNodeRef}>
      {events.map((event: any, index: any) => (
        <WeekBadgeEvent
          onEventClick={onEventClick}
          key={index}
          id={`${event.id}_day${event.indexDay}`}
          event={event}
          allEvents={allEvents}
        />
      ))}
     
    </CalendarWeekDayCellStyled>
  );
};
