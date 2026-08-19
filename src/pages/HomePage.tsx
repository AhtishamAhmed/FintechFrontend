import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AlertMessage } from '../components/common/AlertMessage'

interface LocationState {
  registered?: boolean
}

export function HomePage() {
  const location = useLocation()
  const state = location.state as LocationState | null
  const [showWelcome, setShowWelcome] = useState(Boolean(state?.registered))

  return (
    <div className="container py-5">
      {showWelcome && (
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-8 col-lg-6">
            <AlertMessage
              variant="success"
              message="Account created! You can sign in once the login page is built."
              onClose={() => setShowWelcome(false)}
            />
          </div>
        </div>
      )}

      <div className="row align-items-center py-5">
        <div className="col-lg-7">
          <h1 className="display-5 fw-bold">Track your money without the noise.</h1>
          <p className="lead text-muted">
            FinTrack is a small learning project — a React + Bootstrap frontend talking to a .NET Web API backend.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg mt-2">
            Create a free account
          </Link>
        </div>
      </div>
    </div>
  )
}
