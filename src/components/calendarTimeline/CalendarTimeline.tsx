import React from "react";
import { generateAMPMHours } from "../../utils/Utils";
import {
  CalendarTimelineHead,
  CalendarTimelineHour,
  CalendarTimelineHourLabel,
  CalendarTimelineWrapper,
} from "./CalendarTimline.styled";

export const CalendarTimeline = () => {
  return (
    <CalendarTimelineWrapper>
      {/* <CalendarTimelineHead /> */}
      {generateAMPMHours().map((hour, index) => {
        return (
          <CalendarTimelineHour key={index}>
            <CalendarTimelineHourLabel>{hour}</CalendarTimelineHourLabel>
          </CalendarTimelineHour>
        );
      })}
    </CalendarTimelineWrapper>
  );
};
