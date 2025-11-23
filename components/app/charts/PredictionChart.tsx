"use client";

import React from "react";
import { BaseChart } from "./BaseChart";
import { ProbabilitySampleData } from "@/data/DengueProbability";
import { TransformWeeklyOutbreakProbabilityBarChart } from "@/libraries/serializer/TransformWeeklyOutbreakProbabilityBarChart";
import { cn } from "@/libraries/ui/CnExtension";
import { PredictedDengueCase } from "@/models/PredictedDengueCase";

interface PredictionChartProps {
  data: PredictedDengueCase[];
  height?: number;
  showRiskLevels?: boolean;
  className?: string;
}

export const PredictionChart = ({
  data,
  height = 450,
  showRiskLevels = true,
  className = "",
}: PredictionChartProps) => {
  const { labels, datasets, monthBoundaries } =
    TransformWeeklyOutbreakProbabilityBarChart(data);

  // Create custom plugin for month labels
  const monthLabelPlugin = {
    id: "monthLabels",
    afterDatasetsDraw: (chart: any) => {
      const { ctx, chartArea, scales } = chart;
      const { x: xScale } = scales;

      ctx.save();

      monthBoundaries.forEach((boundary: any, index: number) => {
        // Find the label indices for the start and end weeks
        const startLabelIndex = labels.findIndex(
          (label) => label === `Week ${boundary.startWeek}`
        );
        const endLabelIndex = labels.findIndex(
          (label) => label === `Week ${boundary.endWeek}`
        );

        const startPixel = xScale.getPixelForValue(startLabelIndex);
        const endPixel = xScale.getPixelForValue(endLabelIndex);
        const centerX = (startPixel + endPixel) / 2;

        // Draw month label
        ctx.font = 'bold 16px "Noto Sans", sans-serif';
        ctx.fillStyle = "#ff6b9d"; // Use solid color for Canvas
        ctx.textAlign = "center";
        ctx.fillText(
          boundary.month.toUpperCase().substring(0, 3),
          centerX,
          chartArea.bottom + 35
        );

        // Draw separator line (except for last month)
        if (index < monthBoundaries.length - 1) {
          const nextBoundary = monthBoundaries[index + 1];
          const nextStartLabelIndex = labels.findIndex(
            (label) => label === `Week ${nextBoundary.startWeek}`
          );
          const separatorX =
            (endPixel + xScale.getPixelForValue(nextStartLabelIndex)) / 2;

          ctx.strokeStyle = "rgba(209, 213, 219, 0.5)";
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          ctx.beginPath();
          ctx.moveTo(separatorX, chartArea.top);
          ctx.lineTo(separatorX, chartArea.bottom);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      ctx.restore();
    },
  };

  // Apply risk-based coloring to datasets
  const themedData = {
    labels,
    datasets: datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: data.map((item) => {
        const probability = item.outbreak_probability;
        if (probability >= 80) return "#ef4444"; // error
        if (probability >= 60) return "#f59e0b"; // warning
        if (probability >= 40) return "#3b82f6"; // info
        return "#10b981"; // success
      }),
      borderColor: data.map((item) => {
        const probability = item.outbreak_probability;
        if (probability >= 80) return "#ef4444"; // error
        if (probability >= 60) return "#f59e0b"; // warning
        if (probability >= 40) return "#3b82f6"; // info
        return "#10b981"; // success
      }),
      borderWidth: 1,
      borderRadius: 8,
    })),
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Dengue Outbreak Prediction",
      },
      legend: {
        display: showRiskLevels,
        labels: {
          generateLabels: () => [
            {
              text: "Low Risk (0-39%)",
              fillStyle: "#10b981",
            },
            {
              text: "Medium Risk (40-59%)",
              fillStyle: "#3b82f6",
            },
            {
              text: "High Risk (60-79%)",
              fillStyle: "#f59e0b",
            },
            {
              text: "Critical Risk (80-100%)",
              fillStyle: "#ef4444",
            },
          ],
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: "Probability (%)",
        },
      },
    },
    layout: {
      padding: {
        bottom: 40,
      },
    },
  };

  return (
    <div className={cn("card bg-base-100 shadow-lg", className)}>
      <div className="card-body">
        <h2 className="card-title text-base-content">
          Weekly Prediction Analysis
        </h2>
        <BaseChart
          type="bar"
          data={themedData}
          options={options}
          plugins={[monthLabelPlugin]}
          height={height}
        />
        {showRiskLevels && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success"></div>
              <span className="text-xs text-base-content">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-info"></div>
              <span className="text-xs text-base-content">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning"></div>
              <span className="text-xs text-base-content">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-error"></div>
              <span className="text-xs text-base-content">Critical Risk</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionChart;
