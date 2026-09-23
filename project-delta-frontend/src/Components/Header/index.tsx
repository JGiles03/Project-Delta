import { NavLink, Outlet } from 'react-router-dom'
import './index.css'
import home from '../../assets/home.png'
import list from '../../assets/list.png'
import account from '../../assets/account.png'

export default function Header() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>

      <nav className="bottom-nav">
        <NavLink className="nav-links" to='/'><img src={home} alt="homepage" /></NavLink>
        <NavLink className="nav-links list-link" to='/list'><img src={list} alt="listpage" /></NavLink>
        <NavLink className="nav-links" to='/account'><img src={account} alt="accountpage" /></NavLink>
      </nav>
    </div>
  )
}