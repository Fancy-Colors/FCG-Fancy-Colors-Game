import { APIError } from 'src/api/types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function hasApiError(response: any): response is APIError {
  return response && response.reason;
}
