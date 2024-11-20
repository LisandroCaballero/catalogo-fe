import { cookies } from 'next/headers';

export const setAuthCookie = async (token: string) => {
  (await cookies()).set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'development',
    sameSite: 'lax',
    path: '/',
    // maxAge: 30 * 24 * 60 * 60 // 30 días
  });
};

export const removeAuthCookie = async () => {
  (await cookies()).delete('token');
};