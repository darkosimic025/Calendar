import React from "react";
import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar/Calendar";
import { Event } from "./components/calendar/Calendar.types";
import { darkTheme, lightTheme } from "./theme/ThemeProvider";

function App() {
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

  const onEventClick = (event: Event.CalendarEventProps) => console.log(event);

  return (
    <ThemeProvider theme={lightTheme}>
      <Calendar onEventClick={onEventClick} events={events} />
    </ThemeProvider>
  );
}

export default App;
