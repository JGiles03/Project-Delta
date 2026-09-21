import { NavLink, Outlet } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <header>
        <nav>
            <NavLink className="navlink" to='/list'>List</NavLink>
            <NavLink className="navlink" to='/map'>Map</NavLink>
            <NavLink className="navlink" to='/account'>Account</NavLink>
        </nav>
    </header>
    <Outlet/>
    </>
  )
}
