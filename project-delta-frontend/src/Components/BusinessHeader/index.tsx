import { NavLink, Outlet } from 'react-router-dom'
import './index.css'
import list from '../../assets/list.png'
import account from '../../assets/account.png'


import { TOUR_STEPS } from '../../services/tourConsts'

export default function BusinessHeader() {
  return (
    <div className="app-shell">
      <div className="app-content">
        <Outlet />
      </div>

      <nav className="bottom-nav" data-tour={TOUR_STEPS.NAVBAR}>
        <NavLink className="nav-links" to="/business">
            <img src={list} alt="listpage" data-tour={TOUR_STEPS.LISTPAGE}/>
        </NavLink>

        <NavLink className="nav-links" to='/account'><img src={account} alt="accountpage" data-tour={TOUR_STEPS.ACCOUNTPAGE}/></NavLink>
      </nav>
    </div>
  )
}