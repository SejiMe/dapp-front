import React from "react";
import PredictionChart from "@/components/app/charts/PredictionChart";
import {
  predicted_case_outbreak_probability,
  ProbabilitySampleData,
} from "@/data/DengueProbability";
import { Skeleton } from "@mantine/core";
import { PredictedDengueCase } from "@/models/PredictedDengueCase";

type Props = {};

const WeeklyPerBarangay = ({
  data,
  isLoading,
}: {
  data: PredictedDengueCase[];
  isLoading: boolean;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton visible={isLoading}>
        <PredictionChart data={data} height={450} showRiskLevels={true} />
      </Skeleton>
    </div>
  );
};

export default WeeklyPerBarangay;
