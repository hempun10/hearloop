---
assurance:
  id: t-67
  base: sha256:e87de4047695847317de815cca24b0a51cc1490c5d2700a3dd4b855ea35cf0f5
---
# Declining Acme changelog removal retains public entry

> A board member initiates removal of an existing changelog entry but does not confirm Remove; the entry remains in the dashboard changelog.

## Step 1

At {{base_url}}/login, sign in to hearloop with {{e2e_email}} and {{e2e_password}} as an Acme board member and reach the Acme dashboard.

## Step 2

On the Acme dashboard post list, move request {{post_title}} to a non-Shipped status, then move it to Shipped so it has a current changelog entry.

## Step 3 @verifies ac-112

On the Acme dashboard Changelog page, start removing the entry for {{post_title}} and decline the requested confirmation without choosing Remove, then assert the entry for {{post_title}} remains in the dashboard changelog.

## Step 4 @verifies ac-111

From the Acme dashboard Changelog page, open View public page for Acme, compare its complete entry list with the dashboard changelog, then assert every public changelog entry for Acme appears in the dashboard changelog.
