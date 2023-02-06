import React from "react";
import { BadgeMonthStyled } from "./Event.styled";
import type { Event } from "../calendar/Calendar.types";

export interface BadgeEventProps<T> {
  children: string;
  color?: string;
  onEventClick: (event: T) => void;
}

export const WeekBadgeEvent = React.memo(
  ({
    children,
    color = "primary",
    onEventClick,
  }: BadgeEventProps<Event.CalendarEventProps>): JSX.Element | null => (
    <BadgeMonthStyled color={color}>
      <div> {children}</div>
    </BadgeMonthStyled>
  ),
);
