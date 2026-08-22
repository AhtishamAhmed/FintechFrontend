// These mirror the backend request/response DTOs exactly (field names and
// casing come from Application.Features.Auth.*). Getting these wrong is
// the #1 source of "why is my field undefined" bugs when wiring a frontend
// to a real API, so we keep them next to the code that uses them.

// -> POST /api/auth/register  (matches RegisterCommand.cs)
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

// <- data from a successful register (matches RegisterResponseDto.cs)
export interface RegisterResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

// -> POST /api/auth/login  (matches LoginCommand.cs)
export interface LoginPayload {
  email: string;
  password: string;
}

// <- data from a successful login (matches LoginResponseDto.cs)
export interface LoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  token: string;
  refreshToken: string;
  expiresAtUtc: string;
}

// What we actually keep around in the app once a user is logged in —
// a trimmed-down view of LoginResponse, without the tokens (those live
// only in localStorage, not in React state — see AuthContext.tsx for why).
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}
