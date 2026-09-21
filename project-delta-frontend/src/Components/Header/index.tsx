import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header>
        <nav>
            <NavLink className="nav-links" to='/home'>Map</NavLink>
            <NavLink className="nav-links" to='/home/list'>List</NavLink>
            <NavLink className="nav-links" to='/home/account'>Account</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}
