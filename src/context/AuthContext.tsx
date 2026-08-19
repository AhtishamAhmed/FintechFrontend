import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import type { Session } from '../types/auth'
import { clearSession, loadSession, saveSession } from '../auth/session'

interface AuthContextValue {
  user: Session | null
  login: (session: Session) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

// Wraps the whole app once (see main.tsx) so any component can read "who's
// logged in" via useAuth() instead of each page re-reading localStorage.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session | null>(() => loadSession())

  function login(session: Session) {
    saveSession(session)
    setUser(session)
  }

  function logout() {
    clearSession()
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside an <AuthProvider>.')
  return context
}
