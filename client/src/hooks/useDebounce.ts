import { useState, useEffect } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedInput, setDebouncedInput] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedInput;
};
