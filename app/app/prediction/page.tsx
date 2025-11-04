import React from "react";
import WeeklyPerBarangay from "./WeeklyPerBarangay";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <div className="p-2 rounded-xl bg-white h-full">
      <WeeklyPerBarangay />
    </div>
  );
};

export default DashboardPage;
