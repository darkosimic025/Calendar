import React from "react";
import { generateAMPMHours } from "../../utils/Utils";
import {
  TimelineHour,
  TimelineHourLabel,
  TimelineWrapper,
} from "./Timline.styled";

export const Timeline = () => (
  <TimelineWrapper>
    {generateAMPMHours().map((hour, index) => (
      <TimelineHour key={index}>
        <TimelineHourLabel>{hour}</TimelineHourLabel>
      </TimelineHour>
    ))}
  </TimelineWrapper>
);
