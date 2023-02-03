import styled from "styled-components";

export const TimelineHour = styled.div`
  height: 60px;
  position: relative;
  border-bottom: ${({ theme }) => theme.calendar.timeline.border};
`;

export const TimelineHourLabel = styled.span`
  position: relative;
  top: 0px;
  margin-left: 5px;
  color: ${({ theme }) => theme.calendar.timeline.textColor};
  background-color: ${({ theme }) => theme.calendar.timeline.labelBackground};
`;

export const TimelineWrapper = styled.div`
  height: 1440px;
  position: relative;
  width: 50px;
`;

export const TimelineHead = styled.div`
  height: 40px;
  position: relative;
`;
