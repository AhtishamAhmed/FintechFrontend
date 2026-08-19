import axios from 'axios'

// One shared axios instance for the whole app. Anything that needs to talk
// to the backend imports this instead of calling axios directly, so the
// base URL and default headers only live in one place.
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// The backend's success responses are camelCase (MVC's default JSON
// formatter), but responses thrown from its ErrorHandlerMiddleware come
// back PascalCase (it calls JsonSerializer.Serialize with no naming
// policy). Normalizing both to one shape here means every other file can
// assume camelCase and never has to know that quirk exists.
function normalizeEnvelope(data: unknown) {
  if (typeof data !== 'object' || data === null) return data
  const raw = data as Record<string, unknown>
  return {
    succecced: raw.succecced ?? raw.Succecced,
    message: raw.message ?? raw.Message ?? null,
    errors: raw.errors ?? raw.Errors ?? null,
    data: raw.data ?? raw.Data,
  }
}

httpClient.interceptors.response.use(
  (response) => {
    response.data = normalizeEnvelope(response.data)
    return response
  },
  (error) => {
    if (error.response) {
      error.response.data = normalizeEnvelope(error.response.data)
    }
    return Promise.reject(error)
  },
)
