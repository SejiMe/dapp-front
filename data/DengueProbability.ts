import { YearlyHistoricalDengueCases } from "@/models/HistoricalDengueCase";
import { DecimationAlgorithm } from "chart.js";

export type Probability = {
  month: string;
  iso_week: number;
  iso_year: number;
  probability: number;
};

export const SampleData: YearlyHistoricalDengueCases = {
  psgccode: "0931700001",
  totalDengueCases: [
    {
      year: "2014",
      totalCases: 12,
    },
    {
      year: "2015",
      totalCases: 19,
    },
    {
      year: "2016",
      totalCases: 34,
    },
    {
      year: "2017",
      totalCases: 29,
    },
    {
      year: "2018",
      totalCases: 15,
    },
    {
      year: "2019",
      totalCases: 37,
    },
    {
      year: "2020",
      totalCases: 2,
    },
    {
      year: "2021",
      totalCases: 37,
    },
    {
      year: "2022",
      totalCases: 12,
    },
    {
      year: "2023",
      totalCases: 3,
    },
  ],
};

export const ProbabilitySampleData: Probability[] = [
  {
    month: "January",
    iso_week: 1,
    iso_year: 2025,
    probability: 80,
  },
  {
    month: "January",
    iso_week: 2,
    iso_year: 2025,
    probability: 50,
  },
  {
    month: "January",
    iso_week: 3,
    iso_year: 2025,
    probability: 20,
  },
  {
    month: "January",
    iso_week: 4,
    iso_year: 2025,
    probability: 20,
  },
  {
    month: "February",
    iso_week: 5,
    iso_year: 2025,
    probability: 70,
  },
  {
    month: "February",
    iso_week: 6,
    iso_year: 2025,
    probability: 60,
  },
  {
    month: "February",
    iso_week: 7,
    iso_year: 2025,
    probability: 30,
  },
  {
    month: "February",
    iso_week: 8,
    iso_year: 2025,
    probability: 70,
  },
  {
    month: "March",
    iso_week: 9,
    iso_year: 2025,
    probability: 65,
  },
];
