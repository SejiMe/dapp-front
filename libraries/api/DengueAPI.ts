import { AdministrativeArea } from "@models/AdministrativeArea";
import { APIBuilder } from "./Builder";

const dengueAPIBasePath = process.env.NEXT_PUBLIC_DENGUE_API;

if (dengueAPIBasePath === undefined) {
  throw new Error("The base path is not defined!");
}

const api = new APIBuilder(dengueAPIBasePath);

export const Localities = {
  getAllRegions: () => {
    const ap = api.get<AdministrativeArea[]>(
      "/api/administrative-areas/regions"
    );
    console.log(api.checkBasePath());
    return ap;
  },
};

// export const UsersAPI = {
//   getAll: (params?: { page?: number; limit?: number; search?: string }) =>
//     api.get<User[]>("", params),
//   getById: (id: string) => api.get<User>(`/${id}`),
//   create: (data: Partial<User>) => api.post<User>("", data),
//   update: (id: string, data: Partial<User>) => api.put<User>(`/${id}`, data),
//   remove: (id: string) => api.delete<void>(`/${id}`),
// };
