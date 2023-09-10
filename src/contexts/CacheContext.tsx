/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import cachingData from "@/helpers/getCachedDataOrSet";
import { createContext, useContext } from "react";

interface CacheContextType {
  cacheData: (key: string, data?: any) => any;
  isCaching: (key: string) => boolean;
}

export const CacheContext = createContext<CacheContextType>({} as CacheContextType);

export const CacheContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { cacheData, isCaching } = cachingData();

  return <CacheContext.Provider value={{ cacheData, isCaching }}>{children}</CacheContext.Provider>;
};

export const useCacheContext: () => CacheContextType = () => useContext(CacheContext);
