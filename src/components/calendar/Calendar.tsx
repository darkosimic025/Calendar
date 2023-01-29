import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarMonth } from "../calendarMonth/CalendarMonth";
import { CalendarView, Event } from "../calendarMonth/CalendarMonth.types";
import { CalendarWeek } from "../calendarWeek/CalendarWeek";
import { CalendarWeekTimeline } from "../calendarWeek/CalendarWeekTimeline";

const events = [

  {
    name: "Angular",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
        { start: "01/29/2023 11:03:00 AM", end: "01/29/2023 03:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "JavaScript",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/29/2023 11:02:00 AM", end: "01/29/2023 03:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "Vue",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/29/2023 11:01:00 AM", end: "01/29/2023 03:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "Redux",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/30/2023 11:01:00 AM", end: "01/30/2023 03:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "Redux",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/30/2023 11:01:00 AM", end: "01/30/2023 09:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "Redux",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/30/2023 06:01:00 PM", end: "01/30/2023 10:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
  {
    name: "Redux",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/30/2023 06:01:00 PM", end: "01/30/2023 10:40:00 PM" },
  
    ],
    location: "Belgrade",
  },
];

export const CalendarContext = React.createContext({
  selectedView: CalendarView.MonthView,
  selectedDay: dayjs().date(),
  selectedYear: dayjs().year(),
  selectedMonth: dayjs().month() + 1,
  setSelectedView: (value: CalendarView) => {},
  setSelectedDay: (value: number) => {},
  setSelectedYear: (value: number) => {},
  setSelectedMonth: (value: number) => {},
});

const Calendar = () => {
  const onEventClick = (e: Event.EventProps) => console.log(e);
  const [selectedView, setSelectedView] = useState(CalendarView.MonthView);
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
      {selectedView === CalendarView.MonthView && (
        <CalendarMonth onEventClick={onEventClick} events={events} />
      )}
      {selectedView === CalendarView.WeekView && (
        <CalendarWeek events={events} />
      )}
      {/* {selectedView === CalendarView.DayView && <CalendarDay events={events} />} */}
    </CalendarContext.Provider>
  );
};

export default Calendar;
