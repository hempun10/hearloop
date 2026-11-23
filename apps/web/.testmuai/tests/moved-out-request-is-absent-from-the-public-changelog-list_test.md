---
assurance:
  id: t-33
  base: sha256:b8d59044552c18f916b86a0912755603955da00926ceb01b53a4e5881ec3bd1b
---
# Moved-out request is absent from the public changelog list

> Establish a previously published request, move it out of Shipped, and prove its former entry is absent from the dashboard's public changelog list.

## Step 1

At {{base_url}}/login, sign in to the Acme board as a member with {{e2e_email}} and {{e2e_password}}.

## Step 2

On the Acme dashboard post list, establish two distinct published entries by moving {{other_status_title}} and then {{post_title}} to Shipped, moving either out of Shipped first if necessary.

## Step 3

On the Acme dashboard post list, move {{planned_request_title}} to Shipped, then open the dashboard Changelog page and locate its published entry.

## Step 4

On the Acme dashboard post list, move {{planned_request_title}} from Shipped to Planned.

## Step 5 @verifies ac-100, ac-98

Return to the Acme dashboard Changelog page and store the visible entry titles as the dashboard entry set, then assert {{planned_request_title}} has no changelog entry and the remaining entries are ordered newest first.

## Step 6 @verifies ac-97

From the Acme dashboard Changelog page, use View public page to compare the stored dashboard entry set with the Acme public changelog, then assert every stored dashboard entry is present in that board's public changelog.
