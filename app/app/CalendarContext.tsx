// app/context/CalendarContext.tsx
"use client";

import { createContext, useContext, useState, useMemo } from "react";
import {
  getISOWeek,
  getISOWeekYear,
  startOfISOWeek,
  addDays,
  format,
} from "date-fns"; // for ISO week/year
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Extend dayjs with plugins
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

interface CalendarContextType {
  selectedDate: Date | null;
  isoWeek: number | null;
  isoYear: number | null;
  getStringDate: string | undefined;
  selectDate: (date: Date) => void;
  getWeekDateRange: () => Date[] | null;
  getWeekDateRangeString: () => string;
  rangeDates: string;
  getFormattedDateForAPI: () => string | undefined; // New: formatted as "yyyy-MM-dd" for API
  // New dayjs functions for ISO week handling
  isInISOWeekRange: (date: string | Date) => boolean;
  getISOWeekDates: () => string[];
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const extractStringFormatDate = () => {
    console.log(selectedDate?.toString());
    if (!selectedDate) return undefined;
    return format(selectedDate, "yyyy-MM-dd");
  };

  const selectDate = (date: Date) => {
    console.log(date);
    setSelectedDate(date);
  };

  // ✅ New: get all dates (Mon–Sun) in the ISO week of the selected date
  const getWeekDateRange = (): Date[] | null => {
    if (!selectedDate) return null;

    const startOfWeek = startOfISOWeek(selectedDate); // Monday
    const days: Date[] = [];

    for (let i = 0; i < 7; i++) {
      days.push(addDays(startOfWeek, i));
    }

    return days;
  };

  // ✅ New: return space-separated string of "yyyy-MM-dd" for the whole week
  const getWeekDateRangeString = (): string => {
    const weekDates = getWeekDateRange();
    if (!weekDates) return "";

    return weekDates.map((d) => format(d, "yyyy-MM-dd")).join(" ");
  };

  // ✅ New: get formatted date for API calls
  const getFormattedDateForAPI = (): string | undefined => {
    if (!selectedDate) return undefined;
    return format(selectedDate, "yyyy-MM-dd");
  };

  // ✅ New: Check if a date is within the ISO week of the selected date
  const isInISOWeekRange = (date: string | Date): boolean => {
    if (!selectedDate) return false;

    const selectedDayjs = dayjs(selectedDate);
    const checkDayjs = dayjs(date);

    // Get the start and end of the ISO week for the selected date
    const startOfWeek = selectedDayjs.isoWeekday(1); // Monday
    const endOfWeek = selectedDayjs.isoWeekday(7); // Sunday

    // Check if the date is within the ISO week range (inclusive)
    return (
      checkDayjs.isSameOrAfter(startOfWeek, "day") &&
      checkDayjs.isSameOrBefore(endOfWeek, "day")
    );
  };

  // ✅ New: Get all dates in the ISO week as strings
  const getISOWeekDates = (): string[] => {
    if (!selectedDate) return [];

    const selectedDayjs = dayjs(selectedDate);
    const startOfWeek = selectedDayjs.isoWeekday(1); // Monday
    const dates: string[] = [];

    for (let i = 0; i < 7; i++) {
      dates.push(startOfWeek.add(i, "day").format("YYYY-MM-DD"));
    }

    return dates;
  };

  const value = useMemo(() => {
    if (!selectedDate)
      return {
        selectedDate,
        isoWeek: null,
        isoYear: null,
        selectDate,
        getStringDate: undefined,
        getWeekDateRange: () => null,
        getWeekDateRangeString: () => "",
        rangeDates: "",
        getFormattedDateForAPI: () => undefined,
        isInISOWeekRange: () => false,
        getISOWeekDates: () => [],
      };

    const isoWeek = getISOWeek(selectedDate);
    const isoYear = getISOWeekYear(selectedDate);
    const getStringDate = extractStringFormatDate();
    const rangeDates = getWeekDateRangeString();
    const getFormattedDateForAPI = extractStringFormatDate();

    return {
      selectedDate,
      isoWeek,
      isoYear,
      selectDate,
      getStringDate,
      getWeekDateRange,
      getWeekDateRangeString,
      rangeDates,
      getFormattedDateForAPI: () => extractStringFormatDate(),
      isInISOWeekRange,
      getISOWeekDates,
    };
  }, [selectedDate]);

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context)
    throw new Error("useCalendar must be used within a CalendarProvider");
  return context;
}
