import { format } from "date-fns";
import { APIBuilder } from "./Builder";
import { DengueCase } from "@models/DengueCase";

const dengueAPIBasePath = process.env.NEXT_PUBLIC_DENGUE_API;

if (dengueAPIBasePath === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(dengueAPIBasePath);

const baseApiGroup = "/api/dengue-cases/";

export const DengueCasesAPI = {
  // Get cases by date range
  getWeeklyPrediction: (psgccode: string, selectedDate: string) => {
    const data = api.get<DengueCase>(baseApiGroup + psgccode, {
      dt: selectedDate,
    });

    return data;
  },
  predictDengueCase: (psgccode: string, selectedDate: string) => {
    const fetchPost = api.post<DengueCase>(baseApiGroup + "advance", {
      psgccode: psgccode,
      dt: selectedDate,
    });
    return fetchPost;
  },
};
