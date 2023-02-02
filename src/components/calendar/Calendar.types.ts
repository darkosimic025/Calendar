import type { Dayjs } from "dayjs";

export namespace Event {
  export interface EventDatesProps {
    start: Date;
    end: Date;
  }
  export interface EventProps {
    id: string;
    name: string;
    eventDates: EventDatesProps[];
  }
  export interface CalendarEventProps {
    id: string;
    name: string;
    indexDay: number;
    start: Dayjs;
    end: Dayjs;
  }
}

export namespace Calendar {
  export type DaysShort = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";
  export interface DayProps {
    indexDay: string;
    events: Event.CalendarEventProps[];
    isCurrentMonth: boolean;
    date: string;
  }
  export type WeekDayProps = {
    [key in DaysShort]?: DayProps;
  };
  export type MonthProps = WeekDayProps[];
  export type MonthInWeeksProps = WeekDayProps[][];
  export type CalendarProps = WeekDayProps[];
}

export namespace CalendarUI {
  export interface CalendarCell {
    indexDay: string;
    events: Event.EventProps[];
    isCurrentMonth: boolean;
    date: string;
  }
}

export namespace CalendarEnums {
  export enum WeekDays {
    Sunday = "sun",
    Monday = "mon",
    Tuesday = "tue",
    Wednesday = "wed",
    Thursday = "thu",
    Friday = "fri",
    Saturday = "sat",
  }

  export enum Months {
    Jan = "1",
    Feb = "2",
    Mar = "3",
    Apr = "4",
    May = "5",
    Jun = "6",
    Jul = "7",
    Aug = "8",
    Sep = "9",
    Oct = "10",
    Nov = "11",
    Dec = "12",
  }

  export enum CalendarView {
    DayView = "Day",
    WeekView = "Week",
    MonthView = "Month",
  }
}
