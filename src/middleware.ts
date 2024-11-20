import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Verificar si hay cookie de token
  const token = request.cookies.get('token');
  const isAuthPage = request.nextUrl.pathname === '/login';

  // Si está en login y tiene token, redirigir al dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard/products', request.url));
  }

  // Si no está en login y no tiene token, redirigir a login
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};