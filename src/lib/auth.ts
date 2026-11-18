import { betterAuth } from 'better-auth'
import { env } from 'cloudflare:workers'
import { hashPassword, verifyPassword } from './crypto'

export const auth = betterAuth({
  database: env.DB,
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    password: { hash: hashPassword, verify: verifyPassword },
  },
})
