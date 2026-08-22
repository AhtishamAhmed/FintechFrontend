import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getApiErrorMessage } from '../../api/apiError';
import type { LoginPayload } from './auth.types';

const initialForm: LoginPayload = { email: '', password: '' };

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // RegisterPage navigates here with { state: { justRegistered: true } } —
  // this reads that back to show a one-time confirmation banner.
  const justRegistered = Boolean(
    (location.state as { justRegistered?: boolean } | null)?.justRegistered,
  );

  const [form, setForm] = useState<LoginPayload>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof LoginPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: '4rem' }}>
      <h1 className="h4 mb-4">Log in</h1>

      {justRegistered && (
        <div className="alert alert-success">
          Account created. You can log in now.
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p className="mt-3 text-center">
        Don&apos;t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
