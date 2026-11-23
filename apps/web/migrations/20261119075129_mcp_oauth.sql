CREATE TABLE `jwks` (
	`id` text PRIMARY KEY NOT NULL,
	`publicKey` text NOT NULL,
	`privateKey` text NOT NULL,
	`createdAt` text NOT NULL,
	`expiresAt` text,
	`alg` text,
	`crv` text
);
--> statement-breakpoint
CREATE TABLE `oauthAccessToken` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text,
	`clientId` text NOT NULL,
	`sessionId` text,
	`userId` text,
	`referenceId` text,
	`authorizationCodeId` text,
	`resources` text,
	`requestedUserInfoClaims` text,
	`refreshId` text,
	`expiresAt` text,
	`createdAt` text,
	`revoked` text,
	`confirmation` text,
	`scopes` text NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `oauthClient`(`clientId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`refreshId`) REFERENCES `oauthRefreshToken`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `oauthAccessToken_token_unique` ON `oauthAccessToken` (`token`);--> statement-breakpoint
CREATE INDEX `oauthAccessToken_clientId` ON `oauthAccessToken` (`clientId`);--> statement-breakpoint
CREATE INDEX `oauthAccessToken_sessionId` ON `oauthAccessToken` (`sessionId`);--> statement-breakpoint
CREATE INDEX `oauthAccessToken_userId` ON `oauthAccessToken` (`userId`);--> statement-breakpoint
CREATE INDEX `oauthAccessToken_authorizationCodeId` ON `oauthAccessToken` (`authorizationCodeId`);--> statement-breakpoint
CREATE INDEX `oauthAccessToken_refreshId` ON `oauthAccessToken` (`refreshId`);--> statement-breakpoint
CREATE TABLE `oauthClient` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`clientSecret` text,
	`clientDiscoveryId` text,
	`disabled` integer,
	`skipConsent` integer,
	`enableEndSession` integer,
	`subjectType` text,
	`scopes` text,
	`clientCredentialsScopes` text,
	`userId` text,
	`createdAt` text,
	`updatedAt` text,
	`name` text,
	`uri` text,
	`icon` text,
	`contacts` text,
	`tos` text,
	`policy` text,
	`softwareId` text,
	`softwareVersion` text,
	`softwareStatement` text,
	`redirectUris` text NOT NULL,
	`postLogoutRedirectUris` text,
	`backchannelLogoutUri` text,
	`backchannelLogoutSessionRequired` integer,
	`tokenEndpointAuthMethod` text,
	`applicationType` text,
	`jwks` text,
	`jwksUri` text,
	`grantTypes` text,
	`responseTypes` text,
	`requirePKCE` integer,
	`dpopBoundAccessTokens` integer,
	`referenceId` text,
	`metadata` text,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `oauthClient_clientId_unique` ON `oauthClient` (`clientId`);--> statement-breakpoint
CREATE INDEX `oauthClient_userId` ON `oauthClient` (`userId`);--> statement-breakpoint
CREATE TABLE `oauthClientAssertion` (
	`id` text PRIMARY KEY NOT NULL,
	`expiresAt` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `oauthClientResource` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`resourceId` text NOT NULL,
	`metadata` text,
	`createdAt` text,
	FOREIGN KEY (`clientId`) REFERENCES `oauthClient`(`clientId`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`resourceId`) REFERENCES `oauthResource`(`identifier`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `oauthClientResource_clientId` ON `oauthClientResource` (`clientId`);--> statement-breakpoint
CREATE INDEX `oauthClientResource_resourceId` ON `oauthClientResource` (`resourceId`);--> statement-breakpoint
CREATE TABLE `oauthConsent` (
	`id` text PRIMARY KEY NOT NULL,
	`clientId` text NOT NULL,
	`userId` text,
	`referenceId` text,
	`resources` text,
	`requestedUserInfoClaims` text,
	`scopes` text NOT NULL,
	`createdAt` text,
	`updatedAt` text,
	FOREIGN KEY (`clientId`) REFERENCES `oauthClient`(`clientId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `oauthConsent_clientId` ON `oauthConsent` (`clientId`);--> statement-breakpoint
CREATE INDEX `oauthConsent_userId` ON `oauthConsent` (`userId`);--> statement-breakpoint
CREATE TABLE `oauthRefreshToken` (
	`id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`clientId` text NOT NULL,
	`sessionId` text,
	`userId` text NOT NULL,
	`referenceId` text,
	`authorizationCodeId` text,
	`resources` text,
	`requestedUserInfoClaims` text,
	`expiresAt` text,
	`createdAt` text,
	`revoked` text,
	`rotatedAt` text,
	`rotationReplayResponse` text,
	`rotationReplayExpiresAt` text,
	`authTime` text,
	`confirmation` text,
	`scopes` text NOT NULL,
	FOREIGN KEY (`clientId`) REFERENCES `oauthClient`(`clientId`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`sessionId`) REFERENCES `session`(`id`) ON UPDATE no action ON DELETE set null,
	FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `oauthRefreshToken_token_unique` ON `oauthRefreshToken` (`token`);--> statement-breakpoint
CREATE INDEX `oauthRefreshToken_clientId` ON `oauthRefreshToken` (`clientId`);--> statement-breakpoint
CREATE INDEX `oauthRefreshToken_sessionId` ON `oauthRefreshToken` (`sessionId`);--> statement-breakpoint
CREATE INDEX `oauthRefreshToken_userId` ON `oauthRefreshToken` (`userId`);--> statement-breakpoint
CREATE INDEX `oauthRefreshToken_authorizationCodeId` ON `oauthRefreshToken` (`authorizationCodeId`);--> statement-breakpoint
CREATE TABLE `oauthResource` (
	`id` text PRIMARY KEY NOT NULL,
	`identifier` text NOT NULL,
	`name` text NOT NULL,
	`accessTokenTtl` integer,
	`refreshTokenTtl` integer,
	`signingAlgorithm` text,
	`signingKeyId` text,
	`allowedScopes` text,
	`customClaims` text,
	`dpopBoundAccessTokensRequired` integer,
	`disabled` integer,
	`createdAt` text,
	`updatedAt` text,
	`policyVersion` integer,
	`metadata` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `oauthResource_identifier_unique` ON `oauthResource` (`identifier`);