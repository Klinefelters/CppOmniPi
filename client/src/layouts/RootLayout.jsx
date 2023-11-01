import { Outlet } from "react-router-dom"

// components
import Topbar from "../components/Topbar"

export default function RootLayout() {
  return (
    <>
      <Topbar />
      <Outlet />
    </>
  )
}