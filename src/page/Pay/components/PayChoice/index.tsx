import ColorCard from "../../../../components/ColorCard";
import { Container } from "./style";

const PayChoice = () => {
  return (
    <Container>
      <ColorCard color="blue" CardValue="수정" size="full" />
      <ColorCard color="blue" CardValue="보기" size="full" />
      <ColorCard color="red" CardValue="삭제" size="full" />
    </Container>
  );
};

export default PayChoice;
