---
assurance:
  id: t-70
  base: sha256:b4cdf8e35096b6fa02b39875e4bca7ccb3f4ee6fd5a6f01606a3ab01f9541158
---
# Stale Acme changelog removal reports exact error in first tab

> A member opens the same dashboard changelog entry in two tabs, confirms its removal in the second tab, and tries Remove in the first; the first tab displays the specified already-removed error rather than a removed-success message.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} as an Acme board member and reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, move request {{stale_changelog_title}} to a non-Shipped status, then move it to Shipped so it has a current public changelog entry.

## Step 3

At the Acme dashboard Changelog page, keep the entry for {{stale_changelog_title}} visible in a first browser tab and open that same dashboard changelog entry in a second browser tab.

## Step 4

In the second browser tab's Acme dashboard Changelog page, confirm Remove for the entry for {{stale_changelog_title}}.

## Step 5 @verifies ac-121, ac-122

In the still-open first browser tab's Acme dashboard Changelog page, try Remove on the same entry for {{stale_changelog_title}}, then assert the displayed error equals "That entry was already removed. Reload to see the current changelog." and "Removed from the changelog" is not shown.
