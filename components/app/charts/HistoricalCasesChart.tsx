"use client";

import React from "react";
import { BaseChart } from "./BaseChart";
import { YearlyHistoricalDengueCases } from "@/models/HistoricalDengueCase";
import { TransformToYearlyCasesToChart } from "@/libraries/serializer/TransformYearlyHistoricalBarChart";
import { cn } from "@/libraries/ui/CnExtension";

interface HistoricalCasesChartProps {
  data: YearlyHistoricalDengueCases;
  height?: number;
  showTrend?: boolean;
  className?: string;
}

export const HistoricalCasesChart = ({
  data,
  height = 400,
  showTrend = true,
  className = "",
}: HistoricalCasesChartProps) => {
  const chartData = TransformToYearlyCasesToChart(data);

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Historical Dengue Cases",
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Cases",
        },
      },
    },
  };

  return (
    <div className={cn("card bg-base-100 shadow-lg", className)}>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          Historical Dengue Cases
        </h2>
        <BaseChart
          type="bar"
          data={chartData}
          options={options}
          height={height}
        />
        {showTrend && (
          <div className="mt-4 p-3 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content">
              <span className="font-semibold">Trend Analysis:</span>
              {data.totalDengueCases.length > 1 && (
                <>
                  {" "}
                  {data.totalDengueCases[data.totalDengueCases.length - 1]
                    .totalCases >
                  data.totalDengueCases[data.totalDengueCases.length - 2]
                    .totalCases
                    ? "↑ Increasing"
                    : "↓ Decreasing"}
                  {" trend compared to previous year"}
                </>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalCasesChart;
