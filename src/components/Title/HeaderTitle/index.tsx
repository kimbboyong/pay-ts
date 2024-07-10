import { Title } from "./style"

type TitleType = { title?: string }

const HeaderTitle = ({ title }: TitleType) => {
  return <Title>{title}</Title>
}

export default HeaderTitle
