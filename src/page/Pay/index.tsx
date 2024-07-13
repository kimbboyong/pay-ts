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
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/fbInstance";

interface PayDataType {
  id: string;
  host: string;
  maxMoney: string;
  minMoney: string;
  member: string[];
  radioState: string;
  userUid: string;
  date: string;
}

const Pay = () => {
  const userData = useUserInfo();
  const navigate = useNavigate();

  const { isOpenModal, clickModal, closeModal }: ModalHookType = useOpenModal();
  const [modalType, setModalType] = useState("");
  const [paymentsData, setPaymentsData] = useState<PayDataType[]>([]);

  const handleListModal = () => {
    setModalType("listModal");
    clickModal();
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "payments"));
        const paymentsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PayDataType[];
        setPaymentsData(paymentsData);
      } catch (e) {
        console.error("데이터 가져오기 실패", e);
      }
    };
    fetchPayments();
  }, []);

  return (
    <>
      <Header title="엔빵계산" />
      {isOpenModal && <Modal closeModal={closeModal} modalType={modalType} />}
      {userData ? (
        <Wrap>
          <PayTitle>
            <span className="active">전체</span>
            <span className="before">정산완료</span>
            <span className="after">정산필요</span>
          </PayTitle>

          <PayUl>
            {paymentsData.map((payment) => (
              <PayList onClick={handleListModal} key={payment.id}>
                <RadioState>
                  <ColorCard CardValue={payment.radioState} color="green" />
                </RadioState>

                <Content>
                  <PayInner>
                    <Name>{payment.host}</Name>
                    <Money>
                      <p className="moneyMax">{payment.maxMoney}원</p>
                      <p className="moneyRemain">{payment.minMoney}원</p>
                    </Money>
                    <Member>
                      {payment.member.map((member, idx) => (
                        <ColorCard key={idx} CardValue={member} color="blue" />
                      ))}
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
