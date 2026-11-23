---
assurance:
  id: t-24
  base: sha256:01ac91fd6cd05b26480b628f766848966930e203d7f95e5a809dfcc48708055e
---
# Removing changelog entry preserves shipped request

> A board member confirms removal of an existing entry; it disappears from dashboard and public changelogs while the associated request remains Shipped.

## Step 1

At {{base_url}}/acme/dashboard, sign in as the Acme board member with {{e2e_email}} and {{e2e_password}} if needed, then open the dashboard Changelog containing the shipped request's entry {{removable_changelog_title}}.

## Step 2 @verifies ac-60

In the dashboard Changelog, initiate removal of {{removable_changelog_title}}, then assert a removal confirmation prompt appears.

## Step 3 @verifies ac-59

In the confirmation for {{removable_changelog_title}}, choose Remove, then assert its entry is absent from the dashboard Changelog.

## Step 4 @verifies ac-58

From the dashboard Changelog's View public page link, open Acme's public changelog, then assert the {{removable_changelog_title}} entry is absent.

## Step 5 @verifies ac-57

Return to the Acme dashboard post list and locate the request {{removable_changelog_title}}, then assert its status is Shipped.
