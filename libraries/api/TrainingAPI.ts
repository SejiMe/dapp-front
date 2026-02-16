import { APIBuilder } from "./Builder";

const base = process.env.NEXT_PUBLIC_DENGUE_API;

if (base === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(base);

const baseApiGroup = "/api/training-data/";

export const TrainingAPI = {
  getAdvanceModelInfo: () => api.get(baseApiGroup + "model-info"),
  trainAdvanceModel: (payload?: any) => api.post(baseApiGroup + "advanced", payload),
};

export default TrainingAPI;
