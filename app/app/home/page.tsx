"use client";
import React from "react";
import MainContent from "./MainContent";
import { HistoricalDengueCases } from "@/libraries/api/HistoricalDengueAPI";
import useSWR from "swr";
import HistoricalCasesChart from "@/components/app/charts/HistoricalCasesChart";
import { SampleData } from "@/data/DengueProbability";
import { Center, Loader } from "@mantine/core";

type Props = {};

const HomePage = () => {
  const {
    data: historicalData,
    error,
    isLoading,
  } = useSWR("HistoricalDengue", () =>
    HistoricalDengueCases.getYearlyHistorical("0931700001")
  );

  // Add this debugging
  console.log("SWR State:", { historicalData, error, isLoading });
  console.log("Data structure:", historicalData);
  console.log("TotalDengueCases:", historicalData?.recorded_cases);

  if (error) return <p>Error loading dengue data</p>;

  return (
    <div className="p-2 rounded-xl bg-white flex gap-2 flex-col">
      <MainContent />
      {isLoading && (
        <Center>
          <Loader color="gray" size="xl" type="dots" />
        </Center>
      )}
      {historicalData !== undefined && (
        <HistoricalCasesChart
          data={historicalData}
          height={400}
          showTrend={true}
        />
      )}
    </div>
  );
};

export default HomePage;
