import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

// Wraps any page that requires login. If we put this check inside every
// page component instead, every future protected page (wallet, transfers,
// settings...) would have to repeat the same "if not logged in, redirect"
// logic. Here it's written once and reused via composition in App.tsx.
export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isInitializing } = useAuth();

  if (isInitializing) {
    // Avoids the "flash of login page" on refresh described in
    // AuthContext.tsx — wait for localStorage to be checked first.
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
