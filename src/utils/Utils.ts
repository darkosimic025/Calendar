import dayjs from "dayjs";
import { Calendar } from "../components/calendar/Calendar.types";

// This function takes in a month object and returns an array of weeks
export const splitIntoWeeks = (month: Calendar.MonthProps) => {
  // Create an empty array to hold the weeks
  const weeks: Calendar.MonthProps[] = [];
  // Iterate over the month by 7 days at a time
  for (let i = 0; i < month.length; i += 7) {
    // Use slice method to take a 7 day slice of the month
    // and push it into the weeks array
    weeks.push(month.slice(i, i + 7));
  }
  // Create an empty array to hold the calendar month
  const calendarMonth: Calendar.CalendarProps = [];
  // Iterate over the weeks array
  weeks.forEach((week) => {
    // Create an empty object to hold the current week
    let calWeek = {};
    // Iterate over the days in the current week
    week.forEach((day) => {
      // Spread the properties of the current day into the calWeek object
      calWeek = { ...calWeek, ...day };
    });
    // Push the current week (calWeek) into the calendarMonth array
    calendarMonth.push(calWeek);
  });
  // Return the calendar month array

  return calendarMonth;
};

export const getDates = (month: number, year: number) => {
  // Define the start and end of the given month
  const startOfMonth = dayjs()
    .month(month - 1)
    .year(year)
    .startOf("month");
  const endOfMonth = dayjs()
    .month(month - 1)
    .year(year)
    .endOf("month");

  // Initialize arrays to hold the days from the previous, current, and next months that are visible in the calendar
  const finalsOfPrevMonth = [];
  const currentMonth = [];
  const startsOfNextMonth = [];
  let iteratedDate = null;

  // Start iterating from the first day of the month
  iteratedDate = startOfMonth.clone();

  // While the current day is not Sunday (day 0), add the previous days to the finalsOfPrevMonth array
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

  // Reset the iterator to the first day of the month and add the current month's days to the currentMonth array
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

  // Start iterating from the last day of the month and add the next month's days to the startsOfNextMonth array
  iteratedDate = endOfMonth.clone();
  // While the total number of days is less than 42 (to fill the calendar grid)
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

  // Return the concatenated array of days
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
  let weekDays = [];
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
  let hours = [];
  for (let i = 1; i <= 12; i++) {
    hours.push(i + " AM");
  }
  for (let i = 1; i <= 12; i++) {
    hours.push(i + " PM");
  }
  return hours;
};
