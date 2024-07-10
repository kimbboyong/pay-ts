import { useState } from "react";
import Header from "../../../../components/Header";
import useOpenModal from "../../../../hooks/useModalOpen";
import { InputBox, Wrap } from "../../../../style/global";
import { ModalHookType } from "../../../../types/ModalHookType";
import { PayForm } from "./style";
import Modal from "../../../../components/Modal";

const PayCreate = () => {
  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");

  const handleCalcModal = () => {
    setModalType("calcModal");
    clickModal();
  };
  return (
    <>
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      <Header title="엔빵리스트 추가" />
      <Wrap>
        <PayForm>
          <InputBox>
            <label>총무</label>
            <input type="text" />
          </InputBox>
          <InputBox>
            <label>총금액</label>
            <input type="number" />
          </InputBox>
          <InputBox onClick={handleCalcModal}>
            <label>남은금액</label>
            <input type="number" />
          </InputBox>
          <InputBox>
            <label>멤버</label>
            <input type="text" />
          </InputBox>
          <InputBox>
            <label>상태</label>
          </InputBox>
          <InputBox>
            <select name="" id="">
              <option value="">asd</option>
              <option value="">asd</option>
              <option value="">asd</option>
            </select>
          </InputBox>
        </PayForm>
      </Wrap>
    </>
  );
};

export default PayCreate;
