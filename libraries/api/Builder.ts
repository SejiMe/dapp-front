import { apiClient } from "./Client";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export class APIBuilder {
  constructor(
    private basePath: string,
    private defaultParams: Record<string, any> = {}
  ) {}

  private buildUrl(path = "", query?: QueryParams): string {
    const url = new URL(`${this.basePath}${path}`);

    // Merge default params with query params
    const allParams = { ...this.defaultParams, ...query };

    Object.entries(allParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    return url.toString();
  }

  async get<T>(path = "", query?: QueryParams, options?: RequestInit) {
    console.log(`GET: ${this.buildUrl(path, query)}`);
    return apiClient.get<T>(this.buildUrl(path, query), {
      ...options,
      method: "GET",
    });
  }

  async post<T>(path = "", body?: unknown, options?: RequestInit) {
    console.log(`POST: ${this.buildUrl(path)}`);
    return apiClient.post<T>(this.buildUrl(path), body, {
      ...options,
      method: "POST",
    });
  }

  async put<T>(path = "", body?: unknown, options?: RequestInit) {
    console.log(`PUT: ${this.buildUrl(path)}`);
    return apiClient.put<T>(this.buildUrl(path), body, {
      ...options,
      method: "PUT",
    });
  }

  async patch<T>(path = "", body?: unknown, options?: RequestInit) {
    console.log(`PATCH: ${this.buildUrl(path)}`);
    return apiClient.patch<T>(this.buildUrl(path), body, {
      ...options,
      method: "PATCH",
    });
  }

  async delete<T>(path = "", options?: RequestInit) {
    console.log(`DELETE: ${this.buildUrl(path)}`);
    return apiClient.delete<T>(this.buildUrl(path), {
      ...options,
      method: "DELETE",
    });
  }

  // Set default parameters for all requests
  setDefaultParams(params: Record<string, any>) {
    this.defaultParams = { ...this.defaultParams, ...params };
  }

  // Get current default parameters
  getDefaultParams() {
    return { ...this.defaultParams };
  }

  // Check base path
  checkBasePath() {
    return this.basePath;
  }
}
