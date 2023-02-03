import { motion } from "framer-motion";
import React, { useContext } from "react";
import { CalendarContext } from "../calendar/Calendar";

export const TableAnimation = ({ children }: any) => {
  const { selectedDay, selectedMonth, selectedYear, selectedView } =
    useContext(CalendarContext);

  const trigger = `${selectedMonth} - ${selectedYear} - ${selectedDay} - ${selectedView}`;

  return (
    <motion.div
      style={{ display: "flex" }}
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -15, opacity: 0 }}
      transition={{ duration: 0.25 }}
      key={trigger}
    >
      {children}
    </motion.div>
  );
};
