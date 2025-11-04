import { Probability } from "@/data/DengueProbability";
import { getChartColors } from "../ui/chart-theme";

export const TransformToWeeklyBarChart = (data: Probability[]) => {
  // Find month boundaries
  const monthBoundaries: { month: string; start: number; end: number }[] = [];
  let currentMonth = data[0]?.month;
  let startIndex = 0;

  data.forEach((item, index) => {
    if (item.month !== currentMonth) {
      monthBoundaries.push({
        month: currentMonth,
        start: startIndex,
        end: index - 1,
      });
      currentMonth = item.month;
      startIndex = index;
    }

    if (index === data.length - 1) {
      monthBoundaries.push({
        month: currentMonth,
        start: startIndex,
        end: index,
      });
    }
  });
  const colors = getChartColors();
  return {
    labels: data.map((item) => `Week ${item.iso_week}`),
    datasets: [
      {
        label: "Probability (%)",
        data: data.map((item) => item.probability),
        backgroundColor: colors.primary.replace("0.7", "0.9"),
        borderColor: colors.primary.replace("0.7", "1"),
        borderWidth: 0.5,
        borderRadius: 60,
        barThickness: 10, // 👈 fixed bar width (px)
      },
    ],
    monthBoundaries,
  };
};
