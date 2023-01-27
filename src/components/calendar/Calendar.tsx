import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getDates, splitIntoWeeks } from "../../utils/Utils";
import {
  CalendarEnums,
  Calendar as CalendarProps,
  Event,
} from "./Calendar.types";
import Table from "../UI/grid/Grid";
import { Button } from "../UI/button/Button";
import { ButtonIcon } from "../UI/button/IconButton";
import Select from "../UI/select/Select";
import dayjs from "dayjs";
import CalendarMonthCell from "../calendarCell/CalendarMonthCell";
import { FlexGroup, FlexItem } from "../UI/flex/Flex";
import { EmptyButton } from "../UI/button/EmptyButon";

export const Calendar = () => {
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );
  const [disableNextMonth, setDisableNextMonth] = useState<boolean>(false);
  const [tableDimensions, setTableDimensions] = useState({
    width: 0,
    height: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const tableRef = useRef<HTMLTableElement>(null);
  const handleElementResized = () => {
    setTableDimensions({
      width: tableRef!.current!.getBoundingClientRect().width,
      height: tableRef!.current!.getBoundingClientRect().height,
      bottom: tableRef!.current!.getBoundingClientRect().bottom,
      left: tableRef!.current!.getBoundingClientRect().left,
      right: tableRef!.current!.getBoundingClientRect().right,
      top: tableRef!.current!.getBoundingClientRect().top,
      x: tableRef!.current!.getBoundingClientRect().x,
      y: tableRef!.current!.getBoundingClientRect().y,
    });
  };

  const resizeObserver = new ResizeObserver(handleElementResized);

  useEffect(() => {
    resizeObserver.observe(tableRef!.current!);

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, []);
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
              ref={tableRef}
              // tableDimensions={tableDimensions}
              time={args.time}
              date={args.date}
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
          event.dateEvent.forEach((date: any, index: any) => {
            //Checking if the day is same as the date
            if (dayjs(date).isSame(dayjs(day.time))) {
              // Pushing the events to the day
              day.events.push({
                name: event.event,
                color: event.color,
                type: event.eventType,
                techHorizontal: event.techHorizontale,
                location: event.location,
                startDate: event.dateEvent[0],
                endDate: event.dateEvent[event.dateEvent.length - 1],
                indexDay: index + 1,
                positionDay:
                  index === 0
                    ? Event.DayPosition.First
                    : index === event.dateEvent.length - 1
                    ? Event.DayPosition.Last
                    : Event.DayPosition.Middle,
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

  const events: any = [
    {
      event: "DevOps",
      dateEvent: ["01/02/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "DevOps",
      dateEvent: ["01/02/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "DevOps",
      dateEvent: ["01/02/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "Java",
      dateEvent: ["12/01/2023", "17/01/2023", "18/01/2023", "19/01/2023"],
      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "Angular Conference",
      dateEvent: ["01/26/2023", "01/27/2023", "01/28/2023", "01/29/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "Vue",
      dateEvent: ["01/26/2023", "01/27/2023", "01/28/2023", "01/29/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "DevOps",
      dateEvent: ["01/26/2023", "01/27/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "React",
      dateEvent: ["01/06/2023", "01/07/2023", "01/08/2023", "01/09/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "React",
      dateEvent: ["01/06/2023", "01/07/2023", "01/08/2023", "01/09/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "React",
      dateEvent: ["01/06/2023", "01/07/2023", "01/08/2023", "01/09/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
    {
      event: "React",
      dateEvent: ["01/06/2023", "01/07/2023", "01/08/2023", "01/09/2023"],

      eventType: "Conference",
      location: "Belgrade",
      techHorizontale: "React",
    },
  ];

  return (
    <>
      <FlexGroup direction="row" justifyContent="flex-end" alignItems="center">
      
        <FlexGroup  alignItems="center">
          <FlexItem>
            <EmptyButton  size="small" onClick={handleToday}>
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
              onChange={(e) => {
                setSelectedYear(parseFloat(e.toString()));
              }}
              options={generateYears()}
            />
          </FlexItem>
          <FlexItem>
            <Select
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(parseFloat(e.toString()));
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
          columns={generateColumns() as any}
          items={generateItems()}
        />
      </motion.div>
    </>
  );
};
