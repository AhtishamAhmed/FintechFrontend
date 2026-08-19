import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface SubmitButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean
  children: ReactNode
}

// A <button type="submit"> that shows a Bootstrap spinner and disables
// itself while a request is in flight, so every form doesn't reimplement
// the same "loading" markup.
export function SubmitButton({ loading = false, children, disabled, className = '', ...rest }: SubmitButtonProps) {
  return (
    <button type="submit" className={`btn btn-primary ${className}`} disabled={loading || disabled} {...rest}>
      {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
      {loading ? 'Please wait…' : children}
    </button>
  )
}
