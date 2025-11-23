import React, { useCallback, useEffect, useState } from "react";
import { useCalendar } from "../CalendarContext";
import { redirect } from "next/navigation";
import { useBarangaySelection } from "./BarangaySelectionContext";
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

const InformationTab = () => {
  const { getWeekDateRange, getStringDate, getWeekDateRangeString } =
    useCalendar();
  const { SelectedBarangay } = useBarangaySelection();
  const [riskResult, setRiskResult] = useState<RiskAssessmentResult | null>(
    null
  );

  if (getWeekDateRange() == null) redirect("/app/calendar");

  const { trigger } = useSWRMutation("retry-on-error-fetch", () =>
    DengueCasesAPI.predictDengueCase(SelectedBarangay!.PsgcCode, getStringDate!)
  );

  const { data, isLoading, error, mutate } = useSWR<
    PredictedDengueCase,
    ApiError
  >(SelectedBarangay !== null ? "predicted-case" : null, () =>
    DengueCasesAPI.getOneWeekPrediction(
      SelectedBarangay!.PsgcCode,
      getStringDate!
    )
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
    <>
      <h2 className="place-self-center text-accent-content text-2xl font-black mb-2">
        {SelectedBarangay?.Name ?? "Please Select a Barangay"}
      </h2>

      <div className="mb-4">
        <div className="text-center">
          <div className="stat-desc font-medium">
            {format(dates[0], "MMM. dd, yyyy")} -{" "}
            {format(dates[6], "MMM. dd, yyyy")}{" "}
          </div>
        </div>
      </div>

      {error?.status == 404 && (
        <p className="text-error w-full text-center">
          Data Not Found. Wait while we try generating prediction. If not try
          other sometime.
        </p>
      )}
      {!isLoading && riskResult !== null ? (
        <RiskAssessmentCard
          riskResult={riskResult}
          barangayName={SelectedBarangay?.Name}
          showDetails={true}
          showSuggestions={true}
        />
      ) : (
        <span className="place-self-center w-full h-10 loading loading-ring loading-xl"></span>
      )}
    </>
  );
};

export default InformationTab;
