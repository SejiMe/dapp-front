export interface YearlyHistoricalDengueCases {
  psgccode: string;
  recorded_cases: YearlyTotalDengueCases[];
}

export interface YearlyTotalDengueCases {
  year: string;
  total_cases: number;
}
