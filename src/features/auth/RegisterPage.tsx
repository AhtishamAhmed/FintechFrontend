import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getApiErrorMessage } from '../../api/apiError';
import type { RegisterPayload } from './auth.types';

const initialForm: RegisterPayload = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
};

export function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterPayload>(initialForm);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(field: keyof RegisterPayload, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await register(form);
      navigate('/login', {
        state: { justRegistered: true },
        replace: true,
      });
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420, marginTop: '4rem' }}>
      <h1 className="h4 mb-4">Create an account</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col mb-3">
            <label className="form-label" htmlFor="firstName">
              First name
            </label>
            <input
              id="firstName"
              className="form-control"
              value={form.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              required
            />
          </div>
          <div className="col mb-3">
            <label className="form-label" htmlFor="lastName">
              Last name
            </label>
            <input
              id="lastName"
              className="form-control"
              value={form.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              required
            />
          </div>
        </div>

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
          <label className="form-label" htmlFor="phoneNumber">
            Phone number
          </label>
          <input
            id="phoneNumber"
            className="form-control"
            value={form.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
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
            minLength={6}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
