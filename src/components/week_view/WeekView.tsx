import dayjs from "dayjs";
import React, { useCallback, useContext, useId, useRef, useMemo } from "react";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../App";
import { getWeekDays, splitIntoWeeks } from "../../utils/Utils";
import Table from "../UI/table/Table";
import { CalendarContext } from "../calendar/Calendar";
import { WeekViewDayCell } from "./Cell";
import { DNDProvider } from "./DndProvider";
import type { Event } from "../calendar/Calendar.types";

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
    const week = useMemo(() => getWeekDays(selectedDay, selectedMonth, selectedYear), [selectedMonth, selectedYear, selectedDay]);
    return week.map((day) => {
      const date = Object.values(day)[0].date;
      const memoizedDate = useMemo(() => dayjs(date), [date]);
      return {
        field: date,
        name: memoizedDate,
        render: (events: { events: Event.EventProps[] }) => (
          <WeekViewDayCell
            id={useId()}
            date={memoizedDate}
            onEventClick={onEventClick}
            events={events.events}
          />
        ),
      };
    });
  }, [selectedMonth, selectedYear, selectedDay, onEventClick, useId]);


  const generateItems = useCallback(() => {
    const dates = splitIntoWeeks(
      getWeekDays(selectedDay, selectedMonth, selectedYear),
    );
    const items = dates.map((week) => {
      for (const day of Object.values(week)) {
        events.forEach((event: Event.EventProps) => {
          event.eventDates.forEach((date, index) => {
            const start = dayjs(date.start).format("MM/DD/YYYY");
            const check = dayjs(day.date).format("MM/DD/YYYY");
            const isSame = dayjs(start).isSame(check);
            if (isSame) {
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
