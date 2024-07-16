import { useEffect, useState } from "react";
import ColorCard from "../../../../components/ColorCard";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../../../hooks/useUserInfo";
import useGetPayments, {
  PayDataType,
} from "../../../../hooks/services/queries/useGetPayments";

type Props = {
  selectedId: string;
};

const PayChoice = ({ selectedId }: Props) => {
  const navigate = useNavigate();

  const userData = useUserInfo();
  const { data } = useGetPayments();

  const [choiceData, setChoiceData] = useState<PayDataType | undefined>(
    undefined
  );

  const handleUpdate = () => {
    navigate(`/pay/${selectedId}`);
  };
  const handleRead = () => {
    navigate(`/pay/read/${selectedId}`);
  };

  useEffect(() => {
    if (data && userData) {
      const filterData = data.find(
        (item) => item.userUid === userData.uid && item.id === selectedId
      );
      setChoiceData(filterData);
    }
  }, [data, userData, selectedId]);
  return (
    <Container>
      <div onClick={handleRead}>
        <ColorCard color="blue" CardValue="보기" size="full" />
      </div>
      {choiceData === undefined ? null : (
        <>
          <div onClick={handleUpdate}>
            <ColorCard color="blue" CardValue="수정" size="full" />
          </div>
          <ColorCard color="red" CardValue="삭제" size="full" />
        </>
      )}
    </Container>
  );
};

export default PayChoice;
