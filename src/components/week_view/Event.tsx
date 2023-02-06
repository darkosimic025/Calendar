import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";
import { textSpanOverlap } from "typescript";
import {
  eventDurationInPixels,
  getEventPositionAndWidth,
  timeToPixels,
} from "../../utils/Utils";
import { BadgeWeekStyled } from "./Event.styled";
import type { Event } from "../calendar/Calendar.types";
import useDimensions from "../../hooks/useDimensions";
import { motion } from "framer-motion";

export interface BadgeEventProps<T> {
  event: T;
  allEvents: T[];
  id: string;
  color?: string;
  onEventClick: (event: T) => void;
  isOver: boolean;
}

export const WeekBadgeEvent = React.memo(
  ({
    isOver,
    event,
    allEvents,
    id,
    color = "primary",
    onEventClick,
  }: BadgeEventProps<Event.CalendarEventProps>): JSX.Element | null => {
    const [width, setWidth] = useState<any>(null);
    const [duration, setDuration] = useState<any>(null);
    const { observe, unobserve, observedWidth, observedHeight, entry } =
      useDimensions({
        onResize: ({
          observe,
          unobserve,
          observedWidth: width,
          observedHeight: height,
          entry,
        }) => {
          // Triggered whenever the size of the target is changed...

          unobserve(); // To stop observing the current target element
          observe(); // To re-start observing the current target element
        },
      });
    const [position, setPosition] = useState<any>(null);

    const [start, setStart] = useState<any>(null);
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id,
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
      scaleX: isOver ? 0.7 : 1,
    };

    if (width === null || position === null) return null;

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.6 }}
      >
        <BadgeWeekStyled
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
          <div>Width: {observedWidth}</div>
          <div>Height: {observedHeight}</div>
        </BadgeWeekStyled>
      </motion.div>
    );
  },
);
