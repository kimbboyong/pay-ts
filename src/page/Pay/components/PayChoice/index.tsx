import { useState } from "react";
import ColorCard from "../../../../components/ColorCard";
import { Container } from "./style";
import { useNavigate } from "react-router-dom";

type Props = {
  selectedId: string;
};

const PayChoice = ({ selectedId }: Props) => {
  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/pay/${selectedId}`);
  };

  return (
    <Container>
      <div onClick={handleUpdate}>
        <ColorCard color="blue" CardValue="수정" size="full" />
      </div>
      <ColorCard color="blue" CardValue="보기" size="full" />
      <ColorCard color="red" CardValue="삭제" size="full" />
    </Container>
  );
};

export default PayChoice;
