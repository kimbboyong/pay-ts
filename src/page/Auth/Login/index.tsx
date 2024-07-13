import React, { useState } from "react";
import { AuthButton, AuthForm, AuthInput, ErrorMessage, Inner } from "../style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../../firebase/fbInstance";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../../../style/global";
import Header from "../../../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");

  const loginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError("");
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    try {
      await signInWithEmailAndPassword(authService, email, password);
      navigate("/pay");
    } catch (error: any) {
      console.log("Error code:", error.code);
      if (error.code === "auth/user-not-found") {
        setError("존재하지 않는 이메일입니다.");
      } else if (error.code === "auth/wrong-password") {
        setError("비밀번호가 틀렸습니다.");
      } else {
        setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <>
      <Header title="로그인" />
      <AuthForm onSubmit={LoginSubmit}>
        <Inner>
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
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </Inner>
        <AuthButton type="submit">로그인</AuthButton>
        <AuthButton type="button" onClick={() => navigate("/auth/signup")}>
          회원가입
        </AuthButton>
      </AuthForm>
    </>
  );
};

export default Login;
