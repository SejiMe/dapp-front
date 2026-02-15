import { APIBuilder } from "./Builder";

const base = process.env.NEXT_PUBLIC_DENGUE_API;

if (base === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(base);

const baseApiGroup = "/api/training-data/";

export const TrainingAPI = {
  getBasicModelInfo: () => api.get(baseApiGroup + "model-info/basic"),
  getAdvanceModelInfo: () => api.get(baseApiGroup + "model-info/advance"),
  trainBasicModel: (payload?: any) => api.post(baseApiGroup + "basic", payload),
  trainAdvanceModel: (payload?: any) => api.post(baseApiGroup + "advanced", payload),
};

export default TrainingAPI;
