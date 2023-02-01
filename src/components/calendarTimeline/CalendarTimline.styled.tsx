import styled from "styled-components";

export const CalendarTimelineHour = styled.div`
  height: 60px;
  position: relative;
  border-bottom: ${({ theme }) => theme.calendar.timeline.border};
`;

export const CalendarTimelineHourLabel = styled.span`
  position: relative;
  top: 0px;
  margin-left: 5px;
  color: ${({ theme }) => theme.calendar.timeline.textColor};
  background-color: ${({ theme }) => theme.calendar.timeline.labelBackground};
`;

export const CalendarTimelineWrapper = styled.div`
  height: 1440px;
  position: relative;
  width: 50px;
`;

export const CalendarTimelineHead = styled.div`
  height: 40px;
  position: relative;
`;
