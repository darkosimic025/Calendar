import dayjs, { Dayjs } from "dayjs";
import styled, { css } from "styled-components";
import useScrollIntoView from "../../hooks/useScrollIntoView";
import { Event } from "../calendar/Calendar.types";
import {
  BadgeWeekStyled,
  CalendarSingleDayCellStyled,
} from "./CalendarSingleDayCell.styled";

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
export const CalendarSingleDayCell = ({ events }: any) => {
  const allEvents = events.events;
  
  return (
    <CalendarSingleDayCellStyled >
      {events.events.map((event: any) => {
        const { width, position, index } = getEventPosition(event, allEvents);

        return (
          <BadgeWeekStyled
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
      })}
    </CalendarSingleDayCellStyled>
  );
};
