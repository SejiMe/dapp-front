export interface DengueCase {
  id: string;
  psgccode: string;
  caseDate: string; // ISO date string
  patientAge?: number;
  patientGender?: "male" | "female";
  classification: "suspected" | "probable" | "confirmed";
  severity: "mild" | "moderate" | "severe";
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  reportedAt: string; // ISO datetime string
  updatedAt: string; // ISO datetime string
}

export interface CaseFilters {
  classification?: string[];
  severity?: string[];
  ageRange?: {
    min?: number;
    max?: number;
  };
  gender?: string[];
}

export interface CaseStatistics {
  totalCases: number;
  casesByClassification: Record<string, number>;
  casesBySeverity: Record<string, number>;
  casesByAgeGroup: Record<string, number>;
  casesByGender: Record<string, number>;
  weeklyTrend: Array<{
    week: number;
    year: number;
    cases: number;
  }>;
}
