import { format } from "date-fns";
import { APIBuilder } from "./Builder";
import { PredictedDengueCase } from "@/models/PredictedDengueCase";

const dengueAPIBasePath = process.env.NEXT_PUBLIC_DENGUE_API;

if (dengueAPIBasePath === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(dengueAPIBasePath);

const baseApiGroup = "/api/dengue-cases/";

export type PredictedDengueCaseResponse = {
  page_size: number;
  page_number: number;
  predictions: PredictedDengueCase[];
};

export const DengueCasesAPI = {
  // Get cases by date range
  getOneWeekPrediction: (psgccode: string, selectedDate: string) => {
    const data = api.get<PredictedDengueCase>(baseApiGroup + psgccode, {
      dt: selectedDate,
    });
    return data;
  },

  getWeeklyPredictionWithParams: (psgccode: string) => {
    const data = api.get<PredictedDengueCaseResponse>(
      baseApiGroup + "predictions/" + psgccode,
      {
        page_size: 6,
        page_number: 1,
      }
    );

    return data;
  },

  predictDengueCase: (psgccode: string, selectedDate: string) => {
    const fetchPost = api.post<PredictedDengueCase>(baseApiGroup + "advance", {
      psgccode: psgccode,
      dt: selectedDate,
    });
    return fetchPost;
  },
};
