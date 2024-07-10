import PayCalc from "../../page/Pay/components/PayCalc";
import PayChoice from "../../page/Pay/components/PayChoice";
import PayCreate from "../../page/Pay/components/PayCreate";
import {
  ModalBackground,
  ModalCloseBtn,
  ModalContainer,
  ModalWrap,
} from "./style";

type Props = {
  closeModal?: () => void;
  modalType?: string;
};
const Modal = ({ closeModal, modalType }: Props) => {
  return (
    <ModalWrap>
      <ModalBackground onClick={closeModal} />
      <ModalContainer>
        {modalType === "listModal" && <PayChoice />}
        {modalType === "calcModal" && <PayCalc />}

        <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
      </ModalContainer>
    </ModalWrap>
  );
};

export default Modal;
