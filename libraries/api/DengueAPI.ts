import { APIBuilder } from "./Builder";
import { DengueCase, CaseFilters, CaseStatistics } from "@models/DengueCase";

const dengueAPI = new APIBuilder(
  process.env.NEXT_PUBLIC_DENGUE_API + "/api/dengue-cases"
);

export const DengueCasesAPI = {
  // Get cases by date range
};
