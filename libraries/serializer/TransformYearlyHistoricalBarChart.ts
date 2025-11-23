import { YearlyHistoricalDengueCases } from "@/models/HistoricalDengueCase";
import { getChartColors } from "../ui/chart-theme";

export function TransformToYearlyCasesToChart(
  data?: YearlyHistoricalDengueCases
) {
  const cases = data?.recorded_cases ?? [];
  const colors = getChartColors();
  const labels = cases?.map((x) => x.year);
  const values = cases?.map((x) => x.total_cases);
  console.log(colors);
  return {
    labels,
    datasets: [
      {
        label: "Dengue Cases",
        data: values,
        backgroundColor: colors.secondary.replace("0.7", "1"),
        borderColor: colors.accent.replace("0.7", "1"),
        borderRadius: {
          topLeft: 24,
          topRight: 24,
          bottomLeft: 0,
          bottomRight: 0,
        },
        borderSkipped: "bottom", // Rounded corners
        barThickness: 48,
      },
    ],
  };
}
