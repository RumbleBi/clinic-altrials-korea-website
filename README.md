## 프리온보딩 인턴십 4주차 검색 캐싱 과제

### 목표 : 검색창 구현 + 검색어 추천 기능 구현 + 캐싱 기능 구현

### 참고 API : https://github.com/walking-sunset/assignment-api

### 구현 목표 참고 사이트 : https://clinicaltrialskorea.com/

### 사용기술

- typescript

- styled-components

- react-router-dom

- axios

---

### 구현 필수 요구사항 체크리스트

- [x] 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현

- [x] 검색어가 없을 시 “검색어 없음” 표출

- [x] API 호출별로 로컬 캐싱 구현 (캐싱 기능을 제공하는 라이브러리 사용 금지)

- [x] 입력마다 API 호출하지 않도록 API 호출 횟수를 줄이는 전략 수립 및 실행

- [x] API를 호출할 때 마다 console.info("calling api") 출력을 통해 콘솔창에서 API 호출 횟수 확인이 가능하도록 설정

- [x] 키보드만으로 추천 검색어들로 이동 가능하도록 구현

+plus loading, error, 검색어와 일치하는 문자열이 있을 경우, 검색결과의 문자열에 하이라이트 적용
