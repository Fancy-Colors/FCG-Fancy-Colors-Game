import { Request } from 'express';

export async function getCurrentUser(req: Request) {
  const response = await fetch(
    `${process.env.PRACTICUM_API_URL}/api/v2/auth/user`,
    {
      method: 'GET',
      headers: {
        cookie: req.headers.cookie as string,
      },
      credentials: 'include',
      mode: 'cors',
    }
  );

  if (!response.ok) return null;

  return response.json();
}
