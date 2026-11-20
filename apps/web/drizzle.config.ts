import { defineConfig } from 'drizzle-kit'

// generate only; wrangler applies migrations/ to D1 (bun run db:migrate)
export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './migrations',
  casing: 'snake_case',
  migrations: { prefix: 'timestamp' },
})
