export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
}

export interface RegisterUser {
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
}

export interface LoginRequest {
  email: string
  password: string
}

// Mirrors LoginResponseDto.cs — this is also what we keep in localStorage
// as "the logged-in session", since it already carries the JWT.
export interface Session {
  id: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
  token: string
  expiresAtUtc: string
}
