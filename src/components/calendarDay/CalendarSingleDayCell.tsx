import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Event } from "../calendar/Calendar.types";
import {
  BadgeWeekStyled,
  CalendarSingleDayCellStyled,
} from "./CalendarSingleDayCell.styled";
import {
  DndContext,
  useSensors,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

export const timeToPixels = (time: Dayjs) => {
  let startOfDay = dayjs(time).format("MM/DD/YYYY");
  let currentTime = dayjs(time);
  let diff = currentTime.diff(dayjs(startOfDay), "minute");
  return diff - 60;
};

export const eventDurationInPixels = ({
  start,
  end,
}: Pick<Event.CalendarEventProps, "end" | "start">) => {
  const startMinutes = timeToPixels(start);
  const endMinutes = timeToPixels(end);
  const duration = endMinutes - startMinutes;
  return duration;
};

export const getEventPosition = (
  event: Event.CalendarEventProps,
  events: Event.CalendarEventProps[]
) => {
  const startMinutes = timeToPixels(event.start);
  const endMinutes = timeToPixels(event.end);

  let overlappingEvents = events
    .filter(
      (ev) =>
        startMinutes >= timeToPixels(ev.start) ||
        startMinutes <= timeToPixels(ev.end)
    )
    .sort((a, b) => {
      if (timeToPixels(a.start) === timeToPixels(b.start)) {
        return timeToPixels(a.end) - timeToPixels(b.end);
      }
      return timeToPixels(a.start) - timeToPixels(b.start);
    });

  let index = overlappingEvents.length;
  let width = 100 / index;
  let position = overlappingEvents.findIndex((ev) => ev === event) + 1;
  return { width, position: position * width - width, index: position };
};

export const Badge = ({ event, allEvents, id }: any) => {
  const { width, position, index } = getEventPosition(event, allEvents);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 19999 : 0,
  };
  return (
    <BadgeWeekStyled
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      start={timeToPixels(event.start)}
      duration={eventDurationInPixels({
        start: event.start,
        end: event.end,
      })}
      width={width}
      position={position}
      index={index}
    >
      {event.name + ` Day ${event.indexDay}`}
    </BadgeWeekStyled>
  );
};

export const CalendarSingleDayCell = ({events} : any) => {
 
  const [allEvents, setAllEvents] = useState(events.events);
  console.log(allEvents)
  const { setNodeRef } = useDroppable({
    id: "calendar_single_day_cell",
  });
  return (
    <DndContext>
      <CalendarSingleDayCellStyled
        id="calendar_single_day_cell"
        ref={setNodeRef}
      >
        {events.events.map((event: any) => {
          return <Badge id={event.name} event={event} allEvents={allEvents} />;
        })}
      </CalendarSingleDayCellStyled>
    </DndContext>
  );
};
