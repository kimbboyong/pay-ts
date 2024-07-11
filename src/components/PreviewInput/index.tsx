import React from "react";
import { InputBox } from "../../style/global";
import { PreviewElement } from "../../page/Pay/components/PayCalc/style";
import ColorCard from "../ColorCard";
import usePreviewSelect from "../../hooks/usePreviewSelect";

type MemberItem = {
  value: string;
  color: string;
};

type MemberInputProps = {
  memberArr: MemberItem[];
  setMemberArr: React.Dispatch<React.SetStateAction<MemberItem[]>>;
  label: string;
  preventEnterKey: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const PreviewInput: React.FC<MemberInputProps> = ({
  memberArr,
  setMemberArr,
  label,
  preventEnterKey,
}) => {
  const {
    inputValue: memberValue,
    previewList,
    showPreview,
    isComposing,
    handleInputChange: memberChange,
    handleComposition,
    handlePreviewSelection: handlePreviewClick,
  } = usePreviewSelect();

  const memberKeyUP = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isComposing) {
      const value = e.currentTarget.value;
      if (value.trim() === "") {
        alert("빈값 ㅈㅅ");
        return;
      } else {
        setMemberArr([...memberArr, { value: value, color: "blue" }]);
        e.currentTarget.value = "";
      }
    }
  };

  return (
    <>
      <InputBox>
        <label>{label}</label>
        <input
          type="text"
          value={memberValue}
          onChange={(e) => memberChange(e.target.value)}
          onKeyUp={memberKeyUP}
          onKeyDown={preventEnterKey}
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
        />
        {showPreview && (
          <PreviewElement>
            {previewList.map((item, idx) => (
              <div
                key={idx}
                onClick={() =>
                  handlePreviewClick(item, (selectedItem) =>
                    setMemberArr([...memberArr, selectedItem])
                  )
                }
              >
                <ColorCard
                  size="free"
                  CardValue={item.value}
                  color={item.color}
                />
              </div>
            ))}
          </PreviewElement>
        )}
      </InputBox>
    </>
  );
};

export default PreviewInput;
