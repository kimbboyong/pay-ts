import { useEffect, useState } from "react";
import Header from "../../../../components/Header";
import useOpenModal from "../../../../hooks/useModalOpen";
import { InputBox, Wrap } from "../../../../style/global";
import { ModalHookType } from "../../../../types/ModalHookType";
import { FormInner, PayForm, PaySubmit } from "./style";
import Modal from "../../../../components/Modal";
import { MemberList } from "../PayCalc/style";
import ColorCard from "../../../../components/ColorCard";
import PreviewInput from "../../../../components/PreviewInput";
import { useNavigate } from "react-router-dom";

type MemberItem = {
  value: string;
  color: string;
};

const PayCreate = () => {
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");

  const [memberArr, setMemberArr] = useState<MemberItem[]>([]);

  const paySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleCalcModal = () => {
    setModalType("calcModal");
    clickModal();
  };

  const preventEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <>
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      <Header title="엔빵리스트 추가" />
      <Wrap>
        <PayForm onSubmit={paySubmit}>
          <FormInner>
            <InputBox>
              <label>총무</label>
              <input type="text" onKeyDown={preventEnterKey} />
            </InputBox>
            <InputBox>
              <label>총금액</label>
              <input type="number" onKeyDown={preventEnterKey} />
            </InputBox>
            <InputBox onClick={handleCalcModal}>
              <label>남은금액</label>
              <input type="number" onKeyDown={preventEnterKey} />
            </InputBox>

            <PreviewInput
              memberArr={memberArr}
              setMemberArr={setMemberArr}
              label="멤버"
              preventEnterKey={preventEnterKey}
            />

            <MemberList>
              {Array.isArray(memberArr) &&
                memberArr.map((item, idx) => (
                  <ColorCard
                    key={idx}
                    size="free"
                    CardValue={item.value}
                    color={item.color}
                  />
                ))}
            </MemberList>
          </FormInner>
          <PaySubmit>추가하기</PaySubmit>
        </PayForm>
      </Wrap>
    </>
  );
};

export default PayCreate;
