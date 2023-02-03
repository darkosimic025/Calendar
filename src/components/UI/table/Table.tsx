import { motion } from "framer-motion";
import React, { useContext } from "react";
import styled from "styled-components";
import useScrollIntoView from "../../../hooks/useScrollIntoView";
import { CalendarContext } from "../../calendar/Calendar";
import { CalendarEnums } from "../../calendar/Calendar.types";
import { DayViewHeaderCell } from "../../day_view/HeaderCell";
import { MonthViewHeaderCell } from "../../month_view/HeaderCell";
import { Timeline } from "../../timeline/Timeline";
import { WeekViewHeaderCell } from "../../week_view/HeaderCell";
import type { Dayjs } from "dayjs";
import type { ReactElement, ReactNode, Ref, RefObject } from "react";

interface TableProps<T> {
  items: T[];
  columns: Array<{
    field: string;
    name: string | Dayjs;
    render: (item: T) => ReactNode | ReactElement;
  }>;
  ref: RefObject<HTMLTableElement>;
}

const StyledTable = styled.table<any>`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-left: ${({ theme }) => theme.table.commonBorder};
`;

const StyledThead = styled.thead`
  border: none;
  display: table;
  table-layout: fixed;
  width: 100%;
  background: ${({ theme }) => theme.table.tableHead.colors.background};
`;

const StyledTbody = styled.tbody<any>`
  width: 100%;
  max-height: 99vh;
  border: none;
  overflow-y: scroll;
  display: block;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  overflow: hidden;
  border: none;
  table-layout: fixed;
  border-bottom: ${({ theme }) => theme.table.commonBorder};
`;

const StyledTd = styled(motion.td)`
  border: none;
  border-right: ${({ theme }) => theme.table.commonBorder};
  table-layout: fixed;
`;

const StyledTr = styled.tr`
  border-bottom: ${({ theme }) => theme.table.commonBorder};
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const TableComponent = <T extends Record<string, any>>(
  { items, columns }: TableProps<T>,
  ref: Ref<HTMLTableElement>,
) => {
  const { selectedDay, selectedMonth, selectedYear, selectedView } =
    useContext(CalendarContext);
  const [expandedIndex, setExpandedIndex] = React.useState(-1);

  const handleExpand = (index: number) => {
    setExpandedIndex(index === expandedIndex ? -1 : index);
  };

  const scrollRef = useScrollIntoView(420);

  return (
    <StyledTable isExpanded={expandedIndex !== -1} ref={ref}>
      <StyledThead>
        <tr>
          <>
            {selectedView !== CalendarEnums.CalendarView.MonthView && (
              <StyledTh style={{ width: "50px" }}></StyledTh>
            )}
            {columns.map((column, index) => {
              switch (selectedView) {
                case CalendarEnums.CalendarView.MonthView:
                  return (
                    <StyledTh>
                      <MonthViewHeaderCell date={column.name as string} />
                    </StyledTh>
                  );
                case CalendarEnums.CalendarView.WeekView:
                  return (
                    <StyledTh
                      key={column.field}
                      style={
                        expandedIndex === index
                          ? { width: "400px", whiteSpace: "normal" }
                          : {}
                      }
                    >
                      <WeekViewHeaderCell
                        selectedDay={selectedDay}
                        selectedYear={selectedYear}
                        selectedMonth={selectedMonth}
                        handleExpand={handleExpand}
                        index={index}
                        date={column.name}
                        expandedIndex={expandedIndex}
                      />
                    </StyledTh>
                  );
                case CalendarEnums.CalendarView.DayView:
                  return (
                    <StyledTh key={column.field}>
                      <DayViewHeaderCell date={column.name} />
                    </StyledTh>
                  );
                default:
                  return {};
              }
            })}
          </>
        </tr>
      </StyledThead>

      <StyledTbody ref={scrollRef}>
        {items.map((item, index) => (
          <StyledTr key={index}>
            {selectedView !== CalendarEnums.CalendarView.MonthView && (
              <StyledTd
                style={{ width: "50px" }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, type: "tween" }}
              >
                <Timeline />
              </StyledTd>
            )}

            {columns.map((column, i) => (
              <StyledTd
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, type: "tween" }}
                key={i}
                style={
                  expandedIndex === i
                    ? { width: "400px", whiteSpace: "normal" }
                    : {}
                }
              >
                {column.render({ ...item[column.field] })}
              </StyledTd>
            ))}
          </StyledTr>
        ))}
      </StyledTbody>
    </StyledTable>
  );
};

const Table = React.forwardRef(TableComponent) as <
  T extends Record<string, any>,
>(
  { items, columns }: TableProps<T>,
  ref: Ref<HTMLTableElement>,
) => ReactElement;

export default Table;
