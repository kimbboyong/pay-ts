import { useState } from "react";
import { AuthButton, AuthForm, AuthInput } from "../style";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "../../../firebase/fbInstance";
import { useNavigate } from "react-router-dom";

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
    <AuthForm onSubmit={onSubmit}>
      <AuthInput
        type="text"
        name="userName"
        value={userName}
        onChange={loginChange}
      />
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
      <AuthButton type="submit">회원가입</AuthButton>
    </AuthForm>
  );
};

export default SignUp;
