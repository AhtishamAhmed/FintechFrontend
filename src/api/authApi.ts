import { httpClient } from './httpClient'
import type { ApiResponse } from '../types/api'
import type { LoginRequest, RegisterRequest, RegisterUser, Session } from '../types/auth'

// One function per backend endpoint. Pages call this instead of touching
// axios/httpClient directly — that keeps the "how do I talk to the API"
// details out of the UI code.
export async function registerUser(payload: RegisterRequest) {
  const response = await httpClient.post<ApiResponse<RegisterUser>>('/auth/register', payload)
  return response.data
}

export async function loginUser(payload: LoginRequest) {
  const response = await httpClient.post<ApiResponse<Session>>('/auth/login', payload)
  return response.data
}
