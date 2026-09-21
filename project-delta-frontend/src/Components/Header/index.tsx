import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header>
        <nav>
            <NavLink className="nav-links" to='/'>Home</NavLink>
            <NavLink className="nav-links" to='/map'>Map</NavLink>
            <NavLink className="nav-links" to='/account'>Account</NavLink>
            <NavLink className="nav-links" to='/list'>List</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}
