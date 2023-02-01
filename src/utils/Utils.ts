import dayjs from "dayjs";
import type { Calendar } from "../components/calendar/Calendar.types";

export const splitIntoWeeks = (month: Calendar.MonthProps) => {
  const weeks: Calendar.MonthProps[] = [];
  for (let i = 0; i < month.length; i += 7) {
    weeks.push(month.slice(i, i + 7));
  }
  const calendarMonth: Calendar.CalendarProps = [];
  weeks.forEach((week) => {
    let calWeek = {};
    week.forEach((day) => {
      calWeek = { ...calWeek, ...day };
    });
    calendarMonth.push(calWeek);
  });
  return calendarMonth;
};

export const getDates = (month: number, year: number) => {
  const startOfMonth = dayjs()
    .month(month - 1)
    .year(year)
    .startOf("month");
  const endOfMonth = dayjs()
    .month(month - 1)
    .year(year)
    .endOf("month");

  const finalsOfPrevMonth = [];
  const currentMonth = [];
  const startsOfNextMonth = [];
  let iteratedDate = null;

  iteratedDate = startOfMonth.clone();

  while (iteratedDate.day() !== 0) {
    iteratedDate = iteratedDate.subtract(1, "day");
    finalsOfPrevMonth.push({
      [iteratedDate.format("ddd").toLowerCase()]: {
        indexDay: iteratedDate.format("D"),
        isCurrentMonth: false,
        date: iteratedDate.format("MM/DD/YYYY"),
        events: [],
        position: null,
      },
    });
  }

  iteratedDate = startOfMonth.clone();
  while (iteratedDate.month() === month - 1) {
    currentMonth.push({
      [iteratedDate.format("ddd").toLowerCase()]: {
        indexDay: iteratedDate.format("D"),
        isCurrentMonth: true,
        date: iteratedDate.format("MM/DD/YYYY"),
        events: [],
        position: null,
      },
    });
    iteratedDate = iteratedDate.add(1, "day");
  }

  iteratedDate = endOfMonth.clone();
  while (
    finalsOfPrevMonth.length + currentMonth.length + startsOfNextMonth.length <
    42
  ) {
    iteratedDate = iteratedDate.add(1, "day");
    startsOfNextMonth.push({
      [iteratedDate.format("ddd").toLowerCase()]: {
        indexDay: iteratedDate.format("D"),
        isCurrentMonth: false,
        date: iteratedDate.format("MM/DD/YYYY"),
        events: [],
        position: null,
      },
    });
  }

  return [
    ...finalsOfPrevMonth.reverse(),
    ...currentMonth,
    ...startsOfNextMonth,
  ];
};

export const getDay = (day: number, month: number, year: number) => {
  const date = dayjs()
    .date(day)
    .month(month - 1)
    .year(year);

  const currentDate = date.clone();
  return {
    [currentDate.format("MM/DD/YYYY")]: {
      indexDay: currentDate.format("D"),
      date: currentDate.format("MM/DD/YYYY"),
      events: [],
    },
  };
};

export const getWeekDays = (day: number, month: number, year: number) => {
  const date = dayjs()
    .date(day)
    .month(month - 1)
    .year(year);
  const weekDays = [];
  for (let i = 0; i < 7; i++) {
    const currentDate = date.clone().subtract(date.day() - i, "day");
    weekDays.push({
      [currentDate.format("MM/DD/YYYY")]: {
        indexDay: currentDate.format("D"),
        dayOfWeek: currentDate.format("dddd"),
        date: currentDate.format("MM/DD/YYYY"),
        events: [],
      },
    });
  }
  return weekDays;
};

export const generateAMPMHours = () => {
  const hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i} AM`);
  }
  for (let i = 1; i <= 12; i++) {
    hours.push(`${i} PM`);
  }
  return hours;
};
