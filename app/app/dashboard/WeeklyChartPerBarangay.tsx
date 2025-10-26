// import ChartComponent from "@/components/app/ChartComponent";
// import React from "react";
// import { Probability, ProbabilitySampleData } from "@/data/DengueProbability";
// import { TransformToWeeklyBarChart } from "@library-serializer/WeeklyProbabilityBarChart";

// export const WeeklyChartPerBarangay = ({ data }: { data: Probability[] }) => {
//   const { labels, datasets, monthBoundaries } = TransformToWeeklyBarChart(data);

//   // Get DaisyUI theme colors from CSS variables
//   const getThemeColor = (variable: string) => {
//     if (typeof window === "undefined") return "#000000";
//     return getComputedStyle(document.documentElement)
//       .getPropertyValue(variable)
//       .trim();
//   };

//   // Create custom plugin for month labels
//   const monthLabelPlugin = {
//     id: "monthLabels",
//     afterDatasetsDraw(chart: any) {
//       const { ctx, chartArea, scales } = chart;
//       const { x: xScale } = scales;

//       // Get theme colors
//       const accentColor = getThemeColor("--a") || "#ff6b9d"; // DaisyUI accent color
//       const borderColor = getThemeColor("--bc") || "#d1d5db"; // DaisyUI base-content with opacity

//       ctx.save();

//       monthBoundaries.forEach((boundary: any, index: number) => {
//         const startPixel = xScale.getPixelForValue(boundary.start);
//         const endPixel = xScale.getPixelForValue(boundary.end);
//         const centerX = (startPixel + endPixel) / 2;

//         // Draw month label with theme color
//         ctx.font = "bold 16px sans-serif";
//         ctx.fillStyle = accentColor.startsWith("oklch")
//           ? `oklch(${accentColor})`
//           : "#ff6b9d";
//         ctx.textAlign = "center";
//         ctx.fillText(
//           boundary.month.toLowerCase().substring(0, 3),
//           centerX,
//           chartArea.bottom + 35
//         );

//         // Draw separator line (except for last month)
//         if (index < monthBoundaries.length - 1) {
//           const separatorX =
//             (endPixel + xScale.getPixelForValue(boundary.end + 1)) / 2;
//           ctx.strokeStyle = borderColor.startsWith("oklch")
//             ? `oklch(${borderColor} / 0.2)`
//             : "rgba(209, 213, 219, 0.5)";
//           ctx.lineWidth = 1;
//           ctx.setLineDash([5, 5]);
//           ctx.beginPath();
//           ctx.moveTo(separatorX, chartArea.top);
//           ctx.lineTo(separatorX, chartArea.bottom);
//           ctx.stroke();
//           ctx.setLineDash([]);
//         }
//       });

//       ctx.restore();
//     },
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true },
//       title: { display: true, text: "Weekly Probability Distribution" },
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         max: 100,
//         title: { display: true, text: "Probability (%)" },
//       },
//       x: {
//         grid: {
//           display: true,
//           color: "rgba(0, 0, 0, 0.05)",
//         },
//       },
//     },
//     layout: {
//       padding: {
//         bottom: 40,
//       },
//     },
//   };

//   return (
//     <div className="card bg-base-100 shadow-xl">
//       <div className="card-body">
//         <h2 className="card-title">Weekly Probability</h2>
//         <ChartComponent
//           type="bar"
//           data={{ labels, datasets }}
//           options={{
//             ...options,
//             plugins: [monthLabelPlugin],
//           }}
//           height={450}
//         />
//       </div>
//     </div>
//   );
// };
