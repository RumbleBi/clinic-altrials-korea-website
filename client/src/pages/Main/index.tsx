import Search from "../../components/Search";

import { Wrap, Title } from "./styled";
import { useDebounce } from "../../hooks/useDebounce";
import { useSearchSick } from "../../hooks/useSearchSick";
import { useUserInput } from "../../hooks/useUserInput";

export default function MainPage() {
  const { userInput, handleInputChange } = useUserInput();
  const debouncedInput = useDebounce(userInput, 500);
  const { sickList, isLoading, error } = useSearchSick(debouncedInput);

  return (
    <Wrap>
      <Title>국내 임상시험 검색창</Title>
      <Search
        userInput={userInput}
        sickList={sickList}
        handleInputChange={handleInputChange}
        isLoading={isLoading}
        error={error}
      />
    </Wrap>
  );
}
