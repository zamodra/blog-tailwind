import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const userToken = req.cookies.get('token');

  // If there is no userToken, redirect to the home page
  if (!userToken) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/posts', '/posts/:slug'],
};