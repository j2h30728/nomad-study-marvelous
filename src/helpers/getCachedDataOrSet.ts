/* eslint-disable @typescript-eslint/no-explicit-any */
const ONE_MINUTE_MS = 60 * 1000;

const getCachedDataOrSet = () => {
  const cache = new Map<string, any>();
  return {
    cacheData: (key: string, data?: any) => {
      if (cache.has(key)) {
        const { data, expireTime } = cache.get(key);
        if (expireTime > Date.now()) {
          return data;
        }
      }
      cache.set(key, { data, expireTime: Date.now() + ONE_MINUTE_MS * 10 });
      return data;
    },
    isCachedDateValid: (key: string) => {
      if (!cache.has(key)) return false;
      const { expireTime } = cache.get(key);
      return expireTime > Date.now();
    },
  };
};

export default getCachedDataOrSet;
