import { sql } from 'drizzle-orm'
import { index, integer, primaryKey, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

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

// ---- Better Auth OAuth provider for MCP clients (@better-auth/mcp + jwt); generated from its getAuthTables(), Better Auth writes them
export const jwks = sqliteTable('jwks', {
  id: text().primaryKey(),
  publicKey: text('publicKey').notNull(),
  privateKey: text('privateKey').notNull(),
  createdAt: text('createdAt').notNull(),
  expiresAt: text('expiresAt'),
  alg: text('alg'),
  crv: text('crv'),
})

export const oauthClient = sqliteTable('oauthClient', {
  id: text().primaryKey(),
  clientId: text('clientId').notNull().unique(),
  clientSecret: text('clientSecret'),
  clientDiscoveryId: text('clientDiscoveryId'),
  disabled: integer('disabled', { mode: 'boolean' }),
  skipConsent: integer('skipConsent', { mode: 'boolean' }),
  enableEndSession: integer('enableEndSession', { mode: 'boolean' }),
  subjectType: text('subjectType'),
  scopes: text('scopes'),
  clientCredentialsScopes: text('clientCredentialsScopes'),
  userId: text('userId').references(() => user.id),
  createdAt: text('createdAt'),
  updatedAt: text('updatedAt'),
  name: text('name'),
  uri: text('uri'),
  icon: text('icon'),
  contacts: text('contacts'),
  tos: text('tos'),
  policy: text('policy'),
  softwareId: text('softwareId'),
  softwareVersion: text('softwareVersion'),
  softwareStatement: text('softwareStatement'),
  redirectUris: text('redirectUris').notNull(),
  postLogoutRedirectUris: text('postLogoutRedirectUris'),
  backchannelLogoutUri: text('backchannelLogoutUri'),
  backchannelLogoutSessionRequired: integer('backchannelLogoutSessionRequired', { mode: 'boolean' }),
  tokenEndpointAuthMethod: text('tokenEndpointAuthMethod'),
  applicationType: text('applicationType'),
  jwks: text('jwks'),
  jwksUri: text('jwksUri'),
  grantTypes: text('grantTypes'),
  responseTypes: text('responseTypes'),
  requirePKCE: integer('requirePKCE', { mode: 'boolean' }),
  dpopBoundAccessTokens: integer('dpopBoundAccessTokens', { mode: 'boolean' }),
  referenceId: text('referenceId'),
  metadata: text('metadata'),
}, (t) => [index('oauthClient_userId').on(t.userId)])

export const oauthResource = sqliteTable('oauthResource', {
  id: text().primaryKey(),
  identifier: text('identifier').notNull().unique(),
  name: text('name').notNull(),
  accessTokenTtl: integer('accessTokenTtl'),
  refreshTokenTtl: integer('refreshTokenTtl'),
  signingAlgorithm: text('signingAlgorithm'),
  signingKeyId: text('signingKeyId'),
  allowedScopes: text('allowedScopes'),
  customClaims: text('customClaims'),
  dpopBoundAccessTokensRequired: integer('dpopBoundAccessTokensRequired', { mode: 'boolean' }),
  disabled: integer('disabled', { mode: 'boolean' }),
  createdAt: text('createdAt'),
  updatedAt: text('updatedAt'),
  policyVersion: integer('policyVersion'),
  metadata: text('metadata'),
})

export const oauthClientResource = sqliteTable('oauthClientResource', {
  id: text().primaryKey(),
  clientId: text('clientId').notNull().references(() => oauthClient.clientId, { onDelete: 'cascade' }),
  resourceId: text('resourceId').notNull().references(() => oauthResource.identifier, { onDelete: 'cascade' }),
  metadata: text('metadata'),
  createdAt: text('createdAt'),
}, (t) => [index('oauthClientResource_clientId').on(t.clientId), index('oauthClientResource_resourceId').on(t.resourceId)])

export const oauthRefreshToken = sqliteTable('oauthRefreshToken', {
  id: text().primaryKey(),
  token: text('token').notNull().unique(),
  clientId: text('clientId').notNull().references(() => oauthClient.clientId),
  sessionId: text('sessionId').references(() => session.id, { onDelete: 'set null' }),
  userId: text('userId').notNull().references(() => user.id),
  referenceId: text('referenceId'),
  authorizationCodeId: text('authorizationCodeId'),
  resources: text('resources'),
  requestedUserInfoClaims: text('requestedUserInfoClaims'),
  expiresAt: text('expiresAt'),
  createdAt: text('createdAt'),
  revoked: text('revoked'),
  rotatedAt: text('rotatedAt'),
  rotationReplayResponse: text('rotationReplayResponse'),
  rotationReplayExpiresAt: text('rotationReplayExpiresAt'),
  authTime: text('authTime'),
  confirmation: text('confirmation'),
  scopes: text('scopes').notNull(),
}, (t) => [index('oauthRefreshToken_clientId').on(t.clientId), index('oauthRefreshToken_sessionId').on(t.sessionId), index('oauthRefreshToken_userId').on(t.userId), index('oauthRefreshToken_authorizationCodeId').on(t.authorizationCodeId)])

export const oauthAccessToken = sqliteTable('oauthAccessToken', {
  id: text().primaryKey(),
  token: text('token').unique(),
  clientId: text('clientId').notNull().references(() => oauthClient.clientId),
  sessionId: text('sessionId').references(() => session.id, { onDelete: 'set null' }),
  userId: text('userId').references(() => user.id),
  referenceId: text('referenceId'),
  authorizationCodeId: text('authorizationCodeId'),
  resources: text('resources'),
  requestedUserInfoClaims: text('requestedUserInfoClaims'),
  refreshId: text('refreshId').references(() => oauthRefreshToken.id),
  expiresAt: text('expiresAt'),
  createdAt: text('createdAt'),
  revoked: text('revoked'),
  confirmation: text('confirmation'),
  scopes: text('scopes').notNull(),
}, (t) => [index('oauthAccessToken_clientId').on(t.clientId), index('oauthAccessToken_sessionId').on(t.sessionId), index('oauthAccessToken_userId').on(t.userId), index('oauthAccessToken_authorizationCodeId').on(t.authorizationCodeId), index('oauthAccessToken_refreshId').on(t.refreshId)])

export const oauthConsent = sqliteTable('oauthConsent', {
  id: text().primaryKey(),
  clientId: text('clientId').notNull().references(() => oauthClient.clientId),
  userId: text('userId').references(() => user.id),
  referenceId: text('referenceId'),
  resources: text('resources'),
  requestedUserInfoClaims: text('requestedUserInfoClaims'),
  scopes: text('scopes').notNull(),
  createdAt: text('createdAt'),
  updatedAt: text('updatedAt'),
}, (t) => [index('oauthConsent_clientId').on(t.clientId), index('oauthConsent_userId').on(t.userId)])

export const oauthClientAssertion = sqliteTable('oauthClientAssertion', {
  id: text().primaryKey(),
  expiresAt: text('expiresAt').notNull(),
})

// ---- app
export const orgs = sqliteTable('orgs', {
  id: integer().primaryKey({ autoIncrement: true }),
  slug: text().notNull().unique(),
  name: text().notNull(),
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
  // a loop's claim: who is building it, until when (a lease; claiming again renews it, an expired one can be taken)
  claimTokenId: integer(),
  claimedBy: text(),
  claimExpiresAt: integer({ mode: 'timestamp' }),
  // set when a member merged this duplicate into another request; merged posts leave every list
  mergedIntoId: integer(),
  authorId: text().references(() => user.id, { onDelete: 'set null' }), // signed-in poster; may edit while Open
  // a board's own status (e.g. "Under review"); status above is its kind, which the roadmap, changelog and loop use
  statusId: integer().references(() => statuses.id, { onDelete: 'set null' }),
  categoryId: integer().references(() => categories.id, { onDelete: 'set null' }),
  assigneeId: text().references(() => user.id, { onDelete: 'set null' }), // the member who owns it
  assigneeTokenId: integer().references(() => apiTokens.id, { onDelete: 'set null' }), // or the agent (a token or MCP connection) it's handed to
  createdAt: createdAt(),
}, (t) => [index('posts_org').on(t.orgId, t.votes)])

// a board's own statuses; each one is a kind of the four built-ins, shown after it
export const statuses = sqliteTable('statuses', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  color: text().notNull(),
  kind: text({ enum: POST_STATUSES }).notNull(),
  position: integer().notNull().default(0),
}, (t) => [uniqueIndex('statuses_org_name').on(t.orgId, t.name)])

// groups of requests on one board, like "Feature requests" and "Bugs"
export const categories = sqliteTable('categories', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  description: text().notNull().default(''),
  position: integer().notNull().default(0),
}, (t) => [uniqueIndex('categories_org_name').on(t.orgId, t.name)])

// API tokens: one per person or machine, so every write has an author and can be revoked alone.
// Only the sha256 is stored; the token is shown once.
export const apiTokens = sqliteTable('api_tokens', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  tokenHash: text().notNull().unique(),
  hint: text().notNull(), // last 4 characters, to tell tokens apart
  createdBy: text().references(() => user.id, { onDelete: 'set null' }),
  createdAt: createdAt(),
  lastUsedAt: integer({ mode: 'timestamp' }),
  revokedAt: integer({ mode: 'timestamp' }),
  icon: text(), // an uploaded 64px image as a data URL; none = the agent's default logo
}, (t) => [index('api_tokens_org').on(t.orgId)])

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
  // true when a passing Kane run shipped it; false when a member moved it to Shipped by hand
  verified: integer({ mode: 'boolean' }).notNull().default(true),
  createdAt: createdAt(),
})

// one vote per voter per post: 'u:<user id>' when signed in, 'v:<cookie id>' for visitors
export const postVotes = sqliteTable('post_votes', {
  postId: integer().notNull().references(() => posts.id),
  voter: text().notNull(),
  createdAt: createdAt(),
}, (t) => [primaryKey({ columns: [t.postId, t.voter] })])

// replies on a request; internal ones are team notes that only members see
export const comments = sqliteTable('comments', {
  id: integer().primaryKey({ autoIncrement: true }),
  postId: integer().notNull().references(() => posts.id),
  userId: text().references(() => user.id, { onDelete: 'set null' }),
  author: text().notNull(),
  team: integer({ mode: 'boolean' }).notNull().default(false), // written by a board member
  internal: integer({ mode: 'boolean' }).notNull().default(false),
  body: text().notNull(),
  parentId: integer(), // a reply's top-level comment; replies are one level deep
  createdAt: createdAt(),
}, (t) => [index('comments_post').on(t.postId)])

export const tags = sqliteTable('tags', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  name: text().notNull(),
}, (t) => [uniqueIndex('tags_org_name').on(t.orgId, t.name)])

export const postTags = sqliteTable('post_tags', {
  postId: integer().notNull().references(() => posts.id),
  tagId: integer().notNull().references(() => tags.id, { onDelete: 'cascade' }),
}, (t) => [primaryKey({ columns: [t.postId, t.tagId] })])

// where the board posts its news: one Slack and one Discord incoming webhook per board
export const integrations = sqliteTable('integrations', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  kind: text({ enum: ['slack', 'discord'] }).notNull(),
  url: text().notNull(),
  lastStatus: text(), // 'ok' or the last error
  lastSentAt: integer({ mode: 'timestamp' }),
  events: text({ mode: 'json' }).$type<string[]>(), // which board events to send; null = all of them
  createdAt: createdAt(),
}, (t) => [uniqueIndex('integrations_org_kind').on(t.orgId, t.kind)])

// single-use links that make the person who opens them a member; only the hash is kept
export const invites = sqliteTable('invites', {
  id: integer().primaryKey({ autoIncrement: true }),
  orgId: integer().notNull().references(() => orgs.id, { onDelete: 'cascade' }),
  tokenHash: text().notNull().unique(),
  createdBy: text().references(() => user.id, { onDelete: 'set null' }),
  expiresAt: integer({ mode: 'timestamp' }).notNull(),
  acceptedBy: text().references(() => user.id, { onDelete: 'set null' }),
  acceptedAt: integer({ mode: 'timestamp' }),
  createdAt: createdAt(),
}, (t) => [index('invites_org').on(t.orgId)])

export type Org = typeof orgs.$inferSelect
export type Post = typeof posts.$inferSelect
export type Comment = typeof comments.$inferSelect
export type CustomStatus = typeof statuses.$inferSelect
export type Category = typeof categories.$inferSelect
export type Run = typeof runs.$inferSelect
export type ApiToken = typeof apiTokens.$inferSelect
export type ChangelogEntry = typeof changelog.$inferSelect
