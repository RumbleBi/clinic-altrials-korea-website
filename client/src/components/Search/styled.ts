import { styled } from "styled-components";

interface FocusStyleProps {
  $focusIdx: number;
  $idx: number;
}
const SearchWrap = styled.div`
  position: relative;
  margin-top: 50px;
  width: inherit;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  height: 70px;
  border-radius: 40px;
  padding: 0px 20px;
  font-size: 20px;
  border: 1px solid black;
  ::placeholder {
    color: grey;
  }
  &:focus {
    outline: none;
    border: 3px solid blue;
  }
`;

const ResultWrap = styled.div`
  margin-top: 20px;
  width: inherit;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 40px;
  padding: 20px;
  max-height: 400px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
`;

const Result = styled.div<FocusStyleProps>`
  margin-bottom: 20px;
  cursor: pointer;
  text-decoration: ${({ $focusIdx, $idx }) => ($focusIdx === $idx ? "underline" : "none")};
`;
const NoResult = styled.div``;

const SubTitle = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;
const ErrorMessage = styled.div`
  font-size: 20px;
  margin-top: 50px;
`;
const LoadingMessage = styled.div`
  font-weight: bold;
  margin: 0px 20px;
  color: blue;
`;
export { Input, SearchWrap, ResultWrap, Result, NoResult, SubTitle, ErrorMessage, LoadingMessage };
