import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarMonth } from "../calendarMonth/CalendarMonth";
import { CalendarEnums, Event } from "./Calendar.types";
import { CalendarWeek } from "../calendarWeek/CalendarWeek";
import { CalendarDay } from "../calendarDay/CalendarDay";

interface CalendarContextProps {
  selectedView: CalendarEnums.CalendarView;
  selectedDay: number;
  selectedYear: number;
  selectedMonth: number;
  setSelectedView: (value: CalendarEnums.CalendarView) => void;
  setSelectedDay: (value: number) => void;
  setSelectedYear: (value: number) => void;
  setSelectedMonth: (value: number) => void;
}

const initialCalendarContext: CalendarContextProps = {
  selectedView: CalendarEnums.CalendarView.MonthView,
  selectedDay: dayjs().date(),
  selectedYear: dayjs().year(),
  selectedMonth: dayjs().month() + 1,
  setSelectedView: () => {},
  setSelectedDay: () => {},
  setSelectedYear: () => {},
  setSelectedMonth: () => {},
};

export const CalendarContext = React.createContext(initialCalendarContext);

interface CalendarProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onEventClick }) => {
  const [selectedView, setSelectedView] = useState<CalendarEnums.CalendarView>(
    CalendarEnums.CalendarView.MonthView
  );
  const [selectedDay, setSelectedDay] = useState<number>(dayjs().date());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1
  );
  const contextValue: CalendarContextProps = {
    selectedView,
    selectedDay,
    selectedYear,
    selectedMonth,
    setSelectedView,
    setSelectedDay,
    setSelectedYear,
    setSelectedMonth,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      <CalendarControls />
      {selectedView === CalendarEnums.CalendarView.MonthView && (
        <CalendarMonth onEventClick={onEventClick} events={events} />
      )}
      {selectedView === CalendarEnums.CalendarView.WeekView && (
        <CalendarWeek onEventClick={onEventClick} events={events} />
      )}
      {selectedView === CalendarEnums.CalendarView.DayView && (
        <CalendarDay onEventClick={onEventClick} events={events} />
      )}
    </CalendarContext.Provider>
  );
};

export default Calendar;
