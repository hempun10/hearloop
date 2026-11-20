---
assurance:
  id: t-29
  base: sha256:c0bc59b5da7b8e9efbbb6dbcf2ed85239952a0a5509eee906c171fe9e5b796de
---
# Stale changelog removal returns error without false success

> A member attempts to remove a changelog entry after it was removed elsewhere; the outcome is an error, not a removed-success message.

## Step 1

At {{base_url}}/login, sign in to hearloop as the Acme board member with {{e2e_email}} and {{e2e_password}}, then reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, find request {{stale_changelog_title}} and move it to Shipped so its changelog entry exists.

## Step 3

On the Acme dashboard Changelog page, open removal confirmation for {{stale_changelog_title}} and leave it open in this browser tab.

## Step 4

In a second browser tab signed in as the same Acme member, open the Acme dashboard Changelog page and confirm removal of the entry for {{stale_changelog_title}}.

## Step 5 @verifies ac-65, ac-66

Return to the first tab's pending removal confirmation and attempt Remove for {{stale_changelog_title}}, then assert an error is shown and "Removed from the changelog" is not shown.
