import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/stocks', label: 'Stocks' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/transactions', label: 'Transactions' },
]

function Navbar() {
  const { user, logout } = useAuth()

  return (
    <header className="navbar">
      <div className="brand-block">
        <div className="brand-mark">C</div>
        <div>
          <p className="brand-name">Candle Craft</p>
          <small>Paper Trading Desk</small>
        </div>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <span className="welcome-text">Hi, {user?.username || 'Trader'}</span>
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  )
}

export default Navbar
