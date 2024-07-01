import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('access_token');

  const url = req.nextUrl.clone();
  url.pathname = '/login';

  if (pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(url);

    try {
      const response = await fetch(
        `${process.env.APP_USER_API_URL}/auth/user`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { data } = await response.json();
      return data.is_admin ? NextResponse.next() : NextResponse.redirect(url);
    } catch {
      NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/admin/:path*'],
};
