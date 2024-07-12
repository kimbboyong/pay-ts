import { Route, Routes } from "react-router-dom";
import LayOut from "./Layout";
import Login from "./page/Auth/Login";
import Pay from "./page/Pay";
import { Container } from "./style/global";
import PayCreate from "./page/Pay/components/PayCreate";
import SignUp from "./page/Auth/SignUp";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Login />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/pay/create" element={<PayCreate />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
