const enc = new TextEncoder()
const b64 = (b: ArrayBuffer | Uint8Array) => btoa(String.fromCharCode(...new Uint8Array(b)))
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0))

// constant-time string compare
export function same(a: string, b: string) {
  if (a.length !== b.length) return false
  let d = 0
  for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return d === 0
}

export async function sha256(s: string) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256', enc.encode(s)))].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function randomToken() {
  return 'hl_' + [...crypto.getRandomValues(new Uint8Array(24))].map((b) => b.toString(16).padStart(2, '0')).join('')
}

// PBKDF2 via WebCrypto instead of Better Auth's default scrypt, which can blow the Workers CPU limit.
// 100k is the most iterations Workers allows.
const ITER = 100_000
async function derive(password: string, salt: Uint8Array, iterations: number) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  return crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: salt as BufferSource, iterations }, key, 256)
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  return `pbkdf2$${ITER}$${b64(salt)}$${b64(await derive(password, salt, ITER))}`
}

export async function verifyPassword({ hash, password }: { hash: string; password: string }) {
  const [kind, iter, salt, want] = hash.split('$')
  if (kind !== 'pbkdf2' || !salt || !want) return false
  return same(b64(await derive(password, unb64(salt), Number(iter))), want)
}
