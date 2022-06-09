import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  if (url.pathname.startsWith('/auth') || url.pathname.startsWith('/api')) {
    return NextResponse.rewrite(url)
  }

  if (
    !req.cookies['next-auth.session-token'] &&
    !req.cookies['__Secure-next-auth.session-token']
  ) {
    url.pathname = '/auth/signin'
    return NextResponse.redirect(url)
  }

  return NextResponse.rewrite(url)
}
