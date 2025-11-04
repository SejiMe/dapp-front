import { ProblemDetails, ProblemDetailsError } from "@/models/ProblemDetails";

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  contentType?: string | null
): Promise<T> {
  console.log("fetching " + endpoint);
  const response = await fetch(endpoint, {
    headers: {
      "Content-Type": contentType ?? "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorResponse = (await response.json()) as ProblemDetails;
    throw new ProblemDetailsError(errorResponse);
  }

  return response.json() as Promise<T>;
}
