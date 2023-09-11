import { useCacheContext } from "@/contexts/CacheContext";
import { useState, useEffect, useRef } from "react";

type Status = "initial" | "pending" | "fulfilled" | "rejected";

interface UseFetch<T> {
  data?: T;
  status: Status;
  error?: Error;
  cacheKey: string;
}

export default function useFetch<T>(fetchingCallBackFunction: () => Promise<Response>, cacheKey: string): UseFetch<T> {
  const [state, setState] = useState<UseFetch<T>>({
    data: undefined,
    status: "initial",
    error: undefined,
    cacheKey,
  });
  const activePromise = useRef<Promise<void> | null>(null);
  const { setOrGetCacheData, isCachedDataValid } = useCacheContext();

  useEffect(() => {
    const loadDataFromEndpoint = async () => {
      try {
        const response = await fetchingCallBackFunction();
        const result = await response.json();
        setOrGetCacheData(cacheKey, result.data);
        setState((prev) => ({ ...prev, data: result.data, cacheKey, status: "fulfilled" }));
      } catch (error) {
        setState((prev) => ({ ...prev, status: "rejected", error: error as Error }));
      }
    };

    if (state.status === "initial") {
      if (isCachedDataValid(cacheKey)) {
        setState((prev) => ({ ...prev, data: setOrGetCacheData(cacheKey), cacheKey, status: "fulfilled" }));
      } else {
        setState((prev) => ({ ...prev, status: "pending" }));
        activePromise.current = loadDataFromEndpoint();
      }
    }
  }, [fetchingCallBackFunction, state.status, cacheKey, isCachedDataValid, setOrGetCacheData]);

  if (state.status === "pending" && activePromise.current) {
    throw activePromise.current;
  }

  if (state.status === "rejected" && state.error) {
    throw state.error;
  }

  return state;
}
