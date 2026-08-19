import type { Session } from '../types/auth'

const STORAGE_KEY = 'fintrack.session'

// Plain localStorage read/write, no React involved. AuthContext wraps this
// for components; httpClient reads it directly to attach the auth header.
export function loadSession(): Session | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export function saveSession(session: Session) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function clearSession() {
  localStorage.removeItem(STORAGE_KEY)
}
