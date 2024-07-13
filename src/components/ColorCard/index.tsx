import { Container } from "./style";

type CardType = {
  CardValue?: string;
  color?: string;
  size?: string;
};
const ColorCard = ({ CardValue, color, size }: CardType) => {
  return (
    <Container color={color ? color : ""} size={size}>
      <em>{CardValue}</em>
    </Container>
  );
};

export default ColorCard;
