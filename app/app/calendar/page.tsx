"use client";

import { redirect } from "next/navigation";
import { useCalendar } from "./../CalendarContext";
import MantineCalendar from "@/libraries/ui/MantineCalendar";
import AppLink from "@/components/app/AppLink";
import { useEffect } from "react";
import { WeatherPoolingData } from "@/libraries/api/WeatherPoolingAPI";
import useSWR from "swr";

export default function CalendarPage() {
  const {
    selectedDate,
    selectDate,
    isoWeek,
    isoYear,
    getStringDate,
    addLatestWeatherPooledDate,
  } = useCalendar();

  const { data } = useSWR("get-weather-pool-data", () =>
    WeatherPoolingData.getLatestWeatherPooledDate()
  );

  const handleRedirection = () => {
    redirect("");
  };

  useEffect(() => {
    if (data != undefined) addLatestWeatherPooledDate(new Date(data.date));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-base-100 items-center space-y-4 p-6">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        <MantineCalendar
          className="w-full"
          allowSingleDateSelection={true}
          allowRangeSelection={true}

          // excludeDates={[
          //   // Example excluded dates - can be populated from API
          //   new Date("2024-12-31"),
          // ]}
        />
        <div className="card ">
          <AppLink
            href="/app/prediction"
            className="btn btn-info text-info-content text-lg tracking-wide"
          >
            Start Predicting
          </AppLink>
        </div>
      </div>
    </div>
  );
}
