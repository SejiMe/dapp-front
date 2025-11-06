// app/components/CalendarComponent.tsx
"use client";

import { useEffect, useRef } from "react";
import { useCalendar } from "./../CalendarContext";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

export default function CalendarPage() {
  const calendarRef = useRef<HTMLElement>(null);
  const { selectedDate, selectDate, isoWeek, isoYear } = useCalendar();
  const [date, setDate] = useState<Date | undefined>();
  useEffect(() => {
    const calendarEl = calendarRef.current;

    if (!calendarEl) return;

    const handleSelect = (event: Event) => {
      const target = event.target as HTMLElement & { value?: string };
      if (target.value) {
        const date = new Date(target.value);
        selectDate(date);
      }
    };

    calendarEl.addEventListener("change", handleSelect);
    return () => calendarEl.removeEventListener("change", handleSelect);
  }, [selectDate]);

  return (
    <div className="flex flex-col h-screen bg-base-100 items-center space-y-4 p-6">
      <DayPicker className="react-day-picker" mode="range" />
    </div>
  );
}
