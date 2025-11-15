import React from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";
import { ProbabilitySampleData } from "@/data/DengueProbability";

type Props = {};

const ChartsTab = (props: Props) => {
  return (
    <>
      <WeeklyPerBarangay data={ProbabilitySampleData} />
    </>
  );
};

export default ChartsTab;
