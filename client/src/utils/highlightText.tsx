import styled from "styled-components";

export const highlightText = (text: string, match: string) => {
  const parts = text.split(new RegExp(`(${match})`, "gi"));
  console.log(parts);
  return (
    <>
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
