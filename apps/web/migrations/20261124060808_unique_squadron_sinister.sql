CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`org_id` integer NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `orgs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categories_org_name` ON `categories` (`org_id`,`name`);--> statement-breakpoint
CREATE TABLE `statuses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`org_id` integer NOT NULL,
	`name` text NOT NULL,
	`color` text NOT NULL,
	`kind` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`org_id`) REFERENCES `orgs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `statuses_org_name` ON `statuses` (`org_id`,`name`);--> statement-breakpoint
ALTER TABLE `posts` ADD `status_id` integer REFERENCES statuses(id);--> statement-breakpoint
ALTER TABLE `posts` ADD `category_id` integer REFERENCES categories(id);