import dayjs from "dayjs";
import React, { useContext, useId, useMemo, useRef } from "react";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../App";
import { getDay } from "../../utils/Utils";
import Table from "../UI/table/Table";
import { CalendarContext } from "../calendar/Calendar";
import { CalendarSingleDayCell } from "./Cell";
import type { Event } from "../calendar/Calendar.types";

export interface DayViewProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const DayView = ({ onEventClick }: DayViewProps) => {
  const [events, setEvents] = useRecoilState(eventsAtom);
  const { selectedDay, selectedMonth, selectedYear } =
    useContext(CalendarContext);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumn = useMemo(() => {
    const day = getDay(selectedDay, selectedMonth, selectedYear);
    return [
      {
        field: Object.values(day)[0].date,
        name: dayjs(Object.values(day)[0].date),
        render: (events: Event.EventProps[]) => (
          <CalendarSingleDayCell
            date={dayjs(Object.values(day)[0].date)}
            id={useId()}
            onEventClick={onEventClick}
            events={events}
          />
        ),
      },
    ];
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useMemo(() => {
    const day = getDay(selectedDay, selectedMonth, selectedYear);
    events.forEach((event: Event.EventProps) => {
      event.eventDates.forEach((date, index) => {
        if (
          dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
            dayjs(Object.values(day)[0].date).format("MM/DD/YYYY"),
          )
        ) {
          const eventsArray = Object.values(day)[0]
            .events as Event.CalendarEventProps[];
          return eventsArray.push({
            name: event.name,
            indexDay: index + 1,
            start: dayjs(date.start),
            end: dayjs(date.end),
            id: `${event.id}_day${index}`,
          });
        }
      });
    });
    return [day];
  }, [selectedMonth, selectedYear, selectedDay]);

  return (
    <Table
      ref={tableRef}
      columns={generateColumn as any}
      items={generateItems}
    />
  );
};
