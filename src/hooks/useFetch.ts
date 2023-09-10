import { useState, useEffect, useRef } from "react";

type Status = "initial" | "pending" | "fulfilled" | "rejected";

interface UseFetch<T> {
  data?: T;
  status: Status;
  error?: Error;
}

export default function useFetch<T>(fetchingCallBackFunction: () => Promise<Response>): UseFetch<T> {
  const [state, setState] = useState<UseFetch<T>>({ data: undefined, status: "initial", error: undefined });
  const activePromise = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const loadDataFromEndpoint = async () => {
      try {
        const response = await fetchingCallBackFunction();
        const result = await response.json();
        setState((prev) => ({ ...prev, data: result.data, status: "fulfilled" }));
      } catch (error) {
        setState((prev) => ({ ...prev, status: "rejected", error: error as Error }));
      }
    };

    if (state.status === "initial") {
      setState((prev) => ({ ...prev, status: "pending" }));
      activePromise.current = loadDataFromEndpoint();
    }
  }, [fetchingCallBackFunction, state.status]);

  if (state.status === "pending" && activePromise.current) {
    throw activePromise.current;
  }

  if (state.status === "rejected" && state.error) {
    throw state.error;
  }

  return state;
}
