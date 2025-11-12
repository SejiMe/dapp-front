"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartType,
  Plugin,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { getChartColors } from "@/libraries/ui/chart-theme";
import { cn } from "@/libraries/ui/CnExtension";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface BaseChartProps {
  type: ChartType;
  data: any;
  options?: ChartOptions;
  plugins?: Plugin[];
  className?: string;
  height?: number;
  width?: number;
  title?: string;
  subtitle?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
}

export const BaseChart = ({
  type,
  data,
  options = {},
  plugins = [],
  className = "",
  height = 300,
  width,
  title,
  subtitle,
  showLegend = true,
  showTooltip = true,
}: BaseChartProps) => {
  const colors = getChartColors();

  const defaultOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
        labels: {
          font: {
            family: '"Noto Sans", sans-serif',
            size: 14,
          },
          color: colors.primary,
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: !!title,
        text: title,
        font: {
          family: '"Noto Sans", sans-serif',
          size: 18,
          weight: "bold",
        },
        color: colors.primary,
        padding: 20,
      },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: colors.neutral,
        titleColor: colors.accent,
        bodyColor: colors.primary,
        borderColor: colors.neutral,
        borderWidth: 1,
        titleFont: {
          family: '"Noto Sans", sans-serif',
          size: 14,
        },
        bodyFont: {
          family: '"Noto Sans", sans-serif',
          size: 12,
        },
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales:
      type !== "pie" && type !== "doughnut"
        ? {
            x: {
              grid: {
                color: colors.base300,
                drawOnChartArea: true,
                drawTicks: false,
              },
              ticks: {
                color: colors.foreground,
                font: {
                  family: '"Noto Sans", sans-serif',
                  size: 12,
                },
              },
            },
            y: {
              grid: {
                color: colors.base300,
                drawOnChartArea: true,
                drawTicks: false,
              },
              ticks: {
                color: colors.foreground,
                font: {
                  family: '"Noto Sans", sans-serif',
                  size: 12,
                },
              },
            },
          }
        : undefined,
    ...options,
  };

  return (
    <div
      className={cn("w-full", className)}
      style={{ width, height: `${height}px` }}
    >
      <Chart
        type={type}
        data={data}
        options={defaultOptions}
        plugins={plugins}
      />
      {subtitle && (
        <p
          className="text-center text-sm mt-2"
          style={{ color: colors.foreground }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default BaseChart;
