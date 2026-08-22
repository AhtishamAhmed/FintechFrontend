import axiosClient from '../../api/axiosClient';
import type { ApiResponse } from '../../types/api.types';
import type {
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from './auth.types';

// This file's only job is "know how to call the auth endpoints".
// It doesn't touch React state, localStorage, or the UI — that separation
// means these two functions could be reused (e.g. in a test, or a future
// mobile app) without dragging any of that along.

export function registerUser(payload: RegisterPayload) {
  return axiosClient.post<ApiResponse<RegisterResponse>>(
    '/auth/register',
    payload,
  );
}

export function loginUser(payload: LoginPayload) {
  return axiosClient.post<ApiResponse<LoginResponse>>('/auth/login', payload);
}
