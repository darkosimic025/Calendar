import { motion } from "framer-motion";
import React, {
  ReactElement,
  ReactNode,
  Ref,
  RefObject,
  useContext,
} from "react";
import styled from "styled-components";
import { CalendarContext } from "../../calendar/Calendar";
import { CalendarWeekHeaderCell } from "../../calendarWeek/CalendarWeekHeaderCell";
import { CalendarTimeline } from "../../calendarTimeline/CalendarTimeline";
import { Dayjs } from "dayjs";
import { CalendarEnums } from "../../calendar/Calendar.types";
import { CalendarMonthHeaderCell } from "../../calendarMonth/CalendarMonthHeaderCell";
import useScrollIntoView from "../../../hooks/useScrollIntoView";

interface TableProps<T> {
  items: T[];
  columns: {
    field: string;
    name: string | Dayjs;
    render: (item: T) => ReactNode | ReactElement;
  }[];
  ref: RefObject<HTMLTableElement>;
}

const StyledTable = styled.table<any>`
  table-layout: fixed;
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  border-left: rgb(218, 220, 224) 1px solid;
`;

const StyledThead = styled.thead`
  border: none;
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const StyledTbody = styled.tbody<any>`
  width: 100%;
  max-height: 99vh;
  border: none;
  overflow: auto;
  overflow-y: scroll;
  display: block;
  table-layout: fixed;
`;

const StyledTh = styled.th`
  overflow: hidden;
  border: none;
  table-layout: fixed;
  border-bottom: rgb(218, 220, 224) 1px solid;
`;

const StyledTd = styled(motion.td)`
  border: none;
  border-right: rgb(218, 220, 224) 1px solid;
  table-layout: fixed;
`;

const StyledTr = styled.tr`
  border-bottom: rgb(218, 220, 224) 1px solid;
  display: table;
  table-layout: fixed;
  width: 100%;
`;

const TableComponent = <T extends { [key: string]: any }>(
  { items, columns }: TableProps<T>,
  ref: Ref<HTMLTableElement>
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
                      <CalendarMonthHeaderCell date={column.name as string} />
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
                      <CalendarWeekHeaderCell
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
                default:
                  return null;
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
                <CalendarTimeline />
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
  T extends { [key: string]: any }
>(
  { items, columns }: TableProps<T>,
  ref: Ref<HTMLTableElement>
) => ReactElement;

export default Table;
