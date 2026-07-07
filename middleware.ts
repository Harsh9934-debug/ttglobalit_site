import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isLoginPage = pathname === '/admin/login'
  const isLoginApi = pathname === '/api/admin/login'
  const isProtectedPage = pathname.startsWith('/admin') && !isLoginPage
  const isProtectedApi = pathname.startsWith('/api/admin') && !isLoginApi

  if (!isProtectedPage && !isProtectedApi) return NextResponse.next()

  const token = req.cookies.get(SESSION_COOKIE)?.value
  const valid = await verifySessionToken(token)

  if (valid) return NextResponse.next()

  if (isProtectedApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/admin/login', req.url)
  loginUrl.searchParams.set('next', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
