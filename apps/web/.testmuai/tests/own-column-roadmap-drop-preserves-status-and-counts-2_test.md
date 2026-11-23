---
assurance:
  id: t-45
  base: sha256:3918d956cbe91123c47f79a2c8ed09ae23c6afb6048e77217fbb65f83f3ce740
---
# Own-column Roadmap drop preserves status and counts

> An unclaimed request dropped on its current status column remains in the same status, position by status, and column count.

## Step 1

At {{base_url}}/login, sign in to Acme as a board member with {{e2e_email}} and {{e2e_password}}, then reach the dashboard post list at {{base_url}}/acme/dashboard.

## Step 2

On the Acme dashboard post list, collect all request titles and statuses for independent reconciliation with the Roadmap.

## Step 3

Open the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap and locate {{other_status_title}} in its current status column.

## Step 4 @verifies ac-105, ac-101, ac-102, ac-103, ac-104

On the signed-in dashboard Roadmap at {{base_url}}/acme/dashboard/roadmap, drop {{other_status_title}} on its own status column and reload that dashboard Roadmap, then assert its status remains the original status, its card occurs exactly once in the matching column, all four status columns remain present, and their counts agree with the unchanged board request inventory.
