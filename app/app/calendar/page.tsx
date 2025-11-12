"use client";

import { useCalendar } from "./../CalendarContext";
import MantineCalendar from "@/libraries/ui/MantineCalendar";

export default function CalendarPage() {
  const {
    selectedDate,
    selectDate,
    isoWeek,
    isoYear,
    getStringDate,
    getWeekDateRangeString,
    rangeDates,
  } = useCalendar();

  return (
    <div className="flex flex-col h-screen bg-base-100 items-center space-y-4 p-6">
      <div className="w-full max-w-4xl">
        <MantineCalendar
          className="w-full"
          allowSingleDateSelection={true}
          allowRangeSelection={true}
          highlightDates={[
            // Example highlighted dates - can be populated from API
            new Date("2024-12-25"),
            new Date("2024-01-01"),
          ]}
          excludeDates={[
            // Example excluded dates - can be populated from API
            new Date("2024-12-31"),
          ]}
        />

        <div className="card bg-base-200 w-full p-4 shadow mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-base-content">
                Selected Date
              </h3>
              <p className="text-base-content">
                {selectedDate
                  ? selectedDate.toLocaleDateString()
                  : "No date selected"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-base-content">
                Week Range
              </h3>
              <p className="text-base-content">
                {rangeDates || "No week selected"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-base-content">
                ISO Week
              </h3>
              <p className="text-base-content">
                {isoWeek && isoYear ? `Week ${isoWeek}, ${isoYear}` : "N/A"}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-base-content">
                String Date
              </h3>
              <p className="text-base-content">{getStringDate || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
