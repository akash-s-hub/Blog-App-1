import { Outlet } from "react-router-dom"
import Header from "./Header"

const Layout = ({ children }) => {
  return (
    <div className="h-screen w-full">
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
