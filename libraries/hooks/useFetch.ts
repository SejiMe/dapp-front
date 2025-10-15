"use client";

import useSWR, { SWRConfiguration } from "swr";
import { apiFetch } from "@libraries/hooks";

export function useFetch<T>(
  endpoint: string | null,
  options?: RequestInit,
  config?: SWRConfiguration
) {
  const fetcher = async (url: string) => apiFetch<T>(url, options);

  const { data, error, isLoading, mutate } = useSWR<T>(
    endpoint,
    endpoint ? fetcher : null,
    config
  );

  return { data, error, isLoading, mutate };
}
