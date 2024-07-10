import { useState } from "react";
import ColorCard from "../../components/ColorCard";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import useOpenModal from "../../hooks/useModalOpen";
import { Wrap } from "../../style/global";
import {
  Content,
  Date,
  Member,
  Money,
  Name,
  PayCreateBtn,
  PayInner,
  PayList,
  PayTitle,
  PayUl,
} from "./style";
import { useNavigate } from "react-router-dom";
import { ModalHookType } from "../../types/ModalHookType";

const Pay = () => {
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");

  const handleListModal = () => {
    setModalType("listModal");
    clickModal();
  };

  return (
    <>
      <Header title="엔빵계산" />
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      <Wrap>
        <PayTitle>
          <span className="active">전체</span>
          <span className="before">정산완료</span>
          <span className="after">정산필요</span>
        </PayTitle>

        <PayUl>
          <PayList onClick={handleListModal}>
            <ColorCard
              CardValue="회비입금완료"
              color="green"
              position="position"
            />

            <Content>
              <PayInner>
                <Name>혀기</Name>
                <Money>
                  <p className="moneyMax">600,000원</p>
                  <p className="moneyRemain">300,000원</p>
                </Money>
                <Member>
                  <ColorCard CardValue="쥬쥬" color="green" />
                  <ColorCard CardValue="혬니" color="blue" />
                  <ColorCard CardValue="피요" color="red" />
                  <ColorCard CardValue="혀기" color="yellow" />
                </Member>
              </PayInner>
              <Date>2024.07.01</Date>
            </Content>
          </PayList>
        </PayUl>

        <PayCreateBtn onClick={() => navigate("/pay/create")} />
      </Wrap>
    </>
  );
};

export default Pay;
