import { Route, Routes } from "react-router-dom";
import LayOut from "./Layout";
import Login from "./page/Auth/Login";
import Pay from "./page/Pay";
import PayCreate from "./page/Pay/components/PayCreate";
import SignUp from "./page/Auth/SignUp";
import PayUpdate from "./page/Pay/components/PayUpdate";
import PayRead from "./page/Pay/components/PayRead";
import { ThemeProvider, createTheme } from "@mui/material";
import { Container } from "./style/global";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2196f3",
      contrastText: "#fff",
    },
    error: {
      main: "#ef5350",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />

          <Route element={<LayOut />}>
            <Route path="/pay" element={<Pay />} />
            <Route path="/pay/create" element={<PayCreate />} />
            <Route path="/pay/:id" element={<PayUpdate />} />
            <Route path="/pay/read/:id" element={<PayRead />} />
          </Route>
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

export default App;
