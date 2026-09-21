import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header>
        <nav>
            <NavLink className="nav-links" to='/map'>Map</NavLink>
            <NavLink className="nav-links" to='/list'>List</NavLink>
            <NavLink className="nav-links" to='/account'>Account</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}
