import { NavLink } from "react-router-dom"

const Header = () => {
  const linkClasses = ({ isActive }) =>
    `text-sm font-medium px-3 py-1.5 rounded-lg transition ${isActive
      ? "bg-blue-50 text-blue-600"
      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`

  return (
    <header className="h-16 w-full fixed top-0 left-0 z-50 flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 sm:px-10">
      <div className="text-lg font-bold text-slate-900 tracking-tight">
        Blog App
      </div>

      <nav className="flex items-center gap-2">
        <NavLink to="/blogs" className={linkClasses}>
          Feed
        </NavLink>
        <NavLink to="/create-blog" className={linkClasses}>
          Create
        </NavLink>
      </nav>
    </header>
  )
}

export default Header