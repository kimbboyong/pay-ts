import { useState } from "react";
import { InputBox } from "../../../../style/global";
import { AddBtn, CalcForm, InputScroll, RemoveBtn } from "./style";

const PayCalc = () => {
  const addData = [
    {
      id: Date.now(),
      addBtn: true,
      removeBtn: false,
    },
  ];

  const [inputBoxes, setInputBoxes] = useState(addData);

  const handleAddClick = () => {
    setInputBoxes([
      ...inputBoxes,
      { id: Date.now(), addBtn: true, removeBtn: true },
    ]);
  };

  const handleRemoveClick = (id: number) => {
    setInputBoxes(inputBoxes.filter((box) => box.id !== id));
  };

  const CalcSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <CalcForm onSubmit={CalcSubmit}>
        <InputBox>
          <label htmlFor="">남은금액</label>
          <input type="text" placeholder="100,000" />
        </InputBox>
        <InputScroll>
          {inputBoxes.map((box) => (
            <InputBox key={box.id}>
              <label className="calcLabel">추가로 사용한 금액</label>
              <input type="text" placeholder="점심값" />
              <input type="number" placeholder="48000" />
              {box.removeBtn && (
                <RemoveBtn
                  type="button"
                  onClick={() => handleRemoveClick(box.id)}
                />
              )}
            </InputBox>
          ))}
        </InputScroll>
        <AddBtn type="button" onClick={handleAddClick}>
          추가
        </AddBtn>
      </CalcForm>
    </>
  );
};

export default PayCalc;
