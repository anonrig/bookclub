import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (
    url.pathname.startsWith('/favicon') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/api')
  ) {
    return NextResponse.rewrite(url)
  }

  if (
    !req.cookies.has('next-auth.session-token') &&
    !req.cookies.has('__Secure-next-auth.session-token')
  ) {
    return NextResponse.redirect(url)
  }

  return NextResponse.rewrite(url)
}
