import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getDates, splitIntoWeeks } from "../../utils/Utils";
import {
  CalendarEnums,
  Calendar as CalendarProps,
  Event,
} from "./CalendarMonth.types";
import dayjs from "dayjs";
import CalendarMonthCell from "../calendarMonth/CalendarMonthCell";
import Table from "../UI/table/Table";
import { CalendarControls } from "../calendarControls/CalendarControls";

export interface CalendarEvents {
  events: Event.EventProps[];
  onEventClick: (e: Event.EventProps) => void;
}

export const Calendar = ({ events, onEventClick }: CalendarEvents) => {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    // This function generates an array of columns for the calendar
    const columns = Object.entries(CalendarEnums.WeekDays).map(
      ([key, value]) => ({
        field: value,
        name: key,
      })
    );
    // Using map to iterate over the columns and returning a new array
    return columns.map(({ field, name }) => {
      // Destructuring the field and name properties
      return {
        field: field,
        name: name,
        align: "center",
        render: ({ ...args }: CalendarProps.DayProps) => {
          return (
            <CalendarMonthCell
              onEventClick={onEventClick}
              ref={tableRef}
              date={args.date}
              indexDay={args.indexDay}
              events={args.events}
              isCurrentMonth={args.isCurrentMonth}
            />
          );
        },
      };
    });
  }, [selectedMonth, selectedYear]);

  const generateItems = useCallback(() => {
    // This function takes in the selected month, year and events and returns an array of items for the calendar.
    const dates = splitIntoWeeks(getDates(selectedMonth, selectedYear));
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
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(dayjs(day.date))
            ) {
              // Pushing the events to the day
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                ...event,
              });
            }
          });
        });
      }
      return week;
    });
    return items;
  }, [selectedMonth, selectedYear]);

  const monthYearTitle = `${dayjs()
    .month(selectedMonth - 1)
    .format("MMM")
    .toString()} - ${selectedYear}`;

  return (
    <>
      <CalendarControls
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -15, opacity: 0 }}
        transition={{ duration: 0.25 }}
        key={monthYearTitle}
      >
        <Table
          ref={tableRef}
          id="Table"
          columns={generateColumns()}
          items={generateItems() as any}
        />
      </motion.div>
    </>
  );
};
