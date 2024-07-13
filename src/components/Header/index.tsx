import { useNavigate } from "react-router-dom";
import useUserInfo from "../../hooks/useUserInfo";
import HeaderTitle from "../Title/HeaderTitle";
import { Container, HeaderInfo, Inner } from "./style";
import { authService } from "../../firebase/fbInstance";
type TitleType = { title?: string };
const Header = ({ title }: TitleType) => {
  const userData = useUserInfo();

  const navigate = useNavigate();

  const handleLogout = () => {
    authService.signOut();
    navigate("/");
  };
  return (
    <Container>
      <Inner>
        <HeaderTitle title={title} />

        <HeaderInfo>
          <span>{userData ? userData.displayName : ""}</span>
          {userData ? <span onClick={handleLogout}>로그아웃</span> : ""}
        </HeaderInfo>
      </Inner>
    </Container>
  );
};

export default Header;
