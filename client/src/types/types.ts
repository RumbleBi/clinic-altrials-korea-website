export interface SickList {
  sickCd: string;
  sickNm: string;
}

export interface CacheEntry {
  data: SickList[];
  expireAt: number;
}
