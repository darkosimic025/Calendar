import React, { useCallback, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { getWeekDays, splitIntoWeeks } from "../../utils/Utils";
import { Event } from "../calendar/Calendar.types";
import dayjs from "dayjs";
import Table from "../UI/table/Table";
import { CalendarSingleDayCell } from "../calendarDay/CalendarSingleDayCell";
import { CalendarContext } from "../calendar/Calendar";

export interface CalendarWeekProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const CalendarWeek = ({ events }: CalendarWeekProps) => {
  const { selectedDay, selectedMonth, selectedYear } =
    useContext(CalendarContext);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    const week = getWeekDays(selectedDay, selectedMonth, selectedYear);
    return week.map((day) => {
      return {
        field: Object.values(day)[0].date,
        name: dayjs(Object.values(day)[0].date),
        render: (events: Event.EventProps[]) => (
          <CalendarSingleDayCell events={events} />
        ),
      };
    });
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useCallback(() => {
    const dates = splitIntoWeeks(
      getWeekDays(selectedDay, selectedMonth, selectedYear)
    );

    const items = dates.map((week) => {
      for (const day of Object.values(week)) {
        events.forEach((event: Event.EventProps) => {
          event.eventDates.forEach((date, index) => {
            if (
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
                dayjs(day.date).format("MM/DD/YYYY")
              )
            ) {
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                start: dayjs(date.start),
                end: dayjs(date.end),
                // ...event,
              });
            }
          });
        });
      }
      return week;
    });
    return items;
  }, [selectedMonth, selectedYear, selectedDay]);

  const monthYearTitle = `${dayjs()
    .month(selectedMonth - 1)
    .format("MMM")
    .toString()} - ${selectedYear} - ${selectedDay}`;

  return (
    <motion.div
      style={{ display: "flex" }}
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -15, opacity: 0 }}
      transition={{ duration: 0.25 }}
      key={monthYearTitle}
    >
      <Table
        ref={tableRef}
        columns={generateColumns()}
        items={generateItems() as any}
      />
    </motion.div>
  );
};
