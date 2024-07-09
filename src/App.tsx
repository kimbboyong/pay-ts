import { Route, Routes } from "react-router-dom";
import LayOut from "./Layout";
import Login from "./page/Auth/Login";
import Pay from "./page/Pay";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<Login />} />
          <Route path="/pay" element={<Pay />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
