import dayjs from "dayjs";
import React, { useState } from "react";
import { CalendarControls } from "../calendarControls/CalendarControls";
import { CalendarDay } from "../calendarDay/CalendarDay";
import { CalendarMonth } from "../calendarMonth/CalendarMonth";
import { CalendarWeek } from "../calendarWeek/CalendarWeek";
import { CalendarEnums } from "./Calendar.types";
import type { Event } from "./Calendar.types";

interface CalendarContextProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  setSelectedView: React.Dispatch<
    React.SetStateAction<CalendarEnums.CalendarView>
  >;
  selectedView: CalendarEnums.CalendarView;
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
    CalendarEnums.CalendarView.MonthView,
  );
  const [selectedDay, setSelectedDay] = useState<number>(dayjs().date());
  const [selectedYear, setSelectedYear] = useState<number>(dayjs().year());
  const [selectedMonth, setSelectedMonth] = useState<number>(
    dayjs().month() + 1,
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
