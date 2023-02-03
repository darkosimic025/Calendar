import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { BadgeDayStyled } from "./Event.styled";
import type { Event } from "../calendar/Calendar.types";
import {
  eventDurationInPixels,
  getEventPositionAndWidth,
  timeToPixels,
} from "../../utils/Utils";

export interface BadgeEventProps<T> {
  event: T;
  allEvents: T[];
  id: string;
  color?: string;
  onEventClick: (event: T) => void;
}

export const DayBadgeEvent = React.memo(
  ({
    event,
    allEvents,
    id,
    color = "primary",
    onEventClick,
  }: BadgeEventProps<Event.CalendarEventProps>): JSX.Element | null => {
    const [position, setPosition] = useState<any>(null);
    const [width, setWidth] = useState<any>(null);
    const [duration, setDuration] = useState<any>(null);
    const [start, setStart] = useState<any>(null);
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: id,
        data: event,
      });
  
    useEffect(() => {
      const { width, position } = getEventPositionAndWidth(event, allEvents);
      setStart(timeToPixels(event.start));
      setDuration(
        eventDurationInPixels({
          start: event.start,
          end: event.end,
        }),
      );
      setPosition(position);
      setWidth(width);
    }, [allEvents]);

    const style = {
      transform: CSS.Translate.toString(transform),
      zIndex: isDragging ? 19999 : 0,
      cursor: isDragging && "move",
    };

    if (width === null || position === null) return null;

    return (
      <BadgeDayStyled
        id={id}
        color={color}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        start={start}
        duration={duration}
        width={width}
        position={position}
        date={event.start.format("HH:mm:ss")}
      >
        <div> {event.name}</div>
        <div>Start: {event.start.format("HH:mm:ss")}</div>
        <div>End: {event.end.format("HH:mm:ss")}</div>
      </BadgeDayStyled>
    );
  },
);
