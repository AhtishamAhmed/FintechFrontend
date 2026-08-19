import { isAxiosError } from 'axios'
import type { ApiResponse } from '../types/api'

export interface ApiErrorInfo {
  message: string
  details: string[]
}

export function getApiErrorInfo(error: unknown): ApiErrorInfo {
  if (isAxiosError<ApiResponse<unknown>>(error) && error.response) {
    const body = error.response.data
    return {
      message: body?.message ?? 'Something went wrong. Please try again.',
      details: body?.errors ?? [],
    }
  }

  if (isAxiosError(error) && !error.response) {
    return {
      message: 'Could not reach the server. Is the backend running?',
      details: [],
    }
  }

  return { message: 'Something went wrong. Please try again.', details: [] }
}
