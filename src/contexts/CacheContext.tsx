/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext } from "react";

import createCache from "@/utils/createCache";

type CacheContextType<T> = ReturnType<typeof createCache<T>>;

export const CacheContext = createContext({} as CacheContextType<any>);

export function CacheContextProvider<T>({ children }: { children: React.ReactNode }) {
  const { setCacheData, getCacheData, isCachedDataValid } = createCache<T>();

  return (
    <CacheContext.Provider value={{ setCacheData, getCacheData, isCachedDataValid }}>{children}</CacheContext.Provider>
  );
}

export function useCacheContext<T>(): CacheContextType<T> {
  const context = useContext<CacheContextType<T>>(CacheContext);
  if (!context) {
    throw new Error("useCacheContext must be used within CacheProvider");
  }
  return context;
}
