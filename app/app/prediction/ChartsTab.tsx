"use client";

import React, { useEffect, useMemo } from "react";
import { BarChart, ScatterChart } from "@mantine/charts";
import { ProbabilitySampleData } from "@/data/DengueProbability";
import useSWR from "swr";
import { DengueCasesAPI } from "@/libraries/api/DengueAPI";
import { useBarangaySelectionStore } from "@/libraries/stores/useBarangaySelectionStore";
import { TransformLast5YearsToScatterChart } from "@/libraries/serializer/TransformLast5YearsScatterChart";
import { Skeleton, Text, Stack } from "@mantine/core";
import MonthlyCasesBarChart from "./MonthlyCasesBarChart";

type Props = {};

const ChartsTab = (props: Props) => {
  const { SelectedBarangay } = useBarangaySelectionStore();

  const { data, mutate, isLoading } = useSWR(
    SelectedBarangay !== null ? "fetch-weekly-predicted-data" : null,
    () =>
      DengueCasesAPI.getWeeklyPredictionWithParams(SelectedBarangay?.PsgcCode!),
  );

  // Fetch last 5 years predictions for ScatterChart
  const {
    data: last5YearsData,
    mutate: mutateLast5Years,
    isLoading: isLoadingLast5Years,
    error: last5YearsError,
  } = useSWR(
    SelectedBarangay !== null
      ? `fetch-last-5-years-predictions-${SelectedBarangay.PsgcCode}`
      : null,
    () => DengueCasesAPI.getLast5YearsPredictions(SelectedBarangay?.PsgcCode!),
  );

  // Transform API data to ScatterChart format using memoization for performance
  const scatterChartData = useMemo(() => {
    if (!last5YearsData) {
      return [];
    }
    // Pass the full response to the transformer - it handles the nested structure
    return TransformLast5YearsToScatterChart(last5YearsData);
  }, [last5YearsData]);

  // Handle 404 error separately

  // Update riskResult when data changes
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  // Reset when barangay changes
  useEffect(() => {
    mutate();
    mutateLast5Years();
  }, [SelectedBarangay]);

  // Debug: log raw API response and transformed data
  console.info("Raw API Response:", last5YearsData);
  console.info("Transformed ScatterChart Data:", scatterChartData);

  return (
    <Stack gap="xl">
      {/* Last 5 Years Outbreak Probability ScatterChart */}
      <Stack gap="sm">
        <Text fw={600} size="lg">
          5-Year Outbreak Probability Trend
        </Text>
        {isLoadingLast5Years ? (
          <Skeleton height={350} radius="md" />
        ) : last5YearsError ? (
          <Text c="red.6" size="sm">
            Failed to load 5-year prediction data
          </Text>
        ) : scatterChartData.length > 0 ? (
          <ScatterChart
            h={350}
            data={scatterChartData}
            dataKey={{ x: "iso_week", y: "outbreak_probability" }}
            xAxisLabel="Week"
            yAxisLabel="Outbreak Probability (%)"
            withLegend
            legendProps={{ verticalAlign: "bottom", height: 40 }}
            withTooltip
            tooltipAnimationDuration={200}
            labels={{ x: "Week", y: "Probability" }}
            unit={{ y: "%" }}
            gridAxis="xy"
          />
        ) : (
          <Text c="dimmed" size="sm">
            Select a barangay to view 5-year predictions
          </Text>
        )}
      </Stack>

      {/* Monthly Dengue Cases (Mantine BarChart) */}
      <MonthlyCasesBarChart psgcCode={SelectedBarangay?.PsgcCode} />
    </Stack>
  );
};

export default ChartsTab;
