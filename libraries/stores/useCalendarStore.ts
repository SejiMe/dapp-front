import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

// Extend dayjs with plugins
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export type CalendarPersistedState = {
  /** Stored as YYYY-MM-DD for safe serialization */
  selectedDateISO: string | null;
  /** Stored as YYYY-MM-DD for safe serialization */
  latestDateISO: string | null;
  setSelectedDateISO: (iso: string | null) => void;
  setLatestDateISO: (iso: string | null) => void;
  clearSelectedDate: () => void;

  // Derived getters (methods)
  selectedDate: Date | null;
  selectDate: (date: Date) => void;
  isoWeek: number | null;
  isoYear: number | null;
  /** Always returns a valid YYYY-MM-DD string (falls back if not selected yet) */
  getStringDate: string;
  getWeekDateRange: () => Date[] | null;
  getWeekDateRangeString: () => string;
  isInISOWeekRange: (dateString: string) => boolean;
  isDateIsDisabled: (date: Date) => boolean;
  addLatestWeatherPooledDate: (date: Date) => void;
};

export const useCalendarStore = create<CalendarPersistedState>()(
  persist(
    (set, get) => ({
      selectedDateISO: null,
      latestDateISO: null,
      setSelectedDateISO: (iso) => set({ selectedDateISO: iso }),
      setLatestDateISO: (iso) => set({ latestDateISO: iso }),
      clearSelectedDate: () => set({ selectedDateISO: null }),

      // Computed property
      get selectedDate() {
        const iso = get().selectedDateISO;
        return iso ? new Date(iso) : null;
      },

      // Action to select a date
      selectDate: (date: Date) => {
        set({ selectedDateISO: dayjs(date).format("YYYY-MM-DD") });
      },

      // Get ISO week number
      get isoWeek() {
        const iso = get().selectedDateISO;
        return iso ? dayjs(iso).isoWeek() : null;
      },

      // Get ISO year
      get isoYear() {
        const iso = get().selectedDateISO;
        return iso ? dayjs(iso).isoWeekYear() : null;
      },

      // Get string date in YYYY-MM-DD format
      get getStringDate() {
        const { selectedDateISO, latestDateISO } = get();
        // Never return null/undefined to avoid API calls sending invalid dates.
        // Preference order: selected date -> latest pooled date -> today.
        return dayjs(selectedDateISO ?? latestDateISO ?? new Date()).format(
          "YYYY-MM-DD",
        );
      },

      // Get the date range for the current ISO week
      getWeekDateRange: () => {
        const iso = get().selectedDateISO;
        if (!iso) return null;

        const selectedDayjs = dayjs(iso);
        const startOfWeek = selectedDayjs.startOf("isoWeek");
        const dates: Date[] = [];

        for (let i = 0; i < 7; i++) {
          dates.push(startOfWeek.add(i, "day").toDate());
        }

        return dates;
      },

      // Get the date range as a string
      getWeekDateRangeString: () => {
        const dates = get().getWeekDateRange();
        if (!dates) return "";
        return dates.map((d) => dayjs(d).format("YYYY-MM-DD")).join(" ");
      },

      // Check if a date string is in the same ISO week as the selected date
      isInISOWeekRange: (dateString: string) => {
        const iso = get().selectedDateISO;
        if (!iso) return false;

        const selectedDayjs = dayjs(iso);
        const dateDayjs = dayjs(dateString);

        return (
          selectedDayjs.isoWeek() === dateDayjs.isoWeek() &&
          selectedDayjs.isoWeekYear() === dateDayjs.isoWeekYear()
        );
      },

      // Check if a date is disabled (after the latest pooled date)
      isDateIsDisabled: (date: Date) => {
        const latestISO = get().latestDateISO;
        if (!latestISO) return false;

        return dayjs(date).isAfter(dayjs(latestISO));
      },

      // Add the latest weather pooled date
      addLatestWeatherPooledDate: (date: Date) => {
        set({ latestDateISO: dayjs(date).format("YYYY-MM-DD") });
      },
    }),
    {
      name: "dengue-watch:calendar",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage,
      ),
      version: 1,
      partialize: (state) => ({
        selectedDateISO: state.selectedDateISO,
        latestDateISO: state.latestDateISO,
      }),
    },
  ),
);
