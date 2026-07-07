import { NextRequest, NextResponse } from 'next/server'
import { checkCredentials, createSessionToken, SESSION_COOKIE, SESSION_COOKIE_MAX_AGE } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const email = typeof body?.email === 'string' ? body.email.trim() : ''
  const password = typeof body?.password === 'string' ? body.password : ''

  if (!checkCredentials(email, password)) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const token = await createSessionToken(email)
  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_COOKIE_MAX_AGE,
  })
  return res
}
