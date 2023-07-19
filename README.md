# 프리온보딩 인턴십 4주차 검색 캐싱 과제

## 목차

- #### [프로젝트 요구사항 및 정보](#프로젝트-요구사항-및-정보)

- #### [실행방법](#실행방법)

- #### [프로젝트 폴더구조](#프로젝트-폴더구조)

- #### [주요 기능 목록](#주요-기능-목록)

---

### 프로젝트 요구사항 및 정보

#### 목표: 검색창 + 검색어 추천 기능 + API호출 데이터에 대한 로컬 캐싱 기능

#### 참고 API : https://github.com/walking-sunset/assignment-api

#### 구현 목표 참고 사이트 : https://clinicaltrialskorea.com/

#### 구현 필수 요구사항 체크리스트

- [x] 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- [x] 검색어가 없을 시 “검색어 없음” 표출

- [x] API 호출별로 로컬 캐싱 구현 (캐싱 기능을 제공하는 라이브러리 사용 금지)

- [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- [x] API를 호출할 때 마다 `console.info("calling api")` 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- [x] 키보드만으로 추천 검색어들로 이동 가능하도록 구현

#### +addition

- [x] API 데이터 Fetch에 따른 `loading`, `error` 적용
- [x] 검색어와 일치하는 문자열이 있을 경우, 검색결과의 문자열에 하이라이트 적용

#### 사용기술

- typescript

- styled-components

- react-router-dom

- axios

---

#### 실행방법

##### 서버

```shell
$ git clone https://github.com/RumbleBi/clinic-altrials-korea-website.git
$ cd server
$ npm install
$ npm start
```

##### 클라이언트

```shell
$ cd client
$ npm install
$ npm start
```

---

### 프로젝트 폴더구조

```
.
├── App.tsx
├── api
│   ├── config.ts
│   └── getSicks.ts
├── components
│   └── Search
│       ├── index.tsx
│       └── styled.ts
├── hooks
│   ├── useDebounce.ts
│   ├── useKeyboardSelect.ts
│   ├── useSearchSick.ts
│   └── useUserInput.ts
├── index.tsx
├── pages
│   └── Main
│       ├── index.tsx
│       └── styled.ts
├── styles
│   └── globalStyles.ts
├── types
│   └── types.ts
└── utils
    └── highlightText.tsx
```

---

### 주요 기능 목록

#### 질환별 검색시 API 호출을 통해 검색어 추천 및 검색어 없음 표출

![검색어](https://github.com/RumbleBi/clinic-altrials-korea-website/assets/85114315/23c7c8e8-ce66-4f4f-9df9-5cf28737cf48)

#### API 호출별로 로컬 캐싱 구현

![로컬캐시](https://github.com/RumbleBi/clinic-altrials-korea-website/assets/85114315/e1cbe549-8795-4412-8874-2ba8057a0966)

- Map을 사용하여 API 호출별 URL을 key, API 호출 URL의 응답값을 value로 지정하여 여러개의 검색 결과 데이터를 캐싱할 수 있도록 만들었습니다.

-

```ts
// api/config.ts

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { CacheEntry, SickList } from "../types/types";

// Map을 사용하여 API 호출별 URL을 key, API 호출 URL의 응답값을 value로 지정하여 여러개의 검색 결과 데이터를 캐싱할 수 있도록 함.
const cache = new Map<string, CacheEntry>();

// 캐시만료시간 5분 설정
const expireTime = 5 * 60 * 1000;

const getFromCache = (url: string): SickList[] | null => {
  const cacheEntry = cache.get(url);

  if (!cacheEntry) {
    return null;
  }

  // 캐시된 expireAt의 숫자보다 Date.now() 의 값이 크다는 것은 5분을 초과했다는 의미이므로 삭제해준다.
  if (Date.now() > cacheEntry.expireAt) {
    cache.delete(url);
    return null;
  }

  return cacheEntry.data;
};

// 최초 캐시에 저장될 expireAt 을 설정 & API응답 데이터 저장
const saveToCache = (url: string, data: SickList[]): void => {
  cache.set(url, {
    data,
    expireAt: Date.now() + expireTime,
  });
};

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  get: async (url: string, queryString?: AxiosRequestConfig): Promise<SickList[]> => {
    // 쿼리스트링 즉, api 호출시 검색어가 있다면 url에 쿼리스트링을 붙이고, 아니라면 그냥 보낸다.
    const fullUrl = queryString
      ? `${url}?${new URLSearchParams(queryString.params).toString()}`
      : url;

    // 쿼리스트링이 있다면 url + 쿼리스트링 으로 저장된 캐시의 key 값을 가져온다.
    const cacheData = getFromCache(fullUrl);

    // 캐시된 데이터가 있다면 그대로 반환.(API호출 X)
    if (cacheData) {
      return cacheData;
    }

    // 캐시된 데이터가 없다면 API 호출이 일어남.
    console.info("API calling");
    const res: AxiosResponse = await instance.get(url, queryString);

    // 결과 값을 캐시로 저장.
    saveToCache(fullUrl, res.data);

    return res.data;
  },
};
```

#### 입력마다 API를 호출하지 않도록 호출 회수를 줄이는 디바운스 방식 적용

```ts
// hooks/useDebounce.ts

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
```

```ts
// pages/Main/index.tsx

import Search from "../../components/Search";

import { useDebounce } from "../../hooks/useDebounce";
import { useSearchSick } from "../../hooks/useSearchSick";
import { useUserInput } from "../../hooks/useUserInput";

import { Wrap, Title } from "./styled";

export default function MainPage() {
  const { userInput, handleInputChange } = useUserInput();

  // 파라미터로 유저 입력값, delay 시킬 시간 설정을 받음.
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
```

#### 키보드만으로 추천 검색어들로 이동이 가능

![키보드이동](https://github.com/RumbleBi/clinic-altrials-korea-website/assets/85114315/3075b04b-6f2c-4d66-b318-d5eecc010837)

```ts
// hooks/useKeyboardSelect.ts

import { useCallback, useEffect, useRef, useState } from "react";

export const useKeyboardSelect = (itemLength: number) => {
  const [focusIdx, setFocusIdx] = useState(0);

  // 최초 키보드 입력시 idx의 증가가 2번 일어나기 때문에 막아주기 위해 설정
  const [isFirstPress, setIsFirstPress] = useState(true);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  // focus된 element를(검색 결과 리스트) scrollIntoView를 사용해서 view를 이동시킴.
  useEffect(() => {
    const currentFocusElement = itemRefs.current[focusIdx];
    if (currentFocusElement) {
      currentFocusElement.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }
  }, [focusIdx]);

  // Math.max, Math.min 을 사용하여 검색 결과 리스트들의 최소값과 최대값 idx를 지정.
  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setFocusIdx((prevFocusIdx) => Math.max(0, prevFocusIdx - 1));
          break;
        case "ArrowDown":
          if (isFirstPress) {
            setIsFirstPress(false);
          } else {
            setFocusIdx((prevFocusIdx) => Math.min(itemLength - 1, prevFocusIdx + 1));
          }
          break;
        default:
          break;
      }
    },

    [itemLength, isFirstPress]
  );
  // setItemRef 함수는 useRef를 사용하여 생성된 itemRefs 참조 객체의 current 프로퍼티에 특정(focus된) HTML 요소를 할당.
  const setItemRef = useCallback((element: HTMLElement | null, idx: number) => {
    itemRefs.current[idx] = element;
  }, []);

  return { focusIdx, setFocusIdx, handleKeyPress, setItemRef };
};
```

#### 검색어와 일치하는 문자열이 있을 경우, 검색결과의 문자열에 하이라이트 적용

![하이라이트](https://github.com/RumbleBi/clinic-altrials-korea-website/assets/85114315/8c0d4220-c3fe-4773-a2e4-c32ca2d07eeb)

```tsx
// utils/highlightText.tsx

import styled from "styled-components";

export const highlightText = (text: string, match: string) => {
  // text는 검색 결과 데이터를 의미하며 match는 사용자 입력을 나타낸다.
  // split과 정규식을 사용하여 text안의 match와 일치하는 문자열을 분리하여 배열을 생성한다.
  const parts = text.split(new RegExp(`(${match})`, "gi"));

  return (
    <>
      {/* parts의 배열들을 순회하면서 match와 일치하는 문자열이 있다면 HighlightedText 스타일을 적용한다. */}
      {parts.map((part, partIdx) =>
        part.toLowerCase() === match.toLowerCase() ? (
          <HighlightedText key={partIdx}>{part}</HighlightedText>
        ) : (
          <span key={partIdx}>{part}</span>
        )
      )}
    </>
  );
};

const HighlightedText = styled.span`
  font-weight: bold;
  color: skyblue;
`;
```

```tsx
// components/Search/index.tsx

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
    <SearchWrap onKeyDown={handleKeyPress}>
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
              {sickList.map((el, idx) => (
                <Result
                  $idx={idx}
                  $focusIdx={focusIdx}
                  key={el.sickCd}
                  ref={(element) => setItemRef(element, idx)}
                >
                  {/* 검색결과 리스트의 개별 요소와 사용자 입력이 파라미터로 들어간다. */}
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
```
