import { ChangeEvent, useEffect, useState } from "react";
import { Wrap, Title } from "./styled";
import { SickList } from "../../types/types";
import Search from "../../components/Search";
import { getSickByName } from "../../api/getSicks";

export default function MainPage() {
  const [sickList, setSickList] = useState<SickList[] | []>([]);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (userInput.length >= 1) {
      const timer = setTimeout(async () => {
        const data = await getSickByName(userInput);
        if (!data?.length) {
          setSickList([]);
        } else {
          setSickList(data);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [userInput]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <Wrap>
      <Title>국내 임상시험 검색창</Title>
      <Search userInput={userInput} sickList={sickList} handleInputChange={handleInputChange} />
    </Wrap>
  );
}
