import React, { useState } from "react";
import { AuthButton, AuthForm, AuthInput } from "../style";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../../../firebase/fbInstance";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const LoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await signInWithEmailAndPassword(
        authService,
        email,
        password
      );

      navigate("/pay");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthForm onSubmit={LoginSubmit}>
      <AuthInput
        type="email"
        name="email"
        value={email}
        onChange={loginChange}
      />
      <AuthInput
        type="password"
        name="password"
        value={password}
        onChange={loginChange}
      />
      <AuthButton type="submit">로그인</AuthButton>
    </AuthForm>
  );
};

export default Login;
