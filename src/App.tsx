import React from "react";
import { Calendar } from "./components/calendar/Calendar";
import { Event } from "./components/calendar/Calendar.types";


const events = [
  {
    name: "DevOps",
    eventDates: ["01/02/2023"],
    location: 'Belgrade'
  },
  {
    name: "Java",
    eventDates: ["12/01/2023", "17/01/2023", "18/01/2023", "19/01/2023"],
    location: 'Belgrade'
  },
  {
    name: "Angular Conference",
    eventDates: ["01/26/2023", "01/27/2023", "01/28/2023", "01/29/2023"],
    location: 'Belgrade'
  },
  {
    name: "Vue",
    eventDates: ["01/26/2023", "01/27/2023", "01/28/2023", "01/29/2023"],
    location: 'Belgrade'
  },
  {
    name: "DevOps",
    eventDates: ["01/26/2023", "01/27/2023"],
    location: 'Belgrade'
  },
  {
    name: "React",
    eventDates: ["01/06/2023", "01/07/2023", "01/08/2023", "01/09/2023"],
    location: 'Belgrade'
  },
];

const onEventClick = (e : Event.EventProps) => console.log(e)

function App() {
  return <Calendar onEventClick={onEventClick} events={events} />;
}

export default App;
