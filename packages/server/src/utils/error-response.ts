export class ErrorResponse extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export function isRouteErrorResponse(error: unknown): error is ErrorResponse {
  return error instanceof ErrorResponse;
}
