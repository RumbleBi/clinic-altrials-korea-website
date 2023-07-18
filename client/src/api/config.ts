import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CacheEntry, SickList } from "../types/types";

const cache = new Map<string, CacheEntry>();
const expireTime = 5 * 60 * 1000;

const getFromCache = (url: string): SickList[] | null => {
  const cacheEntry = cache.get(url);

  if (!cacheEntry) {
    return null;
  }

  if (Date.now() > cacheEntry.expireAt) {
    cache.delete(url);
    return null;
  }

  return cacheEntry.data;
};

const saveToCache = (url: string, data: SickList[]): void => {
  cache.set(url, {
    data,
    expireAt: Date.now() + expireTime,
  });
};

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: async (url: string, queryString?: AxiosRequestConfig): Promise<SickList[]> => {
    const fullUrl = queryString
      ? `${url}?${new URLSearchParams(queryString.params).toString()}`
      : url;
    const cacheData = getFromCache(fullUrl);

    if (cacheData) {
      return cacheData;
    }

    console.info("API calling");
    const res: AxiosResponse = await instance.get(url, queryString);

    saveToCache(fullUrl, res.data);

    return res.data;
  },
};
