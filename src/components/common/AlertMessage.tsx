interface AlertMessageProps {
  variant: 'success' | 'danger'
  message: string
  details?: string[]
  onClose?: () => void
}

// A generic banner for "the last thing you did worked / failed", used for
// both success and error feedback. Takes an optional list of `details` so
// backend validation errors (an array of strings) can be shown one per line.
export function AlertMessage({ variant, message, details = [], onClose }: AlertMessageProps) {
  return (
    <div className={`alert alert-${variant} ${onClose ? 'alert-dismissible' : ''} fade show`} role="alert">
      <div>{message}</div>
      {details.length > 0 && (
        <ul className="mb-0 mt-2 ps-3">
          {details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {onClose && (
        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
      )}
    </div>
  )
}
