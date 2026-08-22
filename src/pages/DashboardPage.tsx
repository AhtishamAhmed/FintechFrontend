import { useAuth } from '../features/auth/AuthContext';

// A placeholder home page. Its only real job right now is to prove the
// auth flow works end-to-end: it reads `user` from context (no prop
// passed in from anywhere), which only has a value if login succeeded.
export function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <div className="container" style={{ marginTop: '4rem' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 mb-0">Welcome, {user?.firstName}</h1>
        <button className="btn btn-outline-secondary" onClick={logout}>
          Log out
        </button>
      </div>
      <p>
        Logged in as <strong>{user?.email}</strong>
      </p>
      <p>
        Roles: {user?.roles.join(', ') || 'none'}
      </p>
    </div>
  );
}
