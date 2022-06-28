import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  if (
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.rewrite(url)
  }

  if (
    !request.cookies.has('next-auth.session-token') &&
    !request.cookies.has('__Secure-next-auth.session-token')
  ) {
    url.pathname = '/auth/signin'
    return NextResponse.rewrite(url)
  }

  return NextResponse.rewrite(url)
}

export const config = {
  matcher: ['/books', '/meetings', '/settings', '/'],
}
