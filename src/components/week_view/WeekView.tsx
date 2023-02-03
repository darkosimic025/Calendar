import dayjs from "dayjs";
import React, { useCallback, useContext, useId, useRef } from "react";
import { getWeekDays, splitIntoWeeks } from "../../utils/Utils";
import Table from "../UI/table/Table";
import { CalendarContext } from "../calendar/Calendar";
import type { Event } from "../calendar/Calendar.types";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../App";
import { WeekViewDayCell } from "./Cell";
import { DNDProvider } from "./DndProvider";

export interface WeekViewProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const WeekView = ({ onEventClick }: WeekViewProps) => {
  const [events, setEvents] = useRecoilState(eventsAtom);
  const { selectedDay, selectedMonth, selectedYear } =
    useContext(CalendarContext);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    const week = getWeekDays(selectedDay, selectedMonth, selectedYear);
    return week.map((day) => ({
      field: Object.values(day)[0].date,
      name: dayjs(Object.values(day)[0].date),
      render: (events: { events: Event.EventProps[] }) => (
        <WeekViewDayCell
          id={useId()}
          date={dayjs(Object.values(day)[0].date)}
          onEventClick={onEventClick}
          events={events.events}
        />
      ),
    }));
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useCallback(() => {
    const dates = splitIntoWeeks(
      getWeekDays(selectedDay, selectedMonth, selectedYear),
    );
    const items = dates.map((week) => {
      for (const day of Object.values(week)) {
        events.forEach((event: Event.EventProps) => {
          event.eventDates.forEach((date, index) => {
            if (
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
                dayjs(day.date).format("MM/DD/YYYY"),
              )
            ) {
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                start: dayjs(date.start),
                end: dayjs(date.end),
                id: event.id,
              });
            }
          });
        });
      }
      return week;
    });
    return items;
  }, [selectedMonth, selectedYear, selectedDay, events]);


  return (
    <DNDProvider>
      <Table
        ref={tableRef}
        columns={generateColumns()}
        items={generateItems() as any}
      />
    </DNDProvider>
  );
};
