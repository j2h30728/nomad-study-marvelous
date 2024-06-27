/* eslint-disable @typescript-eslint/no-explicit-any */
const ONE_MINUTE_MS = 60 * 1000;

interface CacheItem<T> {
  data: T;
  expireTime: number;
}

const createCache = <T>(cacheExpirationDuration: number = ONE_MINUTE_MS * 10) => {
  const cache = new Map<string, CacheItem<T>>();

  const setCacheData = (key: string, data: T) => {
    cache.set(key, { data, expireTime: Date.now() + cacheExpirationDuration });
    return;
  };

  const getCacheData = (key: string): T | null => {
    const cachedData = cache.get(key);
    if (cachedData && cachedData.expireTime > Date.now()) {
      return cachedData.data as T;
    }
    return null;
  };

  const isCachedDataValid = (key: string) => {
    const cachedDataInfo = cache.get(key);
    const cachedData = getCacheData(key);
    if (cachedData === null || !cachedDataInfo) return false;

    return cachedData ? true : false;
  };

  return {
    setCacheData,
    getCacheData,
    isCachedDataValid,
  };
};

export default createCache;
