import { Probability } from "@/data/DengueProbability";

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

  return {
    labels: data.map((item) => `Week ${item.iso_week}`),
    datasets: [
      {
        label: "Probability (%)",
        data: data.map((item) => item.probability),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
    monthBoundaries,
  };
};
