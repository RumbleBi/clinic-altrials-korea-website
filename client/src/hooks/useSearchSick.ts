import { useEffect, useState } from "react";

import { SickList, UseSearchSickReturn } from "../types/types";
import { getSickByName } from "../api/getSicks";
import { useDebounce } from "./useDebounce";

export const useSearchSick = (userInput: string): UseSearchSickReturn => {
  const debouncedInput = useDebounce(userInput, 500);

  const [sickList, setSickList] = useState<SickList[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (debouncedInput.length >= 1) {
      setIsLoading(true);
      const fetchSearchSickData = async () => {
        try {
          const data = await getSickByName(debouncedInput);

          if (!data?.length) {
            setSickList([]);
          } else {
            setSickList(data);
          }
          setError(null);
        } catch (e) {
          setError("통신에 에러가 발생했습니다. 다시 시도해 주세요.");
          throw e;
        } finally {
          setIsLoading(false);
        }
      };

      fetchSearchSickData();
    } else {
      setSickList([]);
    }
  }, [debouncedInput]);

  return { sickList, isLoading, error };
};
