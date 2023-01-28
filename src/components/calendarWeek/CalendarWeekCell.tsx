import dayjs from "dayjs";
import styled from "styled-components";
import Badge, { StyledBadge } from "../UI/badge/Badge";

export const CalendarWeekCellStyled = styled.div`
  height: 1440px;
  width: 100%;
  position: relative;
`;

export const BadgeWeekStyled = styled(StyledBadge)<any>`
  border: 1px solid white;
  border-radius: 4px;
  box-shadow: 0px 4px 4px 0px rgba(60, 64, 67, 0.3),
    0px 8px 12px 6px rgba(60, 64, 67, 0.15);
  position: absolute;
  top: ${(props) => `${props.start}px`};
  height: ${(props) => `${props.duration}px`};
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

export const CalendarWeekCell = ({ events }: any) => {
  return (
    <CalendarWeekCellStyled>
      {events.events.map((event: any) => (
        
        <BadgeWeekStyled
          start={timeToPixels(event.start)}
          duration={eventDurationInPixels({
            start: event.start,
            end: event.end,
          })}
        >
          {event.name + ` Day ${event.indexDay}`}
        </BadgeWeekStyled>
      ))}
    </CalendarWeekCellStyled>
  );
};
