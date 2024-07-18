import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authService } from "../../../firebase/fbInstance";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { ErrorMessage } from "../style";

const SignUp = () => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "userName") setUserName(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

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

      navigate("/pay");
    } catch (error: any) {
      console.log(error);
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <Box component="form" onSubmit={onSignUp} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="닉네임"
            name="userName"
            autoComplete="name"
            autoFocus
            onChange={signUpChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일"
            name="email"
            autoComplete="email"
            onChange={signUpChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={signUpChange}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mb: 2, bgcolor: "text.secondary" }}
            onClick={() => navigate(-1)}
          >
            뒤로가기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
