import { useCallback, useEffect, useRef, useState } from "react";

export const useKeyboardSelect = (itemLength: number) => {
  const [focusIdx, setFocusIdx] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const currentFocusElement = itemRefs.current[focusIdx];
    if (currentFocusElement) {
      currentFocusElement.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [focusIdx]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setFocusIdx((prevFocusIdx) => Math.max(0, prevFocusIdx - 1));
          break;
        case "ArrowDown":
          setFocusIdx((prevFocusIdx) => Math.min(itemLength - 1, prevFocusIdx + 1));
          break;
        default:
          break;
      }
    },

    [itemLength]
  );
  const setItemRef = useCallback((element: HTMLElement | null, idx: number) => {
    itemRefs.current[idx] = element;
  }, []);

  return { focusIdx, setFocusIdx, handleKeyPress, setItemRef };
};
