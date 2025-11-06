// app/context/CalendarContext.tsx
"use client";

import { createContext, useContext, useState, useMemo } from "react";
import { getISOWeek, getISOWeekYear } from "date-fns"; // for ISO week/year

interface CalendarContextType {
  selectedDate: Date | null;
  isoWeek: number | null;
  isoYear: number | null;
  selectDate: (date: Date) => void;
}

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: React.ReactNode }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const selectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const value = useMemo(() => {
    if (!selectedDate)
      return { selectedDate, isoWeek: null, isoYear: null, selectDate };

    const isoWeek = getISOWeek(selectedDate);
    const isoYear = getISOWeekYear(selectedDate);

    return { selectedDate, isoWeek, isoYear, selectDate };
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
