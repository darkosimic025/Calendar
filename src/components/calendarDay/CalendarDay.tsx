import React, { useCallback, useContext, useRef } from "react";
import { motion } from "framer-motion";
import { getDay, getWeekDays, splitIntoWeeks } from "../../utils/Utils";
import { Event } from "../calendar/Calendar.types";
import dayjs from "dayjs";
import Table from "../UI/table/Table";

import { CalendarContext } from "../calendar/Calendar";
import { CalendarSingleDayCell } from "./CalendarSingleDayCell";

export interface CalendarDazProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const CalendarDay = ({ events }: CalendarDazProps) => {
  const { selectedDay, selectedMonth, selectedYear } =
    useContext(CalendarContext);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumn = useCallback(() => {
    const day = getDay(selectedDay, selectedMonth, selectedYear);
    console.log(day);
    return [
      {
        field: Object.values(day)[0].date,
        name: dayjs(Object.values(day)[0].date),
        align: "center",
        render: (events: Event.EventProps[]) => (
          <CalendarSingleDayCell events={events} />
        ),
      },
    ];
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useCallback(() => {
    const day = getDay(selectedDay, selectedMonth, selectedYear);
    console.log(Object.values(day)[0].date);
    const dayObject = {};

    events.forEach((event: Event.EventProps) => {
      event.eventDates.forEach((date, index) => {
        if (
          dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
            dayjs(Object.values(day)[0].date).format("MM/DD/YYYY")
          )
        ) {
          const eventsArray = Object.values(day)[0]
            .events as Event.CalendarEventProps[];
          return eventsArray.push({
            name: event.name,
            indexDay: index + 1,
            start: dayjs(date.start),
            end: dayjs(date.end),
            // ...event,
          });
        }
      });
    });
    return [day];
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
        columns={generateColumn() as any}
        items={generateItems() as any}
      />
    </motion.div>
  );
};
