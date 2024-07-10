import DockBar from "../components/DockBar"
import { Outlet } from "react-router-dom"

const LayOut = () => {
  return (
    <>
      <Outlet />
      <DockBar />
    </>
  )
}

export default LayOut
