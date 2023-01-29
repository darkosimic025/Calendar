import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarMonth } from "../calendarMonth/CalendarMonth";
import { CalendarView, Event } from "../calendarMonth/CalendarMonth.types";
import { CalendarWeek } from "../calendarWeek/CalendarWeek";
import { CalendarWeekTimeline } from "../calendarWeek/CalendarWeekTimeline";

const events = [
  {
    name: "DevOps",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/24/2023 08:00:00 AM", end: "01/24/2023 11:00:00 AM" },
      { start: "01/29/2023 06:30:00 AM", end: "01/29/2023 10:59:00 AM" },
    ],
    location: "Belgrade",
  },
  {
    name: "Java",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/30/2023 07:30:00 PM", end: "01/30/2023 9:59:00 PM" },
      { start: "01/31/2023 08:00:00 AM", end: "01/31/2023 10:00:00 AM" },
    ],
    location: "Belgrade",
  },
  {
    name: "Java",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/22/2023 07:30:00 PM", end: "01/22/2023 9:59:00 PM" },
      { start: "01/24/2023 08:00:00 AM", end: "01/24/2023 10:00:00 AM" },
    ],
    location: "Belgrade",
  },
];

const Calendar = () => {
  const onEventClick = (e: Event.EventProps) => console.log(e);
  const [selectedView, setSelectedView] = useState(CalendarView.MonthView);
  const [selectedDay, setSelectedDay] = useState<number>(dayjs().date());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );
  return (
    <>
      <CalendarControls
        selectedDay={selectedDay}
        selectedView={selectedView}
        setSelectedDay={setSelectedDay}
        setSelectedView={setSelectedView}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
      />
      {selectedView === CalendarView.MonthView && (
        <CalendarMonth onEventClick={onEventClick} events={events} />
      )}
      {selectedView === CalendarView.WeekView && (
        <CalendarWeek events={events} />
      )}
      {/* {selectedView === CalendarView.DayView && <CalendarDay events={events} />} */}
    </>
  );
};

export default Calendar;
