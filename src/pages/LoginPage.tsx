import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../api/authApi'
import { getApiErrorInfo } from '../api/apiError'
import type { ApiErrorInfo } from '../api/apiError'
import { useAuth } from '../context/AuthContext'
import { AlertMessage } from '../components/common/AlertMessage'
import { SubmitButton } from '../components/common/SubmitButton'

interface LoginFormState {
  email: string
  password: string
}

const initialFormState: LoginFormState = { email: '', password: '' }

type FieldErrors = Partial<Record<keyof LoginFormState, string>>

// Mirrors LoginCommandValidator.cs — login only checks "did you type
// something", not password strength (that's register's job).
function validate(form: LoginFormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'

  if (!form.password) errors.password = 'Password is required.'

  return errors
}

interface LocationState {
  registered?: boolean
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const justRegistered = Boolean((location.state as LocationState | null)?.registered)

  const [form, setForm] = useState<LoginFormState>(initialFormState)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [apiError, setApiError] = useState<ApiErrorInfo | null>(null)
  const [showRegisteredBanner, setShowRegisteredBanner] = useState(justRegistered)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setForm((previous) => ({ ...previous, [name]: value }))
    setFieldErrors((previous) => ({ ...previous, [name]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setApiError(null)

    const errors = validate(form)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    try {
      const response = await loginUser(form)
      login(response.data)
      navigate('/')
    } catch (error) {
      setApiError(getApiErrorInfo(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-1">Welcome back</h1>
              <p className="text-muted mb-4">Sign in to your account.</p>

              {showRegisteredBanner && (
                <AlertMessage
                  variant="success"
                  message="Account created! Sign in to continue."
                  onClose={() => setShowRegisteredBanner(false)}
                />
              )}

              {apiError && (
                <AlertMessage
                  variant="danger"
                  message={apiError.message}
                  details={apiError.details}
                  onClose={() => setApiError(null)}
                />
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                  />
                  {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                  />
                  {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
                </div>

                <SubmitButton loading={submitting} className="w-100 mt-2">
                  Sign in
                </SubmitButton>
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                Don't have an account? <Link to="/register">Create one</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
