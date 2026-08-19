// Every endpoint on the .NET backend replies with this same envelope shape
// (see Src/Core/Application/Wrappers/ApiResponse.cs on the backend), so we
// model it once here and reuse it for every response type.
export interface ApiResponse<T> {
  succecced: boolean
  message: string | null
  errors: string[] | null
  data: T
}
