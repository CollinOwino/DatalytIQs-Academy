import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const isPremium = request.cookies.get('premium')?.value === 'true';
  const isProtected = request.nextUrl.pathname.startsWith('/premium');

  if (isProtected && !isPremium) {
    const url = new URL('/', request.url);
    url.searchParams.set('unauthorized', 'true');
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/premium'],
};
