import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const LayOut = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default LayOut;
