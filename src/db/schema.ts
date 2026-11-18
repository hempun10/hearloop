import { sql } from 'drizzle-orm'
import { index, integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const POST_STATUSES = ['open', 'planned', 'building', 'shipped'] as const
export type PostStatus = (typeof POST_STATUSES)[number]

const createdAt = () => integer({ mode: 'timestamp' }).notNull().default(sql`(unixepoch())`)

// ---- Better Auth owns these (it writes them through its own D1 adapter); declared here for joins and migrations
export const user = sqliteTable('user', {
  id: text().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: integer('emailVerified', { mode: 'boolean' }).notNull().default(false),
  image: text(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
})

export const session = sqliteTable('session', {
  id: text().primaryKey(),
  expiresAt: text('expiresAt').notNull(),
  token: text().notNull().unique(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
}, (t) => [index('session_userId').on(t.userId)])

export const account = sqliteTable('account', {
  id: text().primaryKey(),
  accountId: text('accountId').notNull(),
  providerId: text('providerId').notNull(),
  userId: text('userId').notNull().references(() => user.id, { onDelete: 'cascade' }),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  idToken: text('idToken'),
  accessTokenExpiresAt: text('accessTokenExpiresAt'),
  refreshTokenExpiresAt: text('refreshTokenExpiresAt'),
  scope: text(),
  password: text(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
}, (t) => [index('account_userId').on(t.userId)])

export const verification = sqliteTable('verification', {
  id: text().primaryKey(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: text('expiresAt').notNull(),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
}, (t) => [index('verification_identifier').on(t.identifier)])

// ---- app
export const orgs = sqliteTable('orgs', {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  name: text().notNull(),
  tokenHash: text(), // sha256 of the loop's API token; the token itself is shown once
  tagline: text().notNull().default(''),
  accent: text(),
  logoUrl: text(),
  theme: text({ enum: ['dark', 'light'] }).notNull().default('dark'),
  poweredBy: integer({ mode: 'boolean' }).notNull().default(true),
  showRoadmap: integer({ mode: 'boolean' }).notNull().default(true),
  showChangelog: integer({ mode: 'boolean' }).notNull().default(true),
  whoCanPost: text({ enum: ['anyone', 'signed_in'] }).notNull().default('anyone'),
  createdAt: createdAt(),
})

export const members = sqliteTable('members', {
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  userId: text().notNull().references(() => user.id, { onDelete: 'cascade' }),
  role: text({ enum: ['owner'] }).notNull().default('owner'),
}, (t) => [primaryKey({ columns: [t.orgId, t.userId] }), index('members_user').on(t.userId)])

export const posts = sqliteTable('posts', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().default(1),
  title: text().notNull(),
  body: text().notNull().default(''),
  status: text({ enum: POST_STATUSES }).notNull().default('open'),
  votes: integer().notNull().default(0),
  createdAt: createdAt(),
}, (t) => [index('posts_org').on(t.orgId, t.votes)])

// one row per Kane CLI verification of a post
export const runs = sqliteTable('runs', {
  id: integer().primaryKey({ autoIncrement: true }),
  postId: integer().notNull().references(() => posts.id),
  passed: integer({ mode: 'boolean' }).notNull(),
  summary: text().notNull().default(''),
  createdAt: createdAt(),
})

export const changelog = sqliteTable('changelog', {
  id: integer().primaryKey({ autoIncrement: true }),
  postId: integer().notNull().references(() => posts.id),
  title: text().notNull(),
  body: text().notNull().default(''),
  createdAt: createdAt(),
})

export type Org = typeof orgs.$inferSelect
export type Post = typeof posts.$inferSelect
export type Run = typeof runs.$inferSelect
export type ChangelogEntry = typeof changelog.$inferSelect
