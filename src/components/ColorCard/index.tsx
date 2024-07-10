import { Container } from "./style"

type CardType = {
  CardValue?: string
  color?: string
  position?: string
  size?: string
}
const ColorCard = ({ CardValue, color, position, size }: CardType) => {
  return (
    <Container color={color} position={position} size={size}>
      <em>{CardValue}</em>
    </Container>
  )
}

export default ColorCard
