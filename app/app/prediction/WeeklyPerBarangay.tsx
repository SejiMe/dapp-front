import React from "react";
import PredictionChart from "@/components/app/charts/PredictionChart";
import { Probability, ProbabilitySampleData } from "@/data/DengueProbability";

type Props = {};

const WeeklyPerBarangay = ({ data }: { data: Probability[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <PredictionChart data={data} height={450} showRiskLevels={true} />
    </div>
  );
};

export default WeeklyPerBarangay;
