import React from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";
import { ProbabilitySampleData } from "@/data/DengueProbability";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="p-2 rounded-xl bg-white h-full">
      <WeeklyPerBarangay data={ProbabilitySampleData} />
    </div>
  );
};

export default DashboardPage;
