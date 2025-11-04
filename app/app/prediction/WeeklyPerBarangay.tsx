import ChartComponent from "@/components/app/ChartComponent";
import { ProbabilitySampleData } from "@/data/DengueProbability";
import React from "react";
import { TransformToWeeklyBarChart } from "@/libraries/serializer/TransformWeeklyProbabilityBarChart";
import WeeklyChartPerBarangay from "./WeeklyChartPerBarangay";
type Props = {};

const WeeklyPerBarangay = (props: Props) => {
  return (
    <div>
      <form className="flex flex-1 justify-between">
        <div className="flex flex-col">
          <label htmlFor="select_timeline">Timeline</label>
          <select
            name=""
            id="select_timeline"
            className="select select-primary"
          >
            <option defaultValue="2025">Current Year</option>
            <option value="2024">Last Year</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="select_barangay">Barangay</label>
          <select
            name=""
            id="select_barangay"
            className="select select-primary"
          >
            <option defaultValue="N/a" disabled>
              Select Barangay
            </option>
            <option value="123">Arena Blanco</option>
          </select>
        </div>
      </form>

      <div className="card-body">
        <h2 className="card-title">Dengue Cases</h2>
        {/* <ChartComponent
          type="bar"
          data={TransformToWeeklyBarChart(ProbabilitySampleData)}
          options={options}
          height={350}
        /> */}
        <WeeklyChartPerBarangay key={1} data={ProbabilitySampleData} />
      </div>
    </div>
  );
};

export default WeeklyPerBarangay;
