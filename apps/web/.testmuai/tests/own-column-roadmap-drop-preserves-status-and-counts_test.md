---
assurance:
  id: t-37
  base: sha256:3a5cb0fe51c690409b8bb92bd5eefef471ae84f09a82ca5f3f454f7c6d012b2e
---
# Own-column Roadmap drop preserves status and counts

> An unclaimed request dropped on its current status column remains in the same status, position by status, and column count.

## Step 1

At {{base_url}}/acme/dashboard, reach the Acme board member dashboard, signing in through {{base_url}}/login with {{e2e_email}} and {{e2e_password}} if required.

## Step 2

On Acme's dashboard post list, collect all request titles and statuses for independent reconciliation with the Roadmap.

## Step 3

On Acme's dashboard Roadmap page, locate the card titled {{other_status_title}} and identify its current status column.

## Step 4 @verifies ac-105, ac-101, ac-102, ac-103, ac-104

On the Roadmap, drop {{other_status_title}} on its original status column and reload the page, then assert its status is its original status before the drop, the card occurs exactly once in the matching column, all four status columns remain present, and their counts agree with the unchanged board request inventory.
