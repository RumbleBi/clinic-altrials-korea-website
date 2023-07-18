import { SearchProps } from "../../types/types";
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

import { highlightText } from "../../utils/highlightText";
const Search = ({ userInput, sickList, handleInputChange, isLoading, error }: SearchProps) => {
  if (error) {
    return <ErrorMessage>통신에 에러가 발생하였습니다. 나중에 다시 시도해 주세요.</ErrorMessage>;
  }

  return (
    <SearchWrap>
      <Input
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
              {sickList.map((el) => (
                <Result key={el.sickCd}>{highlightText(el.sickNm, userInput)}</Result>
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
