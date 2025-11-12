"use client";

import React from "react";
import { DatePicker } from "@mantine/dates";
import { getDaisyUIColors } from "./theme-utils";

interface WeekPickerProps {
  value?: number;
  year?: number;
  onChange?: (week: number, year: number) => void;
  className?: string;
  minYear?: number;
  maxYear?: number;
}

export const WeekPicker = ({
  value,
  year = new Date().getFullYear(),
  onChange,
  className = "",
  minYear = 2020,
  maxYear = new Date().getFullYear() + 1,
}: WeekPickerProps) => {
  const colors = getDaisyUIColors();

  const handleChange = (week: number, yearValue?: number) => {
    if (onChange) {
      onChange(week, yearValue || year);
    }
  };

  // Generate weeks for the current year
  const weeks = Array.from({ length: 53 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();

  return (
    <div className={`form-control ${className}`}>
      <label className="label">
        <span className="label-text">Week</span>
      </label>
      <select
        className={`select select-bordered ${colors.primary} text-base-content`}
        value={value}
        onChange={(e) => {
          const week = Number(e.target.value);
          const year = Number(e.target.options[e.target.selectedIndex].text);
          handleChange(week, year);
        }}
      >
        {weeks.map((week) => (
          <option key={week} value={week}>
            Week {week}
          </option>
        ))}
      </select>

      <label className="label">
        <span className="label-text">Year</span>
      </label>
      <select
        className={`select select-bordered ${colors.primary} text-base-content`}
        value={year}
        onChange={(e) => {
          const selectedWeek = value || 1;
          handleChange(selectedWeek, Number(e.target.value));
        }}
      >
        {Array.from({ length: maxYear - minYear + 1 }, (_, i) => (
          <option key={i} value={minYear + i}>
            {minYear + i}
          </option>
        ))}
      </select>
    </div>
  );
};

export default WeekPicker;
