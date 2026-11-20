CREATE TABLE `post_votes` (
	`post_id` integer NOT NULL,
	`voter` text NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	PRIMARY KEY(`post_id`, `voter`),
	FOREIGN KEY (`post_id`) REFERENCES `posts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `changelog` ADD `verified` integer DEFAULT true NOT NULL;