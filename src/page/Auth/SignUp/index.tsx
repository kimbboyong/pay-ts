import { useState } from "react";
import { AuthButton, AuthForm, AuthInput, Inner } from "../style";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "../../../firebase/fbInstance";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import { InputBox } from "../../../style/global";

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "userName") setUserName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await createUserWithEmailAndPassword(
        authService,
        email,
        password
      );
      const user = data.user;
      await updateProfile(user, {
        displayName: userName,
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header title="회원가입" />
      <AuthForm onSubmit={onSubmit}>
        <Inner>
          <InputBox>
            <AuthInput
              type="text"
              name="userName"
              value={userName}
              onChange={loginChange}
              placeholder="닉네임"
            />
          </InputBox>
          <InputBox>
            <AuthInput
              type="email"
              name="email"
              value={email}
              onChange={loginChange}
              placeholder="이메일"
            />
          </InputBox>
          <InputBox>
            <AuthInput
              type="password"
              name="password"
              value={password}
              onChange={loginChange}
              placeholder="비밀번호"
            />
          </InputBox>
        </Inner>
        <AuthButton type="submit">회원가입</AuthButton>
        <AuthButton
          type="submit"
          className="backBtn"
          onClick={() => navigate(-1)}
        >
          뒤로가기
        </AuthButton>
      </AuthForm>
    </>
  );
};

export default SignUp;
