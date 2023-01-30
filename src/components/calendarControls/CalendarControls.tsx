import React, { useCallback, useContext, useEffect, useState } from "react";
import { CalendarEnums } from "../calendar/Calendar.types";
import dayjs from "dayjs";
import { FlexGroup, FlexItem } from "../UI/flex/Flex";
import { EmptyButton } from "../UI/button/EmptyButon";
import { ButtonIcon } from "../UI/button/IconButton";
import Select from "../UI/select/Select";
import { ButtonGroup } from "../UI/button/ButtonGroup";
import { CalendarContext } from "../calendar/Calendar";
import { CalendarControlsWrapper } from "./CalendarControls.styled";

export interface CalendarControlsProps {
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

export const CalendarControls = () => {
  const {
    selectedView,
    setSelectedView,
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDay,
    setSelectedMonth,
    setSelectedYear,
  } = useContext(CalendarContext);
  const [disableNextMonth, setDisableNextMonth] = useState<boolean>(false);

  const generateYears = useCallback(() => {
    const currentYear = dayjs().year();
    let yearOptions = [];
    for (let i = 1970; i <= currentYear + 1; i++) {
      yearOptions.push({ value: i, text: i });
    }
    return yearOptions.reverse();
  }, []);

  const generateMonths = useCallback(() => {
    return Object.entries(CalendarEnums.Months).map(([key, value]) => ({
      value,
      text: key,
    }));
  }, []);
  const handlePrevious = useCallback(() => {
    switch (selectedView) {
      case CalendarEnums.CalendarView.MonthView:
        setSelectedMonth(selectedMonth === 1 ? 12 : selectedMonth - 1);
        setSelectedYear(selectedMonth === 1 ? selectedYear - 1 : selectedYear);
        break;
      case CalendarEnums.CalendarView.WeekView:
        setSelectedDay(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(7, "day")
            .date()
        );
        setSelectedMonth(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(7, "day")
            .month() + 1
        );
        setSelectedYear(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(7, "day")
            .year()
        );
        break;
      case CalendarEnums.CalendarView.DayView:
        setSelectedDay(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(1, "day")
            .date()
        );
        setSelectedMonth(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(1, "day")
            .month() + 1
        );
        setSelectedYear(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .subtract(1, "day")
            .year()
        );
        break;
      default:
        break;
    }
  }, [selectedDay, selectedMonth, selectedView, selectedYear]);
  const handleNext = useCallback(() => {
    switch (selectedView) {
      case CalendarEnums.CalendarView.MonthView:
        setSelectedMonth(selectedMonth === 12 ? 1 : selectedMonth + 1);
        setSelectedYear(selectedMonth === 12 ? selectedYear + 1 : selectedYear);
        break;
      case CalendarEnums.CalendarView.WeekView:
        setSelectedDay(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(7, "day")
            .date()
        );
        setSelectedMonth(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(7, "day")
            .month() + 1
        );
        setSelectedYear(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(7, "day")
            .year()
        );
        break;
      case CalendarEnums.CalendarView.DayView:
        setSelectedDay(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(1, "day")
            .date()
        );
        setSelectedMonth(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(1, "day")
            .month() + 1
        );
        setSelectedYear(
          dayjs(new Date(selectedYear, selectedMonth - 1, selectedDay))
            .add(1, "day")
            .year()
        );
        break;
      default:
        break;
    }
  }, [selectedDay, selectedMonth, selectedView, selectedYear]);

  const handleToday = useCallback(() => {
    setSelectedMonth(dayjs().month() + 1);
    setSelectedYear(dayjs().year());
    setSelectedDay(dayjs().date());
  }, []);

  useEffect(() => {
    if (selectedMonth === 12 && selectedYear === dayjs().year() + 1) {
      setDisableNextMonth(true);
    } else {
      setDisableNextMonth(false);
    }
  }, [selectedMonth, selectedYear]);

  const buttons = [
    {
      label: "Day",
      onClick: () => setSelectedView(CalendarEnums.CalendarView.DayView),
    },
    {
      label: "Week",
      onClick: () => setSelectedView(CalendarEnums.CalendarView.WeekView),
    },
    {
      label: "Month",
      onClick: () => setSelectedView(CalendarEnums.CalendarView.MonthView),
    },
  ];

  const selectedIndex = buttons.findIndex(
    ({ label }) => label === selectedView
  );

  return (
    <CalendarControlsWrapper direction="row" justifyContent="space-between">
      <FlexGroup justifyContent="center" alignItems="center">
        <FlexItem>
          <EmptyButton size="small" onClick={handleToday}>
            Today
          </EmptyButton>
        </FlexItem>

        <FlexItem>
          <ButtonIcon onClick={handlePrevious} size="small" icon="arrowLeft" />
        </FlexItem>
        <FlexItem>
          <ButtonIcon onClick={handleNext} size="small" icon="arrowRight" />
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
      <FlexGroup justifyContent="center" alignItems="center">
        <FlexItem>
          <ButtonGroup
            size="small"
            selectedIndex={selectedIndex}
            buttons={buttons}
          />
        </FlexItem>
      </FlexGroup>
    </CalendarControlsWrapper>
  );
};
