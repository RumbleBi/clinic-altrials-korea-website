import { ChangeEvent, useState } from "react";
import { UseUserInputReturn } from "../types/types";

export const useUserInput = (initialValue: string = ""): UseUserInputReturn => {
  const [userInput, setUserInput] = useState(initialValue);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return { userInput, handleInputChange };
};
