import React from "react";
import PredictionChart from "@/components/app/charts/PredictionChart";
import { Probability, ProbabilitySampleData } from "@/data/DengueProbability";

type Props = {};

const WeeklyPerBarangay = ({ data }: { data: Probability[] }) => {
  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-1 justify-between">
        <div className="flex flex-col">
          <label htmlFor="select_timeline" className="label">
            <span className="label-text">Timeline</span>
          </label>
          <select
            id="select_timeline"
            className="select select-primary w-full"
            defaultValue="2025"
          >
            <option value="2025">Current Year</option>
            <option value="2024">Last Year</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="select_barangay" className="label">
            <span className="label-text">Barangay</span>
          </label>
          <select
            id="select_barangay"
            className="select select-primary w-full"
            defaultValue="N/a"
            disabled
          >
            <option value="N/a" disabled>
              Select Barangay
            </option>
            <option value="123">Arena Blanco</option>
          </select>
        </div>
      </form>

      <PredictionChart data={data} height={450} showRiskLevels={true} />
    </div>
  );
};

export default WeeklyPerBarangay;
