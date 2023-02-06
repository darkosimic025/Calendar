import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  createSnapModifier,
  restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";
import dayjs from "dayjs";
import React from "react";
import { useRecoilState } from "recoil";
import { eventsAtom } from "../../App";
import { replaceItemAtIndex } from "../../utils/Utils";

export const DNDProvider = ({ children }: any) => {
  const [events, setEvents] = useRecoilState(eventsAtom);

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
    const dropData = over.data.current;
    const { y } = delta;
    const eventIndex = events.findIndex((event) => event.id === id);
    const event = events[eventIndex];
    const newStartHMS = dayjs(start)
      .add(Math.ceil(y / 5) * 5, "minutes")
      .format("HH:mm:ss");
    const newEndHMS = dayjs(end)
      .add(Math.ceil(y / 5) * 5, "minutes")
      .format("HH:mm:ss");
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
    <DndContext
      autoScroll={true}
      onDragEnd={({ active, over, delta }) => {
        handleDrag({ active, over, delta });
      }}
      sensors={sensors}
      modifiers={[snapToGridModifier, restrictToFirstScrollableAncestor]}
    >
      {children}
    </DndContext>
  );
};
