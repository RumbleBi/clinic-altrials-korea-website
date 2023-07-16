import { styled } from "styled-components";

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
`;
const Result = styled.div`
  margin-bottom: 20px;
  cursor: pointer;
`;
const NoResult = styled.div``;

const SubTitle = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
`;

const HighlightedText = styled.span`
  font-weight: bold;
  color: skyblue;
`;

export { Input, SearchWrap, ResultWrap, Result, NoResult, SubTitle, HighlightedText };
