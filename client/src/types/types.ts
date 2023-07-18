import { ChangeEvent } from "react";

export interface SickList {
  sickCd: string;
  sickNm: string;
}

export interface CacheEntry {
  data: SickList[];
  expireAt: number;
}

export interface SearchProps {
  userInput: string;
  sickList: SickList[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error: string | null;
}

export interface UseUserInputReturn {
  userInput: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface UseSearchSickReturn {
  sickList: SickList[] | [];
  isLoading: boolean;
  error: string | null;
}
