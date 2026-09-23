import { NavLink, Outlet } from 'react-router-dom'
import './index.css'
import home from '../../assets/home.png'

export default function Header() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>

      <nav className="bottom-nav">
        <NavLink className="nav-links" to='/'><img src={home} alt="" /></NavLink>
        <NavLink className="nav-links" to='/list'>List</NavLink>
        <NavLink className="nav-links" to='/account'>Account</NavLink>
      </nav>
    </div>
  )
}