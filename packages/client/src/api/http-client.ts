import qs from 'qs';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Options = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>;
  method?: Methods;
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
  credentials?: RequestCredentials;
  retries?: number;
};

type HTTPResponse<T = unknown> = Promise<T>;

type MethodOptions = Omit<Options, 'method'>;

export class HTTPClient {
  constructor(private readonly baseUrl: string) {}

  get<T>(url: string, { data = {}, ...options }: MethodOptions = {}) {
    const urlWithQueries = `${url}?${qs.stringify(data)}`;
    return this.fetch<T>(urlWithQueries, { ...options, method: Methods.GET });
  }

  post<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.POST });
  }

  put<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.PUT });
  }

  delete<T>(url: string, options: MethodOptions = {}) {
    return this.fetch<T>(url, { ...options, method: Methods.DELETE });
  }

  fetch<T>(url: string, options: Options) {
    return this._fetchWithRetry<T>(url, options);
  }

  private _httpStatusIsValid(httpStatus: number) {
    // Retry на конфликтных ошибках
    if (httpStatus === 409) {
      return false;
    }

    // Retry на 500, 503, и других серверных ошибках.
    if (httpStatus >= 500) {
      return false;
    }

    return true;
  }

  private _shouldRetry(response: Response, retries: number) {
    if (!retries) {
      return false;
    }

    return !this._httpStatusIsValid(response.status);
  }

  private _fetchWithRetry<T>(
    url: string,
    options: Options = {}
  ): HTTPResponse<T> {
    const { retries = 1 } = options;

    const onError = (error: unknown) => {
      if (error instanceof Response) {
        const triesLeft = retries - 1;

        if (!this._shouldRetry(error, triesLeft)) {
          throw new Error(error.statusText);
        }

        return this._fetchWithRetry<T>(url, { ...options, retries: triesLeft });
      }

      if (error instanceof Error) {
        throw new Error(error.message);
      }

      throw new Error('Failed to request');
    };

    // eslint-disable-next-line promise/prefer-await-to-then
    return this._request<T>(url, options).catch(onError);
  }

  private async _request<T>(
    url: string,
    options: Options = {}
  ): HTTPResponse<T> {
    const {
      method = Methods.GET,
      data,
      headers = {},
      signal,
      credentials = 'include',
    } = options;
    const isFormData = data instanceof FormData;
    const httpHeaders = new Headers();

    if (data && !isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    for (const [key, value] of Object.entries(headers)) {
      httpHeaders.append(key, value);
    }

    const response = await fetch(`${this.baseUrl}${url}`, {
      method,
      headers: httpHeaders,
      mode: 'cors',
      signal,
      credentials,
      body: isFormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      return Promise.reject(response);
    }

    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    return isJson ? response.json() : null;
  }
}
