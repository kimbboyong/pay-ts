import { useEffect, useState } from "react";
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
  RadioState,
} from "./style";
import { useNavigate } from "react-router-dom";
import { ModalHookType } from "../../types/ModalHookType";
import useUserInfo from "../../hooks/useUserInfo";
import useGetPayments from "../../hooks/services/queries/useGetPayments";

const Pay = () => {
  const userData = useUserInfo();
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetPayments();

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");
  const [selectedId, setSelectedId] = useState<string>("");

  const handleListModal = (id: string) => {
    setModalType("listModal");
    setSelectedId(id);
    clickModal();
  };

  return (
    <>
      <Header title="엔빵계산" />
      {isOpenModal && (
        <Modal
          closeModal={closeModal}
          modalType={modalType}
          selectedId={selectedId}
        />
      )}
      {userData ? (
        <Wrap>
          <PayTitle>
            <span className="active">전체</span>
            <span className="before">정산완료</span>
            <span className="after">정산필요</span>
          </PayTitle>

          <PayUl>
            {data &&
              data.map((payment) => (
                <PayList
                  onClick={() => handleListModal(payment.id)}
                  key={payment.id}
                >
                  <RadioState>
                    <ColorCard
                      CardValue={payment.radioState}
                      color={payment.radioState}
                    />
                  </RadioState>

                  <Content>
                    <PayInner>
                      <Name>{payment.host}</Name>
                      <Money>
                        <p className="moneyMax">{payment.maxMoney}원</p>
                        <p className="moneyRemain">{payment.minMoney}원</p>
                      </Money>
                      <Member>
                        {payment.member.slice(0, 4).map((member, idx) => (
                          <ColorCard
                            key={idx}
                            CardValue={member.value}
                            color={member.color}
                          />
                        ))}
                        {payment.member.length > 4 && <span>...</span>}
                      </Member>
                    </PayInner>
                    <Date>{payment.date}</Date>
                  </Content>
                </PayList>
              ))}
          </PayUl>

          <PayCreateBtn onClick={() => navigate("/pay/create")} />
        </Wrap>
      ) : (
        <strong onClick={() => navigate("/")}>로그인하셈</strong>
      )}
    </>
  );
};

export default Pay;
