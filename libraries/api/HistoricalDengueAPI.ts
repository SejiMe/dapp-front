import { AdministrativeArea } from "@models/AdministrativeArea";
import { APIBuilder } from "./Builder";
import { YearlyHistoricalDengueCases } from "@/models/HistoricalDengueCase";

const dengueAPIBasePath = process.env.NEXT_PUBLIC_DENGUE_API;

if (dengueAPIBasePath === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(dengueAPIBasePath);

const baseApiGroup = "/api/dengue-cases/historical/";

export const HistoricalDengueCases = {
  getYearlyHistorical: (psgccode: string) => {
    const historicalData = api.get<YearlyHistoricalDengueCases>(
      baseApiGroup + psgccode
    );

    // TODO

    return historicalData;
  },
  //   getAllBarangaysByPsgccode: (psgccode: string) => {
  //     const brgys = api.get<AdministrativeArea[]>(
  //       `/api/administrative-areas/localities/${psgccode}`
  //     );
  //     return brgys;
  //   },
};
