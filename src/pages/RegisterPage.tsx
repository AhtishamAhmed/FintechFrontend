import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/authApi'
import { getApiErrorInfo } from '../api/apiError'
import type { ApiErrorInfo } from '../api/apiError'
import { AlertMessage } from '../components/common/AlertMessage'
import { SubmitButton } from '../components/common/SubmitButton'

interface RegisterFormState {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const initialFormState: RegisterFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
}

type FieldErrors = Partial<Record<keyof RegisterFormState, string>>

// Mirrors RegisterCommandValidator.cs on the backend (plus ASP.NET Identity's
// default password policy, which is what actually rejects weak passwords),
// so the user sees the same rules instantly instead of waiting on a round
// trip to the API.
function validate(form: RegisterFormState): FieldErrors {
  const errors: FieldErrors = {}

  if (!form.firstName.trim()) errors.firstName = 'First name is required.'
  else if (form.firstName.length > 50) errors.firstName = 'First name must be 50 characters or fewer.'

  if (!form.lastName.trim()) errors.lastName = 'Last name is required.'
  else if (form.lastName.length > 50) errors.lastName = 'Last name must be 50 characters or fewer.'

  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email address.'

  if (!form.phoneNumber.trim()) errors.phoneNumber = 'Phone number is required.'

  if (!form.password) errors.password = 'Password is required.'
  else if (form.password.length < 6) errors.password = 'Password must be at least 6 characters.'
  else if (!/[A-Z]/.test(form.password)) errors.password = 'Password must include an uppercase letter.'
  else if (!/[a-z]/.test(form.password)) errors.password = 'Password must include a lowercase letter.'
  else if (!/[0-9]/.test(form.password)) errors.password = 'Password must include a digit.'
  else if (!/[^A-Za-z0-9]/.test(form.password)) errors.password = 'Password must include a symbol (e.g. !@#$).'

  if (form.confirmPassword !== form.password) errors.confirmPassword = 'Passwords do not match.'

  return errors
}

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<RegisterFormState>(initialFormState)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [apiError, setApiError] = useState<ApiErrorInfo | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
      await registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        password: form.password,
      })
      navigate('/login', { state: { registered: true } })
    } catch (error) {
      setApiError(getApiErrorInfo(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-1">Create your account</h1>
              <p className="text-muted mb-4">It only takes a minute.</p>

              {apiError && (
                <AlertMessage
                  variant="danger"
                  message={apiError.message}
                  details={apiError.details}
                  onClose={() => setApiError(null)}
                />
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row g-3">
                  <div className="col-sm-6">
                    <label htmlFor="firstName" className="form-label">
                      First name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      className={`form-control ${fieldErrors.firstName ? 'is-invalid' : ''}`}
                      value={form.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                    />
                    {fieldErrors.firstName && <div className="invalid-feedback">{fieldErrors.firstName}</div>}
                  </div>

                  <div className="col-sm-6">
                    <label htmlFor="lastName" className="form-label">
                      Last name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      className={`form-control ${fieldErrors.lastName ? 'is-invalid' : ''}`}
                      value={form.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                    />
                    {fieldErrors.lastName && <div className="invalid-feedback">{fieldErrors.lastName}</div>}
                  </div>

                  <div className="col-12">
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

                  <div className="col-12">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone number
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      className={`form-control ${fieldErrors.phoneNumber ? 'is-invalid' : ''}`}
                      value={form.phoneNumber}
                      onChange={handleChange}
                      autoComplete="tel"
                    />
                    {fieldErrors.phoneNumber && <div className="invalid-feedback">{fieldErrors.phoneNumber}</div>}
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => setShowPassword((previous) => !previous)}
                        tabIndex={-1}
                      >
                        {showPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    {fieldErrors.password ? (
                      <div className="text-danger small mt-1">{fieldErrors.password}</div>
                    ) : (
                      <div className="form-text">
                        At least 6 characters, with an uppercase letter, a lowercase letter, a digit, and a symbol.
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                      value={form.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                    />
                    {fieldErrors.confirmPassword && <div className="invalid-feedback">{fieldErrors.confirmPassword}</div>}
                  </div>
                </div>

                <SubmitButton loading={submitting} className="w-100 mt-4">
                  Create account
                </SubmitButton>
              </form>

              <p className="text-center text-muted mt-4 mb-0">
                Already have an account? <Link to="/login">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
