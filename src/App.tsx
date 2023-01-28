import React from "react";
import { Event } from "./components/calendarMonth/CalendarMonth.types";
import { Calendar } from "./components/calendarMonth/CalendarMonth";
import { CalendarWeek } from "./components/calendarWeek/CalendarWeek";
import { CalendarWeekTimeline } from "./components/calendarWeek/CalendarWeekTimeline";

const events = [
  {
    name: "DevOps",
    //MM/DD/YYYY HH:mm:ss A
    eventDates: [
      { start: "01/22/2023 06:30:00 AM", end: "01/22/2023 10:59:00 AM" },
      { start: "01/24/2023 08:00:00 AM", end: "01/24/2023 11:00:00 AM" },
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

const onEventClick = (e: Event.EventProps) => console.log(e);

function App() {
  // return <Calendar onEventClick={onEventClick} events={events} />;
  return (
    <div style={{ display: "flex" }}>
      <CalendarWeekTimeline />
      <CalendarWeek events={events}/>
    </div>
  );
}

export default App;
