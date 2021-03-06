type Collection = {
  timestamp: number;
  collection: any;
};

type CacheType = {
  [key: string]: Collection;
};

let cache: CacheType = {};

export const clearCache = (label: string) => {
  delete cache[label];
};

export const getCache = (label: string) => {
  const now = Date.now();
  const { timestamp, collection } = cache[label] || {};

  const cacheDuration = process.env.CACHE_DURATION || '0';

  if (collection && timestamp && now / 1000 - timestamp / 1000 < parseInt(cacheDuration, 10)) {
    // cache is valid
    return collection;
  }
};

export const setCache = <T>(label: string, collection: T) => {
  cache = {
    ...cache,
    [label]: {
      timestamp: Date.now(),
      collection,
    },
  };
};

export const setCacheById = <T extends { id: string }>(label: string, data: T) => {
  const oldCollection = cache[label]?.collection.filter((item: T) => item.id === data.id) ?? [];

  cache = {
    ...cache,
    [label]: {
      timestamp: Date.now(),
      collection: [...oldCollection, data],
    },
  };
};
