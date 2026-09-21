import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header>
        <nav>
            <NavLink className="nav-links" to='/'>Home</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}
