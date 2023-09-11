/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import getCachedDataOrSet from "@/helpers/getCachedDataOrSet";
import { createContext, useContext } from "react";

interface CacheContextType {
  setOrGetCacheData: (key: string, data?: any) => any;
  isCachedDataValid: (key: string) => boolean;
}

export const CacheContext = createContext<CacheContextType>({} as CacheContextType);

export const CacheContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { setOrGetCacheData, isCachedDataValid } = getCachedDataOrSet();

  return <CacheContext.Provider value={{ setOrGetCacheData, isCachedDataValid }}>{children}</CacheContext.Provider>;
};

export const useCacheContext: () => CacheContextType = () => useContext(CacheContext);
