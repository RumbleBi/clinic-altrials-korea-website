import { useEffect, useState } from "react";

import { SickList, UseSearchSickReturn } from "../types/types";
import { getSickByName } from "../api/getSicks";

export const useSearchSick = (userInput: string): UseSearchSickReturn => {
  const [sickList, setSickList] = useState<SickList[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userInput.length >= 1) {
      setIsLoading(true);
      const fetchSearchSickData = async () => {
        try {
          const data = await getSickByName(userInput);

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
  }, [userInput]);

  return { sickList, isLoading, error };
};
