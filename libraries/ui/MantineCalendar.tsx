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

export const MantineCalendar = ({
  className = "",
  maxDate,
  minDate,
  excludeDates = [],
  highlightDates = [],
}: MantineCalendarProps) => {
  const {
    selectDate,
    selectedDate,
    rangeDates,
    isInISOWeekRange,
    isDateIsDisabled,
  } = useCalendar();
  const colors = getDaisyUIColors();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className={`bg-white rounded-box shadow-lg p-4 w-full h-full lg:h-[70vh] flex flex-col ${className}`}
    >
      <div className="w-full flex flex-col-reverse lg:flex-row lg:gap-4 place-items-center">
        <Calendar
          styles={{
            weekday: {
              color: "ActiveBorder",
              fontWeight: "bold",
              fontSize: "1.4rem",
            },
          }}
          onNextYear={() => null}
          firstDayOfWeek={1} // Monday
          weekendDays={[0, 6]} // Saturday and Sunday
          size="xl"
          withCellSpacing={false}
          getDayProps={(date) => {
            const dateString = dayjs(date).format("YYYY-MM-DD");
            const isHovered =
              isInISOWeekRange(dateString) && hovered
                ? isInISOWeekRange(hovered)
                : false;
            const isSelected = isInISOWeekRange(dateString);
            const isInRange = isHovered || isSelected;
            const isDisabled = isDateIsDisabled(new Date(date));
            return {
              onMouseEnter: () => setHovered(dateString),
              onMouseLeave: () => setHovered(null),
              disabled: isDisabled,
              inRange: isInRange,
              firstInRange: isInRange && dayjs(date).isoWeekday() === 1, // Monday
              lastInRange: isInRange && dayjs(date).isoWeekday() === 7, // Sunday
              selected: isSelected,
              onClick: () => selectDate(new Date(date)),
            };
          }}
        />
        <div className="alert alert-info mt-3 text-sm justify-center">
          <span className="material-symbols-outlined">psychiatry</span>
          <p>
            <strong>Disclaimer:</strong> The selected date will be converted to
            its corresponding ISO week for prediction purposes. Forecasts are
            based on weekly data and include a two-week lag in weather
            information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MantineCalendar;
