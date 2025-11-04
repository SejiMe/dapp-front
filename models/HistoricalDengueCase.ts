export interface YearlyHistoricalDengueCases {
  psgccode: string;
  totalDengueCases: YearlyTotalDengueCases[];
}

export interface YearlyTotalDengueCases {
  year: string;
  totalCases: number;
}
