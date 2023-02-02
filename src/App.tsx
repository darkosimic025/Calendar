import React, { useId } from "react";
import { ThemeProvider } from "styled-components";
import Calendar from "./components/calendar/Calendar";
import { lightTheme } from "./theme/ThemeProvider";
import type { Event } from "./components/calendar/Calendar.types";

function App() {
  

  const events = [
    {
      id: useId(),
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
      id: useId(),
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
      id: useId(),
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
      id: useId(),
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
      id: useId(),
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

  const onEventClick = (event: Event.CalendarEventProps): void => {
    console.log(event);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Calendar onEventClick={onEventClick} events={events} />
    </ThemeProvider>
  );
}

export default App;
