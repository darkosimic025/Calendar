import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Calendar } from "./Calendar";
import dayjs from "dayjs";
import userEvent from "@testing-library/user-event";

describe("Calendar", () => {
  test("renders the calendar with the correct month and year", () => {
    const { getByTestId } = render(<Calendar />);
    const currentMonth = dayjs().format("MMM").toString();
    const currentYear = dayjs().format("YYYY").toString();
    const monthYearTitle = getByTestId("month-year-title") as HTMLTitleElement;
    const monthYearString = `${currentMonth} - ${currentYear}`;
    expect(monthYearTitle.textContent).toBe(monthYearString);
  });

  test("can navigate to the previous month", () => {
    const { getByTestId, getByText, getByLabelText } = render(<Calendar />);
    const previousMonthButton = getByTestId("previous-month-button");
    fireEvent.click(previousMonthButton);
    const previousMonth = dayjs().subtract(1, "month").format("MMM");

    userEvent.selectOptions(getByLabelText("Month"), previousMonth);
    expect(
      (getByText(previousMonth) as HTMLOptionElement).selected
    ).toBeTruthy();
  });

  test("can navigate to the next month", () => {
    const { getByTestId, getByText, getByLabelText } = render(<Calendar />);
    const nextMonthButton = getByTestId("next-month-button");
    fireEvent.click(nextMonthButton);
    const nextMonth = dayjs().add(1, "months").format("MMM");
    userEvent.selectOptions(getByLabelText("Month"), nextMonth);
    expect((getByText(nextMonth) as HTMLOptionElement).selected).toBeTruthy();
  });

  test("can navigate to the current month", () => {
    const { getByTestId } = render(<Calendar />);
    const nextMonthButton = getByTestId("next-month-button");
    fireEvent.click(nextMonthButton);
    const todayButton = getByTestId("today-button");
    fireEvent.click(todayButton);
    const currentMonth = dayjs().format("MMM");
    const currentYear = dayjs().format("YYYY");
    const monthYearTitle = getByTestId("month-year-title") as HTMLTitleElement;
    const monthYearString = `${currentMonth} - ${currentYear}`;
    expect(monthYearTitle.textContent).toBe(monthYearString);
  });

  test("renders the correct number of rows for a month", () => {
    const { container } = render(<Calendar />);
    const rows = container.getElementsByClassName("euiTableRow");
    expect(rows.length).toEqual(6);
  });

  test("renders the correct number of cells for a month", () => {
    const { container } = render(<Calendar />);
    const cells = container.getElementsByClassName("euiTableRowCell");
    expect(cells.length).toEqual(42);
  });
});
