import {
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import React, { useCallback, useEffect,useLayoutEffect, useState } from "react";
import { BadgeWeekStyled } from "./Cell.styled";
import type { Event } from "../calendar/Calendar.types";
import type { Dayjs } from "dayjs";

export interface BadgeEventProps<T> {
  event: T;
  allEvents: T[];
  id: string;
  color?: string;
  onEventClick: (event: T) => void;
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
  console.log(events)
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
  onEventClick,
}: BadgeEventProps<Event.CalendarEventProps>): JSX.Element | null => {
  const [position, setPosition] = useState<any>(null);
  const [width, setWidth] = useState<any>(null);
  const { attributes, listeners, setNodeRef, transform, isDragging  } =
  useDraggable({
    id: id,
    data: event,
  });
  useEffect(() => {
    const { width, position } = getEventPosition(event, allEvents);
    setPosition(position);
    setWidth(width);
  }, [allEvents]);


  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 19999 : 0,

  };
  if (width === null || position === null) return null;
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
