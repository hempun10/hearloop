CREATE TABLE `api_tokens` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`org_id` integer NOT NULL,
	`name` text NOT NULL,
	`token_hash` text NOT NULL,
	`hint` text NOT NULL,
	`created_by` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`last_used_at` integer,
	`revoked_at` integer,
	FOREIGN KEY (`org_id`) REFERENCES `orgs`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `api_tokens_tokenHash_unique` ON `api_tokens` (`token_hash`);--> statement-breakpoint
CREATE INDEX `api_tokens_org` ON `api_tokens` (`org_id`);--> statement-breakpoint
ALTER TABLE `posts` ADD `claim_token_id` integer;--> statement-breakpoint
ALTER TABLE `posts` ADD `claimed_by` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `claim_expires_at` integer;--> statement-breakpoint
-- keep each board's existing loop token working: it becomes a named token
INSERT INTO `api_tokens` (`org_id`, `name`, `token_hash`, `hint`) SELECT `id`, 'Loop token', `token_hash`, '' FROM `orgs` WHERE `token_hash` IS NOT NULL;--> statement-breakpoint
ALTER TABLE `orgs` DROP COLUMN `token_hash`;