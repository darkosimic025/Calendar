import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getDates, getWeekDays, splitIntoWeeks } from "../../utils/Utils";
import {
  CalendarEnums,
  Calendar as CalendarProps,
  Event,
} from "../../../src/components/calendarMonth/CalendarMonth.types";
import dayjs from "dayjs";
import CalendarMonthCell from "../calendarMonth/CalendarMonthCell";
import Table from "../UI/table/Table";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarWeekCell } from "./CalendarWeekCell";
import { CalendarWeekTimeline } from "./CalendarWeekTimeline";

export interface CalendarEvents {
  events: Event.EventProps[];
  onEventClick: (e: Event.EventProps) => void;
}

export const CalendarWeek = ({ events }: any) => {
  const [selectedDay, setSelectedDay] = useState<number>(dayjs().date());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    const week = getWeekDays(selectedDay, selectedMonth, selectedYear);
    return week.map((day) => {
      return {
        field: Object.values(day)[0].date,
        name: Object.values(day)[0].date,
        align: "center",
        render: (events: any) => <CalendarWeekCell events={events} />,
      };
    });
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useCallback(() => {
    // This function takes in the selected month, year and events and returns an array of items for the calendar.
    const dates = splitIntoWeeks(
      getWeekDays(selectedDay, selectedMonth, selectedYear)
    );
    // Using a map function to iterate over the dates and creating an array of items
    const items = dates.map((week) => {
      // Iterating over the days of the week
      for (const day of Object.values(week)) {
        // Iterating over the events
        events.forEach((event: any) => {
          //Iterating over the dates of the event
          event.eventDates.forEach((date: any, index: any) => {
            //Checking if the day is same as the date
            if (
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
                dayjs(day.date).format("MM/DD/YYYY")
              )
            ) {
              // Pushing the events to the day
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                start: dayjs(date.start),
                end: dayjs(date.end),
                ...event,
              });
            }
          });
        });
      }
      return week;
    });
    console.log(items);
    return items;
  }, [selectedMonth, selectedYear, selectedDay]);

  const monthYearTitle = `${dayjs()
    .month(selectedMonth - 1)
    .format("MMM")
    .toString()} - ${selectedYear}`;

  return (
    <motion.div
      style={{ display: "flex" }}
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -15, opacity: 0 }}
      transition={{ duration: 0.25 }}
      key={monthYearTitle}
    >
      <CalendarWeekTimeline />
      <Table
        ref={tableRef}
        id="Table"
        columns={generateColumns() as any}
        items={generateItems() as any}
      />
    </motion.div>
  );
};
