import { ChangeEvent } from "react";
import { SickList } from "../../types/types";
import {
  Input,
  SearchWrap,
  ResultWrap,
  Result,
  NoResult,
  SubTitle,
  HighlightedText,
} from "./styled";

type SearchProps = {
  userInput: string;
  sickList: SickList[];
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ userInput, sickList, handleInputChange }: SearchProps) => {
  const highlightText = (text: string, match: string) => {
    const parts = text.split(new RegExp(`(${match})`, "gi"));
    return (
      <>
        {parts.map((part, idx) =>
          part.toLowerCase() === match.toLowerCase() ? (
            <HighlightedText key={idx}>{part}</HighlightedText>
          ) : (
            <span key={idx}>{part}</span>
          )
        )}
      </>
    );
  };

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
