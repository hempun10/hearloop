---
assurance:
  id: t-23
  base: sha256:7f92e2fbe0bfc2e409d4da3fffadaf5ebaf1296ecd79a6a93ce75d07b4e0bf0c
---
# Stale tab shows already-removed error, not success

> A member opens the same entry in two dashboard changelog tabs, removes it in the second, then confirms removal from the stale first tab; the first tab reports the already-removed error instead of success.

## Step 1

At {{base_url}}/acme/dashboard, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open the dashboard Changelog containing {{stale_changelog_title}}.

## Step 2

Keep the original Changelog open in the first browser tab and open the same Acme dashboard Changelog in a second tab, with {{stale_changelog_title}} present in both tabs.

## Step 3

In the second tab's dashboard Changelog, remove {{stale_changelog_title}} and confirm with Remove, leaving the first tab unchanged.

## Step 4 @verifies ac-60

In the first tab's unchanged dashboard Changelog, initiate removal of {{stale_changelog_title}}, then assert a removal confirmation prompt appears.

## Step 5 @verifies ac-55, ac-56

In that first tab's removal confirmation for {{stale_changelog_title}}, choose Remove, then assert the error reads "That entry was already removed. Reload to see the current changelog." and "Removed from the changelog" is absent.
