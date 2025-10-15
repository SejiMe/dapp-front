import { apiFetch } from "./Client";

type QueryParams = Record<string, string | number | boolean | undefined | null>;

export class APIBuilder {
  constructor(private basePath: string) {}

  private buildUrl(path = "", query?: QueryParams): string {
    console.log("base path in builder: " + this.basePath);
    const url = new URL(`${this.basePath}${path}`);

    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return this.basePath + url.pathname + url.search;
  }

  get<T>(path = "", query?: QueryParams, options?: RequestInit) {
    return apiFetch<T>(this.buildUrl(path, query), {
      ...options,
      method: "GET",
    });
  }

  post<T>(path = "", body?: unknown, options?: RequestInit) {
    return apiFetch<T>(this.basePath + path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  put<T>(path = "", body?: unknown, options?: RequestInit) {
    return apiFetch<T>(this.basePath + path, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  patch<T>(path = "", body?: unknown, options?: RequestInit) {
    return apiFetch<T>(this.basePath + path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  delete<T>(path = "", options?: RequestInit) {
    return apiFetch<T>(this.basePath + path, { ...options, method: "DELETE" });
  }

  checkBasePath() {
    return this.basePath;
  }
}
