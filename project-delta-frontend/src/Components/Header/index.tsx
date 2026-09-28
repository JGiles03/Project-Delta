import { NavLink, Outlet } from 'react-router-dom'
import './index.css'
import home from '../../assets/home.png'
import list from '../../assets/list.png'
import account from '../../assets/account.png'
import { TOUR_STEPS } from '../../services/tourConsts'

export default function Header() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>

      <nav className="bottom-nav" data-tour={TOUR_STEPS.NAVBAR}>
        <NavLink className="nav-links" to='/map'><img src={home} alt="homepage" data-tour={TOUR_STEPS.MAPPAGE}/></NavLink>
        <NavLink className="nav-links list-link" to='/list'><img src={list} alt="listpage" data-tour={TOUR_STEPS.LISTPAGE}/></NavLink>
        <NavLink className="nav-links" to='/account'><img src={account} alt="accountpage" data-tour={TOUR_STEPS.ACCOUNTPAGE}/></NavLink>
      </nav>
    </div>
  )
}