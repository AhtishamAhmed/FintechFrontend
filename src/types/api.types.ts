// Mirrors Application.Wrappers.ApiResponse<T> from the backend.
// Every controller action returns this shape, success or failure, so we
// type it once here instead of re-describing it in every API call.
export interface ApiResponse<T> {
  succecced: boolean; // yes, the backend actually spells it this way — keep it in sync, don't "fix" the typo here
  message: string | null;
  errors: string[] | null;
  data: T;
}
