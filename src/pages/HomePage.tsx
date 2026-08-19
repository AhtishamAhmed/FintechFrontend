import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function HomePage() {
  const { user } = useAuth()

  return (
    <div className="container py-5">
      <div className="row align-items-center py-5">
        <div className="col-lg-7">
          {user ? (
            <>
              <h1 className="display-5 fw-bold">Welcome back, {user.firstName}.</h1>
              <p className="lead text-muted">
                FinTrack is a small learning project — a React + Bootstrap frontend talking to a .NET Web API
                backend.
              </p>
            </>
          ) : (
            <>
              <h1 className="display-5 fw-bold">Track your money without the noise.</h1>
              <p className="lead text-muted">
                FinTrack is a small learning project — a React + Bootstrap frontend talking to a .NET Web API
                backend.
              </p>
              <Link to="/register" className="btn btn-primary btn-lg mt-2">
                Create a free account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
