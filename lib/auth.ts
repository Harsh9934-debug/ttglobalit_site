// Web Crypto based signed-cookie session so this works in both Node and
// the Next.js middleware Edge runtime (no node:crypto dependency).

export const SESSION_COOKIE = 'ttg_admin_session'
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

function getSecret(): string {
  return process.env.SESSION_SECRET || ''
}

function toBase64Url(bytes: Uint8Array): string {
  let str = ''
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i])
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(b64url: string): Uint8Array {
  const b64 = b64url.replace(/-/g, '+').replace(/_/g, '/')
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4)
  const str = atob(padded)
  const bytes = new Uint8Array(str.length)
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i)
  return bytes
}

async function hmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder().encode(getSecret())
  return crypto.subtle.importKey('raw', enc, { name: 'HMAC', hash: 'SHA-256' }, false, [
    'sign',
    'verify',
  ])
}

async function sign(data: string): Promise<string> {
  const key = await hmacKey()
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return toBase64Url(new Uint8Array(sig))
}

export async function createSessionToken(email: string): Promise<string> {
  if (!getSecret()) throw new Error('SESSION_SECRET env var is not set')
  const payload = JSON.stringify({ email, exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000 })
  const payloadB64 = toBase64Url(new TextEncoder().encode(payload))
  const sig = await sign(payloadB64)
  return `${payloadB64}.${sig}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || !getSecret()) return false
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [payloadB64, sig] = parts
  const expectedSig = await sign(payloadB64)
  if (sig !== expectedSig) return false
  try {
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)))
    return typeof payload.exp === 'number' && payload.exp > Date.now()
  } catch {
    return false
  }
}

function constantTimeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder()
  const aBytes = enc.encode(a)
  const bBytes = enc.encode(b)
  if (aBytes.length !== bBytes.length) return false
  let diff = 0
  for (let i = 0; i < aBytes.length; i++) diff |= aBytes[i] ^ bBytes[i]
  return diff === 0
}

export function checkCredentials(email: string, password: string): boolean {
  const adminEmail = process.env.ADMIN_EMAIL || ''
  const adminPassword = process.env.ADMIN_PASSWORD || ''
  if (!adminEmail || !adminPassword) return false
  return constantTimeEqual(email, adminEmail) && constantTimeEqual(password, adminPassword)
}

export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE_SECONDS
