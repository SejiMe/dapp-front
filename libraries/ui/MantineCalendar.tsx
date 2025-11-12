"use client";

import { Calendar } from "@mantine/dates";
import { DatePicker } from "@mantine/dates";
import { useCalendar } from "@/app/app/CalendarContext";
import { getDaisyUIColors } from "./theme-utils";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { useState } from "react";

// Extend dayjs with plugins
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface MantineCalendarProps {
  className?: string;
  allowSingleDateSelection?: boolean;
  allowRangeSelection?: boolean;
  maxDate?: Date;
  minDate?: Date;
  excludeDates?: Date[];
  highlightDates?: Date[];
}

function getDay(date: string) {
  const day = dayjs(date).day();
  return day === 0 ? 6 : day - 1;
}

function startOfWeek(date: string) {
  return dayjs(date)
    .subtract(getDay(date) + 1, "day")
    .toDate();
}

function endOfWeek(date: string) {
  return dayjs(date)
    .add(6 - getDay(date), "day")
    .endOf("day")
    .toDate();
}

function isInWeekRange(date: string, value: string | null) {
  return value
    ? dayjs(date).isBefore(endOfWeek(value)) &&
        dayjs(date).isAfter(startOfWeek(value))
    : false;
}

export const MantineCalendar = ({
  className = "",
  maxDate,
  minDate,
  excludeDates = [],
  highlightDates = [],
}: MantineCalendarProps) => {
  const { selectDate, selectedDate, rangeDates, isInISOWeekRange } =
    useCalendar();
  const colors = getDaisyUIColors();
  const [hovered, setHovered] = useState<string | null>(null);

  // Helper function to get theme color
  const getThemeColor = (variable: string): string => {
    if (typeof window === "undefined") return "#000000";
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  };

  return (
    <div
      className={`bg-base-100 rounded-box shadow-lg p-4 ${className}`}
      style={{
        backgroundColor: colors.background,
        borderColor: colors.base300,
        borderWidth: "1.5px",
        borderStyle: "solid",
        borderRadius: "0.5rem",
      }}
    >
      <Calendar
        styles={{
          weekday: {
            color: colors.foreground,
            fontWeight: "bold",
            fontSize: "0.875rem",
          },

          // weekendDays: {
          //   color: colors.neutral,
          // },
          // selected: {
          //   backgroundColor: colors.primary,
          //   color: getThemeColor("--color-primary-content"),
          //   fontWeight: "bold",
          // },
          // inRange: {
          //   backgroundColor: colors.primary + "20", // Add transparency
          // },
          // disabled: {
          //   color: colors.base300,
          //   textDecoration: "line-through",
          // },
          // outside: {
          //   color: colors.base300,
          // },
          // today: {
          //   borderColor: colors.accent,
          //   borderWidth: "2px",
          // },
        }}
        firstDayOfWeek={1} // Monday
        weekendDays={[0, 6]} // Saturday and Sunday
        size="md"
        withCellSpacing={false}
        getDayProps={(date) => {
          const dateString = dayjs(date).format("YYYY-MM-DD");
          const isHovered =
            isInISOWeekRange(dateString) && hovered
              ? isInISOWeekRange(hovered)
              : false;
          const isSelected = isInISOWeekRange(dateString);
          const isInRange = isHovered || isSelected;

          return {
            onMouseEnter: () => setHovered(dateString),
            onMouseLeave: () => setHovered(null),
            inRange: isInRange,
            firstInRange: isInRange && dayjs(date).isoWeekday() === 1, // Monday
            lastInRange: isInRange && dayjs(date).isoWeekday() === 7, // Sunday
            selected: isSelected,
            onClick: () => selectDate(new Date(date)),
          };
        }}
      />
    </div>
  );
};

export default MantineCalendar;
