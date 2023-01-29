import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CalendarEnums,
  CalendarView,
} from "../calendarMonth/CalendarMonth.types";
import dayjs from "dayjs";
import { FlexGroup, FlexItem } from "../UI/flex/Flex";
import { EmptyButton } from "../UI/button/EmptyButon";
import { ButtonIcon } from "../UI/button/IconButton";
import Select from "../UI/select/Select";
import { ButtonGroup } from "../UI/button/ButtonGroup";
import { Button } from "../UI/button/Button";

export interface CalendarControlsProps {
  selectedYear: number;
  selectedMonth: number;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
  selectedDay: number;
  setSelectedDay: React.Dispatch<React.SetStateAction<number>>;
  setSelectedView: React.Dispatch<React.SetStateAction<CalendarView>>;
  selectedView: CalendarView;
}

export const CalendarControls = ({
  selectedYear,
  selectedMonth,
  setSelectedYear,
  setSelectedMonth,
  selectedView,
  setSelectedView,
  selectedDay,
  setSelectedDay,
}: CalendarControlsProps) => {
  const [disableNextMonth, setDisableNextMonth] = useState<boolean>(false);

  const generateYears = useCallback(() => {
    // This function generates an array of years from 1970 to current year + 1
    const currentYear = dayjs().year();
    let yearOptions = [];
    for (let i = 1970; i <= currentYear + 1; i++) {
      yearOptions.push({ value: i, text: i });
    }
    return yearOptions.reverse();
  }, []);

  const generateMonths = useCallback(() => {
    // This function generates an array of months
    return Object.entries(CalendarEnums.Months).map(([key, value]) => ({
      value,
      text: key,
    }));
  }, []);

  const handlePreviousMonth = useCallback(() => {
    // This function handles the event when the previous month button is clicked
    let previousMonth = selectedMonth - 1;
    let previousYear = selectedYear;
    if (previousMonth === 0) {
      previousMonth = 12;
      previousYear = previousYear - 1;
    }
    setSelectedYear(previousYear);
    setSelectedMonth(previousMonth);
  }, [selectedMonth, selectedYear]);

  const handleNextMonth = useCallback(() => {
    // This function handles the event when the next month button is clicked
    const nextMonth = selectedMonth === 12 ? 1 : selectedMonth + 1;
    const nextYear = selectedMonth === 12 ? selectedYear + 1 : selectedYear;
    setSelectedYear(nextYear);
    setSelectedMonth(nextMonth);
  }, [selectedMonth, selectedYear]);

  const handleToday = useCallback(() => {
    // This function handles the event when the today button is clicked
    setSelectedMonth(dayjs().month() + 1);
    setSelectedYear(dayjs().year());
  }, []);

  useEffect(() => {
    // This effect updates the disableNextMonth state based on the selected month and year
    if (selectedMonth === 12 && selectedYear === dayjs().year() + 1) {
      setDisableNextMonth(true);
    } else {
      setDisableNextMonth(false);
    }
  }, [selectedMonth, selectedYear]);

  const buttons = [
    { label: "Day", onClick: () => setSelectedView(CalendarView.DayView) },
    { label: "Week", onClick: () => setSelectedView(CalendarView.WeekView) },
    { label: "Month", onClick: () => setSelectedView(CalendarView.MonthView) },
  ];

  const selectedIndex = buttons.findIndex(
    ({ label }) => label === selectedView
  );

  return (
    <>
      <FlexGroup direction="row" justifyContent="flex-end" alignItems="center">
        <FlexGroup alignItems="center">
          <FlexItem>
            <ButtonGroup
              size="small"
              selectedIndex={selectedIndex}
              buttons={buttons}
            />
          </FlexItem>
          <FlexItem>
            <EmptyButton size="small" onClick={handleToday}>
              Today
            </EmptyButton>
          </FlexItem>
          <FlexItem>
            <ButtonIcon
              onClick={handlePreviousMonth}
              size="small"
              icon="arrowLeft"
            />
          </FlexItem>
          <FlexItem>
            <ButtonIcon
              onClick={handleNextMonth}
              size="small"
              icon="arrowRight"
            />
          </FlexItem>
          <FlexItem>
            <Select
              value={selectedYear}
              onChange={(year) => {
                setSelectedYear(parseFloat(year.toString()));
              }}
              options={generateYears()}
            />
          </FlexItem>
          <FlexItem>
            <Select
              value={selectedMonth}
              onChange={(month) => {
                setSelectedMonth(parseFloat(month.toString()));
              }}
              options={generateMonths()}
            />
          </FlexItem>
        </FlexGroup>
      </FlexGroup>
    </>
  );
};
