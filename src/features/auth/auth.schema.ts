import { z } from 'zod'

export const signUpSchema = z.object({
  name: z.string().trim().max(80),
  email: z.email('Enter a valid email.'),
  password: z.string().min(8, 'Use at least 8 characters.'),
})
export type AuthInput = z.infer<typeof signUpSchema>

// same shape so one form serves both; sign-in doesn't re-check the length rule
export const signInSchema = signUpSchema.extend({ password: z.string().min(1, 'Enter your password.') })
