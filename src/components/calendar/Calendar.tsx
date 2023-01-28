import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getDates, splitIntoWeeks } from "../../utils/Utils";
import {
  CalendarEnums,
  Calendar as CalendarProps,
  Event,
} from "./Calendar.types";
import dayjs from "dayjs";
import CalendarMonthCell from "../calendarCell/CalendarMonthCell";
import { FlexGroup, FlexItem } from "../UI/flex/Flex";
import { EmptyButton } from "../UI/button/EmptyButon";
import Table from "../UI/table/Table";
import { ButtonIcon } from "../UI/button/IconButton";
import Select from "../UI/select/Select";

export interface CalendarEvents {
  events: Event.EventProps[];
  onEventClick: (e: any) => any;
}

export const Calendar = ({ events, onEventClick }: CalendarEvents) => {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );
  const [disableNextMonth, setDisableNextMonth] = useState<boolean>(false);
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
            if (dayjs(date).isSame(dayjs(day.date))) {
              // Pushing the events to the day
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                ...event
              });
            }
          });
        });
      }
      return week;
    });
    return items;
  }, [selectedMonth, selectedYear]);

  const generateYears = useCallback(() => {
    // This function generates an array of years from 1970 to current year + 1
    const currentYear = dayjs().year();
    let yearOptions = [];
    for (let i = 1970; i <= currentYear + 1; i++) {
      yearOptions.push({ value: i, text: i });
    }
    return yearOptions.reverse();
  }, []);

  const generateMonths = useCallback(() => {
    // This function generates an array of months
    return Object.entries(CalendarEnums.Months).map(([key, value]) => ({
      value,
      text: key,
    }));
  }, []);

  const handlePreviousMonth = useCallback(() => {
    // This function handles the event when the previous month button is clicked
    let previousMonth = selectedMonth - 1;
    let previousYear = selectedYear;
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear = previousYear - 1;
    }
    setSelectedYear(previousYear);
    setSelectedMonth(previousMonth);
  }, [selectedMonth, selectedYear]);

  const handleNextMonth = useCallback(() => {
    // This function handles the event when the next month button is clicked
    const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
    setSelectedYear(nextYear);
    setSelectedMonth(nextMonth);
  }, [selectedMonth, selectedYear]);

  const handleToday = useCallback(() => {
    // This function handles the event when the today button is clicked
    setSelectedMonth(dayjs().month() + 1);
    setSelectedYear(dayjs().year());
  }, []);

  useEffect(() => {
    // This effect updates the disableNextMonth state based on the selected month and year
    if (selectedMonth === 12 && selectedYear === dayjs().year() + 1) {
      setDisableNextMonth(true);
    } else {
      setDisableNextMonth(false);
    }
  }, [selectedMonth, selectedYear]);

  const monthYearTitle = `${dayjs()
    .month(selectedMonth - 1)
    .format("MMM")
    .toString()} - ${selectedYear}`;

  return (
    <>
      <FlexGroup direction="row" justifyContent="flex-end" alignItems="center">
        <FlexGroup alignItems="center">
          <FlexItem>
            <EmptyButton size="small" onClick={handleToday}>
              Today
            </EmptyButton>
          </FlexItem>
          <FlexItem>
            <ButtonIcon
              onClick={handlePreviousMonth}
              size="small"
              icon="arrowLeft"
            />
          </FlexItem>
          <FlexItem>
            <ButtonIcon
              onClick={handleNextMonth}
              size="small"
              icon="arrowRight"
            />
          </FlexItem>
          <FlexItem>
            <Select
              value={selectedYear}
              onChange={(year) => {
                setSelectedYear(parseFloat(year.toString()));
              }}
              options={generateYears()}
            />
          </FlexItem>
          <FlexItem>
            <Select
              value={selectedMonth}
              onChange={(month) => {
                setSelectedMonth(parseFloat(month.toString()));
              }}
              options={generateMonths()}
            />
          </FlexItem>
        </FlexGroup>
      </FlexGroup>
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
