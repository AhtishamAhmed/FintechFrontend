import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-semibold" to="/">
          FinTrack
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
          aria-controls="navMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Create account
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
