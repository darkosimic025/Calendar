import React from "react";
import { generateAMPMHours } from "../../utils/Utils";
import {
  CalendarTimelineHour,
  CalendarTimelineHourLabel,
  CalendarTimelineWrapper,
} from "./CalendarTimline.styled";

export const CalendarTimeline = () => (
  <CalendarTimelineWrapper>
    {generateAMPMHours().map((hour, index) => (
      <CalendarTimelineHour key={index}>
        <CalendarTimelineHourLabel>{hour}</CalendarTimelineHourLabel>
      </CalendarTimelineHour>
    ))}
  </CalendarTimelineWrapper>
);
