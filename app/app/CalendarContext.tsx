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

export type CurrentIso = {
  isoWeek: number;
  isoYear: number;
};

interface CalendarContextType {
  selectedDate: Date | null;
  isoWeek: number | null;
  isoYear: number | null;
  getStringDate: string | undefined;
  //  currentIso: CurrentIso;
  selectDate: (date: Date) => void;
  getWeekDateRange: () => Date[] | null;
  getWeekDateRangeString: () => string;
  rangeDates: string;
  getFormattedDateForAPI: () => string | undefined; // New: formatted as "yyyy-MM-dd" for API
  // New dayjs functions for ISO week handling
  isInISOWeekRange: (date: string | Date) => boolean;
  getISOWeekDates: () => string[];
  isDateIsDisabled: (date: Date) => boolean;
  addLatestWeatherPooledDate: (date: string | Date) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [latestDate, setLatestDate] = useState<Date | null>(null);

  const extractStringFormatDate = () => {
    if (!selectedDate) return undefined;
    return format(selectedDate, "yyyy-MM-dd");
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  // add Latest date weather pooled from API
  const addLatestWeatherPooledDate = (date: Date | string) => {
    if (date != typeof Date) setLatestDate(new Date(date));

    setLatestDate(date as Date);
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

  const isDateIsDisabled = (date: Date): boolean => {
    // console.log(`passed date: ${date}`);
    const passedDate = dayjs(date);
    const wpDate = dayjs(latestDate);

    const wpIsoWeek = wpDate.isoWeek();
    const wpIsoYear = wpDate.isoWeekYear();

    const passedIsoWeek = passedDate.isoWeek();
    const passedIsoYear = passedDate.isoWeekYear();

    // Calculate the target week and year (wpDate + 2 weeks)
    let targetWeek = wpIsoWeek + 2;
    let targetYear = wpIsoYear;

    // If week 52/53, adding 2 weeks rolls over to next year
    if (wpIsoWeek === 52 || wpIsoWeek === 53) {
      targetWeek = wpIsoWeek + 2 - 52; // Week 1 or 2 of next year
      targetYear = wpIsoYear + 1;
    }

    // Return true (disabled) if passed date is greater than target date
    if (passedIsoYear > targetYear) {
      return true;
    } else if (passedIsoYear === targetYear && passedIsoWeek > targetWeek) {
      return true;
    }

    return false;
  };

  // Get the current week and date client side time
  const getCurrentIsoDetails = (): CurrentIso => {
    const djs = dayjs(new Date());

    return { isoWeek: djs.isoWeek(), isoYear: djs.isoWeekYear() };
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
        isDateIsDisabled,
        addLatestWeatherPooledDate,
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
      isDateIsDisabled,
      addLatestWeatherPooledDate,
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
