import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import useOpenModal from "../../../../hooks/useModalOpen";
import { InputBox, RadioBox, Wrap } from "../../../../style/global";
import { ModalHookType } from "../../../../types/ModalHookType";
import {
  Divide,
  FormInner,
  PayBtn,
  PayForm,
  PaySubmit,
  PreviewChoice,
  PreviewList,
} from "./style";
import Modal from "../../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase/fbInstance";
import useUserInfo from "../../../../hooks/useUserInfo";
import ColorCard from "../../../../components/ColorCard";

interface PayDataType {
  host: string;
  maxMoney: string;
  minMoney: string;
  member: Array<{ value: string; color: string }>;
  radioState: string;
}

const PayCreate = () => {
  const navigate = useNavigate();
  const userData = useUserInfo();
  const userUid = userData?.uid;

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");

  const [host, setHost] = useState("");
  const [maxMoney, setMaxMoney] = useState("");
  const [minMoney, setMinMoney] = useState("");

  const [memberValue, setMemberValue] = useState("");
  const [member, setMember] = useState<Array<{ value: string; color: string }>>(
    []
  );

  const [radioState, setRadioState] = useState<string>("");
  const [preview, setPreview] = useState(false);

  const date = new Date();
  const year = date.getFullYear() + "년";
  const month = String(date.getMonth() + 1).padStart(2, "0") + "월";
  const day = String(date.getDate()).padStart(2, "0") + "일";

  const formattedDate = `${year} ${month} ${day}`;

  const payOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const numberValue = value.replace(/,/g, "");
    const checkedValue = checked;
    if (name === "host") {
      setHost(value);
    } else if (name === "maxMoney") {
      const commaValue = numberValue
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      setMaxMoney(commaValue);
    } else if (name === "minMoney") {
      const commaValue = numberValue
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

      setMinMoney(commaValue);
    } else if (name === "radioState") {
      setRadioState(value);
    }
  };

  const payOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.nativeEvent.isComposing === false) {
      e.preventDefault();
    }
  };

  const paySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      host === "" ||
      maxMoney === "" ||
      minMoney === "" ||
      radioState === ""
    ) {
      alert("공백ㅈㅅ");
      return;
    }
    const payData: PayDataType = {
      host: host,
      maxMoney: maxMoney,
      minMoney: minMoney,
      member: member,
      radioState: radioState,
    };
    if (userUid) {
      try {
        const docRef = await addDoc(collection(db, "payments"), {
          ...payData,
          userUid: userUid,
          date: formattedDate,
        });
        alert("저장 댐");
        navigate("/pay");
      } catch (e) {
        console.error("에러임 ㅋ", e);
        alert("저장 실패");
      }
    } else {
      alert("로그인 하셈");
    }
  };

  const onPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMemberValue(value);
  };

  const handlePreviewClick = (color: string) => {
    setMember([...member, { value: memberValue, color }]);
    setMemberValue("");
    setPreview(false);
  };

  // const handleCalcModal = () => {
  //   setModalType("calcModal");
  //   clickModal();
  // };

  const preventEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleDeleteClick = () => {};

  useEffect(() => {
    if (memberValue) {
      const timer = setTimeout(() => setPreview(true), 500);
      return () => clearTimeout(timer);
    } else {
      setPreview(false);
    }
  }, [memberValue]);

  return (
    <>
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      <Header title="엔빵리스트 추가" />
      <Wrap>
        <PayForm onSubmit={paySubmit}>
          <FormInner>
            <InputBox>
              <label>총무</label>
              <input
                type="text"
                name="host"
                value={host}
                onChange={payOnChange}
                onKeyDown={preventEnterKey}
              />
            </InputBox>
            <InputBox>
              <label>총금액</label>
              <input
                type="text"
                name="maxMoney"
                value={maxMoney}
                onChange={payOnChange}
                onKeyDown={preventEnterKey}
              />
            </InputBox>
            <InputBox>
              <label>남은금액</label>
              <input
                type="text"
                name="minMoney"
                value={minMoney}
                onChange={payOnChange}
                onKeyDown={preventEnterKey}
              />
            </InputBox>

            <InputBox>
              <label>멤버</label>
              <input
                type="text"
                name="member"
                onChange={onPreview}
                value={memberValue}
                onKeyDown={payOnKeyDown}
              />
              {preview && (
                <PreviewChoice>
                  <div onClick={() => handlePreviewClick("blue")}>
                    <ColorCard color="blue" CardValue={memberValue} />
                  </div>
                  <div onClick={() => handlePreviewClick("red")}>
                    <ColorCard color="red" CardValue={memberValue} />
                  </div>
                  <div onClick={() => handlePreviewClick("yellow")}>
                    <ColorCard color="yellow" CardValue={memberValue} />
                  </div>
                  <div onClick={() => handlePreviewClick("green")}>
                    <ColorCard color="green" CardValue={memberValue} />
                  </div>
                </PreviewChoice>
              )}

              <PreviewList>
                {member.map((member, idx) => (
                  <div key={idx} onClick={() => handleDeleteClick()}>
                    <ColorCard CardValue={member.value} color={member.color} />
                  </div>
                ))}
              </PreviewList>
            </InputBox>
            <InputBox>
              <label>상태</label>
              <Divide>
                <RadioBox>
                  <input
                    type="radio"
                    id="complete"
                    name="radioState"
                    onChange={payOnChange}
                    value="완료"
                  />
                  <label htmlFor="complete">완료</label>
                </RadioBox>
                <RadioBox>
                  <input
                    type="radio"
                    id="Incomplete"
                    name="radioState"
                    onChange={payOnChange}
                    value="진행중"
                  />
                  <label htmlFor="Incomplete">진행중</label>
                </RadioBox>
              </Divide>
            </InputBox>
          </FormInner>
          <PayBtn>
            <PaySubmit type="submit">추가하기</PaySubmit>
            <PaySubmit
              type="button"
              className="backBtn"
              onClick={() => navigate(-1)}
            >
              뒤로가기
            </PaySubmit>
          </PayBtn>
        </PayForm>
      </Wrap>
    </>
  );
};

export default PayCreate;
