ALTER TABLE `api_tokens` ADD `icon` text;--> statement-breakpoint
ALTER TABLE `posts` ADD `assignee_token_id` integer REFERENCES api_tokens(id);