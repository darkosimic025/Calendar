import dayjs from "dayjs";
import { motion } from "framer-motion";
import React, { useCallback, useContext, useId, useRef } from "react";
import {
  getWeekDays,
  replaceItemAtIndex,
  splitIntoWeeks,
} from "../../utils/Utils";
import Table from "../UI/table/Table";
import { CalendarContext } from "../calendar/Calendar";
import type { Event } from "../calendar/Calendar.types";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../App";
import { CalendarWeekDayCell } from "./Cell";
import {
  createSnapModifier,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

export interface CalendarWeekProps {
  events: Event.EventProps[];
  onEventClick: (event: Event.CalendarEventProps) => void;
}

export const CalendarWeek = ({ onEventClick }: CalendarWeekProps) => {
  const [events, setEvents] = useRecoilState(eventsAtom);
  const { selectedDay, selectedMonth, selectedYear } =
    useContext(CalendarContext);
  const tableRef = useRef<HTMLTableElement>(null);

  const generateColumns = useCallback(() => {
    const week = getWeekDays(selectedDay, selectedMonth, selectedYear);
    return week.map((day) => ({
      field: Object.values(day)[0].date,
      name: dayjs(Object.values(day)[0].date),
      render: (events: { events: Event.EventProps[] }) => (
        <CalendarWeekDayCell
          id={useId()}
          date={dayjs(Object.values(day)[0].date)}
          onEventClick={onEventClick}
          events={events.events}
        />
      ),
    }));
  }, [selectedMonth, selectedYear, selectedDay]);

  const generateItems = useCallback(() => {
    const dates = splitIntoWeeks(
      getWeekDays(selectedDay, selectedMonth, selectedYear),
    );

    const items = dates.map((week) => {
      for (const day of Object.values(week)) {
        events.forEach((event: Event.EventProps) => {
          event.eventDates.forEach((date, index) => {
            if (
              dayjs(dayjs(date.start).format("MM/DD/YYYY")).isSame(
                dayjs(day.date).format("MM/DD/YYYY"),
              )
            ) {
              day.events.push({
                name: event.name,
                indexDay: index + 1,
                start: dayjs(date.start),
                end: dayjs(date.end),
                id: event.id,
              });
            }
          });
        });
      }
      return week;
    });

    return items;
  }, [selectedMonth, selectedYear, selectedDay, events]);

  const monthYearTitle = `${dayjs()
    .month(selectedMonth - 1)
    .format("MMM")
    .toString()} - ${selectedYear} - ${selectedDay}`;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 90,
        tolerance: { y: 5 },
      },
    }),
  );

  const snapToGridModifier = createSnapModifier(5);

  const handleDrag = ({ active, over, delta }: any) => {
    const { id, indexDay, start, end } = active.data.current;
    console.log(over);
    const { y } = delta;
    const dropData = over.data.current;
    const eventIndex = events.findIndex((event) => event.id === id);
    const event = events[eventIndex];
    const newStartHMS = dayjs(start).add(Math.ceil(y/5)*5, "minutes").format("HH:mm:ss");
    const newEndHMS = dayjs(end).add(Math.ceil(y/5)*5, "minutes").format("HH:mm:ss");
    const eventDates = replaceItemAtIndex(event.eventDates, indexDay - 1, {
      start: new Date(`${dropData.format("MM/DD/YYYY")} ${newStartHMS}`),
      end: new Date(`${dropData.format("MM/DD/YYYY")} ${newEndHMS}`),
    });
    const newEvent = { ...event, eventDates };
    setEvents((oldEvents) =>
      replaceItemAtIndex(oldEvents, eventIndex, newEvent),
    );
  };

  return (
    <motion.div
      style={{ display: "flex" }}
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -15, opacity: 0 }}
      transition={{ duration: 0.25 }}
      key={monthYearTitle}
    >
      <DndContext
        autoScroll={true}
        onDragEnd={({ active, over, delta }) =>
          handleDrag({ active, over, delta })
        }
        sensors={sensors}
        modifiers={[snapToGridModifier, restrictToFirstScrollableAncestor]}
      >
        <Table
          ref={tableRef}
          columns={generateColumns()}
          items={generateItems() as any}
        />
      </DndContext>
    </motion.div>
  );
};
