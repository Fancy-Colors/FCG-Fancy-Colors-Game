import { Request } from 'express';

export async function getCurrentUser(req: Request) {
  // TODO: вынести в переменную окружения
  const BASE_URL = 'https://ya-praktikum.tech/api/v2/auth/user';

  const response = await fetch(BASE_URL, {
    method: 'GET',
    headers: {
      cookie: req.headers.cookie as string,
    },
    credentials: 'include',
    mode: 'cors',
  });

  if (!response.ok) return null;

  return response.json();
}
