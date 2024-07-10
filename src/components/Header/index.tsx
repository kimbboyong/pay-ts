import HeaderTitle from "../Title/HeaderTitle";
import { Container, Inner } from "./style";
type TitleType = { title?: string };
const Header = ({ title }: TitleType) => {
  return (
    <Container>
      <Inner>
        <HeaderTitle title={title} />
      </Inner>
    </Container>
  );
};

export default Header;
