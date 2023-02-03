import dayjs from "dayjs";
import { motion } from "framer-motion";
import React, { useCallback, useContext, useId, useRef } from "react";
import { getDates, splitIntoWeeks } from "../../utils/Utils";
import Table from "../UI/table/Table";
import { CalendarContext } from "../calendar/Calendar";
import { CalendarEnums } from "../calendar/Calendar.types";
import CalendarMonthCell from "./Cell";
import type {
  Calendar as CalendarProps,
  Event,
} from "../calendar/Calendar.types";
import {useRecoilState} from 'recoil'
import { eventsAtom } from "../../App";

export interface CalendarEvents {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const CalendarMonth = ({ onEventClick }: CalendarEvents) => {
  const [events, setEvents] = useRecoilState(eventsAtom);
  const { selectedMonth, selectedYear } = useContext(CalendarContext);

  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    const columns = Object.entries(CalendarEnums.WeekDays).map(
      ([key, value]) => ({
        field: value,
        name: key,
      }),
    );

    return columns.map(({ field, name }) => ({
      field,
      name,
      align: "center",
      render: ({ ...args }: CalendarProps.DayProps) => (
        <CalendarMonthCell
          onEventClick={onEventClick}
          ref={tableRef}
          date={args.date}
          indexDay={args.indexDay}
          events={args.events}
          isCurrentMonth={args.isCurrentMonth}
        />
      ),
    }));
  }, [selectedMonth, selectedYear]);

  const generateItems = useCallback(() => {
    const dates = splitIntoWeeks(getDates(selectedMonth, selectedYear));

    const items = dates.map((week) => {
      for (const day of Object.values(week)) {
        events.forEach((event: Event.EventProps) => {
          event.eventDates.forEach((date, index) => {
            if (
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
                dayjs(day.date),
              )
            ) {
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                start: dayjs(date.start),
                end: dayjs(date.end),
                id: `${event.id}_day${index}`,
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
    <motion.div
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
