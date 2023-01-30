import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarMonth } from "../calendarMonth/CalendarMonth";
import { CalendarEnums, Event } from "./Calendar.types";
import { CalendarWeek } from "../calendarWeek/CalendarWeek";

const events = [
  {
    name: "AEAR Figma",
    eventDates: [
      {
        start: new Date("01/29/2023 11:00:00 AM"),
        end: new Date("01/29/2023 03:40:00 PM"),
      },
    ],
    location: "Belgrade",
  },
  {
    name: "Matrix TEO",
    eventDates: [
      {
        start: new Date("01/29/2023 09:00:00 AM"),
        end: new Date("01/29/2023 03:40:00 PM"),
      },
      {
        start: new Date("01/30/2023 09:00:00 AM"),
        end: new Date("01/29/2023 05:40:00 PM"),
      },
      {
        start: new Date("01/31/2023 09:00:00 AM"),
        end: new Date("01/31/2023 03:40:00 PM"),
      },
      {
        start: new Date("02/01/2023 09:00:00 AM"),
        end: new Date("02/01/2023 03:40:00 PM"),
      },
    ],
    location: "Belgrade",
  },
  {
    name: "JavaScript Conference",
    eventDates: [
      {
        start: new Date("02/03/2023 11:00:00 AM"),
        end: new Date("02/03/2023 03:40:00 PM"),
      },
    ],
    location: "Belgrade",
  },
  {
    name: "Future of Frontend",
    eventDates: [
      {
        start: new Date("02/03/2023 11:00:00 AM"),
        end: new Date("02/03/2023 03:40:00 PM"),
      },
    ],
    location: "Belgrade",
  },
  {
    name: "QA",
    eventDates: [
      {
        start: new Date("02/03/2023 11:30:00 AM"),
        end: new Date("02/03/2023 06:40:00 PM"),
      },
    ],
    location: "Belgrade",
  },
];

export const CalendarContext = React.createContext({
  selectedView: CalendarEnums.CalendarView.MonthView,
  selectedDay: dayjs().date(),
  selectedYear: dayjs().year(),
  selectedMonth: dayjs().month() + 1,
  setSelectedView: (value: CalendarEnums.CalendarView) => {},
  setSelectedDay: (value: number) => {},
  setSelectedYear: (value: number) => {},
  setSelectedMonth: (value: number) => {},
});

const Calendar = () => {
  const onEventClick = (event: Event.CalendarEventProps) => console.log(event);
  const [selectedView, setSelectedView] = useState(
    CalendarEnums.CalendarView.MonthView
  );
  const [selectedDay, setSelectedDay] = useState<number>(dayjs().date());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );
  return (
    <CalendarContext.Provider
      value={{
        selectedView,
        selectedDay,
        selectedYear,
        selectedMonth,
        setSelectedView,
        setSelectedDay,
        setSelectedYear,
        setSelectedMonth,
      }}
    >
      <CalendarControls />
      {selectedView === CalendarEnums.CalendarView.MonthView && (
        <CalendarMonth onEventClick={onEventClick} events={events} />
      )}
      {selectedView === CalendarEnums.CalendarView.WeekView && (
        <CalendarWeek onEventClick={onEventClick} events={events} />
      )}
      {/* {selectedView === CalendarView.DayView && <CalendarDay events={events} />} */}
    </CalendarContext.Provider>
  );
};

export default Calendar;
