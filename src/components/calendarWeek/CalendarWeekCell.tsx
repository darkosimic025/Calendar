import dayjs from "dayjs";
import styled, { css } from "styled-components";
import Badge, { StyledBadge } from "../UI/badge/Badge";

export const CalendarWeekCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
`;

export const BadgeWeekStyled = styled(StyledBadge)<any>`
  border: 1px solid white;
  border-radius: 4px;
  width: ${(props) => `${props.width}%`};

  box-shadow: 0px 4px 4px 0px rgba(60, 64, 67, 0.3),
    0px 8px 12px 6px rgba(60, 64, 67, 0.15);
  position: absolute;
  float: left;
  left: ${(props) => `${props.position}%`};
  top: ${(props) => `${props.start}px`};
  height: ${(props) => `${props.duration}px`};
  /* z-index: ${(props) => props.index}; */
`;

export const timeToPixels = (time: any) => {
  let startOfDay = dayjs(time).format("MM/DD/YYYY");
  let currentTime = dayjs(time);
  let diff = currentTime.diff(dayjs(startOfDay), "minute");
  return diff - 60;
};

export const eventDurationInPixels = ({ start, end }: any) => {
  const startMinutes = timeToPixels(start);
  const endMinutes = timeToPixels(end);
  const duration = endMinutes - startMinutes;
  return duration;
};

export const getEventPosition = (event: any, events: any[]) => {
  const startMinutes = timeToPixels(event.start);
  const endMinutes = timeToPixels(event.end);

  let overlappingEvents = events
    .filter(
      (ev: any) =>
        startMinutes >= timeToPixels(ev.start) ||
        startMinutes <= timeToPixels(ev.end)
    )
    .sort((a: any, b: any) => {
      if (timeToPixels(a.start) === timeToPixels(b.start)) {
        return timeToPixels(a.end) - timeToPixels(b.end);
      }
      return timeToPixels(a.start) - timeToPixels(b.start);
    });

  let index = overlappingEvents.length;
  let width = 100 / index;
  let position = overlappingEvents.findIndex((ev: any) => ev === event) + 1;
  console.log(event.name, position);
  return { width, position: position * width - width, index: position };
};
export const CalendarWeekCell = ({ events }: any) => {
  const allEvents = events.events;
  return (
    <CalendarWeekCellStyled>
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
    </CalendarWeekCellStyled>
  );
};
