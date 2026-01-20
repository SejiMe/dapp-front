"use client";

import React, { useEffect, useState } from "react";
import { useCalendarStore } from "@/libraries/stores/useCalendarStore";
import { redirect } from "next/navigation";
import { useBarangaySelectionStore } from "@/libraries/stores/useBarangaySelectionStore";
import { format } from "date-fns";
import {
  quickRiskAssessment,
  RiskAssessmentResult,
} from "@/libraries/risk-assessment";
import RiskAssessmentCard from "@/components/app/RiskAssessmentCard";
import useSWR from "swr";
import { PredictedDengueCase } from "@/models/PredictedDengueCase";
import { DengueCasesAPI } from "@/libraries/api/DengueAPI";
import { ApiError } from "@/libraries/api/Client";
import useSWRMutation from "swr/mutation";
import { Loader, Stack, Text, Title, Center } from "@mantine/core";

const InformationTab = () => {
  const { getWeekDateRange, getStringDate, getWeekDateRangeString } =
    useCalendarStore();
  const { SelectedBarangay } = useBarangaySelectionStore();
  const [riskResult, setRiskResult] = useState<RiskAssessmentResult | null>(
    null,
  );

  if (getWeekDateRange() == null) redirect("/app/calendar");

  const { trigger } = useSWRMutation("retry-on-error-fetch", () =>
    DengueCasesAPI.predictDengueCase(
      SelectedBarangay!.PsgcCode,
      getStringDate!,
    ),
  );
  console.log(getStringDate);
  const { data, isLoading, error, mutate } = useSWR<
    PredictedDengueCase,
    ApiError
  >(SelectedBarangay !== null ? "predicted-case" : null, () =>
    DengueCasesAPI.getOneWeekPrediction(
      SelectedBarangay!.PsgcCode,
      getStringDate!,
    ),
  );

  // Handle 404 error separately
  useEffect(() => {
    if (error?.status === 404) {
      trigger();
      mutate();
    }
  }, [error?.status]); // Only re-run when error status changes

  // Update riskResult when data changes
  useEffect(() => {
    if (
      data &&
      data.outbreak_probability !== undefined &&
      data.outbreak_probability !== null
    ) {
      setRiskResult(quickRiskAssessment(data.outbreak_probability));
    } else {
      setRiskResult(null);
    }
  }, [data]);

  // Reset when barangay changes
  useEffect(() => {
    setRiskResult(null);
    mutate();
  }, [SelectedBarangay]);

  const dates = getWeekDateRangeString().split(" ");

  return (
    <Stack gap="md" align="center">
      <Title order={3} ta="center">
        {SelectedBarangay?.Name ?? "Please Select a Barangay"}
      </Title>

      <Text size="sm" c="dimmed" ta="center">
        {format(dates[0], "MMM. dd, yyyy")} -{" "}
        {format(dates[6], "MMM. dd, yyyy")}
      </Text>

      {error?.status == 404 && (
        <Text c="red" ta="center">
          Data Not Found. Wait while we try generating prediction. If not try
          other sometime.
        </Text>
      )}

      {!isLoading && riskResult !== null ? (
        <RiskAssessmentCard
          riskResult={riskResult}
          barangayName={SelectedBarangay?.Name}
          showDetails={true}
          showSuggestions={true}
        />
      ) : (
        <Center py="xl">
          <Loader size="lg" />
        </Center>
      )}
    </Stack>
  );
};

export default InformationTab;
