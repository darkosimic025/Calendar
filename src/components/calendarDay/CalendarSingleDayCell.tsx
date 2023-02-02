import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import React, { useId, useState } from "react";
import {
  BadgeWeekStyled,
  CalendarSingleDayCellStyled,
} from "./CalendarSingleDayCell.styled";
import type { Event } from "../calendar/Calendar.types";
import type { Dayjs } from "dayjs";

export interface BadgeEventProps<T> {
  event: T;
  allEvents: T[];
  id: string;
  color?: string;
}

export const timeToPixels = (time: Dayjs) => {
  const startOfDay = dayjs(time).format("MM/DD/YYYY");
  const currentTime = dayjs(time);
  const diff = currentTime.diff(dayjs(startOfDay), "minute");
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
  events: Event.CalendarEventProps[],
) => {
  const startMinutes = timeToPixels(event.start);

  const overlappingEvents = events
    .filter(
      (ev) =>
        startMinutes >= timeToPixels(ev.start) ||
        startMinutes <= timeToPixels(ev.end),
    )
    .sort((a, b) => {
      if (timeToPixels(a.start) === timeToPixels(b.start)) {
        return timeToPixels(a.end) - timeToPixels(b.end);
      }
      return timeToPixels(a.start) - timeToPixels(b.start);
    });

  const index = overlappingEvents.length;
  const width = 100 / index;
  let position = overlappingEvents.findIndex((ev) => ev === event) + 1;
  position = position * width - width;
  return { width, position };
};

export const BadgeEvent = ({
  event,
  allEvents,
  id,
  color = "primary",
}: BadgeEventProps<Event.CalendarEventProps>): JSX.Element => {
  const { width, position } = getEventPosition(event, allEvents);
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 19999 : 0,
  };
  return (
    <BadgeWeekStyled
      id={id}
      color={color}
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
    >
      {event.name + ` Day ${event.indexDay}`}
    </BadgeWeekStyled>
  );
};

export const CalendarSingleDayCell = ({ events }: any) => {
  const [allEvents] = useState(events.events);
  console.log(allEvents);
  const { setNodeRef } = useDroppable({
    id: "calendar_single_day_cell",
  });
  return (
    <DndContext>
      <CalendarSingleDayCellStyled id={useId()} ref={setNodeRef}>
        {events.events.map((event: any, index: any) => (
          <BadgeEvent
            key={index}
            id={useId()}
            event={event}
            allEvents={allEvents}
          />
        ))}
      </CalendarSingleDayCellStyled>
    </DndContext>
  );
};
