import { Route, Routes } from "react-router-dom";
import LayOut from "./Layout";
import Login from "./page/Auth/Login";
import Pay from "./page/Pay";
import { Container } from "./style/global";
import PayCreate from "./page/Pay/components/PayCreate";
import SignUp from "./page/Auth/SignUp";
import PayUpdate from "./page/Pay/components/PayUpdate";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/signup" element={<SignUp />} />

        <Route element={<LayOut />}>
          <Route path="/pay" element={<Pay />} />
          <Route path="/pay/create" element={<PayCreate />} />
          <Route path="/pay/:id" element={<PayUpdate />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
