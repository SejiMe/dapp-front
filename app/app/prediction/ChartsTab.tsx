import React, { useEffect } from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";
import { ProbabilitySampleData } from "@/data/DengueProbability";
import WeeklyChartPerBarangay from "./WeeklyChartPerBarangay";
import useSWR from "swr";
import { DengueCasesAPI } from "@/libraries/api/DengueAPI";
import { useBarangaySelection } from "./BarangaySelectionContext";

type Props = {};

const ChartsTab = (props: Props) => {
  const { SelectedBarangay } = useBarangaySelection();

  const { data, mutate, isLoading } = useSWR(
    SelectedBarangay !== null ? "fetch-weekly-predicted-data" : null,
    () =>
      DengueCasesAPI.getWeeklyPredictionWithParams(SelectedBarangay?.PsgcCode!)
  );

  // Handle 404 error separately

  // Update riskResult when data changes
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  // Reset when barangay changes
  useEffect(() => {
    mutate();
  }, [SelectedBarangay]);

  return (
    <>
      <WeeklyPerBarangay
        isLoading={isLoading}
        data={data?.predictions ?? ProbabilitySampleData}
      />
    </>
  );
};

export default ChartsTab;
