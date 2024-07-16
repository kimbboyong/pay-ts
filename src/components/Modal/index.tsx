import PayCalc from "../../page/Pay/components/PayCalc";
import PayChoice from "../../page/Pay/components/PayChoice";
import {
  ModalBackground,
  ModalCloseBtn,
  ModalContainer,
  ModalWrap,
} from "./style";

type Props = {
  closeModal?: () => void;
  modalType?: string;
  selectedId?: string;
};
const Modal = ({ closeModal, modalType, selectedId }: Props) => {
  return (
    <ModalWrap>
      <ModalBackground onClick={closeModal} />
      <ModalContainer>
        {modalType === "listModal" && selectedId && (
          <PayChoice selectedId={selectedId} />
        )}
        {modalType === "calcModal" && <PayCalc closeModal={closeModal} />}

        <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
      </ModalContainer>
    </ModalWrap>
  );
};

export default Modal;
