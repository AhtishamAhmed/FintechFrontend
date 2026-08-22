import axios from 'axios';
import type { ApiResponse } from '../types/api.types';

// The backend's ErrorHandlerMiddleware catches every exception and always
// responds with the same ApiResponse<T> shape (succecced: false, message,
// errors: string[] | null) — for BOTH a single business error (e.g. "Invalid
// email or password") and FluentValidation failures (e.g. "Password must be
// at least 6 characters"). This function is the one place that knows how to
// pull a human-readable message out of that shape, so every form's catch
// block can just call this instead of re-parsing axios errors itself.
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    const data = error.response?.data;
    if (data?.errors && data.errors.length > 0) {
      return data.errors.join(' ');
    }
    if (data?.message) {
      return data.message;
    }
  }
  return 'Something went wrong. Please try again.';
}
