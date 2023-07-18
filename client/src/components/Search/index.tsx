import { useEffect } from "react";

import { SearchProps } from "../../types/types";
import { highlightText } from "../../utils/highlightText";
import { useKeyboardSelect } from "../../hooks/useKeyboardSelect";

import {
  Input,
  SearchWrap,
  ResultWrap,
  Result,
  NoResult,
  SubTitle,
  ErrorMessage,
  LoadingMessage,
} from "./styled";

const Search = ({ userInput, sickList, handleInputChange, isLoading, error }: SearchProps) => {
  const { focusIdx, setFocusIdx, handleKeyPress, setItemRef } = useKeyboardSelect(sickList.length);

  useEffect(() => {
    setFocusIdx(0);
  }, [setFocusIdx]);

  if (error) {
    return <ErrorMessage>통신에 에러가 발생하였습니다. 나중에 다시 시도해 주세요.</ErrorMessage>;
  }

  return (
    <SearchWrap>
      <Input
        onKeyDown={handleKeyPress}
        type='text'
        value={userInput}
        onChange={handleInputChange}
        placeholder='질환명을 입력해 주세요.'
      />
      {userInput && (
        <ResultWrap>
          {isLoading && <LoadingMessage>로딩중..</LoadingMessage>}
          {sickList.length ? (
            <>
              <SubTitle>추천 검색어</SubTitle>
              {sickList.map((el, idx) => (
                <Result
                  $idx={idx}
                  $focusIdx={focusIdx}
                  key={el.sickCd}
                  ref={(element) => setItemRef(element, idx)}
                >
                  {highlightText(el.sickNm, userInput)}
                </Result>
              ))}
            </>
          ) : (
            <NoResult>검색결과가 없습니다.</NoResult>
          )}
        </ResultWrap>
      )}
    </SearchWrap>
  );
};

export default Search;
