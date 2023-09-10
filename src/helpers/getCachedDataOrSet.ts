/* eslint-disable @typescript-eslint/no-explicit-any */
const getCachedDataOrSet = () => {
  const cache = new Map<string, any>();
  return {
    cacheData: (key: string, data?: any) => {
      if (cache.has(key)) {
        return cache.get(key);
      }
      console.log(key, data);
      cache.set(key, data);
      return data;
    },

    isCaching: (key: string) => cache.has(key),
  };
};

export default getCachedDataOrSet;
