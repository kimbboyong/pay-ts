import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../components/Header";
import { InputBox, RadioBox, Wrap } from "../../../../style/global";
import {
  Divide,
  FormInner,
  PayBtn,
  PayForm,
  PaySubmit,
  PreviewChoice,
  PreviewList,
} from "../PayCreate/style";

import useGetPayments, {
  PayDataType,
} from "../../../../hooks/services/queries/useGetPayments";

import { useEffect, useState } from "react";

import ColorCard from "../../../../components/ColorCard";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase/fbInstance";
import useOpenModal from "../../../../hooks/useModalOpen";
import { ModalHookType } from "../../../../types/ModalHookType";
import Modal from "../../../../components/Modal";

interface Param {
  id: string;
}

const PayUpdate = () => {
  const navigate = useNavigate();
  const params = useParams<Record<string, string | undefined>>();
  const param: Param = { id: params.id ?? "" };

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");

  const [updateData, setUpdateData] = useState<PayDataType | undefined>(
    undefined
  );
  const { data, error, isLoading } = useGetPayments();

  const [host, setHost] = useState("");
  const [maxMoney, setMaxMoney] = useState("");
  const [minMoney, setMinMoney] = useState("");
  const [memberValue, setMemberValue] = useState("");
  const [member, setMember] = useState<Array<{ value: string; color: string }>>(
    []
  );
  const [radioState, setRadioState] = useState<string>("");
  const [preview, setPreview] = useState(false);

  const payOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    const numberValue = value.replace(/,/g, "");

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

  const preventEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onPreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMemberValue(value);
  };

  const handlePreviewClick = (color: string) => {
    const newMember = { value: memberValue, color };
    setMember([...member, newMember]);
    setMemberValue("");
    setPreview(false);

    if (updateData) {
      const updatedMembers = [...(updateData.member || []), newMember];
      setUpdateData({ ...updateData, member: updatedMembers });
    }
  };

  const handleDelete = (id: number) => {
    const filterData = member.filter((i, idx) => idx !== id);
    setMember(filterData);
  };

  const handleCalc = () => {
    setModalType("calcModal");
    clickModal();
  };

  const paySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (updateData) {
      const docRef = doc(db, "payments", param.id);

      try {
        await updateDoc(docRef, {
          host: host,
          maxMoney: maxMoney,
          minMoney: minMoney,
          member: member,
          radioState: radioState,
        });
        navigate("/pay");
      } catch (error) {
        console.error("오류임 ㅋ", error);
      }
    } else {
      console.error("업데이트 할게없음");
    }
  };

  useEffect(() => {
    if (data && param.id) {
      const filterData = data.find((item) => item.id === param.id);
      setUpdateData(filterData);
      setHost(filterData?.host || "");
      setMaxMoney(filterData?.maxMoney || "");
      setMinMoney(filterData?.minMoney || "");
      setRadioState(filterData?.radioState || "");
    }
  }, [data, param.id]);

  useEffect(() => {
    if (updateData) {
      setMember(updateData.member || []);
    }
  }, [updateData]);

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
      <Header title="엔빵리스트 수정" />
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      <Wrap>
        <PayForm onSubmit={paySubmit}>
          <FormInner>
            <InputBox>
              <label>총무</label>
              <input
                type="text"
                name="host"
                value={host}
                placeholder={host}
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
                onClick={handleCalc}
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
                  <div key={idx} onClick={() => handleDelete(idx)}>
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
                    checked={updateData?.radioState === "완료" ? true : false}
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
                    checked={updateData?.radioState === "진행중" ? true : false}
                  />
                  <label htmlFor="Incomplete">진행중</label>
                </RadioBox>
              </Divide>
            </InputBox>
          </FormInner>
          <PayBtn>
            <PaySubmit type="submit">수정하기</PaySubmit>
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

export default PayUpdate;
