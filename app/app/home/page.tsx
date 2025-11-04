"use client";
import React from "react";
import MainContent from "./MainContent";
import { HistoricalDengueCases } from "@/libraries/api/HistoricalDengueAPI";
import useSWR from "swr";
import YearlyDengueChart from "./HistoricalYearlyCaseComponent";
import HistoricalYearlyCaseComponent from "./HistoricalYearlyCaseComponent";
import { SampleData } from "@/data/DengueProbability";

type Props = {};

// const HomePage = (props: Props) => {
//   const {
//     data: historicalData,
//     error: FetchError,
//     isLoading,
//   } = useSWR("HistoricalDengue", () =>
//     HistoricalDengueCases.getYearlyHistorical("0931700001")
//   );
//   // console.info(historicalData);
//   // console.log(`From Page: ${historicalData?.TotalDengueCases}`);
//   return (
//     <div className="p-2 rounded-xl bg-white h-full">
//       <MainContent />
//       {isLoading ? (
//         <p>Loading Data</p>
//       ) : (
//         <HistoricalYearlyCaseComponent data={historicalData} />
//       )}
//     </div>
//   );
// };

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
  console.log("TotalDengueCases:", historicalData?.totalDengueCases);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dengue data</p>;

  return (
    <div className="p-2 rounded-xl bg-white flex gap-2 flex-col">
      <MainContent />
      <HistoricalYearlyCaseComponent data={historicalData} />
    </div>
  );
};

export default HomePage;
